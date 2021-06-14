import { ETH_CHAIN_ID } from '../../constants/network';
import { appNetworkActions } from '../constants/appNetwork';
import { AnyAction } from 'redux';

type AppNetworkState = {
  data: {
    appChainID: string | undefined;
    walletChainID: string | undefined;
    currentConnector: string | undefined;
  };
  loading: boolean;
  error: string;
};

type ConnectorState = {
  data: string | undefined;
  loading: boolean;
  error: string;
}

const initialState = {
  data: {
    appChainID: ETH_CHAIN_ID,
    walletChainID: undefined,
    currentConnector: undefined
  },
  loading: false,
  error: ''
};

const connectorInitialState = {
  data: undefined,
  loading: false,
  error: ''
}

export const appNetworkReducer = (state: AppNetworkState = initialState, action: AnyAction) => {
  switch (action.type) {
    case appNetworkActions.APP_NETWORKS_SETTING_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case appNetworkActions.APP_NETWORKS_SETTING_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case appNetworkActions.APP_NETWORKS_SETTING_ERROR: {
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

export const connectorReducer = (state: ConnectorState = connectorInitialState, action: AnyAction) => {
  switch (action.type) {
    case appNetworkActions.CONNECTOR_SETTING_LOADING: {
      return {
        ...state,
        loading: true
      }
    } 

    case appNetworkActions.CONNECTOR_SETTING_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case appNetworkActions.CONNECTOR_SETTING_ERROR: {
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
