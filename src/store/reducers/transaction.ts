import { transactionActions } from '../constants/transaction'
import { AnyAction } from 'redux'

const initialState = {
  data: [],
  loading: false,
  failure: ''
}

export const transactionCampaignReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case transactionActions.TRANSACTION_BY_CAMPAIGN_REQUEST: {
      return {
        data: [],
        loading: true,
        failure: ""
      }
    }

    case transactionActions.TRANSACTION_BY_CAMPAIGN_SUCCESS: {
      return {
        ...state,
        data: action.payload,
        loading: false
      }
    }

    case transactionActions.TRANSACTION_BY_CAMPAIGN_FAIL: {
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
