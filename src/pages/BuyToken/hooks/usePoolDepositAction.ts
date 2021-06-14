import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';

import useUserPurchaseSignature from '../hooks/useUserPurchaseSignature';
import useWalletSignature from '../../../hooks/useWalletSignature';
import { alertSuccess, alertFailure } from '../../../store/actions/alert';
import Pool_ABI from '../../../abi/Pool.json';
import PreSalePool from '../../../abi/PreSalePool.json';
import { getContract } from '../../../utils/contract';
import { TRANSACTION_ERROR_MESSAGE } from '../../../constants/alert';
import {fixGasLimitWithProvider} from "../../../utils";

type PoolDepositActionParams = {
  poolAddress?: string;
  poolId?: number;
  purchasableCurrency: string;
  amount: string;
  isClaimable: boolean;
  networkAvailable: string;
}

const USDT_ADDRESS = process.env.REACT_APP_USDT_SMART_CONTRACT;
const USDC_ADDRESS = process.env.REACT_APP_USDC_SMART_CONTRACT;
const USDT_OR_USDC_DECIMALS = 6;

const usePoolDepositAction = ({ poolAddress, poolId, purchasableCurrency, amount, isClaimable, networkAvailable }: PoolDepositActionParams) => {
  const dispatch = useDispatch();

  const [depositError, setDepositError] = useState("");
  const [tokenDepositTransaction, setTokenDepositTransaction] = useState<string>("");
  const [tokenDepositLoading, setTokenDepositLoading] = useState<boolean>(false);
  const [tokenDepositSuccess, setTokenDepositSuccess] = useState<boolean>(false);

  const { account: connectedAccount, library } = useWeb3React();
  const { error, signMessage, signature: authSignature, setSignature } = useWalletSignature();
  const { signature, minBuy, maxBuy, error: buyError, setSignature: setUserPurchasedSignature } = useUserPurchaseSignature(connectedAccount, poolId, authSignature);

  useEffect(() => {
    poolAddress &&
    purchasableCurrency &&
    signature &&
    minBuy &&
    maxBuy &&
    !depositError &&
    depositWithSignature(poolAddress, purchasableCurrency, amount, signature, `${minBuy}`, maxBuy);
  }, [signature, poolAddress, purchasableCurrency, amount, minBuy, maxBuy, depositError]);


  useEffect(() => {
    if (error || buyError) {
      const errorMessage = error || buyError;
      setDepositError(errorMessage as string);
      setTokenDepositLoading(false);
      setSignature("");
      setUserPurchasedSignature("");
    }
  }, [error, buyError]);

  const depositWithSignature = useCallback(async (
    poolAddress: string,
    acceptCurrency: string,
    amount: string,
    signature: string,
    minBuy: string,
    maxBuy: string
  ) => {
    try {
      if (minBuy && maxBuy && signature && amount) {
        const abiUse = isClaimable ? PreSalePool: Pool_ABI;
        const poolContract = getContract(poolAddress, abiUse, library, connectedAccount as string);

        const method = acceptCurrency === 'ETH' ? 'buyTokenByEtherWithPermission': 'buyTokenByTokenWithPermission';
        let decimals = 6;
        const isBSC = networkAvailable == 'bsc';
        if (isBSC) {
          if (acceptCurrency == 'ETH') {
            decimals = 18;
          } else if (acceptCurrency == 'USDT') {
            decimals = 18;
          } else if (acceptCurrency == 'USDC') {
            decimals = 18;
          }
        } else {
          if (acceptCurrency == 'ETH') {
            decimals = 18;
          } else if (acceptCurrency == 'USDT') {
            decimals = 6;
          } else if (acceptCurrency == 'USDC') {
            decimals = 6;
          }
        }

        let buyCurr = 'ETH';
        if (isBSC) {
          if (acceptCurrency === "USDT") {
            buyCurr = process.env.REACT_APP_USDT_BSC_SMART_CONTRACT || '';
          } else if (acceptCurrency === "USDC") {
            buyCurr = process.env.REACT_APP_USDC_BSC_SMART_CONTRACT || '';
          }
        } else {
          if (acceptCurrency === "USDT") {
            buyCurr = process.env.REACT_APP_USDT_SMART_CONTRACT || '';
          } else if (acceptCurrency === "USDC") {
            buyCurr = process.env.REACT_APP_USDC_SMART_CONTRACT || '';
          }
        }

        const params = acceptCurrency === 'ETH' ? [
          connectedAccount,
          connectedAccount,
          maxBuy,
          minBuy,
          signature,
          {
            value: new BigNumber(amount).multipliedBy(10 ** 18).toFixed()
          }
        ]: [
          connectedAccount,
          // acceptCurrency === "USDT" ? USDT_ADDRESS: USDC_ADDRESS,
          buyCurr,
          new BigNumber(amount).multipliedBy(10 ** decimals).toFixed(),
          connectedAccount,
          maxBuy,
          minBuy,
          signature
        ];

        // let overrides = fixGasLimitWithProvider(library, 'buy');
        const transaction = await poolContract[method](...params);

        setUserPurchasedSignature("");
        setSignature("");
        setTokenDepositTransaction(transaction.hash);

        await transaction.wait(1);

        dispatch(alertSuccess("Token Deposit Successful!"));
        setTokenDepositLoading(false);
        setTokenDepositSuccess(true);

      }
    } catch (err) {
      console.log('[ERROR] - depositWithSignature:', err);
      dispatch(alertFailure(TRANSACTION_ERROR_MESSAGE));
      setDepositError(TRANSACTION_ERROR_MESSAGE);
      setTokenDepositLoading(false);
      setSignature("");
      setUserPurchasedSignature("");
    }
  }, [minBuy, maxBuy, poolAddress, isClaimable]);

  const deposit = useCallback(async () => {
    if (amount && new BigNumber(amount).gt(0) && poolAddress) {
      try {
        setTokenDepositTransaction("");
        setDepositError("");
        setTokenDepositLoading(true);
        setTokenDepositSuccess(false);

        await signMessage();
      } catch (err) {
        console.log('[ERROR] - deposit:', err);
        dispatch(alertFailure(TRANSACTION_ERROR_MESSAGE));
        setDepositError(TRANSACTION_ERROR_MESSAGE);
        setSignature("");
        setTokenDepositLoading(false);
      }
    }
  }, [connectedAccount, library, poolAddress, amount])

  // const estimateFee = useCallback(async (amount: string, acceptCurrency: string) => {
  //   try {
  //     setEstimateFeeLoading(true);

  //     if (amount && new BigNumber(amount).gt(0) && poolAddress && acceptCurrency) {
  //       const gasPrice = await library.getGasPrice();
  //       const poolContract = getContract(poolAddress, Pool_ABI, library, connectedAccount as string);
  //       const gasPriceCal = new BigNumber(gasPrice._hex).div(new BigNumber(10).pow(18));

  //       const params = acceptCurrency === 'ETH' ? [
  //         connectedAccount,
  //         connectedAccount,
  //         "100000000000",
  //         "100000000000",
  //         "0x450859e7066471c9e38a481908e3547240285db6af24eed2615a3d825f043e5052bffc0815e98b6a4365526307e2f18b9552bb747739789d624ea666e4fb87ea1b",
  //         {
  //           value: new BigNumber(amount).multipliedBy(10 ** 18).toFixed()
  //         }
  //       ]: [
  //         connectedAccount,
  //         acceptCurrency ===  "USDT" ? USDT_ADDRESS: USDC_ADDRESS,
  //         new BigNumber(amount).multipliedBy(10 ** 18).toFixed(),
  //         connectedAccount,
  //         "100000000000",
  //         "299999999990",
  //         "0x450859e7066471c9e38a481908e3547240285db6af24eed2615a3d825f043e5052bffc0815e98b6a4365526307e2f18b9552bb747739789d624ea666e4fb87ea1b"
  //       ];

  //       const method = acceptCurrency === 'ETH' ? 'buyTokenByEtherWithPermission': 'buyTokenByTokenWithPermission';

  //       const estimateFee = await poolContract.estimateGas[method](...params);

  //       setEstimateErr("");
  //       setEstimateFeeLoading(false);

  //       return new BigNumber(estimateFee._hex).multipliedBy(gasPriceCal).toNumber();
  //     } else {
  //       setEstimateErr("");
  //       setEstimateFeeLoading(false);
  //       return 0;
  //     }

  //   } catch(err) {
  //     console.error(err.message);
  //     setEstimateFeeLoading(false);
  //     setEstimateErr(err.message);
  //   }
  // }, [poolAddress, connectedAccount]);

  return {
    tokenDepositSuccess,
    deposit,
    tokenDepositLoading,
    tokenDepositTransaction,
    setTokenDepositTransaction,
    setTokenDepositLoading,
    depositError,
  };
}

export default usePoolDepositAction;
