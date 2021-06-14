import { useState, useCallback } from 'react';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { TokenType } from '../../../hooks/useTokenDetails';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import{ getContractInstance, SmartContractMethod } from '../../../services/web3';
import Pool_ABI from '../../../abi/Pool.json';

const DECIMAL_PLACES = 8;

const useTokenSold = (
  tokenDetails: TokenType | undefined,
  poolAddress: string | undefined,
  ableToFetchFromBlockchain: boolean | undefined
) => {
  const [tokenSold, setTokenSold] = useState<any>();
  const [tokenSoldLoading, setTokenSoldLoading] = useState<boolean>(false);
  const { appChainID } = useTypedSelector(state  => state.appNetwork).data;
  const connector  = useTypedSelector(state => state.connector).data;

  const retrieveTokenSold = useCallback(async (poolAddress: string) => {
    try {
      if (poolAddress && tokenDetails && ableToFetchFromBlockchain
          && ethers.utils.isAddress(poolAddress)
         ) {
           setTokenSoldLoading(true);
           const contract = getContractInstance(Pool_ABI, poolAddress, connector, appChainID, SmartContractMethod.Read);
           if (contract) {
             let tokenSold = await contract.methods.tokenSold().call();
             tokenSold = new BigNumber(tokenSold).div(new BigNumber(10).pow(18)).toFixed(DECIMAL_PLACES);
             setTokenSold(tokenSold);
             return tokenSold;
           }
           return 0;
         }
    } catch (err) {
      console.log(err.message);
    }
  }, [appChainID, connector, poolAddress, ableToFetchFromBlockchain]);

  if (ableToFetchFromBlockchain && poolAddress && !tokenSoldLoading) {
    retrieveTokenSold(poolAddress || '');
  }

  return {
    tokenSoldLoading,
    tokenSold,
    retrieveTokenSold
  }
};

export default useTokenSold;
