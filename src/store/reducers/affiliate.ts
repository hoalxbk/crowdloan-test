import { affiliateActions } from '../constants/affiliate'
import { AnyAction } from 'redux'

const initialState = {
  data: [],
  loading: false,
  failure: ""
}

export const affiliateCampaignReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case affiliateActions.AFFILIATE_BY_CAMPAIGN_REQUEST: {
      return {
        data: [],
        loading: true,
        failure: ""
      }
    }

    case affiliateActions.AFFILIATE_BY_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload,
      }
    }

    case affiliateActions.AFFILIATE_BY_CAMPAIGN_FAIL: {
      return {
        ...state,
        loading: false,
        failure: action.payload
      }
    }
    
    default: {
      return state;
    }
  }
}

export const affiliateLinkGenerateReducer = (state = { loading: false, failure: "", data: null }, action: AnyAction) => {
  switch (action.type) {
    case affiliateActions.AFFILIATE_LINK_GENERATE_REQUEST: {
      return {
        data: null,
        loading: true,
        failure: ""
      }
    }

    case affiliateActions.AFFILIATE_LINK_GENERATE_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case affiliateActions.AFFILIATE_LINK_GENERATE_FAIL: {
      return {
        ...state,
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
}
