import { balanceActions } from '../constants/balance';
import { AnyAction } from 'redux';

type StateType = {
  data: object;
  loading: boolean;
  error: string;
};

const initialState = {
  data: {},
  loading: false,
  error: ''
};

export const balanceReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case balanceActions.BALANCE_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case balanceActions.BALANCE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case balanceActions.BALANCE_FAILURE: {
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
