import { balanceActions } from '../constants/balance';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { convertFromWei, getContractInstance, getWeb3Instance } from '../../services/web3';
import erc20ABI from '../../abi/Erc20.json';
import BigNumber from "bignumber.js";
import { SmartContractMethod } from '../../services/web3';

const balanceOf = async (tokenAddress: string | undefined, appChainID: any, connector: any, loginUser: string) => {
  const tokenContract = getContractInstance(
    erc20ABI,
    tokenAddress as string,
    connector,
    appChainID,
    SmartContractMethod.Read,
    true
  );
  if (tokenContract) {
    const tokenDecimals = await tokenContract.methods.decimals().call();
    const tokenBalance = await tokenContract.methods.balanceOf(loginUser).call();
    const tokenBalanceConvert = (new BigNumber(tokenBalance)).div(new BigNumber(`1e+${tokenDecimals}`)).toString();
    return tokenBalanceConvert;
  }
  return 0;
}

export const getBalance = (loginUser: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: balanceActions.BALANCE_LOADING });
    try {
      const web3Instance = getWeb3Instance();
      let result = {};
      if (web3Instance) {
        const ethBalance = await web3Instance.eth.getBalance(loginUser);
        result = {
          ...result,
          eth: convertFromWei(ethBalance),
        }
      }
      const { appChainID } = getState().appNetwork.data;
      const { connector } = getState().connector.data;

      const pkfBalance = await balanceOf(process.env.REACT_APP_PKF, appChainID, connector, loginUser);
      const uniBalance = await balanceOf(process.env.REACT_APP_UNI_LP, appChainID, connector, loginUser);
      const mantraBalance = await balanceOf(process.env.REACT_APP_MANTRA_LP, appChainID, connector, loginUser);

      result = {
        ...result,
        pkf: pkfBalance,
        uni: uniBalance,
        mantra: mantraBalance
      };

      dispatch({
        type: balanceActions.BALANCE_SUCCESS,
        payload: result,
      });

    } catch (error) {
      dispatch({
        type: balanceActions.BALANCE_FAILURE,
        payload: error
      });
    }
  }
};