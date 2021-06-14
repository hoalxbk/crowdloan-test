import { usdtAllowanceActions } from '../constants/usdt-allowance';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import ErcABI from '../../abi/Erc20.json';
import { isAllowanceUsdt } from '../../utils/usdt';

export const getUsdtAllowance = (amount: string, campaignId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: usdtAllowanceActions.USDT_ALLOWANCE_LOADING });

    try {
      const USDT_TOKEN = process.env.REACT_APP_SMART_CONTRACT_USDT_ADDRESS as string;
      const ercContract = getContractInstance(ErcABI, USDT_TOKEN);
      if (ercContract) {
        const loginUser = getState().investor.data.wallet_address;
        const decimals  = await ercContract.methods.decimals().call();
        const allowance  = await ercContract.methods.allowance(loginUser, campaignId).call();
        const allowanceResult = isAllowanceUsdt(decimals, amount, allowance);
        dispatch({
          type: usdtAllowanceActions.USDT_ALLOWANCE_SUCCESS,
          payload: allowanceResult,
        });
      }
    } catch (error) {
      dispatch({
        type: usdtAllowanceActions.USDT_ALLOWANCE_FAILURE,
        payload: error,
      });
    }
  }
};
