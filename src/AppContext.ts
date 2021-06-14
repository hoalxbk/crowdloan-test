import { createContext, Dispatch, SetStateAction } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector'

export type AppContextType = {
  binanceAvailable: boolean,
  handleProviderChosen?: (name: string, connector: AbstractConnector) => void,
  connectWalletLoading?: boolean, 
  currentConnector?: AbstractConnector | undefined, 
  walletName?: (string | undefined)[], 
  setWalletName?: Dispatch<SetStateAction<(string | undefined)[]>>,
  loginError?: string,
  appNetworkLoading?: boolean,
  handleConnectorDisconnect?: () => void,
  logout?: () => void,
  setCurrentConnectedWallet?: Dispatch<SetStateAction<any>>,
  currentConnectedWallet?: any,
  openConnectWallet?: boolean
  setOpenConnectWallet?: Dispatch<SetStateAction<boolean>>,
}

export const AppContext = createContext<AppContextType>({
  binanceAvailable: false,
})
