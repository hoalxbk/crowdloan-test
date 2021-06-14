import ethLinkABI from '../abi/Ethlink.json';
import { getContractInstance } from '../services/web3';

export const isReferral = async (ethLink: string, tokenAddress: string, campaignId: string) => {
  if (Number(ethLink) !== 0) {
      const ethLinkContract = getContractInstance(ethLinkABI, ethLink);
      const registerCampaign = ethLinkContract && await ethLinkContract.methods.tokens(tokenAddress).call();

      return registerCampaign && registerCampaign.icoCampaign.toLowerCase() === campaignId.toLowerCase() && registerCampaign.id > 0;
  }

  return false;
}

export const isOwnerOfReferral = async (ethLink: string, tokenAddress: string, owner: string): Promise<boolean | undefined> => {
  try {
    const ethLinkContract = getContractInstance(ethLinkABI, ethLink);
    const registerCampaign = ethLinkContract && await ethLinkContract.methods.tokens(tokenAddress).call();

    if (Number(registerCampaign.registeredBy) === 0) {
      return true;
    }

    return registerCampaign.registeredBy.toLowerCase() === owner.toLowerCase();
  } catch (err) {
    console.log(err.message);
  }
}

