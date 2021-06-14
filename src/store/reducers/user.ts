import { userActions } from '../constants/user';
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

const userReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {
    case userActions.USER_PURGE: {
      return {
        ...state,
        error: ''
      }
    }

    case userActions.USER_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    } 

    case userActions.USER_LOGIN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: ''
      }
    }

    case userActions.USER_LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }

    case userActions.USER_LOGOUT: {
      return {
        ...state,
        data: '',
        loading: false,
        error: ''
      }
    }

    default: {
      return state;
    }
  }
};

export const investorReducer = (state: StateType = { data: '', loading: false, error: '' }, action: AnyAction) => {
  switch (action.type) {
    case userActions.USER_REGISTER_ERROR_CLEAR: {
      return {
        ...state,
        data: ''
      }
    }

    case userActions.INVESTOR_PURGE: {
      return {
        ...state,
        error: ''
      }
    }

    case userActions.INVESTOR_LOGIN_LOADING: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    } 

    case userActions.INVESTOR_LOGIN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case userActions.INVESTOR_LOGIN_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }

    case userActions.INVESTOR_LOGOUT: {
      return {
        ...state,
        data: '',
        loading: false,
        error: ''
      }
    }

    default: {
      return state;
    }
  }
};

export const userConnectReducer = (state: StateType = { data: '', loading: false, error: '' }, action: AnyAction) => {
  switch (action.type) {
    case userActions.USER_CONNECT_WALLET_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case userActions.USER_CONNECT_WALLET_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case userActions.USER_CONNECT_WALLET_FAILURE: {
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    }

    case userActions.USER_CONNECT_WALLET_LOCK: {
      return {
        data: '',
        loading: false,
        error: ''
      }
    }

    default: {
      return state;
    }
  }
}

export const investorRegisterReducer = (state = { data: undefined, loading: false, error: '' }, action: AnyAction) => {
  switch (action.type) {
    case userActions.INVESTOR_REGISTER_LOADING: {
      return {
        data: undefined,
        loading: true,
        error: ''
      }
    }

    case userActions.INVESTOR_REGISTER_SUCCESS: {
      return {
        loading: false,
        error: '',
        data: action.payload
      }
    }

    case userActions.INVESTOR_REGISTER_FAILURE: {
      return {
        loading: false,
        error: action.payload,
        data: undefined
      } 
    }

    default: {
      return state;
    }
  }
}


export const userRegisterReducer = (state = { data: undefined, loading: false, error: '' }, action: AnyAction) => {
  switch (action.type) {
    case userActions.USER_REGISTER_ERROR_CLEAR: {
      return {
        ...state,
        data: undefined
      }
    }

    case userActions.USER_REGISTER_LOADING: {
      return {
        data: undefined,
        loading: true,
        error: ''
      }
    }

    case userActions.USER_REGISTER_SUCCESS: {
      return {
        loading: false,
        error: '',
        data: action.payload
      }
    }

    case userActions.USER_REGISTER_FAILURE: {
      return {
        loading: false,
        error: action.payload,
        data: undefined
      } 
    }

    default: {
      return state;
    }
  }
}

export const userProfileReducer = (state = { data: undefined, loading: false, error: '' }, action: AnyAction) => {
  switch (action.type) {
    case userActions.USER_PROFILE_LOADING: {
      return {
        data: undefined,
        loading: true,
        error: ''
      }
    }

    case userActions.USER_PROFILE_SUCCESS: {
      return {
        loading: false,
        error: '',
        data: action.payload
      }
    }

    case userActions.USER_PROFILE_FAILURE: {
      return {
        loading: false,
        error: action.payload,
        data: undefined
      } 
    }

    default: {
      return state;
    }
  }
}

export const userProfileUpdateReducer = (state = { data: undefined, loading: false, error: '' }, action: AnyAction) => {
  switch (action.type) {
    case userActions.USER_PROFILE_UPDATE_CLEAR_ERROR: {
      return {
        ...state,
        error: ''
      }
    }

    case userActions.USER_PROFILE_UPDATE_LOADING: {
      return {
        ...state,
        loading: true,
        error: ''
      }
    }

    case userActions.USER_PROFILE_UPDATE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false,
      }
    }

    case userActions.USER_PROFILE_UPDATE_FAILURE: {
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
}

export default userReducer;
