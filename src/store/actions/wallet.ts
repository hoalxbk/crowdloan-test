import { walletActions } from '../constants/wallet';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

export const connectWalletSuccess = (entity: string, addresses: string[], balances: {[key: string]: string}) => {
  return {
    type: walletActions.WALLET_CONNECT_SUCCESS,
    payload: {
      entity,
      addresses,
      balances
    }
  }
};

export const updateWalletBalance = (entity: string, addresses: string[], balances: {[key: string]: string}) => {
  return {
    type: walletActions.WALLET_UPDATE_BALANCE,
    payload: {
      entity,
      addresses,
      balances
    }
  }
};

export const disconnectWallet = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({
      type: walletActions.WALLET_DISCONNECT_SUCCESS
    })
  }
}

export const disconnectWalletLayer2 = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({
      type: walletActions.WALLET_CONNECT_SUCCESS_WITHOUT_LAYER2
    })
  }
}
