import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import useStyles from './style';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { POOL_STATUS, NETWORK, POOL_TYPE, ACCEPT_CURRENCY, BUY_TYPE } from '../../../constants';
import { numberWithCommas } from '../../../utils/formatNumber';
import useCommonStyle from '../../../styles/CommonStyle';

const PoolMobile = (props: any): JSX.Element => {
  const styles = useStyles();
  const commonStyle = useCommonStyle();
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);

  const {
    pool
  } = props

  useEffect(() => {
    setProgress(pool.tokenSold * 100 / pool.total_sold_coin || 0);
  }, [pool.tokenSold])

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
      case POOL_STATUS.CLOSED:
        return <div className="closed"><span>Closed</span></div>
      case POOL_STATUS.FILLED:
        return <div className="filled"><span>Filled</span></div>
      case POOL_STATUS.IN_PROGRESS:
        return <div className="in-progress"><span>In Progress</span></div>
      case POOL_STATUS.JOINING:
        return <div className="joining"><span>Joining</span></div>
      default:
        return <div className="up-comming"><span>Up comming</span></div>
    }
  }

  return (
    <Link to={`/buy-token/${pool.id}`} className={styles.link}>
      <div className={styles.row}>
        <div className={styles.name}>
          <img src={pool.token_images} />
          <span className={commonStyle.nnb1418d}>{pool.title}</span>
        </div>
        <div className="group">
          <div className="title">Ratio</div>
          <div className={styles.ratio + ' ' + commonStyle.nnn1424h}>
            {pool.accept_currency === ACCEPT_CURRENCY.ETH ?
              numberWithCommas(pool.ether_conversion_rate, 4) :
              numberWithCommas(pool.token_conversion_rate, 4)} {pool.accept_currency.toUpperCase()}
          </div>
        </div>
        <div className="group">
          <div className="title">Access</div>
          <div className={styles.poolType + ' ' + commonStyle.nnn1424h}>
            {pool.pool_type === BUY_TYPE.WHITELIST_LOTTERY ? 'Whitelist Lottery' : 'FCFS'}
          </div>
        </div>
        <div className="group">
          <div className="title">
            Progress
            <span className={commonStyle.nnb1418d}>{`${progress.toFixed(2)}%`}</span>
          </div>
          <div className={styles.progress}>
            <div className="progress">
              <span className={`current-progress ${progress !== 0 ? '' : 'inactive'}`} style={{ width: `${progress > 100 ? 100 : Math.round(progress)}%` }}></span>
            </div>
          </div>
        </div>
        <div className="group">
          <div className="title">Status</div>
          <div className={styles.status}>
            {poolStatus()}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PoolMobile;
