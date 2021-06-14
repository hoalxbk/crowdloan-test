import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import Pool_ABI from '../../../abi/Pool.json';
import {getContractInstance, getPoolContract, SmartContractMethod} from '../../../services/web3';
import {NFT_PLUS_AMOUNT_PRODUCTION} from "../../../constants";
import {getProgressWithPools} from "../../../utils/campaign";

const DECIMAL_PLACES = 8;

const useTokenSoldProgress = (poolAddress: string | undefined, totalTokens: number | undefined, networkAvailable: string | undefined, poolDetails: any = {}) => {
  const [soldProgress, setSoldProgress] = useState<string>("0");
  const [tokenSold, setTokenSold] = useState<string>("0");

  const { appChainID }  = useTypedSelector(state  => state.appNetwork).data;
  const connector  = useTypedSelector(state => state.connector).data;
  let soldProgressInterval = undefined as any;

  useEffect(() => {
    const calSoldProgress = async () => {
      if (poolAddress && networkAvailable && totalTokens && ethers.utils.isAddress(poolAddress)) {
        // const poolContract = getContractInstance(
        //   Pool_ABI,
        //   poolAddress,
        //   connector,
        //   appChainID,
        //   SmartContractMethod.Read,
        //   networkAvailable === 'eth'
        // );

        const poolContract = getPoolContract({ networkAvailable, poolHash: poolAddress });

        if (poolContract) {
          const tokensSold = await poolContract.methods.tokenSold().call();
          let tokensSoldCal = new BigNumber(tokensSold).div(new BigNumber(10).pow(18)).toFixed();
          let { progress, tokenSold, totalSoldCoin } = getProgressWithPools({
            token_sold: tokensSoldCal,
            total_sold_coin: totalTokens,
            finish_time: poolDetails.finish_time || poolDetails.endBuyTime,
          });

          setTokenSold(new BigNumber(tokenSold).toFixed(DECIMAL_PLACES));
          setSoldProgress(new BigNumber(progress).toFixed(DECIMAL_PLACES));
        }
      }
    }

    if (poolAddress && networkAvailable) {
      calSoldProgress();
      soldProgressInterval = setInterval(() => calSoldProgress(), 20000);
    }

    return () => {
      soldProgressInterval && clearInterval(soldProgressInterval);
    }
  }, [poolAddress, appChainID, connector, networkAvailable, totalTokens]);

  return {
    tokenSold,
    soldProgress
  }
}


export default useTokenSoldProgress;
