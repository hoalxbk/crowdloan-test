import { useState, useEffect, useCallback } from 'react';
import moment from "moment";
import BigNumber from "bignumber.js";
import usePoolDepositAction from "./usePoolDepositAction";



const useDetectClaimConfigApplying = (
  poolDetails: any,
  userPurchased: any,
  userClaimed: any,
) => {

  const [currentClaim, setCurrentClaim] = useState<any>();
  const [currentClaimIndex, setCurrentClaimIndex] = useState(0);
  const [nextClaim, setNextClaim] = useState<any>();
  const [nextClaimIndex, setNextClaimIndex] = useState(0);
  const [maximumTokenClaimUtilNow, setMaximumTokenClaimUtilNow] = useState<any>(0);
  let detechCurrentPhaseInterval = undefined as any;

  useEffect(() => {
    const detechCurrentPhase = () => {
      const now = moment();
      const nowUnix = now.unix();
      let validRow = null;
      let validIndex = -1;
      for (let i = 0; i < poolDetails.campaignClaimConfig.length; i++) {
        const row = poolDetails.campaignClaimConfig[i];
        if (nowUnix < row.start_time) {
          break;
        } else {
          validRow = row;
          validIndex = i;
        }
      }
      if (validRow) {
        setCurrentClaim(validRow);
        setCurrentClaimIndex(validIndex);

        const next = poolDetails.campaignClaimConfig[validIndex + 1];
        console.log('NextClaim: next: ', next);
        if (next) {
          setNextClaim(next);
          setNextClaimIndex(validIndex + 1);
        }

        if (validIndex >= 0 && userPurchased && userClaimed) {
          const maximum = (new BigNumber(validRow?.max_percent_claim || 0).dividedBy(100).multipliedBy(userPurchased || 0)).minus(userClaimed);
          console.log('validRow.max_percent_claim', validRow?.max_percent_claim, userPurchased, userClaimed, maximum.toFixed());
          if (maximum.lt(0)) {
            setMaximumTokenClaimUtilNow(0);
          } else {
            setMaximumTokenClaimUtilNow(maximum.toFixed());
          }
        }
      }
      console.log('Finish validRow', validRow, validIndex);
    };

    if (poolDetails && poolDetails.campaignClaimConfig && poolDetails.campaignClaimConfig.length > 0) {
      detechCurrentPhase();
      detechCurrentPhaseInterval = setInterval(() => {
        console.log('Deteching current phase....');
        detechCurrentPhase();
      }, 10000);
    }

    return () => {
      detechCurrentPhaseInterval && clearInterval(detechCurrentPhaseInterval);
    }
  }, [poolDetails, userPurchased, userClaimed]);

  return {
    currentClaim,
    currentClaimIndex,
    nextClaim,
    nextClaimIndex,
    maximumTokenClaimUtilNow,
  }
};

export default useDetectClaimConfigApplying;
