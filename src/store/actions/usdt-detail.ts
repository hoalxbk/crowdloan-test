import { usdtDetailActions } from '../constants/usdt-detail';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import ErcABI from '../../abi/Erc20.json';

export const getUsdtDetail = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: usdtDetailActions.USDT_DETAIL_LOADING });

    try {
      const USDT_TOKEN = process.env.REACT_APP_SMART_CONTRACT_USDT_ADDRESS as string;
      const ercContract = getContractInstance(ErcABI, USDT_TOKEN);
      if (ercContract) {
        const decimals  = await ercContract.methods.decimals().call();
        if (decimals) {
          dispatch({
            type: usdtDetailActions.USDT_DETAIL_SUCCESS,
            payload: {
              decimals
            },
          });
        }
      }
    } catch (error) {
      dispatch({
        type: usdtDetailActions.USDT_DETAIL_FAILURE,
        payload: error,
      });
    }
  }
};