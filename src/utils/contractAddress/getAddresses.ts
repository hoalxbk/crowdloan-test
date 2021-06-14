import { USDT_ADDRESS, USDT_BSC_ADDRESS, USDC_ADDRESS, USDC_BSC_ADDRESS, ETH_CHAIN_ID, BUSD_BSC_ADDRESS } from '../../constants/network';

export const getUSDTAddress = (appChainID: string): string => {
  return (appChainID === ETH_CHAIN_ID ? USDT_ADDRESS: USDT_BSC_ADDRESS) as string;
}

export const getBUSDAddress = (appChainID: string): string => {
  return BUSD_BSC_ADDRESS as string;
}

export const getUSDCAddress = (appChainID: string) => {
  return (appChainID === ETH_CHAIN_ID ? USDC_ADDRESS: USDC_BSC_ADDRESS) as string;
}


