import { message } from '../constants/message';

export const pushMessage = (msg: string) => {
  return {
    type: message.PUSH_MESSAGE,
    payload: msg
  }
};