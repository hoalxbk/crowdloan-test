
import { settingDeactivateActions } from '../constants/setting-deactivate';
import { AnyAction } from 'redux';

type StateType = {
  loading: boolean;
  error: string;
};

const initialState = {
  loading: false,
  error: ''
};

export const settingDeactivateReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case settingDeactivateActions.SETTING_DEACTIVATE_REQUEST: {
      return {
        error: "",
        loading: true
      }
    } 

    case settingDeactivateActions.SETTING_DEACTIVATE_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }

    case settingDeactivateActions.SETTING_DEACTIVATE_FAIL: {
      return {
        error: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};
