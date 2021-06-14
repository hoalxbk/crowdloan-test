import { settingFeeRateActions } from '../constants/setting-fee-rate';
import { AnyAction } from 'redux';

type StateType = {
  data: string;
  loading: boolean;
  error: string;
};

const initialState = {
  data: '',
  loading: false,
  error: ''
};

export const settingFeeRateReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case settingFeeRateActions.SETTING_FEE_RATE_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case settingFeeRateActions.SETTING_FEE_RATE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case settingFeeRateActions.SETTING_FEE_RATE_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};