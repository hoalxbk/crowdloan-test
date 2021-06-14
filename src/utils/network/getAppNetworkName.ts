import { appNetwork } from '../../constants/network';

export const getAppNetworkName = (appChainID: string) => {
  return appNetwork[appChainID];
}
