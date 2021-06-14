import {usdtApproveActions} from '../constants/usdt-approve';
import {usdtAllowanceActions} from '../constants/usdt-allowance';
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {getContractInstance} from '../../services/web3';
import ErcABI from '../../abi/Erc20.json';
import {alertActions} from '../constants/alert';
import {convertAmountToUsdt, isAllowanceUsdt} from '../../utils/usdt';
import {TRANSACTION_ERROR} from '../../constants';

export const approveUsdt = (amount: string, campaignId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: usdtApproveActions.USDT_APPROVE_LOADING });

    try {
      const USDT_TOKEN = process.env.REACT_APP_SMART_CONTRACT_USDT_ADDRESS as string;
      const ercContract = getContractInstance(ErcABI, USDT_TOKEN);
      if (ercContract) {
        const loginUser = getState().investor.data.wallet_address;
        const decimals  = await ercContract.methods.decimals().call();
        const allowance  = await ercContract.methods.allowance(loginUser, campaignId).call();

        if(!isAllowanceUsdt(decimals, amount, allowance)) {
          const amountApprove = convertAmountToUsdt(decimals, amount).toNumber();
          const approve  = await ercContract.methods.approve(campaignId, amountApprove).send({
            from: loginUser,
          });

          if (approve) {
            dispatch({
              type: usdtApproveActions.USDT_APPROVE_SUCCESS,
              payload: approve,
            });
            dispatch({
              type: alertActions.SUCCESS_MESSAGE,
              payload: 'Approve Successful!',
            });
            dispatch({
              type: usdtAllowanceActions.USDT_ALLOWANCE_SUCCESS,
              payload: true,
            })
          }
        }
      }
    } catch (error) {
      dispatch({
        type: usdtApproveActions.USDT_APPROVE_FAILURE,
        payload: error,
      });
      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: TRANSACTION_ERROR,
      });
    }
  }
};
