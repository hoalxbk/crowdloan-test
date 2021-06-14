import { usdtAllowanceActions } from '../constants/usdt-allowance';
import { AnyAction } from 'redux';

type StateType = {
  data: boolean;
  loading: boolean;
  error: string;
};

const initialState = {
  data: false,
  loading: false,
  error: ''
};

export const usdtAllowanceReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case usdtAllowanceActions.USDT_ALLOWANCE_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case usdtAllowanceActions.USDT_ALLOWANCE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case usdtAllowanceActions.USDT_ALLOWANCE_FAILURE: {
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
