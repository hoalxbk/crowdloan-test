import { usdtApproveActions } from '../constants/usdt-approve';
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

export const usdtApproveReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case usdtApproveActions.USDT_APPROVE_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case usdtApproveActions.USDT_APPROVE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case usdtApproveActions.USDT_APPROVE_FAILURE: {
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
