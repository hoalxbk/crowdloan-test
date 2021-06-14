import { useState, useEffect } from 'react';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useWeb3React } from '@web3-react/core';

type ReturnType = {
  isAuth: boolean,
  connectedAccount: string | null | undefined;
  wrongChain: boolean
}

const useAuth = (): ReturnType => {
  const { active, account, chainId }  = useWeb3React();
  const [isAuth, setIsAuth] = useState(false);

  const walletsInfo = useTypedSelector(state => state.wallet).entities;
  const connectorName = useTypedSelector(state => state.connector).data;
  const { appChainID } = useTypedSelector((state: any) => state.appNetwork).data;

  const activeWallet = connectorName ? walletsInfo[connectorName]: "";
  
  useEffect(() => {
    if (active && activeWallet) {
      setIsAuth(true);
    } else { 
      setIsAuth(false);
    }
  }, [active, activeWallet]);

  return { isAuth, connectedAccount: account, wrongChain: appChainID != chainId };
}

export default useAuth;
