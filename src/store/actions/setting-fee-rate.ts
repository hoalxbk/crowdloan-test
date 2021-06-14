import { settingFeeRateActions } from '../constants/setting-fee-rate';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import campaignFactoryABI from '../../abi/CampaignFactory.json';
import { alertActions } from '../constants/alert';
import { getSettingDetail } from './setting-detail';

export const setFeeRate = (feeRate: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: settingFeeRateActions.SETTING_FEE_RATE_LOADING });

    try {
      const loginUser = getState().user.data.wallet_address;
      const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_FACTORY_ADDRESS || "";
      const contract = getContractInstance(campaignFactoryABI, CONTRACT_FACTORY_ADDRESS);
      if (contract) {
        const result = await contract.methods.setPlatformFeeRate(feeRate).send({
          from: loginUser
        });

        if (result) {
          dispatch({
            type: settingFeeRateActions.SETTING_FEE_RATE_SUCCESS,
            payload: feeRate,
          });

          dispatch({
            type: alertActions.SUCCESS_MESSAGE,
            payload: 'Setting Fee Rate Successful!',
          });

          dispatch(getSettingDetail());
        }
      }

    } catch (error) {
      dispatch({
        type: settingFeeRateActions.SETTING_FEE_RATE_FAILURE,
        payload: error,
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: error.message,
      });
    }
  }
};
