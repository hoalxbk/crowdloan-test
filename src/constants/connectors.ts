import {BscConnector} from '@binance-chain/bsc-connector'
import {URI_AVAILABLE, WalletConnectConnector} from '@web3-react/walletconnect-connector'
import {WalletLinkConnector} from '@web3-react/walletlink-connector'
import {InjectedConnector} from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import {FortmaticConnector} from '../connectors/Fortmatic';
import {BSC_CHAIN_ID, ETH_CHAIN_ID, NETWORK_BSC_URL} from './network';

import {FORMATIC_KEY, NETWORK_URL, APP_NETWORKS_NAME } from './network';

const METAMASK_DEEPLINK = process.env.REACT_APP_METAMASK_DEEPLINK;
console.log('METAMASK_DEEPLINK', METAMASK_DEEPLINK);
console.log('FORMATIC_KEY, NETWORK_URL, APP_NETWORKS_NAME', FORMATIC_KEY, NETWORK_URL, APP_NETWORKS_NAME);

export const bscConnector = new BscConnector({}) as any;
export const injected = new InjectedConnector({});

const originalChainIdChangeHandler = bscConnector.handleChainChanged;

//@ts-ignore
bscConnector.handleChainChanged = (chainId: string) => {
  const chainIdNum = Number(chainId);
  console.debug("Handling 'chainChanged' event with payload", chainId, isNaN(chainIdNum));
  if (isNaN(chainIdNum)) {
    bscConnector.emitError('NaN ChainId');
    return;
  }
  //@ts-ignore
  originalChainIdChangeHandler(chainId)
};

// mainnet only
export const walletLinkConnect = new WalletLinkConnector({
  url: process.env.REACT_APP_NETWORK_URL || '',
  appName: 'Red Kite',
  appLogoUrl: 'https://redkite.polkafoundry.com/images/logo-red-kite.svg',
  darkMode: true,
  // supportedChainIds: [1,4,5],
});

// mainnet only
export const walletConnect = new WalletConnectConnector({
  rpc: {[Number(ETH_CHAIN_ID)]: NETWORK_URL as string},
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 10000
});

export const walletConnectBsc = new WalletConnectConnector({
  // rpc: { 56: 'https://bsc-dataseed.binance.org/' },
  rpc: { [Number(BSC_CHAIN_ID)]: 'https://bsc-dataseed.binance.org/' },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: 10000
});


// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  // iconName: string
  description: string
  href: string | null
  // color: string
  primary?: true
  mobile?: true
  mobileOnly?: true,
  disableIcon: string;
  icon: string ;
  deepLink?: string;
}

export enum ConnectorNames {
  MetaMask = "MetaMask",
  BSC = "BSC Wallet",
  WalletConnect = "WalletConnect",
  WalletConnectBsc = "WalletConnect",
  WalletLinkConnect = "Coinbase Wallet",
  Fortmatic = 'Fortmatic'
}

export type connectorNames = Extract<ConnectorNames, ConnectorNames.MetaMask | ConnectorNames.BSC | ConnectorNames.WalletConnect | ConnectorNames.WalletLinkConnect | ConnectorNames.Fortmatic>;

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  METAMASK: {
    connector: injected,
    name: ConnectorNames.MetaMask,
    icon: '/images/metamask.svg',
    disableIcon: '/images/metamask-disabled.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    mobile: true,
    deepLink: METAMASK_DEEPLINK
  },
  WALLET_CONNECT: {
    connector: walletConnect,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
    mobile: true
  },
  BSC_WALLET: {
    connector: bscConnector,
    name: ConnectorNames.BSC,
    icon: '/images/injected-binance.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/injected-binance-disabled.svg',
    href: null,
  },
  WALLET_LINK: {
    connector: walletLinkConnect,
    name: ConnectorNames.WalletLinkConnect,
    icon: '/images/wallet-link/wallet-link.svg',
    description: 'Connect to Coinbase Wallet and more...',
    disableIcon: '/images/wallet-link/wallet-link-disabled.svg',
    href: null,
    mobile: true,
  },
  // FORTMATIC: {
  //   connector: fortmatic,
  //   name: ConnectorNames.Fortmatic,
  //   icon: '/images/fortmatic.svg',
  //   description: 'Login using Fortmatic hosted wallet',
  //   disableIcon: '/images/fortmatic-disabled.svg',
  //   href: null,
  //   mobile: true
  // },
};

export const SUPPORTED_WALLETS_BSC: { [key: string]: WalletInfo } = {
  METAMASK: SUPPORTED_WALLETS.METAMASK,
  BSC_WALLET: SUPPORTED_WALLETS.BSC_WALLET,
  WALLET_CONNECT: {
    connector: walletConnectBsc,
    name: ConnectorNames.WalletConnect,
    icon: '/images/WalletConnect.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    disableIcon: '/images/wallet-connect-disabled.svg',
    href: null,
  },
}


export const connectorsByName: { [key in ConnectorNames]: AbstractConnector } = {
  [ConnectorNames.MetaMask]: injected,
  [ConnectorNames.BSC]: bscConnector,
  [ConnectorNames.Fortmatic]: fortmatic,
  [ConnectorNames.WalletConnect]: walletConnect,
  [ConnectorNames.WalletConnectBsc]: walletConnectBsc,
  [ConnectorNames.WalletLinkConnect]: walletLinkConnect,
}

export const connectorsSupportByNetwork: {[key: string]: { [key:string]: WalletInfo }  } = {
  [APP_NETWORKS_NAME.METAMASK]: SUPPORTED_WALLETS,
  [APP_NETWORKS_NAME.BSC]: SUPPORTED_WALLETS_BSC,
};

