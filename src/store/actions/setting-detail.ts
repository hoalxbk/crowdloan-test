import { settingDetailActions } from '../constants/setting-detail';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import campaignFactoryABI from '../../abi/CampaignFactory.json';
import _ from 'lodash';

export const getSettingDetail = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: settingDetailActions.SETTING_DETAIL_LOADING });

    try {
      const CONTRACT_FACTORY_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_FACTORY_ADDRESS || "";
      const contract = getContractInstance(campaignFactoryABI, CONTRACT_FACTORY_ADDRESS);
      if (contract) {
        const feeRate = contract.methods.getPlatformFeeRate().call();
        const revenueAddress = contract.methods.getplatformRevenueAddress().call();
        const owner = contract.methods.owner().call();
        const isPaused = contract.methods.paused().call();
        const settingDetail = await Promise.all([feeRate, revenueAddress, owner, isPaused]);

        dispatch({
          type: settingDetailActions.SETTING_DETAIL_SUCCESS,
          payload: {
            feeRate: _.get(settingDetail, '[0]', ''),
            revenueAddress: _.get(settingDetail, '[1]', ''),
            owner: _.get(settingDetail, '[2]', ''),
            isSuspend: _.get(settingDetail, '[3]', ''),
          },
        });
      }

    } catch (error) {
      console.log('[ERROR] - ', error);
      dispatch({
        type: settingDetailActions.SETTING_DETAIL_FAILURE,
        payload: error
      });
    }
  }
};
