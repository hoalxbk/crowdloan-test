import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import BigNumber from 'bignumber.js';

import { tokenActions } from '../constants/token'
import { alertActions } from '../constants/alert'
import { BaseRequest } from '../../request/Request'
import erc20ABI from '../../abi/Erc20.json';
import { getContractInstance, getETHBalance } from '../../services/web3'

export const getTokensByUser = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    const baseRequest = new BaseRequest();
    const loginUser = getState().user.data.wallet_address;

    if (loginUser){
      try {
        dispatch({ type: tokenActions.TOKENS_BY_USER_REQUEST });

        const response = await baseRequest.get(`/asset-tokens/${loginUser}`) as any;
        const resObject = await response.json();

        if (resObject.status === 200) {
          let { data: tokensDetail } = resObject;

          for (let i = 0; i < tokensDetail.length; i++) {
            const { token_address, wallet_address } = tokensDetail[i];

            const erc20Contract = getContractInstance(erc20ABI, token_address);

            const balance = await erc20Contract?.methods.balanceOf(wallet_address).call();

            tokensDetail[i] = {
              ...tokensDetail[i],
              balance: new BigNumber(Number(balance)).dividedBy(Math.pow(10, 18)).toFixed()
            };
          }

          const ethBalance = await getETHBalance(loginUser);

          tokensDetail = [{
            balance: new BigNumber(ethBalance).toFixed(),
            symbol_name: "ETH",
            id: tokensDetail[tokensDetail.length - 1] + 1
          }, ...tokensDetail];

          dispatch({
            type: tokenActions.TOKENS_BY_USER_SUCCESS,
            payload: tokensDetail
          })
        }   
      } catch (err) {
        dispatch({
          type: tokenActions.TOKENS_BY_USER_FAIL,
          payload: err.message
        });
      }
    }
  }
};

export const addTokenByUser = (tokenCreate: { tokenSymbol: string, tokenAddress: string, walletAddress: string }) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    const baseRequest = new BaseRequest();

    try {
      dispatch({ type: tokenActions.TOKENS_CREATE_BY_USER_REQUEST });

      const { tokenSymbol, tokenAddress, walletAddress } = tokenCreate;

      const response = await baseRequest.post(`/asset-tokens`, {
        symbol_name: tokenSymbol,
        token: tokenAddress,
        wallet_address: walletAddress
      }) as any;

      const resObject = await response.json();

      if (resObject.status === 200) {
        dispatch({ type: tokenActions.TOKENS_CREATE_BY_USER_SUCCESS });

        dispatch({
          type: alertActions.SUCCESS_MESSAGE,
          payload: 'Add Token Successful!'
        });

        dispatch(getTokensByUser());
      } else if (resObject.status === 400) {
        throw new Error(resObject.message);
      }  
    } catch (err) {
       dispatch({
         type: alertActions.ERROR_MESSAGE,
         payload: err.message
       });

        dispatch({
          type: tokenActions.TOKENS_CREATE_BY_USER_FAIL,
          payload: err.message
        })
      }
    }
};
