import { campaignActions }from '../constants/campaign'
import { AnyAction } from 'redux'

const initialState = {
  data: [],
  loading: false,
  failure: '',
}

export const campaignsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGNS_REQUEST: {
      return {
        ...state,
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGNS_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case campaignActions.CAMPAIGNS_FAIL: {
      return {
        data: [],
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
}

export const campaignCreateReducer = (state = { loading: false, failure: '' }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.MY_CAMPAIGN_CREATE_REQUEST: {
      return {
        loading: true,
        failure: ""
      }
    }

    case campaignActions.MY_CAMPAIGN_CREATE_SUCCESS: {
      return {
        loading: false,
        failure: ""
      }
    }

    case campaignActions.MY_CAMPAIGN_CREATE_FAIL: {
      return {
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};

export const campaignStatusToggleReducer = (state = { loading: false, failure: '' }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_STATUS_TOGGLE_REQUEST: {
      return {
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_STATUS_TOGGLE_SUCCESS: {
      return {
        loading: false,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_STATUS_TOGGLE_FAIL: {
      return {
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};

export const campaignRefundTokensReducer = (state = { loading: false, failure: '' }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_TOKENS_REFUND_REQUEST: {
      return {
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_TOKENS_REFUND_SUCCESS: {
      return {
        loading: false,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_TOKENS_REFUND_FAIL: {
      return {
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};

export const campaignEditReducer = (state = { loading: false, failure: '' }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_EDIT_REQUEST: {
      return {
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_EDIT_SUCCESS: {
      return {
        loading: false,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_EDIT_FAIL: {
      return {
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};

export const campaignDetailReducer = (state = { loading: false, failure: "", data: null }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_DETAIL_REQUEST: {
      return {
        data: null,
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_DETAIL_SUCCESS: {
      return {
        data: action.payload,
        loading: false,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_DETAIL_FAIL: {
      return {
        data: null,
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
};

export const campaignICORegisterReducer = (state = { loading: false, failure: "" }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_REGISTER_ICO_REQUEST: {
      return {
        ...state,
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_REGISTER_ICO_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }

    case campaignActions.CAMPAIGN_REGISTER_ICO_FAIL: {
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
};

export const campaignAffiliateCreateReducer = (state = { loading: false, failure: "" }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_AFFILIATE_CREATE_REQUEST: {
      return {
        ...state,
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_AFFILIATE_CREATE_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }

    case campaignActions.CAMPAIGN_AFFILIATE_CREATE_FAIL: {
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

export const campaignErc20RateSetReducer = (state = { loading: false, failure: "" }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_ERC20_RATE_REQUEST: {
      return {
        loading: true,
        failure: ""
      }
    }

    case campaignActions.CAMPAIGN_ERC20_RATE_SUCCESS: {
      return {
        ...state,
        loading: false
      }
    }

    case campaignActions.CAMPAIGN_ERC20_RATE_FAIL: {
      return {
        failure: action.payload,
        loading: false
      }
    }

    default: {
      return state;
    }
  }
}

export const campaignLatestReducer = (state = { loading: false, data: null, failure: "" }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_LATEST_GET_REQUEST: {
      return {
        loading: true,
        failure: "",
        data: null
      }
    }

    case campaignActions.CAMPAIGN_LATEST_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }

    case campaignActions.CAMPAIGN_ERC20_RATE_FAIL: {
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

export const campaignLatestActiveReducer = (state = { loading: false, data: null, failure: "" }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_LATEST_ACTIVE_GET_REQUEST: {
      return {
        loading: true,
        failure: "",
        data: null
      }
    }

    case campaignActions.CAMPAIGN_LATEST_ACTIVE_GET_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }

    case campaignActions.CAMPAIGN_ERC20_RATE_FAIL: {
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

export const campaignProcessingReducer = (state = { loading: false, data: null, failure: "" }, action: AnyAction) => {
  switch (action.type) {
    case campaignActions.CAMPAIGN_DETAIL_HTTP_REQUEST: {
      return {
        ...state,
        loading: true,
        failure: "",
      }
    }

    case campaignActions.CAMPAIGN_DETAIL_HTTP_SUCCESS: {
      return {
        ...state,
        loading: false,
        data: action.payload
      }
    }

    case campaignActions.CAMPAIGN_DETAIL_HTTP_FAIL: {
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

