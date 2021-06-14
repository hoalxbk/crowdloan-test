import { useState, useCallback } from 'react';
import { useWeb3React } from '@web3-react/core';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import BigNumber from 'bignumber.js';

import { TokenType } from '../hooks/useTokenDetails';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { getContractInstance, SmartContractMethod } from '../services/web3';

import ERC20_ABI from '../abi/Erc20.json';

const useTokenBalance = (token: TokenType | undefined, userAddress: string | null | undefined) => {
  const [tokenBalanceLoading, setTokenBalanceLoading] = useState<boolean>(false);

  const { library } = useWeb3React();
  const { appChainID }  = useSelector((state: any) => state.appNetwork).data;
  const connector  = useTypedSelector(state => state.connector).data;

  const retrieveTokenBalance = useCallback(async (token: TokenType | undefined, userAddress: string) => {
    if (token 
    && userAddress 
    && ethers.utils.isAddress(userAddress) 
    && (ethers.utils.isAddress(token.address))) {
      setTokenBalanceLoading(true);
      const contract = getContractInstance(ERC20_ABI, token.address, connector, appChainID, SmartContractMethod.Read);

      if (contract) {
        const balance = await contract.methods.balanceOf(userAddress).call();
        const balanceReturn = new BigNumber(balance).div(new BigNumber(10).pow(token?.decimals as number)).toFixed(7);

        return balanceReturn;
      }
    }

    if (token && token?.symbol === 'ETH') {
        const balance = await library.provider.request({ method: 'eth_getBalance', params: [userAddress, 'latest'] });
        const balanceReturn = new BigNumber(balance).div(new BigNumber(10).pow(token?.decimals as number)).toFixed(7);
        return balanceReturn;
    }

    return 0;
  }, [userAddress, token, appChainID, connector]);

  return {
    retrieveTokenBalance,
    tokenBalanceLoading
  }
}

export default useTokenBalance;
