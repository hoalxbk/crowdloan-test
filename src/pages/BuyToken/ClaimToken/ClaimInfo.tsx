import React from 'react';
import {convertUnixTimeToDateTime} from "../../../utils/convertDate";
import useStyles from "./style";
import {numberWithCommas} from "../../../utils/formatNumber";
import BigNumber from 'bignumber.js';
import {useWeb3React} from "@web3-react/core";
import useGetAirdrop from "../../../hooks/useGetAirdrop";

function ClaimInfo(props: any) {
  const styles = useStyles();
  const {
    poolDetails,
    tokenDetails,
    userClaimInfo,
    releaseTime,
    currentClaim,
    currentClaimIndex,
    nextClaim,
    nextClaimIndex,
    maximumTokenClaimUtilNow,
  } = props;

  const {
    userPurchased = 0,
    userClaimed = 0,
    userPurchasedReturn = 0,
  } = (userClaimInfo || {});

  const { account: connectedAccount } = useWeb3React();
  const { airdrop, loading: loadingAirdrop } = useGetAirdrop({ campaignId: poolDetails?.id, connectedAccount });

  // const {
  //   currentClaim,
  //   currentClaimIndex,
  //   nextClaim,
  //   nextClaimIndex,
  //   maximumTokenClaimUtilNow,
  // } = useDetectClaimConfigApplying(poolDetails, userPurchased, userClaimed);

  return (
    <>
      <div className={styles.poolDetailClaimInfo}>
        <div className={styles.poolDetailClaimInfoBlock}>
          <span>Total bought tokens</span>
          <span>{numberWithCommas(`${userPurchased || 0}`)} {tokenDetails?.symbol}</span>
        </div>

        <div className={styles.poolDetailClaimInfoBlock}>
          <span>You have claimed</span>
          <span>{numberWithCommas(`${userClaimed || 0}`)} {tokenDetails?.symbol}</span>
        </div>


        <div className={styles.poolDetailClaimInfoBlock}>
          <span>Remaining tokens (until now)</span>
          <span>{numberWithCommas(`${maximumTokenClaimUtilNow || 0}`)} {tokenDetails?.symbol}</span>
        </div>

        {airdrop &&
          <>
            <div className={styles.poolDetailClaimInfoBlock}>
              <span>ETH Airdrop</span>
              <span>{airdrop?.eth_amount || 0} ETH</span>
            </div>

            <div className={styles.poolDetailClaimInfoBlock}>
              <span>Token Airdrop</span>
              <span>{airdrop?.token_amount || 0} {tokenDetails?.symbol}</span>
            </div>
          </>
        }

        {
          !!userPurchased
          && new BigNumber(userPurchased).gt(0) // User bought any token
          && nextClaim // Current time user have next Claim Phase
          && (new BigNumber(maximumTokenClaimUtilNow).lte(0)) // Only user claimed all token in Current Phase and waiting Next Claim Phase
          &&
          <>
            <div className={styles.poolDetailClaimInfoBlock}>
              <span>Next Claim Time</span>
              <span>{convertUnixTimeToDateTime(nextClaim?.start_time, 1)}</span>
            </div>
          </>
        }

      </div>

    </>
  );
}

export default ClaimInfo;
