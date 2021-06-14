import { ethers } from 'ethers';
import { ETH_CHAIN_ID } from '../constants/network';

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY || "";
const ETH_NETWORK_NAME = process.env.REACT_APP_ETH_NETWORK_NAME || "";
const BSC_RPC_URL = process.env.REACT_APP_BSC_RPC_URL || "";

const getAccountBalance = async (appChainID: string, walletChainID: string, connectedAccount: string, connector: string) => {
if (appChainID && connectedAccount && connector) {
  const exactNetwork = appChainID === walletChainID;

  const provider = 
   appChainID === ETH_CHAIN_ID 
     ? new ethers.providers.InfuraProvider(ETH_NETWORK_NAME, INFURA_KEY)
     : new ethers.providers.JsonRpcProvider(BSC_RPC_URL);

  const accountBalance = exactNetwork 
    ? await provider.getBalance(connectedAccount)
    : { _hex: '0x00' }

    return accountBalance; 
  }
  
  return { _hex: '0x00' };
}

export default getAccountBalance;
