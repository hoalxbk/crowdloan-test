import _ from "lodash";
import moment from "moment";
import BigNumber from 'bignumber.js';
import {BUY_TYPE, NFT_PLUS_AMOUNT_PRODUCTION, POOL_IS_PRIVATE} from "../constants";
import {convertFromWei, getPoolContract} from "../services/web3";

export const checkIsFinishTime = (campaignDetail: any): boolean => {

  console.log('campaignDetail', campaignDetail);

  const closeTime = _.get(campaignDetail, 'closeTime', '');
  let isFinish = false;
  if (closeTime) {
    const closeTimeDate = moment.unix(parseInt(closeTime)).toDate();
    const currentDate = new Date();
    if (currentDate >= closeTimeDate) {
      isFinish = true;
    }
  }

  return isFinish;
};

export const getTokenRemainingCanBuy = (campaignDetail: any): string => {
  if (!campaignDetail) return '0';
  const tokenLeft = _.get(campaignDetail, 'tokenLeft', 0);
  const tokenClaimed = _.get(campaignDetail, 'tokenClaimed', 0);
  let remainTokenAvailable = new BigNumber(tokenLeft).plus(tokenClaimed);

  return remainTokenAvailable.toFixed();
};

export const checkIsBetweenCloseTimeAndReleaseTime = (campaignDetail: any): boolean => {
  const closeTime = _.get(campaignDetail, 'closeTime', '');
  const releaseTime = _.get(campaignDetail, 'releaseTime', '');

  let isBetween = false;
  if (closeTime && releaseTime) {
    const closeTimeDate = moment.unix(parseInt(closeTime)).toDate();
    const releaseTimeDate = moment.unix(parseInt(releaseTime)).toDate();
    const currentDate = new Date();
    if (closeTimeDate <= currentDate && currentDate < releaseTimeDate) {
      isBetween = true;
    }
  }

  return isBetween;
};

export const getAccessPoolText = (pool: any) => {
  if (!pool) return '';
  const isPrivate = pool?.is_private || pool?.isPrivate;
  const buyType = pool?.buy_type || pool?.buyType || pool?.method;
  if (isPrivate == POOL_IS_PRIVATE.PRIVATE) {
    return 'Private';
  }
  return ((buyType + '').toLowerCase() == BUY_TYPE.WHITELIST_LOTTERY ? "Whitelist/Lottery" : BUY_TYPE.FCFS.toUpperCase());
};

export const calculateTokenSoldWhenFinish = (totalSoldCoin: string | number) => {
  const result = new BigNumber(totalSoldCoin).minus(
    new BigNumber(totalSoldCoin).div(10000)
  ).toFixed();
  return result;
};

export const getProgressWithPools = (pool: any) => {
  let tokenSold = pool.tokenSold || pool.token_sold || '0';
  let totalSoldCoin = pool.totalSoldCoin || pool.total_sold_coin || '0';
  let progress = '0';

  const isFinish = checkPoolIsFinish(pool);
  if (isFinish) {
    return {
      progress: '100',
      tokenSold: calculateTokenSoldWhenFinish(totalSoldCoin),
      totalSoldCoin: totalSoldCoin,
    }
  }

  if (pool.id == 22) {
    return {
      progress: '100',
      tokenSold: '500000',
      totalSoldCoin: '500000',
    };
  }

  // Normal Case
  if (new BigNumber(tokenSold).gt(totalSoldCoin)) { // If tokenSold > totalSoldCoin ==> tokenSold = totalSoldCoin
    tokenSold = totalSoldCoin;
  }
  progress = new BigNumber(tokenSold).div(totalSoldCoin).multipliedBy(100).toFixed();

  if (new BigNumber(progress).lte(0)) {
    progress = '0';
  }
  if (new BigNumber(progress).gt(99)) {
    progress = '100';
  }

  return {
    progress,
    tokenSold,
    totalSoldCoin,
  }
};

export const checkPoolIsFinish = (pool: any) => {
  const currentTime = moment().unix();
  return (pool.finish_time && currentTime > pool.finish_time);
};

export const getTokenSold = async (pool: any) => {
  let result = '0';
  try {
    const networkAvailable = pool.network_available || pool.networkAvailable;
    const poolHash = pool.campaign_hash || pool.campaignHash;
    if (poolHash == 'Token contract not available yet.') {
      return '0';
    }

    const contract = getPoolContract({ networkAvailable, poolHash });
    if (contract) {
      result = await contract.methods.tokenSold().call();
      result = convertFromWei(result.toString());
    }
  } catch (error) {
    console.log(error);
  }
  return result;
}
