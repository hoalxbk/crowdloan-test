import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BeatLoader } from 'react-spinners';
import { css } from "@emotion/core";
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import useStyles from './styles';

import ButtonLink from '../ButtonLink'
import { ETH_CHAIN_ID } from '../../../constants/network'
import AppNetworkSwitch from './AppNetworkSwitch';
import ConnectWalletModal from './ConnectWalletModal';
import WalletDisconnect from './WalletDisconnect';
import { HeaderContext } from './context/HeaderContext'
import { AppContext } from '../../../AppContext';
import { trimMiddlePartAddress } from '../../../utils/accountAddress';
import { connectorsByName, connectorNames } from '../../../constants/connectors';
import { WalletConnectionState } from  '../../../store/reducers/wallet';

const AccountIcon = "user.svg";
const BrightStartIcon = "bright-star.svg";
const WalletIcon = "wallet.svg";
const EthereumIcon = "ethereum.svg";
const BSCIcon = "bsc.svg";
const logo = "/images/logo-red-kite.svg";
const iconClose = "/images/icons/close.svg";
const iconHamburger = "/images/icons/hamburger.svg";
const iconAccount = "icons/account.svg";

const HeaderDefaultLayout: React.FC<any> = (props: any) => {
  const styles = useStyles();

  const [switchNetworkDialog, setSwitchNetworkDialog] = useState<boolean>(false);
  const [disconnectDialog, setDisconnectDialog] = useState<boolean>(false);
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  const walletsInfo = useSelector((state: any) => state.wallet).entities;
  const [openSideBar, setOpenSideBar] = useState(false);
  const { data: message = '' } = useSelector((state: any) => state.messages);

  const {
    handleProviderChosen,
    currentConnector,
    walletName,
    setWalletName,
    loginError,
    currentConnectedWallet,
    setCurrentConnectedWallet,
    openConnectWallet,
    setOpenConnectWallet,
    connectWalletLoading
  } = useContext(AppContext);

  const currentAccount = currentConnectedWallet && currentConnectedWallet.addresses[0];
  const balance = currentConnectedWallet ? currentConnectedWallet.balances[currentAccount]: 0;

  const handleConnectWalletClose = () => {
    setOpenConnectWallet && setOpenConnectWallet(false);
  }

  const handleConnectWalletOpen = () => {
    setOpenConnectWallet && setOpenConnectWallet(true);
    setOpenSideBar(false);
  }

  const handleDisconnectDialogOpen = () => {
    setDisconnectDialog(true);
    setOpenSideBar(false)
  }

  /* const hamburgerStyle = (isSmartPhone: boolean) => { */
  /*   if(isSmartPhone) { */
  /*     return openSideBar ? 'flex' : 'none'; */
  /*   } */
  /*   else { */
  /*     return 'flex'; */
  /*   } */
  /* } */

  useEffect(() => {
    if (walletsInfo && walletName) {
      let currentWalletsName: string[] = [];
      let isFound = false;

      Object.keys(walletsInfo).forEach(key => {
        const wallet = walletsInfo[key];

        if (wallet.addresses.length > 0 && wallet.connectionState === WalletConnectionState.CONNECTED && !isFound) {
          isFound = true;
          setCurrentConnectedWallet && setCurrentConnectedWallet(wallet);
          currentWalletsName.push(key);
        }
      });

      if (currentWalletsName.length > 0 && walletName.length === 0 && !currentConnector) {
        const chooseWallet = currentWalletsName[0] as connectorNames;

        setWalletName && setWalletName(currentWalletsName);
        handleProviderChosen && handleProviderChosen(chooseWallet, connectorsByName[chooseWallet]);
      }
    }
  }, [walletsInfo, walletName]);

  const handleClickPoolList = (e: any) => {
    console.log('props', props.location.pathname);
    if (props?.location?.pathname === '/dashboard') {
      window.location.reload();
    }
  };

  return (
    <>
      <div>
        <div className={styles.navBar}>
          <div>
            <Link to={'/'} className={styles.navbarLink}>
              <img src={logo} className={styles.navbarLogo}/>
            </Link>
          </div>
          {isWidthDown('xs', props.width) && <img src={iconHamburger} onClick={() => setOpenSideBar(true)}/>}
          <div className={styles.rightBar + (openSideBar ? ' active' : '')}>
              {isWidthDown('xs', props.width) &&
                <>
                  <img src={logo} className={styles.sideBarLogo}/>
                  <img src={iconClose} className={styles.closeBtn} onClick={() => setOpenSideBar(false)}/></>}
                  <ButtonLink text="Pool" to={'/dashboard'} icon={BrightStartIcon} className={`${styles.btn} start`} onClick={handleClickPoolList}/>
                  {currentAccount && <ButtonLink text="My Account" to={'/account'} icon={iconAccount} className={`${styles.btn} start my-account`} />}
                  <button className={`${styles.btn} ${styles.btnNetwork}`} onClick={() => {setSwitchNetworkDialog(true); setOpenSideBar(false);}}>
                    <img src={`/images/${appChainID === ETH_CHAIN_ID ? EthereumIcon: BSCIcon}`} />
                    <span className={styles.btnConnectText}>
                      {appChainID === ETH_CHAIN_ID ? 'Ethereum': 'BSC Mainnet'}
                    </span>
                  </button>
                  <button
                    className={`${styles.btn} ${styles.btnConnect}`}
                    onClick={() => {
                      if (!connectWalletLoading) {
                        !currentAccount ? handleConnectWalletOpen(): handleDisconnectDialogOpen()
                      }
                    }}
                    disabled={connectWalletLoading}
                  >
                {
                  !connectWalletLoading ? (
                    <>
                      <span>
                      {
                        currentAccount && (!loginError ? `${balance} ${appChainID === ETH_CHAIN_ID ? "ETH": "BNB"}`: '0' )
                      }
                      </span>
                      {
                        !currentAccount && <img src={ `/images/${WalletIcon}`} />
                      }
                      <span className={`${styles.btnConnectText} ${currentAccount ? styles.btnAccount: ''}`}>
                      {
                        currentAccount && `${trimMiddlePartAddress(currentAccount)}` || "Connect Wallet"
                      }
                      </span>
                      </>
                  ): <BeatLoader color={'white'} css={css`margin-top: 3px`} size={10} />
                }
                </button>
            </div>
          </div>
        <HeaderContext.Provider value={{ agreedTerms, setAgreedTerms }}>
            <ConnectWalletModal opened={openConnectWallet as boolean} handleClose={handleConnectWalletClose}/>
            <AppNetworkSwitch
              opened={switchNetworkDialog}
              handleClose={() => setSwitchNetworkDialog(false)}
            />
            <WalletDisconnect
              opened={disconnectDialog}
              handleClose={() => { setDisconnectDialog(false); setAgreedTerms(false); setOpenSideBar(false); }}
              currentWallet={currentConnectedWallet}
            />
        </HeaderContext.Provider>
        {
          loginError && (
            <div className={styles.loginErrorBanner}>
              <img src="/images/red-warning.svg" alt="red-warning icon" />
              <span className={styles.loginErrorBannerText}>
                {loginError} Learn how to &nbsp;
                <a href="https://help.1inch.exchange/en/articles/4966690-how-to-use-1inch-on-bsc-binance-smart-chain" target="_blank" className={styles.loginErrorGuide}>
                  change network in wallet
                </a>
                &nbsp; or &nbsp;
                <button
                  className={styles.btnChangeAppNetwork}
                  onClick={() => {setOpenSideBar(false); setSwitchNetworkDialog(true);}}
                >
                  Change App Network
                </button>
              </span>
            </div>
          )
        }
        {
          (window.location.href.indexOf('buy-token') > -1) && !loginError && message != '' && <div className={styles.loginErrorBanner}>
          <img src="/images/red-warning.svg" alt="red-warning icon" />
          <span className={styles.loginErrorBannerText}>
            {message}&nbsp;&nbsp;
            <button
              className={styles.btnChangeAppNetwork}
              onClick={() => {setOpenSideBar(false); setSwitchNetworkDialog(true);}}
            >
              Change App Network
            </button>
          </span>
        </div>
        }
      </div>
    </>
  );
};

export default withWidth()(withRouter(HeaderDefaultLayout));
