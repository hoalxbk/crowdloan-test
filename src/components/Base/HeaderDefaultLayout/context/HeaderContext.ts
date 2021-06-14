import React, { SetStateAction, Dispatch } from 'react';

export type HeaderContextType = {
  agreedTerms: boolean,
  setAgreedTerms: Dispatch<SetStateAction<boolean>>,
}

export const HeaderContext = React.createContext<HeaderContextType>({
  agreedTerms: false,
  setAgreedTerms: () => {},
  // walletName: [],
  // connectWalletLoading: false,
  // handleProviderChosen: () => {}
});
