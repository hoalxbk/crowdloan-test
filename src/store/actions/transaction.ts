import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { transactionActions } from '../constants/transaction';
import { BaseRequest } from '../../request/Request'

export const getTransactionByCampaign = (transactionID: string, currentPage: number = 1, query: string = '', startTime: string, finishTime: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: () => any) => {
    const baseRequest = new BaseRequest();

    try {
      dispatch({ type: transactionActions.TRANSACTION_BY_CAMPAIGN_REQUEST });

      const response = await baseRequest.get(`/transactions?campaign=${transactionID}&page=${currentPage}&purchased_address=${query}&start_time=${startTime}&finish_time=${finishTime}`) as any;
      const resObject = await response.json();

      if (resObject.status === 200 && resObject.data)  {
        const { total, page, lastPage, data } = resObject.data;

        dispatch({
          type: transactionActions.TRANSACTION_BY_CAMPAIGN_SUCCESS,
          payload: {
            total,
            page,
            lastPage,
            data
          }
        });
      }

    } catch (error) {
      dispatch({
        type: transactionActions.TRANSACTION_BY_CAMPAIGN_FAIL,
        payload: error.message
      });
    }
  }
};
