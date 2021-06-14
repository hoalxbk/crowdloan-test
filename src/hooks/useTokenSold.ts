import { useCallback } from 'react'
import { getContractInstance } from '../services/web3';

import ERC20_ABI from '../abi/Erc20.json';

const useTokenSold = (
  poolAddress: string | null | undefined, 
) => {
  const getTokenSold = useCallback(async (getState: () => any) => {
    let result = 0;
    try {
      const { appChainID } = getState().appNetwork.data;
      const connector  = getState().connector.data;
      const contract = getContractInstance(ERC20_ABI, poolAddress || '', connector, appChainID);

      if (contract) {
        result = await contract.methods.tokenSold().call();
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  }, [])

  return {
    getTokenSold,
  }
}

export default useTokenSold;
