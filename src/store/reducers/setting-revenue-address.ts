import { settingRevenueAddressActions } from '../constants/setting-revenue-address';
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

export const settingRevenueAddressReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case settingRevenueAddressActions.SETTING_REVENUE_ADDRESS_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case settingRevenueAddressActions.SETTING_REVENUE_ADDRESS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case settingRevenueAddressActions.SETTING_REVENUE_ADDRESS_FAILURE: {
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