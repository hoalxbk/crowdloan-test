import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';

import { useTypedSelector } from '../hooks/useTypedSelector';
import { getContractInstance, SmartContractMethod } from '../services/web3';
import ERC20_ABI from '../abi/Erc20.json';

export type TokenType = {
  decimals: number;
  symbol: string;
  name: string;
  address: string;
}

const useTokenDetails = (address: string, networkAvailable: string) => {
  const [tokenDetails, setTokenDetails] = useState<TokenType | undefined>(undefined);
  const [tokenDetailsLoading, setTokenDetailsLoading] = useState<boolean>(false);

  const { appChainID }  = useSelector((state: any) => state.appNetwork).data;
  const connector  = useTypedSelector(state => state.connector).data;

  useEffect(() => {
    const fetchTokenDetails = async (address: string) => {
      setTokenDetailsLoading(true);

      const contract = getContractInstance(
        ERC20_ABI,
       address,
       connector,
       appChainID,
       SmartContractMethod.Read,
       networkAvailable === 'eth'
      );

      if (contract) {
        const symbolCall = contract.methods.symbol().call();
        const decimalsCall = contract.methods.decimals().call();
        const nameCall = contract.methods.name().call();

        const [symbol, decimals, name] = await Promise.all([symbolCall, decimalsCall, nameCall]);

        setTokenDetailsLoading(false);
        setTokenDetails({
          symbol,
          name,
          decimals: Number(decimals),
          address
        });
      }
    }

    address && networkAvailable && ethers.utils.isAddress(address) && fetchTokenDetails(address);
    if(address == 'TBD') {
      setTokenDetails({
        symbol: 'TBA',
        name: 'TBA',
        decimals: 18,
        address: 'Token contract not available yet.'
      });
    }
  }, [address, networkAvailable]);

  return {
    tokenDetails,
    loading: tokenDetailsLoading
  }
}

export default useTokenDetails;
