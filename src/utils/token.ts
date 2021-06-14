import { getContractInstance } from '../services/web3';
import erc20ABI from '../abi/Erc20.json';
import ethLinkABI from '../abi/Ethlink.json';

const ETH_LINK_DEFAULT_ADDRESS = process.env.REACT_APP_SMART_CONTRACT_ETHLINK_ADDRESS || "";

export type TokenType =  {
  name: string;
  symbol: string;
  decimals: number;
  address: string;
};

type ReturnType = TokenType | undefined;

export const getTokenInfo = async (tokenAddress: string): Promise<ReturnType> => {
    try {
      const erc20Token = getContractInstance(erc20ABI, tokenAddress);

      if (erc20Token) {
        const tokenName = erc20Token.methods.name().call();
        const tokenSymbol = erc20Token.methods.symbol().call();
        const tokenDecimals = erc20Token.methods.decimals().call();

        const res = await Promise.all([tokenName, tokenSymbol, tokenDecimals]);

        return {
          name: res[0],
          symbol: res[1],
          decimals: res[2],
          address: tokenAddress
        }
      };
    } catch (err) {
      throw new Error("Token address is invalid.");
    };
}

export const tokenAlreadyUsed = async (tokenAddress: string): Promise<boolean> => {
  try {
    const ethLinkContract = getContractInstance(ethLinkABI, ETH_LINK_DEFAULT_ADDRESS);

    if (ethLinkContract) {
      const tokenRegistered = await ethLinkContract.methods.tokens(tokenAddress).call();

      if (Number(tokenRegistered.registeredBy) === 0) return false;

      return Number(tokenRegistered.registeredBy) > 0;
    }

  } catch (err) {
    console.log(err.message);
    return true;
  }

  return false;
}

export const getShortTokenSymbol = (tokenSymbol: string, yourLength = 10) => {
  if (!tokenSymbol) tokenSymbol += '';
  if (tokenSymbol.length <= yourLength) {
    return tokenSymbol;
  }

  return `${tokenSymbol.substring(0, 10)}...`;
};
