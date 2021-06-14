import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';

import {buyTokenActions} from '../constants/buy-token';
import {convertToWei, getContractInstance} from '../../services/web3';
import TradeABI from '../../abi/Trade.json';
import ErcABI from '../../abi/Erc20.json';
import {alertActions} from '../constants/alert';
import {isReferral} from '../../utils/affiliateCampaign';
import _ from 'lodash';
import {getCampaignDetail} from './campaign';
import {convertAmountToUsdt} from '../../utils/usdt';
import {getBalance} from './balance';
import {MAX_BUY_CAMPAIGN, TRANSACTION_ERROR} from '../../constants';
import { BaseRequest } from '../../request/Request';
import {alertFailure} from "./alert";
import {logout} from "./user";
import campaignABI from "../../abi/Campaign.json";
import BigNumber from "bignumber.js";
import {apiRoute, getETHPrices} from "../../utils";


const verifyMaxCanBuy = async (
    campaignId: string,
    unit: string,
    amount: any,
    tokenConvert: any,
    getState: () => any,
    dispatch: ThunkDispatch<{}, {}, AnyAction>
  ) => {
  const campaignContract = getContractInstance(campaignABI, campaignId);
  if (campaignContract) {
    const loginUser = getState().investor.data.wallet_address;
    const campaignDetailStore = getState().campaignDetail.data;
    const {tokenAddress, tokenDecimals, erc20ConversionRate, ethRate} = campaignDetailStore;

    let claimableTokensPromise = campaignContract.methods.getClaimableTokens(loginUser).call();
    const campaignDetail = await Promise.all([
      claimableTokensPromise,
    ]);
    const claimableTokens = new BigNumber(campaignDetail[0]).dividedBy(Math.pow(10, tokenDecimals)).toFixed();


    let totalUsdtWillBuy = '0';

    let ethPrice: any = await getETHPrices();
    if (!ethPrice) {
      console.log('Get Price Frontend Fail');
      return true;
    }

    let convertRate = ethRate;
    let ethBought = new BigNumber(claimableTokens).dividedBy(convertRate);
    let totalEthAmount = new BigNumber(ethBought).plus(amount);
    totalUsdtWillBuy = new BigNumber(totalEthAmount).multipliedBy(ethPrice).toFixed();
    console.log('totalUsdtWillBuy', totalUsdtWillBuy);
    const remainUsdtBought = new BigNumber(MAX_BUY_CAMPAIGN).minus(totalUsdtWillBuy).toFixed();


    if (unit == 'eth') {


      const remainEthBought = new BigNumber(remainUsdtBought).dividedBy(ethPrice).toFixed(5);
      const message = 'You\'ve reached the maximum amount of tokens. You can only buy up to: ' + remainEthBought + ' ETH';

      const isOverBought = (new BigNumber(totalUsdtWillBuy).abs()).gt(MAX_BUY_CAMPAIGN);

      console.log('isOverBought', isOverBought);

      if (isOverBought) {
        dispatch(alertFailure(message));
        return false;
      } else {
        console.log(message);
        return true;
      }

    } else {

      const oldEthUsdtBought = new BigNumber(ethBought).multipliedBy(ethPrice).toFixed();
      const usdtBuySuccessed = new BigNumber(claimableTokens).dividedBy(erc20ConversionRate).toFixed();
      totalUsdtWillBuy = new BigNumber(amount).plus(usdtBuySuccessed).plus(oldEthUsdtBought).toFixed();
      console.log('totalUsdtWillBuy', totalUsdtWillBuy);

      const remainUsdtBought = new BigNumber(MAX_BUY_CAMPAIGN).minus(usdtBuySuccessed).toFixed();
      const message = 'You\'ve reached the maximum amount of tokens. You can only buy up to: ' + remainUsdtBought + ' USDT';
      const isOverBought = (new BigNumber(totalUsdtWillBuy)).gt(MAX_BUY_CAMPAIGN);
      if (isOverBought) {
        dispatch(alertFailure(message));
        return false;
      } else {
        console.log(message);
        return true;
      }
    }
  }

  return false;
};

export const buyToken = (amount: any, tokenConvert: any, campaignId: string, unit = 'eth', referral: string, campaignIndex: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: buyTokenActions.BUY_TOKEN_LOADING });

      // const isValid = await verifyMaxCanBuy(campaignId, unit, amount, tokenConvert, getState, dispatch);
      // if (!isValid) {
      //   dispatch({ type: buyTokenActions.BUY_TOKEN_FAILURE });
      //   return false;
      // }

      const loginUser = getState().investor.data.wallet_address;
      const campaignDetail = getState().campaignDetail.data;
      const ethLinkOfCampaignDetail = _.get(campaignDetail, 'ethLink', '');
      const tokenAddressOfCampaignDetail = _.get(campaignDetail, 'tokenAddress', '');
      const contract = getContractInstance(TradeABI, campaignId);
      const amountConvert = convertToWei(amount);

      if (contract) {
        if (unit === 'eth') {
          let buyResult;
          if (referral) {
            const hasReferral = await isReferral(ethLinkOfCampaignDetail, tokenAddressOfCampaignDetail, campaignId);
            if (hasReferral) {
              buyResult = await contract.methods.buyTokenByEtherWithEthLink(loginUser, referral, campaignIndex).send({
                from: loginUser,
                value: amountConvert,
              });
            } else {
              buyResult = await contract.methods.buyTokenByEther(loginUser).send({
                from: loginUser,
                value: amountConvert,
              });
            }
          } else {
            buyResult = await contract.methods.buyTokenByEther(loginUser).send({
              from: loginUser,
              value: amountConvert,
            });
          }

          if (buyResult) {
            dispatch({
              type: buyTokenActions.BUY_TOKEN_SUCCESS,
            });

            dispatch({
              type: alertActions.SUCCESS_MESSAGE,
              payload: 'Buy Token Successful!',
            });

            dispatch(getCampaignDetail(campaignId, true));
            dispatch(getBalance(loginUser));

            console.log('buyResult with ETH: ', buyResult)
            const baseRequest = new BaseRequest();
            const res = await baseRequest.post(apiRoute(apiRoute(`/transaction-create`)), {
              campaign_hash: campaignId,
              transaction_hash: buyResult.transactionHash,
              eth: amount,
              usdt: 0,
              user_address: loginUser,
              amount: tokenConvert,
              token: null,
            }, true)
              .then(res => res.json())
              .then(res => {
                if (res.status === 200) {
                  console.log('Res /transaction-create', res);
                  return res;
                } else {
                  dispatch(alertFailure(res.message));
                  return null;
                }
              })
              .catch((err) => console.log(err));
          }

        } else {
          const USDT_TOKEN = process.env.REACT_APP_SMART_CONTRACT_USDT_ADDRESS as string;
           const ercContract = getContractInstance(ErcABI, USDT_TOKEN);
           if (ercContract) {
             const decimals  = await ercContract.methods.decimals().call();
             const usdtAmountConvert = convertAmountToUsdt(decimals, amount).toNumber();
             let buyResult;
             if (referral) {
               const hasReferral = await isReferral(ethLinkOfCampaignDetail, tokenAddressOfCampaignDetail, campaignId);
               if (hasReferral) {
                 buyResult = await contract.methods.buyTokenByTokenWithEthLink(
                   loginUser,
                   USDT_TOKEN,
                   referral,
                   campaignIndex,
                   usdtAmountConvert,
                 ).send({
                   from: loginUser,
                 });
               } else {
                 buyResult = await contract.methods.buyTokenByToken(
                   loginUser,
                   USDT_TOKEN,
                   usdtAmountConvert,
                 ).send({
                   from: loginUser,
                 });
               }
             } else {
               buyResult = await contract.methods.buyTokenByToken(
                 loginUser,
                 USDT_TOKEN,
                 usdtAmountConvert,
               ).send({
                 from: loginUser,
               });
             }

             if (buyResult) {
               dispatch({
                 type: buyTokenActions.BUY_TOKEN_SUCCESS,
               });

               dispatch({
                 type: alertActions.SUCCESS_MESSAGE,
                 payload: 'Buy Token Successful!',
               });

               dispatch(getCampaignDetail(campaignId, true));
               dispatch(getBalance(loginUser));

               console.log('buyResult with USDT', buyResult);
               const tokenAddress = buyResult?.events?.TokenPurchaseByToken?.returnValues?.token;
               const baseRequest = new BaseRequest();
               const res = await baseRequest.post(apiRoute(`/transaction-create`), {
                 campaign_hash: campaignId,
                 transaction_hash: buyResult.transactionHash,
                 eth: 0,
                 usdt: amount,
                 user_address: loginUser,
                 amount: tokenConvert,
                 token: tokenAddress,
               }, true)
                 .then(res => res.json())
                 .then(res => {
                   if (res.status === 200) {
                     console.log('Res /transaction-create', res);
                     return res;
                   } else {
                     dispatch(alertFailure(res.message));
                     return null;
                   }
                 })
                 .catch((err) => console.log(err));

             }
           }
        }
      }

    } catch (error) {
      console.log('ERROR', error);
      dispatch({
        type: buyTokenActions.BUY_TOKEN_FAILURE,
        payload: error.message,
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: TRANSACTION_ERROR,
      });
    }
  }
};

export const isCampaignPurchasable = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        type: buyTokenActions.BUY_TOKEN_AVAILABLE_LOADING
      })
      const baseRequest = new BaseRequest();
      const response = await baseRequest.post(apiRoute('/jwt/verify'), {}, true) as any;
      const resObj = await response.json();

      if (resObj?.status === 200 && resObj?.data) {
        if (resObj?.data?.msgCode === 'TOKEN_IS_VALID') {
          dispatch({
            type: buyTokenActions.BUY_TOKEN_AVAILABLE_SUCCESS,
            payload: true
          })
        } else {
          dispatch({
            type: buyTokenActions.BUY_TOKEN_AVAILABLE_SUCCESS,
            payload: false
          })
        }
      } else {
        if (resObj?.status === 401) {
          // dispatch(alertFailure(resObj.message || 'Sorry, the token expired.'));
          console.log('Sorry, the token expired.');
          dispatch(logout(true));
        } else {
          dispatch({
            type: buyTokenActions.BUY_TOKEN_AVAILABLE_SUCCESS,
            payload: false
          });
        }
      }
    } catch (err) {
      dispatch({
        type: buyTokenActions.BUY_TOKEN_AVAILABLE_FAILURE,
        payload: err.message,
      });
    }
  }
}
