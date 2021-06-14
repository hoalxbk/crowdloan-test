import { usdtDetailActions } from '../constants/usdt-detail';
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

export const usdtDetailReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case usdtDetailActions.USDT_DETAIL_LOADING: {
      return {
        ...state,
        loading: true
      }
    }

    case usdtDetailActions.USDT_DETAIL_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case usdtDetailActions.USDT_DETAIL_FAILURE: {
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
