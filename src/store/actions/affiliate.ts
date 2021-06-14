import { ThunkDispatch } from 'redux-thunk'
import { AnyAction } from 'redux'

import { affiliateActions } from '../constants/affiliate';
import { getContractInstance } from '../../services/web3'
import { alertActions } from '../constants/alert'
import ethLinkABI from '../../abi/Ethlink.json';
import { BaseRequest } from '../../request/Request'

const ETH_LINK_DEFAULT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_ETHLINK_ADDRESS || "";


export const getAffiliateByCampaign = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    const baseRequest = new BaseRequest();
    const ethLinkContract = getContractInstance(ethLinkABI, ETH_LINK_DEFAULT_ADDRESS);

    try {
      dispatch({ type: affiliateActions.AFFILIATE_BY_CAMPAIGN_REQUEST });

      const { campaignDetail } = getState();
      const loginUser = getState().user.data.wallet_address;

      if (campaignDetail.data) {
        const { tokenAddress } = campaignDetail.data;

        const response = await baseRequest.get(`/affiliate-campaign/${tokenAddress}`) as any;
        const resObject = await response.json();
  
        const affiliateCampaigns = resObject.data;

        if (resObject.status === 200) {
          if (ethLinkContract && tokenAddress && affiliateCampaigns.length > 0) {
            for (let i = 0; i < affiliateCampaigns.length; i++) {
              const affiliateLink = await ethLinkContract.methods.getAffiliateLink(tokenAddress, affiliateCampaigns[i].campaign_index, loginUser).call();
              affiliateCampaigns[i] = { ...affiliateCampaigns[i], linkGenerated: affiliateLink.affiliateId !== "0"};
            }
          }

          dispatch({ 
              type: affiliateActions.AFFILIATE_BY_CAMPAIGN_SUCCESS,
              payload: affiliateCampaigns 
            });
          }

      }
    } catch (err) {
      dispatch({
        type: affiliateActions.AFFILIATE_BY_CAMPAIGN_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}

export const generateAffiliateLink = (campaign_index: any) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    try {
      dispatch({ type: affiliateActions.AFFILIATE_LINK_GENERATE_REQUEST });

      const { campaignDetail, user } = getState();
      const { tokenAddress } = campaignDetail.data;

      const ethLinkContract = getContractInstance(ethLinkABI, ETH_LINK_DEFAULT_ADDRESS);

      if (ethLinkContract) {
        await ethLinkContract.methods.generateAffiliateLink(tokenAddress, campaign_index, "0x0000000000000000000000000000000000000000").send({
          from: user.data.wallet_address
        });

        dispatch({
          type: alertActions.SUCCESS_MESSAGE,
          payload: 'Generate Affiliate Link Successful'
        })

        dispatch({ type: affiliateActions.AFFILIATE_LINK_GENERATE_SUCCESS });

        dispatch(getAffiliateByCampaign());
      }

    } catch (err) {
      dispatch({
        type: affiliateActions.AFFILIATE_LINK_GENERATE_FAIL,
        payload: err.message
      });

      dispatch({
        type: alertActions.ERROR_MESSAGE,
        payload: err.message
      });
    }
  }
}
