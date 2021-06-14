import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from '../../../services/axios';
import { alertFailure } from '../../../store/actions/alert';

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || "";

const useUserPurchaseSignature = (connectedAccount: string | undefined | null, campaignId: number | undefined, authSignature: string | undefined) => {
  const dispatch = useDispatch();
  const [signature, setSignature] = useState<string | undefined>(undefined);
  const [minBuy, setMinBuy] = useState<string| undefined>("");
  const [maxBuy, setMaxBuy] = useState<string| undefined>("");
  const [error, setError] = useState<string | undefined>("");

  useEffect(() => {
      const getUserSignature = async () => {
        setError("");
        setSignature("");

        try {
          const config = {
            headers: {
              msgSignature: MESSAGE_INVESTOR_SIGNATURE 
            }
          }
          const response = await axios.post('/user/deposit', {
            campaign_id: campaignId,
            wallet_address: connectedAccount,
            signature: authSignature
          }, config);

          if (response.data && response.status && response.status === 200) {
            const { data, message, status } = response.data;
            if (data && status === 200) {
              setSignature(data.signature);
              setMinBuy(data.min_buy);
              setMaxBuy(data.max_buy);
            } 

            if (message && status !== 200) {
              dispatch(alertFailure(message));
              setError(message);
              setSignature("");
            }
          } 
        } catch (err) {
          setError(err.message);
          setSignature("");
        }
      }
    connectedAccount && campaignId && authSignature && getUserSignature();
  }, [connectedAccount, campaignId, authSignature]);

  return {
    signature,
    setSignature,
    minBuy,
    maxBuy,
    error
  }
}

export default useUserPurchaseSignature;

