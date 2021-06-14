import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import useStyles from './style';
import {numberWithCommas} from '../../../utils/formatNumber';
import {Link} from 'react-router-dom';
import {ACCEPT_CURRENCY, BUY_TYPE, NETWORK} from '../../../constants';
import useFetch from '../../../hooks/useFetch';
import {getIconCurrencyUsdt} from "../../../utils/usdt";
import {PoolStatus} from "../../../utils/getPoolStatus";
import {checkPoolIsFinish, getAccessPoolText, getProgressWithPools, getTokenSold} from "../../../utils/campaign";
import BigNumber from 'bignumber.js';

const dotIcon = '/images/icons/dot.svg'
const EthereumIcon = "/images/ethereum.svg";
const BSCIcon = "/images/bsc.svg";

const Card = (props: any): JSX.Element => {
  const styles = useStyles();
  const {
    pool, autoFetch
  } = props;
  const { data: participants } = useFetch<any>(`/user/counting/${pool.id}`);

  const [progress, setProgress] = useState('0');
  const [tokenSold, setTokenSold] = useState('0');
  const [totalSoldCoin, setTotalSoldCoin] = useState('0');
  useEffect(() => {
    const getTokenProgressInfoByPool = async () => {
      console.log('Run getTokenProgressInfoByPool========>');
      if (autoFetch) {
        pool.tokenSold = await getTokenSold(pool);
      }
      let {
        progress: progressPercent,
        tokenSold: totalTokenSold,
        totalSoldCoin: totalToken,
      } = getProgressWithPools(pool);

      setProgress(progressPercent);
      setTokenSold(totalTokenSold);
      setTotalSoldCoin(totalToken);
    };

    getTokenProgressInfoByPool();
    if (autoFetch) {
      const intervalProgress = setInterval(() => {
        getTokenProgressInfoByPool();
      }, 10000);

      return () => {
        intervalProgress && clearInterval(intervalProgress);
      }
    }
  }, [pool]);

  // useEffect(() => {
  //   const currentTime = moment().unix()
  //   let diffTime = 0;
  //   if(pool.start_join_pool_time > currentTime) {
  //     diffTime = parseInt(pool.start_join_pool_time) - currentTime;
  //   } else if(pool.start_time > currentTime) {
  //     diffTime = parseInt(pool.start_time) - currentTime;
  //   }

  //   let intervalCount: any;
  //   if (diffTime > 0) {
  //     let timeLeftToStart = diffTime * 1000
  //   const interval = 1000;

  //     intervalCount = setInterval(() => {
  //       timeLeftToStart -= interval;
  //       const timeLeftDuration = moment.duration(timeLeftToStart, 'milliseconds');
  //       let timeLeftString = '';
  //       if (timeLeftToStart >= 86400000) {
  //         timeLeftString = 'In ' + timeLeftDuration.days() + " days"
  //       } else {
  //         timeLeftString = 'In ' + timeLeftDuration.hours() + ":" + timeLeftDuration.minutes() + ":" + timeLeftDuration.seconds()
  //       }
  //       setTimeLeft(timeLeftString)
  //     }, interval);
  //   }

  //   return () => clearInterval(intervalCount);
  // }, [])

  const { currencyIcon, currencyName } = getIconCurrencyUsdt({ purchasableCurrency: pool?.accept_currency, networkAvailable: pool?.network_available });

  return (
    <Link to={`/buy-token/${pool.id}`}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <img src={pool.banner} />
          {pool.status == PoolStatus.Closed && <div className="time ended">
            <span>Ended</span>
          </div>}
          {pool.status == PoolStatus.TBA && <div className="time tba">
            <span>TBA</span>
          </div>}
          {pool.status == PoolStatus.Filled && <div className="time filled">
            <span>Filled</span>
          </div>}
          {pool.status == PoolStatus.Progress && <div className="time in-progress">
            <span>In Progress</span>
          </div>}
          {pool.status == PoolStatus.Joining && <div className="time joining">
            <span>Whitelisting</span>
          </div>}
          {pool.status == PoolStatus.Claimable && <div className="time claimable">
            <span>Claimable</span>
          </div>}
          {pool.status == PoolStatus.Upcoming && <div className="time upcoming">
            <span>Upcoming</span>
          </div>}
        </div>
        <div className={styles.cardBody}>
          <div className="card-content__title">
            <img src={pool.token_images} />
            <div>
              <h2>{pool.title}</h2>
              <p>{pool.name}{` (${pool.symbol})`}</p>
            </div>
          </div>
          <ul className="card-content__content">
            <li>
              <span>Rate</span>
              <span className="total">1 {pool.symbol} =&nbsp;

                {pool.accept_currency === ACCEPT_CURRENCY.ETH &&
                  <>
                    {numberWithCommas(pool?.price_usdt, 4)} USD
                  </>
                }

                {pool.accept_currency !== ACCEPT_CURRENCY.ETH &&
                  <>
                    {numberWithCommas(pool?.token_conversion_rate, 4)} {' '}
                    {currencyName}
                    {/*{pool?.accept_currency?.toUpperCase()}*/}
                  </>
                }

                {/*{numberWithCommas(pool.price_usdt, 4)} USDT*/}
                {/*{pool.accept_currency === ACCEPT_CURRENCY.ETH ?*/}
                {/*  numberWithCommas(pool.ether_conversion_rate, 4) :*/}
                {/*  numberWithCommas(pool.token_conversion_rate, 4)} {pool.accept_currency.toUpperCase()}*/}
              </span>
            </li>
            <li>
              <span>Participants</span>
              <span className="total">{ pool.buy_type == BUY_TYPE.WHITELIST_LOTTERY ? numberWithCommas(participants) : 'All' }</span>
            </li>
            <li>
              <span>Access</span>
              <span className="total">
                {
                  getAccessPoolText(pool)
                }
              </span>
            </li>
            <li>
              <span>Network</span>
              <span className="total">
                {pool.network_available === NETWORK.ETHEREUM ? <img src={EthereumIcon} /> : <img src={BSCIcon} />}
              </span>
            </li>
          </ul>

          {/* {pool.status == POOL_STATUS.UPCOMMING && <div className="token-area">
            {pool.network_available === NETWORK.ETHEREUM && <div>
              <img src={EthereumIcon} />
              <span>Ethereum</span>
            </div>}
            {pool.network_available === NETWORK.BSC && <div>
              <img src={BSCIcon}/>
              <span>BSC</span>
            </div>}
          </div>} */}

          <div className="progress-area">
            <p>Progress</p>
            <div className="progress">
              <span
                className={`current-progress ${parseFloat(progress) > 0 ? '' : 'inactive'}`}
                style={{ width: `${parseFloat(progress) > 99 ? 100 : Math.round(parseFloat(progress))}%` }}
              ></span>
            </div>
            <div>
              <div>
                <span>
                  {new BigNumber(progress).gte(100) ?
                    new BigNumber(progress).toFixed(0) :
                    new BigNumber(progress).toFixed(2)
                  }
                  %
                </span>
              </div>
              <span>
                {numberWithCommas(tokenSold, 0)}
                /
                {numberWithCommas(totalSoldCoin)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
