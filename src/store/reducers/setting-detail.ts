import { settingDetailActions } from '../constants/setting-detail';
import { AnyAction } from 'redux';

type StateType = {
  data: {};
  loading: boolean;
  error: string;
};

const initialState = {
  data: {},
  loading: false,
  error: ''
};

export const settingDetailReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case settingDetailActions.SETTING_DETAIL_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case settingDetailActions.SETTING_DETAIL_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case settingDetailActions.SETTING_DETAIL_FAILURE: {
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