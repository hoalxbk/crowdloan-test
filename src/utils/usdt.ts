import BigNumber from 'bignumber.js';
import {ACCEPT_CURRENCY, NETWORK_AVAILABLE} from "../constants";

export const convertAmountToUsdt = (decimals: any, amount: string) => {
  const decimalsNumber = new BigNumber(`1e+${decimals}`);
  const amountNumber = new BigNumber(amount);
  return amountNumber.multipliedBy(decimalsNumber);
};

export const isAllowanceUsdt = (decimals: any, amount: any, allowanceAmount: any) => {
  const amountNumberConvert = convertAmountToUsdt(decimals, amount);
  const allowanceAmountNumber = new BigNumber(allowanceAmount);

  const resultCompare = allowanceAmountNumber.comparedTo(amountNumberConvert);
  return resultCompare === 1 || resultCompare === 0;
};

export const getIconCurrencyUsdt = ({ purchasableCurrency, networkAvailable }: any) => {
  purchasableCurrency = purchasableCurrency + '';
  let currencyIcon = `/images/${purchasableCurrency.toUpperCase()}.png`;
  let currencyName = purchasableCurrency.toUpperCase();
  if (networkAvailable == NETWORK_AVAILABLE.BSC) {
    if ((purchasableCurrency + '').toLowerCase() == ACCEPT_CURRENCY.USDT) {
      currencyIcon = `/images/BUSD.png`;
      currencyName = 'BUSD';
    } else if ((purchasableCurrency + '').toLowerCase() == ACCEPT_CURRENCY.ETH) {
      currencyIcon = `/images/BNB.png`;
      currencyName = 'BNB';
    }
  }
  return {
    currencyIcon,
    currencyName,
  }
};
