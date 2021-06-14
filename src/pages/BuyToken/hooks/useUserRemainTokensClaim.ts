import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { TokenType } from '../../../hooks/useTokenDetails';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import{ getContractInstance, SmartContractMethod } from '../../../services/web3';
import Pool_ABI from '../../../abi/PreSalePool.json';

const useUserRemainTokensClaim = (
  tokenDetails: TokenType | undefined,
  poolAddress: string | undefined,
  ableToFetchFromBlockchain: boolean | undefined
) => {
  const [userPurchasedLoading, setUserPurchasedLoading] = useState<boolean>(false);

  const { appChainID } = useTypedSelector(state  => state.appNetwork).data;
  const connector  = useTypedSelector(state => state.connector).data;

  const retrieveClaimableTokens = useCallback(async (userAddress: string, poolAddress: string) => {
    try {
      if (userAddress && poolAddress && tokenDetails && ableToFetchFromBlockchain
          && ethers.utils.isAddress(userAddress)
          && ethers.utils.isAddress(poolAddress)
      ) {
        setUserPurchasedLoading(true);
        const contract = getContractInstance(Pool_ABI, poolAddress, connector, appChainID, SmartContractMethod.Read);
        if (contract) {
          const userPurchased = await contract.methods.userPurchased(userAddress).call();

          console.log('userPurchased===>', userPurchased);

          const userClaimed = await contract.methods.userClaimed(userAddress).call();
          const userPurchasedReturn = new BigNumber(userPurchased).minus(new BigNumber(userClaimed)).div(new BigNumber(10).pow(tokenDetails.decimals)).toFixed();

          return {
            userPurchased: new BigNumber(userPurchased).div(new BigNumber(10).pow(tokenDetails.decimals)).toFixed(),
            userClaimed: new BigNumber(userClaimed).div(new BigNumber(10).pow(tokenDetails.decimals)).toFixed(),
            userPurchasedReturn,
          }
        }
        return {
          userPurchased: 0,
          userClaimed: 0,
          userPurchasedReturn: 0,
          tokenDecimals: tokenDetails.decimals,
        }
      }
    } catch (err) {
      console.log(err);
    }
  }, [appChainID, connector, poolAddress, ableToFetchFromBlockchain]);

  return {
    userPurchasedLoading,
    retrieveClaimableTokens
  }
}

export default useUserRemainTokensClaim;
