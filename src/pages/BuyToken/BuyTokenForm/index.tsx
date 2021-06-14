import React, { Dispatch, SetStateAction, useEffect, useState, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import BigNumber from 'bignumber.js';
import NumberFormat from 'react-number-format';

import TransactionSubmitModal from '../../../components/Base/TransactionSubmitModal';
import Button from '../Button';
import useStyles from './style';

import { getUSDCAddress, getUSDTAddress, getBUSDAddress } from '../../../utils/contractAddress/getAddresses';
import { numberWithCommas } from '../../../utils/formatNumber';
import { BSC_CHAIN_ID, ETH_CHAIN_ID } from '../../../constants/network';
import { PurchaseCurrency } from '../../../constants/purchasableCurrency';
import { TokenType } from '../../../hooks/useTokenDetails';
import getAccountBalance from '../../../utils/getAccountBalance';
import { connectWalletSuccess } from '../../../store/actions/wallet';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useTokenAllowance from '../../../hooks/useTokenAllowance';
import useUserPurchased from '../hooks/useUserPurchased';
import usePoolDepositAction from '../hooks/usePoolDepositAction';
import useTokenApprove from '../../../hooks/useTokenApprove';
import useAuth from '../../../hooks/useAuth';
import { withWidth, isWidthDown, isWidthUp } from '@material-ui/core';
import moment from "moment";
import {
  convertTimeToStringFormat,
  convertTimeToStringFormatWithoutGMT,
  convertUnixTimeToDateTime
} from "../../../utils/convertDate";
import {getIconCurrencyUsdt} from "../../../utils/usdt";
import useTokenSold from "../hooks/useTokenSold";
import {getEtherscanName} from "../../../utils/network";

const REGEX_NUMBER = /^-?[0-9]{0,}[.]{0,1}[0-9]{0,6}$/;

type BuyTokenFormProps = {
  tokenDetails: TokenType | undefined,
  rate: number | undefined,
  poolAddress: string | undefined;
  maximumBuy: number;
  minimumBuy: number;
  poolAmount: number | undefined;
  purchasableCurrency: string | undefined;
  poolId: number | undefined;
  joinTime: Date | undefined;
  method: string | undefined;
  availablePurchase: boolean | undefined;
  ableToFetchFromBlockchain: boolean | undefined
  minTier: number | undefined
  isDeployed: boolean | undefined
  endBuyTimeInDate: Date | undefined
  startBuyTimeInDate: Date | undefined
  endJoinTimeInDate: Date | undefined
  tokenSold: string | undefined
  setBuyTokenSuccess: Dispatch<SetStateAction<boolean>>
  isClaimable: boolean | undefined
  currentUserTier: any,
  alreadyJoinPool: any,
  joinPoolSuccess: boolean,
  existedWinner: any,
  disableAllButton: boolean,
  networkAvailable: string,
}

enum MessageType {
  error = 'error',
  warning = 'warning'
}

const BuyTokenForm: React.FC<BuyTokenFormProps> = (props: any) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [input, setInput] = useState("");
  const [openApproveModal, setApproveModal] = useState(false);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [estimateTokens, setEstimateTokens] = useState<number>(0);
  const [tokenAllowance, setTokenAllowance] = useState<number | undefined>(undefined);
  const [tokenBalance, setTokenBalance] = useState<number>(0);
  const [walletBalance, setWalletBalance] = useState<number>(0);
  const [userPurchased, setUserPurchased] = useState<number>(0);
  const [poolBalance, setPoolBalance] = useState<number>(0);
  const [loadingPoolInfo, setLoadingPoolInfo] = useState<boolean>(false);

  const {
    tokenDetails,
    rate,
    poolAddress,
    maximumBuy,
    purchasableCurrency,
    poolId,
    availablePurchase,
    ableToFetchFromBlockchain,
    /* minTier, */
    isDeployed,
    minimumBuy,
    poolAmount,
    startBuyTimeInDate,
    endBuyTimeInDate,
    endJoinTimeInDate,
    tokenSold,
    setBuyTokenSuccess,
    isClaimable,
    currentUserTier,
    joinPoolSuccess,
    alreadyJoinPool,
    existedWinner,
    disableAllButton,
    networkAvailable,
} = props;

  console.log('maximumBuy11', maximumBuy, rate);

  const { connectedAccount, wrongChain } = useAuth();
  /* const userTier = useTypedSelector(state => state.userTier).data; */
  const { appChainID, walletChainID } = useTypedSelector(state => state.appNetwork).data;
  const connector = useTypedSelector(state => state.connector).data;

  const etherscanName = getEtherscanName({networkAvailable});
  const {
    deposit,
    tokenDepositLoading,
    tokenDepositTransaction,
    depositError,
    tokenDepositSuccess
  } = usePoolDepositAction({ poolAddress, poolId, purchasableCurrency, amount: input, isClaimable, networkAvailable });

  const { currencyIcon, currencyName } = getIconCurrencyUsdt({ purchasableCurrency, networkAvailable });
  const { retrieveTokenAllowance } = useTokenAllowance();
  const { retrieveUserPurchased } = useUserPurchased(tokenDetails, poolAddress, ableToFetchFromBlockchain);

  const getApproveToken = useCallback((appChainID: string) => {
    if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.USDT) {
      return {
        address: getUSDTAddress(appChainID),
        name: "USDT",
        symbol: "USDT",
        decimals: appChainID == ETH_CHAIN_ID ? 6 : 18
      };
    }

    if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.BUSD) {
      return {
        address: getBUSDAddress(appChainID),
        name: "BUSD",
        symbol: "BUSD",
        decimals: 18
      };
    }

    if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.USDC) {
      return {
        address: getUSDCAddress(appChainID),
        name: "USDC",
        symbol: "USDC",
        decimals: appChainID == ETH_CHAIN_ID ? 6 : 18
      };
    }

    if (purchasableCurrency && purchasableCurrency === PurchaseCurrency.ETH) {
      return {
        address: "0x00",
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18
      }
    }
  }, [purchasableCurrency, appChainID])

  const tokenToApprove = getApproveToken(appChainID);

  const { approveToken, tokenApproveLoading, transactionHash } = useTokenApprove(
    tokenToApprove,
    connectedAccount,
    poolAddress,
    false
  );

  const { retrieveTokenBalance } = useTokenBalance(tokenToApprove, connectedAccount);

  // Check if user already buy ICO token at the first time or not ?
  const firstBuy = localStorage.getItem('firstBuy') || undefined;
  let parsedFirstBuy = {} as any;
  if (firstBuy) {
    try {
      parsedFirstBuy = JSON.parse(firstBuy);
    }
    catch (err) {
      console.log(err.message);
    }
  }

  // Check if user already buy at least minimum tokens at the first time
  const connectedAccountFirstBuy =
    connectedAccount
    ? (
       parsedFirstBuy[poolAddress] ? parsedFirstBuy[poolAddress][connectedAccount]: false
    )
    : false;

  const availableMaximumBuy = useMemo(() => {
    // Transform Maximum Buy in USDT tokens to ICO tokens by rate
    const maxBuy = new BigNumber(maximumBuy).minus(new BigNumber(userPurchased).multipliedBy(rate))
      .decimalPlaces(2, BigNumber.ROUND_FLOOR);

    // Check if max buy greater than total ICO coins sold
    if (maxBuy.gt(new BigNumber(tokenBalance))) {
      return (new BigNumber(tokenBalance).gt(0))
        ? new BigNumber(tokenBalance).decimalPlaces(2, BigNumber.ROUND_FLOOR).toFixed()
        : '0';
    }

    return (new BigNumber(maxBuy).gt(0))
      ? (maxBuy.decimalPlaces(2, BigNumber.ROUND_FLOOR).toFixed())
      : '0';
  }, [tokenBalance, maximumBuy, userPurchased, poolAmount, tokenSold, rate]);

  const { retrieveTokenSold, tokenSold: totalUserTokenSold  } = useTokenSold(tokenDetails, poolAddress, ableToFetchFromBlockchain);
  const poolErrorBeforeBuy = useMemo(() => {
    const timeToShowMsg = new Date() > endJoinTimeInDate && new Date() < startBuyTimeInDate;

    // if (
    //   poolBalance
    //   && poolAmount
    //   && startBuyTimeInDate
    //   && endJoinTimeInDate &&
    //   new BigNumber(poolAmount).gt(0) &&
    //   new BigNumber(poolBalance).lt(new BigNumber(poolAmount)) &&
    //   timeToShowMsg
    // ) {
    //   return {
    //     message: `This pool is not ready to buy, please contact the administrator for more information.`,
    //     type: MessageType.warning
    //   };
    // }

    if (minimumBuy && input && new BigNumber(input || 0).lt(minimumBuy) && !connectedAccountFirstBuy && new Date() > startBuyTimeInDate) {
      return {
        message: `The minimum amount you must trade is ${new BigNumber(minimumBuy).toFixed(2)} ${currencyName}.`,
        type: MessageType.error
      }
    }

    if (
      input &&
      new BigNumber(estimateTokens).gt(new BigNumber(poolAmount))
    ) {
      return {
        message: `You can only buy  up to ${numberWithCommas(`${new BigNumber(poolAmount).minus(new BigNumber(totalUserTokenSold)).toFixed()}`)} ${tokenDetails?.symbol}.`,
        type: MessageType.error
      }
    }

    return;
  }, [
    minimumBuy,
    estimateTokens,
    poolBalance,
    poolAmount,
    userPurchased,
    purchasableCurrency,
    input,
    startBuyTimeInDate,
    endJoinTimeInDate,
    connectedAccountFirstBuy
  ]);

  let enableApprove = false;

  // Actually I don't know why i'm doing it right here :)))
  if (tokenAllowance != null || tokenAllowance != undefined) {
    if ((tokenAllowance <= 0 || new BigNumber(tokenAllowance).lt(new BigNumber(input)))
    && (purchasableCurrency && purchasableCurrency !== PurchaseCurrency.ETH)
    && !wrongChain && ableToFetchFromBlockchain && isDeployed
    // && (alreadyJoinPool || joinPoolSuccess)
    && existedWinner && !disableAllButton
    )  {
      enableApprove = true;
    }
  }

  // Check whether current user's tier is valid or not
  /* const validTier = new BigNumber(userTier).gte(minTier); */

  // Check multiple conditions for purchasing time
  const purchasable =
     availablePurchase
     && estimateTokens > 0
     && new BigNumber(input).lte(new BigNumber(maximumBuy))
     && !poolErrorBeforeBuy
     && new BigNumber(input).lte(new BigNumber(maximumBuy).minus(new BigNumber(userPurchased).multipliedBy(rate)))
     && new BigNumber(estimateTokens).lte(new BigNumber(poolAmount).minus(tokenSold))
     && new BigNumber(tokenBalance).gte(new BigNumber(input))
     && !wrongChain
     && !disableAllButton
     /* && validTier */
     && ((purchasableCurrency !== PurchaseCurrency.ETH ? new BigNumber(tokenAllowance || 0).gt(0): true));

  // Fetch User balance
  const fetchUserBalance = useCallback(async () => {
      if (appChainID && connectedAccount && connector) {
        const accountBalance = await getAccountBalance(appChainID, walletChainID, connectedAccount as string, connector);

        dispatch(
          connectWalletSuccess(
            connector,
            [connectedAccount],
            {
              [connectedAccount]: new BigNumber(accountBalance._hex).div(new BigNumber(10).pow(18)).toFixed(5)
            }
          )
        )
      }
  }, [connector, appChainID, walletChainID, connectedAccount]);

  const fetchPoolDetails = useCallback(async () => {
      if (tokenDetails && poolAddress && connectedAccount && tokenToApprove) {
        setTokenAllowance(await retrieveTokenAllowance(tokenToApprove, connectedAccount, poolAddress) as number);
        setUserPurchased(await retrieveUserPurchased(connectedAccount, poolAddress) as number);
        setTokenBalance(await retrieveTokenBalance(tokenToApprove, connectedAccount) as number);
        setWalletBalance(await retrieveTokenBalance(tokenDetails, connectedAccount) as number);
        setPoolBalance(await retrieveTokenBalance(tokenDetails, poolAddress) as number);
      }

  }, [tokenDetails, connectedAccount, tokenToApprove, poolAddress]);

  useEffect(() => {
    if (maximumBuy && userPurchased && rate) {
      const remainingAmount = new BigNumber(maximumBuy).minus(new BigNumber(userPurchased).multipliedBy(rate)).decimalPlaces(2, BigNumber.ROUND_FLOOR);
      remainingAmount.gt(0) && setInput(remainingAmount.toFixed(2));
    }

    return () => {
      setInput("");
    }
  }, [maximumBuy, userPurchased, rate]);

  useEffect(() => {
    const fetchPoolDetailsBlockchain = async () => {
      await fetchPoolDetails();
      setLoadingPoolInfo(false);
    }

    loadingPoolInfo && fetchPoolDetailsBlockchain();
  }, [loadingPoolInfo]);

  // Handle for fetching pool general information 1 time
  useEffect(() => {
    const fetchTokenPoolAllowance = async () => {
      try {
        setLoadingPoolInfo(true);
      } catch (err) {
        setLoadingPoolInfo(false);
      }
    }

    ableToFetchFromBlockchain && connectedAccount && fetchTokenPoolAllowance();
  }, [connectedAccount, ableToFetchFromBlockchain]);

  // Check if has any error when deposit => close modal
  useEffect(() => {
    if (depositError) {
      setOpenSubmitModal(false);
    }
  }, [depositError]);

  // Re-fetch user balance when deposit successful
  useEffect(() => {
    const handleWhenDepositSuccess = async () => {
      setBuyTokenSuccess(true);
      await fetchUserBalance();
      await fetchPoolDetails();
    }

    tokenDepositSuccess && handleWhenDepositSuccess();
  }, [tokenDepositSuccess]);

  useEffect(() => {
    if (tokenDepositTransaction) {
      //  Clear input field and additional information field below and close modal
      setInput("");
      setEstimateTokens(0);

      if (!connectedAccountFirstBuy) {
        localStorage.setItem("firstBuy", JSON.stringify(Object.assign({}, {
          ...parsedFirstBuy,
          [poolAddress as string]: {
            ...parsedFirstBuy[poolAddress],
            [connectedAccount as string]: true
          }
        })));
      }
    }
  }, [tokenDepositTransaction, connectedAccountFirstBuy]);

  useEffect(() => {
    if (input && rate && purchasableCurrency) {
      const tokens = new BigNumber(input).multipliedBy(new BigNumber(1).div(rate)).toNumber()
      const tokenWithDecimal = new BigNumber(tokens).decimalPlaces(6).toNumber();
      console.log('tokens===>', tokens, tokenWithDecimal);
      setEstimateTokens(tokenWithDecimal);
    } else {
      setEstimateTokens(0);
    }
  }, [input, purchasableCurrency, rate]);

  const handleInputChange = async (e: any) => {
    const value = e.target.value.replaceAll(",", "");
    if (value === '' || REGEX_NUMBER.test(value)) {
      setInput(value);
    }
  }

  const handleTokenDeposit = async () => {
    try {
      if (purchasableCurrency && ableToFetchFromBlockchain) {
        setOpenSubmitModal(true);
        setBuyTokenSuccess(false);

        // Call to smart contract to deposit token and refetch user balance
        await deposit();
      }
    } catch (err) {
      setOpenSubmitModal(false);
    }
  }

  const handleTokenApprove = async () => {
    try {
      setApproveModal(true);
      await approveToken();

      if (tokenDetails && poolAddress && connectedAccount && tokenToApprove) {
        setTokenAllowance(await retrieveTokenAllowance(tokenToApprove, connectedAccount, poolAddress) as number);
        setTokenBalance(await retrieveTokenBalance(tokenToApprove, connectedAccount) as number);
      }
    } catch (err) {
      setApproveModal(false);
    }
  }

  console.log('poolAmount--maximumBuy:==========>', poolAmount, maximumBuy, userPurchased, rate);

  return (
    <div className={styles.buyTokenForm}>
      {
        <>
          <p className={styles.buyTokenFormTitle}>
            <div className={styles.allowcationWrap}>
              <span className={styles.allowcationTitle}>Max Allocation: </span>
              <span className={styles.allocationContent}>
                {numberWithCommas(new BigNumber(maximumBuy).toFixed())} {currencyName}
              </span>
            </div>

            <div className={styles.allowcationWrap}>
              <span className={styles.allowcationTitle}>Have Bought: </span>
              <span className={styles.allocationContent}>
                {numberWithCommas(
                  new BigNumber(userPurchased).multipliedBy(rate)
                    .decimalPlaces(2, BigNumber.ROUND_CEIL) // Round UP with 2 decimal places: 1.369999 --> 1.37
                    .toFixed()
                )} {currencyName}
              </span>
            </div>

            <div className={styles.allowcationWrap}>
              <span className={styles.allowcationTitle}>Remaining: </span>
              <span className={styles.allocationContent}>
                {numberWithCommas(
                  new BigNumber(maximumBuy).minus(new BigNumber(userPurchased).multipliedBy(rate)).lte(0)
                    ? '0'
                    : (
                      new BigNumber(maximumBuy).minus(new BigNumber(userPurchased).multipliedBy(rate))
                        .decimalPlaces(2, BigNumber.ROUND_FLOOR) // Round DOWN with 2 decimal places: 1.369999 --> 1.36
                        .toFixed()
                    )
                )} {currencyName}
              </span>
            </div>

            <div className={styles.allowcationWrap}>
              <span className={styles.allowcationTitle}>Tier Buy Time: </span>
              <span className={styles.allocationContent}>
              {!!currentUserTier && !!currentUserTier.start_time && !!currentUserTier.end_time &&
                <>
                  { convertUnixTimeToDateTime(currentUserTier.start_time, 1) }
                  {' '} to {' '}
                  { convertUnixTimeToDateTime(currentUserTier.end_time, 1) }
                </>
              }
              </span>
            </div>

          </p>
        </>
      }
      <div className={styles.buyTokenInputForm}>
        <p className={styles.buyTokenInputLabel}>
          <span>Input</span>
          {isWidthUp('sm', props.width) && <span>Your wallet balance:&nbsp;
            {numberWithCommas(parseFloat(tokenBalance.toString()).toFixed(6))} &nbsp;
            {currencyName}
          </span>}
          {isWidthDown('xs', props.width) && <span>Balance:&nbsp;
            {numberWithCommas(parseFloat(tokenBalance.toString()).toFixed(6))} &nbsp;
            {currencyName}
          </span>}
        </p>
        <div className={styles.buyTokenInputWrapper}>

          <NumberFormat
            className={styles.buyTokenInput}
            placeholder={'0'}
            thousandSeparator={true}
            onChange={handleInputChange}
            decimalScale={6}
            value={input}
            defaultValue={maximumBuy || 0}
            max={tokenBalance}
            min={0}
            maxLength={255}
            disabled={wrongChain}
          />
          <span className={styles.purchasableCurrency}>
            <button
              className={styles.purchasableCurrencyMax}
              onClick={
                () => {
                  setInput(
                    new BigNumber(availableMaximumBuy).decimalPlaces(2, BigNumber.ROUND_FLOOR).toFixed()
                  )
                }
              }
            >
              Max
            </button>
            <img src={currencyIcon} alt={purchasableCurrency} className={styles.purchasableCurrencyIcon} />
            {currencyName}
          </span>
        </div>
      </div>
      <p className={styles.buyTokenFee}>
        Your Balance: {numberWithCommas(`${walletBalance || 0}` )} {tokenDetails?.symbol}
      </p>
      <div className={styles.buyTokenEstimate}>
        <p className={styles.buyTokenEstimateLabel}>You will get approximately</p>
        <strong className={styles.buyTokenEstimateAmount}>{numberWithCommas(`${estimateTokens}`)} {tokenDetails?.symbol}</strong>
      </div>

      {
        <p className={`${poolErrorBeforeBuy?.type === MessageType.error ? `${styles.poolErrorBuy}`: `${styles.poolErrorBuyWarning}`}`}>
          {poolErrorBeforeBuy && poolErrorBeforeBuy.message}
        </p>
      }

      <div className={styles.btnGroup}>
        <Button
        text={new BigNumber(tokenAllowance || 0).gt(0) ? 'Approved': 'Approve'}
        backgroundColor={'#29C08A'}
        disabled={!enableApprove}
        onClick={handleTokenApprove}
        loading={tokenApproveLoading}
        />
        <Button
          text={'Buy'}
          backgroundColor={'#3232DC'}
          disabled={!purchasable}
          onClick={handleTokenDeposit}
          loading={tokenDepositLoading}
        />
      </div>

      {purchasableCurrency !== PurchaseCurrency.ETH &&
        <p className={styles.approveWarning}>{`You need to Approve once (and only once) before you can start purchasing.`}</p>
      }

      <TransactionSubmitModal
        opened={openSubmitModal}
        handleClose={() => { setOpenSubmitModal(false); }}
        transactionHash={tokenDepositTransaction}
      />
      <TransactionSubmitModal
        additionalText={`Please be patient and no need to approve again, you can check the transaction status on ${etherscanName}.`}
        opened={openApproveModal}
        handleClose={() => { setApproveModal(false); }}
        transactionHash={transactionHash}
      />
    </div>
  )
}

export default withWidth()(BuyTokenForm);
