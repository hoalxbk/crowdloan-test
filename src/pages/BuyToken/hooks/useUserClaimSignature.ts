
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from '../../../services/axios';
import { alertFailure } from '../../../store/actions/alert';

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || "";

const useUserClaimSignature = (connectedAccount: string | undefined | null, campaignId: number | undefined, authSignature: string | undefined) => {
  const dispatch = useDispatch();
  const [signature, setSignature] = useState<string | undefined>(undefined);
  const [amount, setAmount] = useState<string| undefined>("");
  const [error, setError] = useState<string | undefined>("");
  const [loadingClaim, setLoadingClaim] = useState<boolean | undefined>(false);

  useEffect(() => {
      const getUserSignature = async () => {
        setError("");
        setSignature("");
        setLoadingClaim(true);

        try {
          const config = {
            headers: {
              msgSignature: MESSAGE_INVESTOR_SIGNATURE
            }
          }
          const response = await axios.post('/user/claim', {
            campaign_id: campaignId,
            wallet_address: connectedAccount,
            signature: authSignature
          }, config);

          if (response.data && response.status && response.status === 200) {
            const { data, message, status } = response.data;
            if (data && status === 200) {
              setSignature(data.signature);
              setAmount(data.amount);
            }

            if (message && status !== 200) {
              dispatch(alertFailure(message));
              setError(message);
              setSignature("");
            }
          }
          setLoadingClaim(false);
        } catch (err) {
          setError(err.message);
          setSignature("");
          setLoadingClaim(false);
        }
      }
    connectedAccount && campaignId && authSignature && getUserSignature();
  }, [connectedAccount, campaignId, authSignature]);

  return {
    signature,
    setSignature,
    amount,
    error,
    loadingClaim,
  }
}

export default useUserClaimSignature;

