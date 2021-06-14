import { sotaTokenActions } from '../constants/sota-token';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { getContractInstance } from '../../services/web3';
import erc20ABI from '../../abi/Erc20.json';
import { MAX_INT } from './../../services/web3';
import { Web3Provider } from '@ethersproject/providers'
import { getContract } from '../../utils/contract';
import { alertFailure, alertSuccess } from '../../store/actions/alert';

export const getAllowance = (owner: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: sotaTokenActions.ALLOWANCE_LOADING });
    try {
      const pkfContract = getContractInstance(erc20ABI, process.env.REACT_APP_PKF as string);
      const pkfResult = await pkfContract?.methods.allowance(owner, process.env.REACT_APP_TIERS).call();

      const uniContract = getContractInstance(erc20ABI, process.env.REACT_APP_UNI_LP as string);
      const uniResult = await uniContract?.methods.allowance(owner, process.env.REACT_APP_TIERS).call();

      const mantraContract = getContractInstance(erc20ABI, process.env.REACT_APP_MANTRA_LP as string);
      const mantraResult = await mantraContract?.methods.allowance(owner, process.env.REACT_APP_TIERS).call();

      const result = {
        pkf: pkfResult,
        uni: uniResult,
        mantra: mantraResult
      }

      dispatch({
        type: sotaTokenActions.ALLOWANCE_SUCCESS,
        payload: result,
      });
    } catch (error) {
      console.log(error)
      dispatch({
        type: sotaTokenActions.ALLOWANCE_FAILURE,
        payload: error
      });
    }
  }
};

export const approve = (address: string | null | undefined, library: Web3Provider, tokenAddress: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    dispatch({ type: sotaTokenActions.APPROVE_LOADING });
    try {
      let result = {} as any;

      const contract = getContract(tokenAddress, erc20ABI, library, address || '');
      result = await contract?.approve(process.env.REACT_APP_TIERS, MAX_INT);
      dispatch({
        type: sotaTokenActions.APPROVE_SUCCESS,
        payload: result,
      });
      await result.wait(1);
      if(result) {
        dispatch(getAllowance(address || ''));
      }

    } catch (error) {
      console.log(error)
      dispatch(alertFailure("Transaction submit failure"))
      dispatch({
        type: sotaTokenActions.APPROVE_FAILURE,
        payload: error
      });
    }
  }
};
