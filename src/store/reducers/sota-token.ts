import { sotaTokenActions } from '../constants/sota-token';
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

export const getAllowanceReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case sotaTokenActions.ALLOWANCE_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case sotaTokenActions.ALLOWANCE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case sotaTokenActions.ALLOWANCE_FAILURE: {
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

export const approveReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case sotaTokenActions.APPROVE_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case sotaTokenActions.APPROVE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case sotaTokenActions.APPROVE_FAILURE: {
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
