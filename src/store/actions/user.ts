import {alertFailure, alertSuccess} from '../../store/actions/alert';
import { ConnectorNames, connectorNames } from '../../constants/connectors';
import { userActions } from '../constants/user';
import { walletActions } from '../constants/wallet';
import { alertActions } from '../constants/alert';
import { BaseRequest } from '../../request/Request';
import { getWeb3Instance } from '../../services/web3';
import { AnyAction, Dispatch } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Web3Provider } from '@ethersproject/providers'
import { ethers } from 'ethers';

type UserRegisterProps = {
  email: string;
  address: string;
  library: Web3Provider;
}

type UserProfileProps = {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  avatar: string;
}

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || "";

const getMessageParams = () => {
  const msgSignature = MESSAGE_INVESTOR_SIGNATURE;

  return [{
    type: 'string',      // Any valid solidity type
    name: 'Message',     // Any string label you want
    value: msgSignature // The value to sign
  }]
}

export const getParamsWithConnector = (connectedAccount: string) => ({
  [ConnectorNames.BSC]: {
    method: 'eth_sign',
    params: [connectedAccount, MESSAGE_INVESTOR_SIGNATURE]
  },
  [ConnectorNames.WalletConnect]: {
    method: 'eth_sign',
    params: [connectedAccount, MESSAGE_INVESTOR_SIGNATURE]
  },
  [ConnectorNames.WalletLinkConnect]: {
    method: 'eth_sign',
    params: [connectedAccount, MESSAGE_INVESTOR_SIGNATURE]
  },
  [ConnectorNames.Fortmatic]: {
    method: 'eth_signTypedData',
    params: [getMessageParams(), connectedAccount]
  },
  [ConnectorNames.MetaMask]: {
    method: 'eth_signTypedData',
    params: [getMessageParams(), connectedAccount]
  },
})

const dispatchErrorWithMsg = (dispatch: Dispatch, action: string, msg: string) => {
  dispatch({
    type: action,
    payload: msg
  })
}

const getCurrentAccount = async () => {
  const web3Instance = getWeb3Instance();
  const accounts = await web3Instance?.eth.getAccounts();

  if (accounts && accounts.length !== 0) {
    return accounts[0];
  }

  return undefined;
}

export const logout = (isInvestor: boolean = false) => {
  isInvestor ? localStorage.removeItem("investor_access_token"): localStorage.removeItem("access_token");

  return {
    type: !isInvestor ? userActions.USER_LOGOUT: userActions.INVESTOR_LOGOUT
  }
}

export const resetUserState = (isInvestor: boolean = false) => {
  return {
    type: !isInvestor ? userActions.USER_PURGE: userActions.INVESTOR_PURGE
  }
}

export const clearUserProfileUpdate = () => {
  return {
    type: userActions.USER_PROFILE_UPDATE_CLEAR_ERROR
  }
}

export const login = (connectedAccount: string, library: Web3Provider) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({
        type: userActions.INVESTOR_LOGIN_LOADING
      });

      const baseRequest = new BaseRequest();
      const connector = getState().connector.data;
      const paramsWithConnector = getParamsWithConnector(connectedAccount)[connector as connectorNames];

      if (connectedAccount && library && paramsWithConnector) {
        const provider = library.provider;
        if (connector !== ConnectorNames.WalletConnect) {
          const res = await (provider as any).sendAsync({
              method: paramsWithConnector.method,
              params: paramsWithConnector.params
          }, async function(err: Error, result: any) {
            if (err || result.error) {
               const errMsg = (err.message || (err as any).error) || result.error.message
               console.log('Error when signing message: ', errMsg);
                dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, errMsg);
            } else {
              console.log(result.result);
              const response = await baseRequest.post(`/user/login`, {
                signature: result.result,
                wallet_address: connectedAccount,
              }) as any;

              const resObj = await response.json();

              if (resObj.status && resObj.status === 200 && resObj.data) {
                const { token, user } = resObj.data;

                localStorage.setItem('investor_access_token', token.token);

                dispatch({ type: walletActions.WALLET_CONNECT_LAYER2_SUCCESS });

                dispatch({
                  type: userActions.INVESTOR_LOGIN_SUCCESS,
                  payload: user
                });

              }

              if (resObj.status && resObj.status !== 200) {
                if (resObj.status == 404) {
                  // redirect to register page
                  dispatch(alertFailure(resObj.message));
                  dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, '');
                } else {
                  // show error
                  console.log('RESPONSE Login: ', resObj);
                  dispatch(alertFailure(resObj.message));
                  dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, '');
                }
              }
            }
          });
        } else {
          var rawMessage = MESSAGE_INVESTOR_SIGNATURE;
          var rawMessageLength = new Blob([rawMessage]).size
          var message = ethers.utils.toUtf8Bytes("\x19Ethereum Signed Message:\n" + rawMessageLength + rawMessage)
          var messageHash = ethers.utils.keccak256(message)
          var params = [
            connectedAccount,
            messageHash
          ]
          await (library as any).provider.enable();

          var signature = await (library as any).provider.wc.signMessage(params);
          console.log(signature);
        }
      }
    } catch (error) {
      console.log('ERROR Login: ', error);
      dispatch(alertFailure(error.message));
      dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, '');
    }
  }
}

export const register = ({ email, address: connectedAccount, library }: UserRegisterProps) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    dispatch({
      type: userActions.INVESTOR_REGISTER_LOADING
    });
    try {
      const baseRequest = new BaseRequest();

      const connector = getState().connector.data;
      const paramsWithConnector = getParamsWithConnector(connectedAccount)[connector as connectorNames];

      if (connectedAccount && library && paramsWithConnector) {
        const provider = library.provider;
        provider && await (provider as any).sendAsync({
            method: paramsWithConnector.method,
            params: paramsWithConnector.params
        }, async function(err: Error, result: any) {
          if (err || result.error) {
             const errMsg = (err.message || (err as any).error) || result.error.message
              dispatchErrorWithMsg(dispatch, userActions.INVESTOR_REGISTER_FAILURE, errMsg);
              return;
          }

          const response = await baseRequest.post(`/user/register/`, {
            email,
            wallet_address: connectedAccount,
            signature: result.result,
          }) as any;

          const resObj = await response.json();

          if (resObj.status && resObj.status === 200) {

            if (resObj.data) {
              const { token, user } = resObj.data;

              localStorage.setItem('investor_access_token', token.token);

              dispatch({ type: walletActions.WALLET_CONNECT_LAYER2_SUCCESS });

              dispatch({
                type: alertActions.SUCCESS_MESSAGE,
                payload: 'Register Account Successful'
              });

              dispatch({
                type: userActions.INVESTOR_REGISTER_SUCCESS,
                payload: user
              });

              dispatch({
                type: userActions.INVESTOR_LOGIN_SUCCESS,
                payload: user
              });

            } else {
              dispatch({
                type: alertActions.SUCCESS_MESSAGE,
                payload: resObj.message
              });

              dispatch({
                type: userActions.INVESTOR_REGISTER_SUCCESS,
                payload: resObj.message
              });
            }

          }

          if (resObj.status && resObj.status !== 200) {
            console.log('RESPONSE Register: ', resObj);
            dispatch(alertFailure(resObj.message));
            dispatchErrorWithMsg(dispatch, userActions.INVESTOR_REGISTER_FAILURE, '');
          }
        });
      }
    } catch (error) {
      console.log('ERROR Register: ', error);
      dispatch(alertFailure(error.message));
      dispatchErrorWithMsg(dispatch, userActions.INVESTOR_REGISTER_FAILURE, '');
    }
  }
};

export const connectWallet = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: userActions.USER_CONNECT_WALLET_LOADING });
    try {
      const windowObj = window as any;
      const { ethereum } = windowObj;
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      const loginUser = accounts.length ? accounts[0] : '';

      if (loginUser) {
        dispatch({
          type: userActions.USER_CONNECT_WALLET_SUCCESS,
          payload: loginUser
        });
      } else {
        dispatch(logout());
      }
    } catch (error) {
      dispatch({
        type: userActions.USER_CONNECT_WALLET_FAILURE,
        payload: error
      });
    }
  }
}

export const getUserDetail = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: userActions.USER_PROFILE_LOADING });
    try {
      const baseRequest = new BaseRequest();

      const response = await baseRequest.get('/user/profile') as any;
      const resObj = await response.json();

      if (resObj.status && resObj.status === 200) {
        dispatch({
          type: userActions.USER_PROFILE_SUCCESS,
          payload: resObj.data.user
        })
      } else {
        dispatch({
          type: userActions.USER_PROFILE_FAILURE,
          payload: resObj.message
        })
      }
    } catch (error) {
      dispatch({
        type: userActions.USER_PROFILE_FAILURE,
        payload: error
      });
    }
  }
}

export const updateUserProfile = (updatedUser: UserProfileProps) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: userActions.USER_PROFILE_UPDATE_LOADING
      });

      const baseRequest = new BaseRequest();
      const ethAddress = await getCurrentAccount();

      if (ethAddress) {
        const windowObj = window as any;
        const { ethereum } = windowObj;
        const { avatar } = updatedUser;
       await ethereum.sendAsync({
            method: 'eth_signTypedData',
            params: [getMessageParams(), ethAddress],
            from: ethAddress,
        }, async function(err: Error, result: any) {
          if (err || result.error) {
             const errMsg = err.message || result.error.message
              dispatchErrorWithMsg(dispatch, userActions.USER_PROFILE_UPDATE_FAILURE, errMsg);
          } else {
            const response = await baseRequest.post(`/user/update-profile`, {
              avatar,
              signature: result.result
            }) as any;

            const resObj = await response.json();

            if (resObj.status && resObj.status === 200 && resObj.data) {
              const { user } = resObj.data;

              dispatch(alertSuccess('Update profile successful!'));

              dispatch({
                type: userActions.USER_LOGIN_SUCCESS,
                payload: user
              });

              dispatch({
                type: userActions.USER_PROFILE_UPDATE_SUCCESS,
                payload: user
              });
            }

            if (resObj.status && resObj.status !== 200) {
              dispatchErrorWithMsg(dispatch, userActions.USER_PROFILE_UPDATE_FAILURE, resObj.message);
            }
          }
        });
      }
    } catch (error) {
      dispatchErrorWithMsg(dispatch, userActions.USER_PROFILE_UPDATE_FAILURE, error.message);
    }
  }
}

export const joinPool = (connectedAccount: string, library: Web3Provider, poolId?: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      const baseRequest = new BaseRequest();
      const connector = getState().connector.data;
      const paramsWithConnector = getParamsWithConnector(connectedAccount)[connector as connectorNames];

      if (connectedAccount && library && paramsWithConnector) {
        const provider = library.provider;
        if (connector !== ConnectorNames.WalletConnect) {
          const res = await (provider as any).sendAsync({
              method: paramsWithConnector.method,
              params: paramsWithConnector.params
          }, async function(err: Error, result: any) {
            if (err || result.error) {
               const errMsg = (err.message || (err as any).error) || result.error.message
               console.log('Error when signing message: ', errMsg);
                dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, errMsg);
            } else {
              console.log(result.result);
              const response = await baseRequest.post(`/user/login`, {
                signature: result.result,
                wallet_address: connectedAccount,
              }) as any;

              const resObj = await response.json();

              if (resObj.status && resObj.status === 200 && resObj.data) {
                const { token, user } = resObj.data;

                localStorage.setItem('investor_access_token', token.token);

                dispatch({ type: walletActions.WALLET_CONNECT_LAYER2_SUCCESS });

                dispatch({
                  type: userActions.INVESTOR_LOGIN_SUCCESS,
                  payload: user
                });

              }

              if (resObj.status && resObj.status !== 200) {
                if (resObj.status == 404) {
                  // redirect to register page
                  dispatch(alertFailure(resObj.message));
                  dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, '');
                } else {
                  // show error
                  console.log('RESPONSE Login: ', resObj);
                  dispatch(alertFailure(resObj.message));
                  dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, '');
                }
              }
            }
          });
        } else {
          var rawMessage = MESSAGE_INVESTOR_SIGNATURE;
          var rawMessageLength = new Blob([rawMessage]).size
          var message = ethers.utils.toUtf8Bytes("\x19Ethereum Signed Message:\n" + rawMessageLength + rawMessage)
          var messageHash = ethers.utils.keccak256(message)
          var params = [
            connectedAccount,
            messageHash
          ]
          await (library as any).provider.enable();

          var signature = await (library as any).provider.wc.signMessage(params);
          console.log(signature);
        }
      }
    } catch (error) {
      console.log('ERROR Login: ', error);
      dispatch(alertFailure(error.message));
      dispatchErrorWithMsg(dispatch, userActions.INVESTOR_LOGIN_FAILURE, '');
    }
  }
}
