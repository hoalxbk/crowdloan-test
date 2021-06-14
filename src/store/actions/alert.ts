import { alertActions } from '../constants/alert'

export const alertSuccess = (msg: string)  => {
  return {
    type: alertActions.SUCCESS_MESSAGE,
    payload: msg
  }
}

export const alertWarning = (msg: string)  => {
  return {
    type: alertActions.WARNING_MESSAGE,
    payload: msg
  }
}

export const alertFailure = (msg: string)  => {
  return {
    type: alertActions.ERROR_MESSAGE,
    payload: msg
  }
}

export const clearAlert = ()  => {
  return {
    type: alertActions.CLEAR_MESSAGE,
  }
}
