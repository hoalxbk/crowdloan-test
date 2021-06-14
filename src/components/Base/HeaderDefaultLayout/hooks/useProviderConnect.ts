import {useState, useEffect, SetStateAction, Dispatch, useCallback, useContext} from 'react';
import { useDispatch } from 'react-redux';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import BigNumber from 'bignumber.js';

import usePrevious from '../../../../hooks/usePrevious';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { ConnectorNames } from '../../../../constants/connectors';
import {
  APP_NETWORKS_ID,
  ETH_CHAIN_ID,
  BSC_CHAIN_ID,
  ChainIdNameMapping,
  chainId,
  NETWORK_NAME_MAPPINGS
} from '../../../../constants/network';
import { requestSupportNetwork } from '../../../../utils/setupNetwork';
import { getAppNetworkName } from '../../../../utils/network/getAppNetworkName';
import { connectWalletSuccess, disconnectWallet } from '../../../../store/actions/wallet';
import getAccountBalance from '../../../../utils/getAccountBalance';

import { settingAppNetwork, NetworkUpdateType, settingCurrentConnector } from '../../../../store/actions/appNetwork';
import {alertFailure} from "../../../../store/actions/alert";

const useProviderConnect = (
  setOpenConnectDialog?: Dispatch<SetStateAction<boolean>>,
  openConnectDialog?: boolean,
  binanceAvailable?: boolean
) => {
  const dispatch = useDispatch();

  const { appChainID, walletChainID } = useTypedSelector(state => state.appNetwork).data;

  const [account, setAccount] = useState<string | undefined>(undefined);

  const [appNetworkLoading, setAppNetworkLoading] = useState(false);
  const [walletNameSuccess, setWalletNameSuccess] = useState<string | undefined>(undefined);
  const [walletName, setWalletName] = useState<(undefined | string)[]>([]);
  const [currentConnector, setCurrentConnector] = useState<undefined | AbstractConnector>(undefined);
  const [connectWalletLoading, setConnectWalletLoading] = useState(false);
  const [loginError, setLoginError] = useState('');

  const {activate, active, connector, chainId, error, account: connectedAccount, deactivate } = useWeb3React();

  const previousAccount = usePrevious(account);
  const activePrevious = usePrevious(active);
  const previousConnector = usePrevious(connector);

  useEffect(() => {
      if (connectWalletLoading && ((active && !activePrevious) || (connector && connector !== previousConnector && !error))) {
        setConnectWalletLoading(false);
        setOpenConnectDialog && setOpenConnectDialog(false);
      }
    }, [
      active,
      connector,
      error,
      previousAccount,
      previousConnector,
      activePrevious,
      connectWalletLoading,
      setOpenConnectDialog,
      setConnectWalletLoading
  ]);

   useEffect(() => {
    const handleWeb3ReactUpdate = (updated: any) => {
      if (updated.account) {
        if (updated.account) {
          setAccount(updated.account);
        } else setAccount(undefined);
      }

      if (updated.chainId) {
        const chainId = Number(updated.chainId).toString();

        if (APP_NETWORKS_ID.indexOf(chainId.toString()) >= 0) {
          // dispatch(
          //   settingAppNetwork(
          //   NetworkUpdateType.App,
          //   APP_NETWORKS_ID[APP_NETWORKS_ID.indexOf(chainId.toString())] as string
          // ));
        }

        chainId && dispatch(settingAppNetwork(NetworkUpdateType.Wallet, chainId.toString()))
      }
    }

    const handleWeb3ReactError = (err: any) => {
      if (err === 'NaN ChainId') {
        dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));
        setLoginError(`App network (${appChainID}) doesn't mach to network selected in wallet: NaN. Learn how to change network in wallet or`);
      }
    }

    if (currentConnector && !active && !error) {
      currentConnector.on('Web3ReactUpdate', handleWeb3ReactUpdate)
      currentConnector.on('Web3ReactError', handleWeb3ReactError);
      currentConnector.on('Web3ReactDeactivate', handleConnectorDisconnect);
    }

    return () => {
      if (currentConnector && currentConnector.removeListener) {
        currentConnector.removeListener('Web3ReactUpdate', handleWeb3ReactUpdate);
        currentConnector.removeListener('Web3ReactError', handleWeb3ReactError);
        currentConnector.removeListener('Web3ReactDeactivate', handleConnectorDisconnect);
      }
    }
  }, [currentConnector, connectedAccount]);

  useEffect(() => {
    currentConnector && setAppNetworkLoading(true);
  }, [appChainID]);

  // UseEffect for watching change app network loading
  useEffect(() => {
    if (!appNetworkLoading) {
      setOpenConnectDialog && setOpenConnectDialog(false);
      setConnectWalletLoading(false);
    }
  }, [appNetworkLoading]);

  // UseEffect for trying login after fullfilled app chain id and connector
   useEffect(() => {
      const tryLoginAfterSwitch = async () => {
        currentConnector
        && appChainID
        && ((appChainID === BSC_CHAIN_ID && binanceAvailable) || appChainID === ETH_CHAIN_ID)
        && await tryActivate(currentConnector, appChainID, walletName[walletName.length - 1] as string);
      }

      currentConnector && appChainID && walletName.length > 0 && tryLoginAfterSwitch();
    }, [currentConnector, appChainID, walletName, binanceAvailable]);

    useEffect(() => {
      walletChainID && !openConnectDialog && !appNetworkLoading && switchNetwork(appChainID, walletChainID);
    }, [walletChainID, appNetworkLoading, appChainID, openConnectDialog]);

    // UseEffect for setting wallet id after login success
    useEffect(() => {
      if (!connectWalletLoading) {
        chainId && dispatch(settingAppNetwork(NetworkUpdateType.Wallet, chainId.toString()));
        connectedAccount && setAccount(connectedAccount);
      }
    }, [connectWalletLoading, connectedAccount, chainId])

    // Handle Provider choose
    const handleProviderChosen = (name: string, connector: AbstractConnector) => {
      console.log('Wallet Connected: ', name);
      setCurrentConnector(connector);
      walletName.indexOf(name) < 0 && setWalletName([...walletName, name]);
    }

  const switchNetwork = (appChainID: string, walletChainID: string) => {
    if (appChainID && walletChainID) {
      Number(appChainID) !== Number(walletChainID) ?
        setLoginError(`App network (${getAppNetworkName(appChainID)}) doesn't mach to network selected in wallet: ${ChainIdNameMapping[Number(walletChainID) as chainId]}.`) : setLoginError('');
      currentConnector && activate(currentConnector, undefined, true).catch(err =>
        console.log('Fail when switch between network:', err.message)
      );
    }

    return;
  }





  const tryActivate = useCallback(async (connector: AbstractConnector, appChainID: string, wallet: string) => {
      try {
        if (!connectWalletLoading) {
          setConnectWalletLoading(true);

          if (wallet === ConnectorNames.MetaMask || wallet === ConnectorNames.BSC) {
            await requestSupportNetwork(appChainID, wallet);
          }

          if (connector instanceof WalletConnectConnector && connector.walletConnectProvider?.wc?.uri) {
            connector.walletConnectProvider = undefined;
          }

          if (connector && walletName) {
            if (wallet === ConnectorNames.Fortmatic) {
              connector.on("OVERLAY_READY", () => {
                setOpenConnectDialog && setOpenConnectDialog(false);
              });
            }

            await activate(connector, undefined, true)
            .then(() => {
              dispatch(settingCurrentConnector(wallet));
              setWalletNameSuccess(wallet);
            })
            .catch(async error => {

              if (error instanceof UnsupportedChainIdError) {
                console.debug('Error when activate: ', error.message);
                dispatch(disconnectWallet());
                setCurrentConnector(undefined);
                setConnectWalletLoading(false);
                setWalletName([]);
                localStorage.removeItem('walletconnect');

                // await activate(connector);
                const currentChainId = await connector?.getChainId();
                // const b = connector?.supportedChainIds;

                dispatch(alertFailure(`App network (${NETWORK_NAME_MAPPINGS[appChainID]}) doesn\'t mach to network selected in wallet: ${NETWORK_NAME_MAPPINGS[currentChainId]}. Please change network in wallet  or  change app network.`));

                return;
              } else {
                dispatch(disconnectWallet());
                setConnectWalletLoading(false);
                setWalletName(walletName.filter(name => wallet !== name));
                console.debug('Error when try to activate: ', error.message);
                return;
              }
            })
          }
        }
      } catch (error) {
        console.log(error.message);
        setLoginError(error.message);
        setCurrentConnector(undefined);
      }

      setAppNetworkLoading(false);
  }, [connector, appChainID, walletName]);

  useEffect(() => {
    const getAccountDetails = async () => {
      if (appChainID && connectedAccount && walletNameSuccess) {
        const accountBalance = await getAccountBalance(appChainID, walletChainID, connectedAccount as string, walletNameSuccess);

        dispatch(
          connectWalletSuccess(
            walletNameSuccess,
            [connectedAccount],
            {
              [connectedAccount]: new BigNumber(accountBalance._hex).div(new BigNumber(10).pow(18)).toFixed(5)
            }
          )
        );

        setConnectWalletLoading(false);
      }
    }
    getAccountDetails();
  }, [walletNameSuccess, connectedAccount, appChainID, walletChainID]);

  const handleConnectorDisconnect = useCallback(() => {
    dispatch(disconnectWallet());
    dispatch(settingCurrentConnector(undefined));
    dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));

    localStorage.removeItem("walletconnect");

    deactivate();
    setAccount(undefined);
    setWalletName([]);
    setWalletNameSuccess(undefined);
    setCurrentConnector(undefined);
    setConnectWalletLoading(false);
    setLoginError('');
  }, []);

  return {
    handleProviderChosen,
    setWalletName,
    walletName,
    connectWalletLoading,
    walletNameSuccess,
    loginError,
    currentConnector,
    appNetworkLoading,
    handleConnectorDisconnect
  }
}

export default useProviderConnect;
