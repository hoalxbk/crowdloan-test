import createRoutes from './routes';
import { PersistGate } from 'redux-persist/integration/react'
import { Web3ReactProvider } from '@web3-react/core'
import {ethers} from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { Provider } from 'react-redux'
import configureStore from './store/configureStore'
import { ThemeProvider } from '@material-ui/core/styles';
import defaultTheme from './themes/DefaultTheme/DefaultTheme';

console.log('Version: NFT');

export const getLibrary = (provider: any): Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider, 'any');
  library.pollingInterval = 10000;
  return library;
}

const App = () => {
  const { store, persistor } = configureStore();


  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <ThemeProvider theme={defaultTheme}>
          <PersistGate loading={null} persistor={persistor}>
              {createRoutes()}
          </PersistGate>
        </ThemeProvider>
      </Web3ReactProvider>
    </Provider>
  );
};

export default App;
