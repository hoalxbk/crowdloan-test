import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { TokenType } from '../../../hooks/useTokenDetails';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import{ getContractInstance, SmartContractMethod } from '../../../services/web3';
import Pool_ABI from '../../../abi/Pool.json';

const useUserPurchased = (
  tokenDetails: TokenType | undefined, 
  poolAddress: string | undefined,
  ableToFetchFromBlockchain: boolean | undefined
) => {
  const [userPurchasedLoading, setUserPurchasedLoading] = useState<boolean>(false);

  const { appChainID } = useTypedSelector(state  => state.appNetwork).data;
  const connector  = useTypedSelector(state => state.connector).data;

  const retrieveUserPurchased = useCallback(async (userAddress: string, poolAddress: string) => {
    try {
      if (userAddress && poolAddress && tokenDetails && ableToFetchFromBlockchain 
          && ethers.utils.isAddress(userAddress) 
          && ethers.utils.isAddress(poolAddress) 
         ) {
           setUserPurchasedLoading(true);

           const contract = getContractInstance(Pool_ABI, poolAddress, connector, appChainID, SmartContractMethod.Read); 

           if (contract) {
             const userPurchased = await contract.methods.userPurchased(userAddress).call();
             const userPurchasedReturn = new BigNumber(userPurchased).div(new BigNumber(10).pow(tokenDetails.decimals)).toFixed();

             return userPurchasedReturn;
           }

           return 0;
         }
    } catch (err) {
      console.log(err.message);
    }
  }, [appChainID, connector, poolAddress, ableToFetchFromBlockchain]);

  return {
    userPurchasedLoading,
    retrieveUserPurchased
  }
}

export default useUserPurchased;
