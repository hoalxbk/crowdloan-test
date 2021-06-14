import { settingDeactivateActions } from '../constants/setting-deactivate';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import campaignFactoryABI from '../../abi/CampaignFactory.json';
import { alertActions } from '../constants/alert';
import { getSettingDetail } from './setting-detail';

export const deactivateSetting = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: settingDeactivateActions.SETTING_DEACTIVATE_REQUEST });

    try {
      const loginUser = getState().user.data.wallet_address;
      const { isSuspend } = getState().settingDetail.data;

      const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_FACTORY_ADDRESS || "";
      const contract = getContractInstance(campaignFactoryABI, CONTRACT_FACTORY_ADDRESS);

      if (contract) {
          isSuspend ? await contract.methods.unpause().send({
            from: loginUser
          }): await contract.methods.pause().send({
            from: loginUser
          });

          dispatch({ type: settingDeactivateActions.SETTING_DEACTIVATE_SUCCESS });

          let message = 'Deactivate Campaign Factory Successful!';

          if (isSuspend) {
            message = 'Activate Campaign Factory Successful!';
          }

          dispatch({
            type: alertActions.SUCCESS_MESSAGE,
            payload: message,
          });

          dispatch(getSettingDetail());
      }

    } catch (error) {
      dispatch({
        type: settingDeactivateActions.SETTING_DEACTIVATE_FAIL,
        payload: error,
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: error.message,
      });
    }
  }
};
