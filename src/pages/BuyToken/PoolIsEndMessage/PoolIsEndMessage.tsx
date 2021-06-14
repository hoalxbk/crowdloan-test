import React from 'react';
import {convertUnixTimeToDateTime} from "../../../utils/convertDate";

function PoolIsEndMessage(props: any) {
  const {
    poolDetails,
  } = props;
  return (
    <>
      {
        (poolDetails?.startBuyTime && poolDetails?.endBuyTime) ?
          (poolDetails.campaignClaimConfig && poolDetails.campaignClaimConfig.length > 0 &&
            `The pool is full. Thank you for your participation. You can claim your token on ${convertUnixTimeToDateTime(poolDetails?.campaignClaimConfig[0].start_time, 1)}.`
          ) : ''
      }
    </>
  );
}

export default PoolIsEndMessage;
