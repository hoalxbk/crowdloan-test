import { settingRevenueAddressActions } from '../constants/setting-revenue-address';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import campaignFactoryABI from '../../abi/CampaignFactory.json';
import { alertActions } from '../constants/alert';
import { getSettingDetail } from './setting-detail';

export const setRevenueAddress = (revenueAddress: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: settingRevenueAddressActions.SETTING_REVENUE_ADDRESS_LOADING });

    try {
      const loginUser = getState().user.data.wallet_address;
      const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_FACTORY_ADDRESS || "";
      const contract = getContractInstance(campaignFactoryABI, CONTRACT_FACTORY_ADDRESS);
      if (contract) {
        const result = await contract.methods.setPlatformRevenueAddress(revenueAddress).send({
          from: loginUser
        });

        if (result) {
          dispatch({
            type: settingRevenueAddressActions.SETTING_REVENUE_ADDRESS_SUCCESS,
            payload: revenueAddress,
          });

          dispatch({
            type: alertActions.SUCCESS_MESSAGE,
            payload: 'Setting Revenue Address Successful!',
          });

          dispatch(getSettingDetail());
        }
      }

    } catch (error) {
      dispatch({
        type: settingRevenueAddressActions.SETTING_REVENUE_ADDRESS_FAILURE,
        payload: error,
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: error.message,
      });
    }
  }
};
