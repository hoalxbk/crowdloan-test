import {BSC_RPC_URL} from '../constants/network';
import {ETH_CHAIN_ID, BSC_CHAIN_ID} from '../constants/network';
import {ConnectorNames} from '../constants/connectors';

const BSC_CHAIN_ALIAS = process.env.REACT_APP_BSC_BSC_CHAIN_ALIAS;
const ETH_CHAIN_ALIAS = process.env.REACT_APP_BSC_ETH_CHAIN_ALIAS;
const REACT_APP_NETWORK_BSC_NAME = process.env.REACT_APP_NETWORK_BSC_NAME;
const BSC_ADDRESS = parseInt(process.env.REACT_APP_BSC_CHAIN_ID as string, 10);

export const requestSupportNetwork = async (chainId: string, walletName: string) => {
  const provider = walletName === ConnectorNames.MetaMask ? (window as any).ethereum : (window as any).BinanceChain;

  if (provider) {
    const currentChainId = Number(walletName === ConnectorNames.BSC ? provider.chainId : await provider.request({method: 'eth_chainId'})).toString();
    try {
      walletName === ConnectorNames.MetaMask && chainId === BSC_CHAIN_ID
        ? await provider.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: `0x${BSC_ADDRESS.toString(16)}`,
              chainName: REACT_APP_NETWORK_BSC_NAME,
              nativeCurrency: {
                name: 'BNB',
                symbol: 'bnb',
                decimals: 18,
              },
              rpcUrls: [BSC_RPC_URL],
              blockExplorerUrls: ['https://bscscan.com/'],
            },
          ],
        })
        : chainId !== currentChainId && walletName === ConnectorNames.BSC && await provider.switchNetwork(chainId === ETH_CHAIN_ID ? ETH_CHAIN_ALIAS : BSC_CHAIN_ALIAS);

      return true
    } catch (error) {
      console.log(error.message);
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}
