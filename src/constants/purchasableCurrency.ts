export enum PurchaseCurrency {
  USDT = "USDT",
  USDC = "USDC",
  ETH = "ETH",
  BUSD = "BUSD"
}

export type purchaseCurrency = Extract<PurchaseCurrency, PurchaseCurrency.ETH | PurchaseCurrency.USDC | PurchaseCurrency.USDT>;
