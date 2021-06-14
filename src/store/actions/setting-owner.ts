import { settingOwnerActions} from '../constants/setting-owner';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import campaignFactoryABI from '../../abi/CampaignFactory.json';
import { alertActions } from '../constants/alert';
import { getSettingDetail } from './setting-detail';

export const setOwner = (owner: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: settingOwnerActions.SETTING_OWNER_LOADING });

    try {
      const loginUser = getState().user.data.wallet_address;
      const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_FACTORY_ADDRESS || "";
      const contract = getContractInstance(campaignFactoryABI, CONTRACT_FACTORY_ADDRESS);
      if (contract) {
        const result = await contract.methods.transferOwnership(owner).send({
          from: loginUser
        });

        if (result) {
          dispatch({
            type: settingOwnerActions.SETTING_OWNER_SUCCESS,
            payload: owner,
          });

          dispatch({
            type: alertActions.SUCCESS_MESSAGE,
            payload: 'Setting Owner Successful!',
          });

          dispatch(getSettingDetail());
        }
      }

    } catch (error) {
      dispatch({
        type: settingOwnerActions.SETTING_OWNER_FAILURE,
        payload: error,
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: error.message,
      });
    }
  }
};
