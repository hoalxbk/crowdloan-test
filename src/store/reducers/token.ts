import { tokenActions } from '../constants/token'
import { AnyAction } from 'redux'

const initialState = {
  data: [],
  loading: false,
  failure: ""
}

export const getTokensReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case tokenActions.TOKENS_BY_USER_REQUEST: {
      return {
        data: [],
        loading: true,
        failure: ""
      }
    }

    case tokenActions.TOKENS_BY_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    }

    case tokenActions.TOKENS_BY_USER_FAIL: {
      return {
        ...state,
        loading: false,
        failure: action.payload
      }
    }
    
    default: {
      return state;
    }
  }
};

export const createTokenReducer = (state = { loading: false, failure: "" }, action: AnyAction) => {
  switch (action.type) {
    case tokenActions.TOKENS_CREATE_BY_USER_REQUEST: {
      return {
        loading: true,
        failure: ""
      }
    }

    case tokenActions.TOKENS_CREATE_BY_USER_SUCCESS: {
      return {
        loading: false,
        failure: ""
      }
    }

    case tokenActions.TOKENS_CREATE_BY_USER_FAIL: {
      return {
        loading: false,
        failure: action.payload 
      }
    }
    
    default: {
      return state;
    }
  }
};
