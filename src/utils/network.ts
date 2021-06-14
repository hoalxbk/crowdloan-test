import {ETH_CHAIN_ID} from '../constants/network';
import {NETWORK_AVAILABLE} from "../constants";

const ETHERSCAN_URL = process.env.REACT_APP_ETHERSCAN_BASE_URL || "";
const BCSSCAN_URL = process.env.REACT_APP_BSCSCAN_BASE_URL || "";

export const getEtherscanName = ({networkAvailable}: any) => {
  // console.log('etherscanName', networkAvailable);
  if (networkAvailable === NETWORK_AVAILABLE.BSC) {
    return 'Bscscan';
  } else {
    return 'Etherscan';
  }
};

export const getEtherscanTransactionLink = ({ appChainID, transactionHash }: any) => {
  return ETH_CHAIN_ID == appChainID ? `${ETHERSCAN_URL}/tx/${transactionHash}` : `${BCSSCAN_URL}/tx/${transactionHash}`
};

export const getEtherscanTransactionAddress = ({ appChainID, address }: any) => {
  return ETH_CHAIN_ID == appChainID ? `${ETHERSCAN_URL}/address/${address}` : `${BCSSCAN_URL}/address/${address}`;
};


