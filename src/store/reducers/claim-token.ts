import { claimTokenActions } from '../constants/claim-token';
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

export const claimTokenReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case claimTokenActions.CLAIM_TOKEN_LOADING: {
      return {
        ...state,
        loading: true,
        error: '',
      }
    }

    case claimTokenActions.CLAIM_TOKEN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: '',
      }
    }

    case claimTokenActions.CLAIM_TOKEN_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    default: {
      return state;
    }
  }
};

export const stakedTokensClaimReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {

    case claimTokenActions.CLAIM_TOKEN_STAKED_LOADING: {
      return {
        ...state,
        loading: true,
        error: '',
      }
    }

    case claimTokenActions.CLAIM_TOKEN_STAKED_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: '',
      }
    }

    case claimTokenActions.CLAIM_TOKEN_STAKED_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    default: {
      return state;
    }
  }
};

export const claimTokenClaimableReducer = (state = { data: false, loading: false, error: '' }, action: AnyAction) => {
  switch (action.type) {

    case claimTokenActions.CLAIM_TOKEN_AVAILABLE_LOADING: {
      return {
        data: false,
        loading: true,
        error: '',
      }
    }

    case claimTokenActions.CLAIM_TOKEN_AVAILABLE_SUCCESS: {
      return {
        data: action.payload,
        loading: false,
        error: '',
      }
    }

    case claimTokenActions.CLAIM_TOKEN_AVAILABLE_FAILURE: {
      return {
        data: false,
        loading: false,
        error: action.payload,
      }
    }

    default: {
      return state;
    }
  }
};
