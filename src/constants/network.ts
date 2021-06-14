export const ETH_CHAIN_ID = process.env.REACT_APP_ETH_CHAIN_ID as string;
export const BSC_CHAIN_ID = process.env.REACT_APP_BSC_CHAIN_ID as string;
export const BSC_RPC_URL = process.env.REACT_APP_BSC_RPC_URL || "";

export const USDT_ADDRESS = process.env.REACT_APP_USDT_SMART_CONTRACT;
export const USDC_ADDRESS = process.env.REACT_APP_USDC_SMART_CONTRACT;
export const USDC_BSC_ADDRESS = process.env.REACT_APP_USDC_BSC_SMART_CONTRACT;
export const USDT_BSC_ADDRESS = process.env.REACT_APP_USDT_BSC_SMART_CONTRACT;
export const BUSD_BSC_ADDRESS = process.env.REACT_APP_BUSD_BSC_SMART_CONTRACT;

export const ETHERSCAN_URL = process.env.REACT_APP_ETHERSCAN_BASE_URL || "";
export const BCSSCAN_URL = process.env.REACT_APP_BSCSCAN_BASE_URL || "";

export enum ChainId  {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  BSC_TESTNET = 97,
  BSC_MAINNET = 56
}

export type chainId =
  Extract< ChainId,
    ChainId.MAINNET |
    ChainId.ROPSTEN |
    ChainId.RINKEBY |
    ChainId.GOERLI |
    ChainId.KOVAN |
    ChainId.BSC_MAINNET |
    ChainId.BSC_TESTNET
  >;

export const ChainIdNameMapping: { [key in ChainId]: string }  = {
  [ChainId.MAINNET]: 'Mainnet',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GOERLI]: 'Goerli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.BSC_MAINNET]: 'BSC Mainnet',
  [ChainId.BSC_TESTNET]: 'BSC Testnet'
}

export const NETWORK_NAME_MAPPINGS: any = {
  '1': 'Mainnet',
  '3': 'Ropsten',
  '5': 'Goerli',
  '42': 'Kovan',
  '4': 'Rinkeby',
  '56': 'BSC Mainnet',
  '97': 'BSC Testnet'
};

export interface NetworkInfo {
  name: string;
  id?: string | undefined;
  icon: string,
  disableIcon: string;
}

export enum APP_NETWORKS_NAME {
  METAMASK = "METAMASK",
  BSC = "BSC"
}

export type appNetworkType = Extract<APP_NETWORKS_NAME, APP_NETWORKS_NAME.METAMASK | APP_NETWORKS_NAME.BSC>

export const APP_NETWORKS: {[key in APP_NETWORKS_NAME]: NetworkInfo } = {
  [APP_NETWORKS_NAME.METAMASK]: {
    name: 'Ethereum',
    id: ETH_CHAIN_ID,
    icon: "/images/ethereum.svg",
    disableIcon: "/images/ethereum-disabled.png"
  },
  [APP_NETWORKS_NAME.BSC]: {
    name: 'BSC',
    id: BSC_CHAIN_ID ,
    icon: "/images/bsc.svg",
    disableIcon: "/images/binance-disabled.png"
  },
}

export const APP_NETWORKS_ID: (string | undefined)[] = [ETH_CHAIN_ID, BSC_CHAIN_ID];
export const NETWORK_URL = process.env.REACT_APP_NETWORK_URL;
export const NETWORK_BSC_URL = process.env.REACT_APP_BSC_RPC_URL;
export const FORMATIC_KEY = process.env.REACT_APP_FORMATIC_KEY;
export const FORMATIC_KEY_TEST = process.env.REACT_APP_FORMATIC_KEY_TEST;

export const NETWORK_ETH_NAME = process.env.REACT_APP_NETWORK_ETH_NAME;
export const NETWORK_BSC_NAME = process.env.REACT_APP_NETWORK_BSC_NAME;

export const appNetwork: { [key: string]: string } = {
  [ETH_CHAIN_ID]: NETWORK_ETH_NAME as string,
  [BSC_CHAIN_ID]: NETWORK_BSC_NAME as string
}
