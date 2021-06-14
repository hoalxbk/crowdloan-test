import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import useStyles from './style';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { POOL_STATUS, NETWORK, POOL_TYPE, ACCEPT_CURRENCY, BUY_TYPE } from '../../../constants';
import { numberWithCommas } from '../../../utils/formatNumber';
import useCommonStyle from '../../../styles/CommonStyle';
import {getIconCurrencyUsdt} from "../../../utils/usdt";
import {PoolStatus} from "../../../utils/getPoolStatus";
import {getAccessPoolText, getProgressWithPools, getTokenSold} from "../../../utils/campaign";
import BigNumber from 'bignumber.js';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Pool = (props: any): JSX.Element => {
  const styles = useStyles();
  const commonStyle = useCommonStyle();
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);

  const {
    pool
  } = props

  useEffect(() => {
    const getTokenSoldByPool = async () => {
      let resTokenSold = '0';
      if (pool.is_deploy) {
        const tokenSold = await getTokenSold(pool);
        console.log('pool45', pool.id, pool, tokenSold);
        resTokenSold = tokenSold;
      }

      console.log('resTokenSold==>: ', resTokenSold);
      let { progress: progressPercent, tokenSold, totalSoldCoin } = getProgressWithPools({
        ...pool,
        tokenSold: resTokenSold,
      });
      setProgress(parseFloat(progressPercent));
      console.log('Progress: ', progressPercent);
    };

    getTokenSoldByPool();
    const intervalProgress = setInterval(() => {
      getTokenSoldByPool();
    }, 20000);

    return () => {
      intervalProgress && clearInterval(intervalProgress);
    }

  }, [pool])

  useEffect(() => {
    const currentTime = moment().unix()
    var diffTime = parseInt(pool.start_time) - currentTime;
    let intervalCount: any;
    if (diffTime > 0) {
      let timeLeftToStart = diffTime * 1000
      const interval = 1000;

      intervalCount = setInterval(() => {
        timeLeftToStart -= interval;
        const timeLeftDuration = moment.duration(timeLeftToStart, 'milliseconds');
        let timeLeftString = '';
        if (timeLeftToStart >= 86400000) {
          timeLeftString = 'In ' + timeLeftDuration.days() + " days"
        } else {
          timeLeftString = 'In ' + timeLeftDuration.hours() + ":" + timeLeftDuration.minutes() + ":" + timeLeftDuration.seconds()
        }
        setTimeLeft(timeLeftString)
      }, interval);
    }

    return () => clearInterval(intervalCount);
  }, [])

  const poolStatus = () => {
    switch(pool.status) {
      case PoolStatus.TBA:
        return <div className="tba"><span>TBA</span></div>
      case PoolStatus.Upcoming:
        return <div className="up-comming"><span>Upcoming</span></div>
      case PoolStatus.Joining:
        return <div className="joining"><span>Whitelisting</span></div>
      case PoolStatus.Progress:
        return <div className="in-progress"><span>Inprogress</span></div>
      case PoolStatus.Filled:
        return <div className="filled"><span>Filled</span></div>
      case PoolStatus.Closed:
        return <div className="closed"><span>Ended</span></div>
      case PoolStatus.Claimable:
        return <div className="claimable"><span>Claimable</span></div>
      default:
        return <div className="up-comming"><span>{pool.status}</span></div>
    }
  };

  const { currencyIcon, currencyName } = getIconCurrencyUsdt({ purchasableCurrency: pool?.accept_currency, networkAvailable: pool?.network_available });

  return (
    <td>
      <Link to={`/buy-token/${pool.id}`} className={styles.link}>
        <div className={styles.row}>
          <div className={styles.name}>
            <img src={pool.token_images} />
            <span className={commonStyle.nnb1418d}>{pool.title}</span>
          </div>
          <div className={styles.ratio + ' ' + commonStyle.nnn1424h}>
            {pool.accept_currency === ACCEPT_CURRENCY.ETH &&
              <>
                {`${numberWithCommas(pool?.price_usdt, 4)} USD`}
              </>
            }
            {pool.accept_currency !== ACCEPT_CURRENCY.ETH &&
              <>
                {numberWithCommas(pool?.token_conversion_rate, 4)} {currencyName}
              </>
            }

            {/*{pool.accept_currency === ACCEPT_CURRENCY.ETH ?*/}
            {/*  numberWithCommas(pool.ether_conversion_rate, 4) :*/}
            {/*  numberWithCommas(pool.token_conversion_rate, 4)} {pool?.accept_currency?.toUpperCase()}*/}
          </div>
          <div className={styles.poolType + ' ' + commonStyle.nnn1424h}>
            {getAccessPoolText(pool)}
          </div>
          <div className={styles.progress}>
            <span className={commonStyle.nnb1418d}>{`${new BigNumber(progress).toFixed(2)}%`}</span>
            <div className="progress">
              <span
                className={`current-progress ${progress > 0 ? '' : 'inactive'}`}
                style={{ width: `${new BigNumber(progress).toFixed(2)}%` }}
              ></span>
            </div>
          </div>
          <div className={styles.status}>
            {poolStatus()}
          </div>
        </div>
      </Link>
    </td>
  );
};

export default Pool;
