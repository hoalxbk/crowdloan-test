import { ConnectorNames } from '../../constants/connectors';
import { appNetworkActions } from '../constants/appNetwork';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export enum NetworkUpdateType {
  Wallet = "Wallet",
  App = "App",
  Connector = "Connector"
} 

export const settingAppNetwork = (networkType: string, updatedVal: string | undefined) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({ type: appNetworkActions.APP_NETWORKS_SETTING_LOADING });

    try {
      const { appChainID, walletChainID } = getState().appNetwork.data;

      if (networkType in NetworkUpdateType) {
        const updatedNetworkData = {
          appChainID: networkType === NetworkUpdateType.App ? updatedVal: appChainID,
          walletChainID: networkType === NetworkUpdateType.Wallet ? updatedVal: walletChainID,
        }

        dispatch({
          type: appNetworkActions.APP_NETWORKS_SETTING_SUCCESS,
          payload: updatedNetworkData
        })
      } else {
        throw new Error("Wrong update network type!");
      }

    } catch (error) {
      dispatch({
        type: appNetworkActions.APP_NETWORKS_SETTING_ERROR,
        payload: error
      });
    }
  }
};

export const settingCurrentConnector = (connectorName: string | undefined) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({ 
        type: appNetworkActions.CONNECTOR_SETTING_SUCCESS,
        payload: connectorName 
      })
    } catch (error) {
      dispatch({
        type: appNetworkActions.CONNECTOR_SETTING_ERROR,
        payload: error
      });
    }
  }
};
