import {ThunkDispatch} from 'redux-thunk';
import {AnyAction} from 'redux';
import {claimTokenActions} from '../constants/claim-token';
import {convertToWei, getContractInstance} from '../../services/web3';
import TradeABI from '../../abi/Trade.json';
import ErcABI from '../../abi/Erc20.json';
import campaignABI from '../../abi/Campaign.json';
import {alertActions} from '../constants/alert';
import _ from 'lodash';
import {getCampaignDetail} from './campaign';
import {getBalance} from './balance';
import {TRANSACTION_ERROR} from '../../constants';


export const claimToken = (campaignId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: claimTokenActions.CLAIM_TOKEN_LOADING });
      const loginUser = getState().investor.data.wallet_address;
      const contract = getContractInstance(TradeABI, campaignId);

      if (contract) {
          let claimResult;

          claimResult = await contract.methods.claimToken().send({
            from: loginUser,
            });

          if (claimResult) {
            dispatch({
              type: claimTokenActions.CLAIM_TOKEN_SUCCESS,
            });

            dispatch({
              type: alertActions.SUCCESS_MESSAGE,
              payload: 'Claim Token Successful!',
            });

            const isInvestor = true;
            dispatch(getCampaignDetail(campaignId, isInvestor));
            dispatch(getBalance(loginUser));
          }
      }
    } catch (error) {
      console.log('ERROR', error);
      dispatch({
        type: claimTokenActions.CLAIM_TOKEN_FAILURE,
        payload: error.message,
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: TRANSACTION_ERROR,
      });
    }
  }
};

export const claimStakedTokens = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
     try {
       dispatch({ type: claimTokenActions.CLAIM_TOKEN_STAKED_LOADING });
      const { campaignDetail, investor } = getState();

      const { wallet_address: loginInvestor } = investor.data;
      const { transactionHash } = campaignDetail.data;

      const campaignContract = getContractInstance(campaignABI, transactionHash);

      if (campaignContract) {
        await campaignContract.methods.claimTokens().send({
          from: loginInvestor
        });

        dispatch({
          type: claimTokenActions.CLAIM_TOKEN_STAKED_SUCCESS
        });

        dispatch({
          type: alertActions.SUCCESS_MESSAGE,
          payload: 'Claim Token Successful!',
        });

        const isInvestor = true;
        dispatch(getCampaignDetail(transactionHash, isInvestor));
        dispatch(getBalance(loginInvestor));
      }
     } catch (err) {
      console.log('ERROR', err);
      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: TRANSACTION_ERROR,
      });
      dispatch({
        type: claimTokenActions.CLAIM_TOKEN_STAKED_FAILURE,
        payload: err.message,
      });
     }
  }
}

// export const isCampaignPurchasable = () => {
//   return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
//     try {
//       dispatch({
//         type: buyTokenActions.BUY_TOKEN_AVAILABLE_LOADING
//       })

//       const baseRequest = new BaseRequest();

//       const response = await baseRequest.post('/user/jwt/verify', {}, true) as any;
//       const resObj = await response.json();

//       if (resObj?.status === 200) {
//         dispatch({
//           type: buyTokenActions.BUY_TOKEN_AVAILABLE_SUCCESS,
//           payload: true
//         })
//       } else {
//         dispatch({
//           type: buyTokenActions.BUY_TOKEN_AVAILABLE_SUCCESS,
//           payload: false
//         });
//       }
//     } catch (err) {
//       dispatch({
//         type: buyTokenActions.BUY_TOKEN_AVAILABLE_FAILURE,
//         payload: err.message,
//       });
//     }
//   }
// }
