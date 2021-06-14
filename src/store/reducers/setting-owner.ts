import { settingOwnerActions } from '../constants/setting-owner';
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

export const settingOwnerReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case settingOwnerActions.SETTING_OWNER_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case settingOwnerActions.SETTING_OWNER_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case settingOwnerActions.SETTING_OWNER_FAILURE: {
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