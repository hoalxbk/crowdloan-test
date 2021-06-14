import campaignFactoryABI from '../abi/CampaignFactory.json';
import { getContractInstance } from '../services/web3';

export const isFactorySuspended = async (): Promise<boolean> => {
 const factorySmartContract = getContractInstance(campaignFactoryABI, process.env.REACT_APP_SMART_CONTRACT_FACTORY_ADDRESS || ""); 

 if (factorySmartContract) {
  const isSuspend = await factorySmartContract.methods.paused().call();

  return isSuspend;
 }

 return false;
}
