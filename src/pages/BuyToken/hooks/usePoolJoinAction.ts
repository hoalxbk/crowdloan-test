import { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

import axios from '../../../services/axios';
import { alertFailure, alertSuccess } from '../../../store/actions/alert';
import useWalletSignature from '../../../hooks/useWalletSignature';

type PoolDepositActionParams = {
  poolId?: number;
  connectedAccount?: string;
}

const usePoolJoinAction = ({ poolId }: PoolDepositActionParams) => {
  const dispatch = useDispatch();
  const { account, library } = useWeb3React();
  const [joinPoolSuccess, setJoinPoolSuccess] = useState<boolean>(false);
  const [poolJoinLoading, setPoolJoinLoading] = useState<boolean>(false);
  const { signature, signMessage, setSignature, error } = useWalletSignature();

  const joinPool = useCallback(async () => {
    if (account && poolId && library) {
      try {
        setPoolJoinLoading(true);

        await signMessage();
      } catch (err) {
        setPoolJoinLoading(false);
        console.log('Error when signing: ', err.message);
      }
    }
  }, [poolId, account, library, signMessage]);

  useEffect(() => {
    if (error && poolJoinLoading) {
      setPoolJoinLoading(false);
    }
  }, [error]);

  useEffect(() => {
    const poolJoinRequestWithSignature = async () => {
      if (signature && poolJoinLoading) {
        const config = {
          headers: {
            msgSignature: process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE
          }
        }

        const response = await axios.post(`/user/join-campaign`, {
          signature,
          wallet_address: account,
          campaign_id: poolId,
        }, config as any) as any;

        if (response.data) {
          if (response.data.status === 200) {
            dispatch(alertSuccess(response?.data?.message));
            setJoinPoolSuccess(true);
          }

          if (response.data.status !== 200) {
            dispatch(alertFailure(response.data.message));
          }
        }

        setSignature("");
        setPoolJoinLoading(false);
      }
    }

    poolJoinRequestWithSignature();
  }, [signature, poolJoinLoading]);

  return {
    joinPool,
    poolJoinLoading,
    joinPoolSuccess
  }
}

export default usePoolJoinAction;
