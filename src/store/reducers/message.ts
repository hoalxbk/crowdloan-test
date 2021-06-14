import { message } from '../constants/message';
import { AnyAction } from 'redux';

type StateType = {
  data: string,
};

const initialState = {
  data: "",
};

export const messageReducer = (state: StateType = initialState, action: AnyAction) => {
  switch (action.type) {
    case message.PUSH_MESSAGE: {
      return {
        ...state,
        data: action.payload,
      }
    }
    default: {
      return state;
    }
  }
};
