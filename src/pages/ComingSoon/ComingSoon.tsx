import React, {useEffect, useState} from 'react';
import moment from "moment";
import {withRouter} from "react-router-dom";

import useStyles from './style';
import Logo from '../InvestorLayout/Logo';
import CountDownCounter from './CountDownCounter';
import {unixTimeNow} from '../../utils/convertDate';

const ComingSoon = (props: any) => {
  const campaignDetail = props.campaignDetail;  // Campaign Detail from BuyToken Page
  const styles = useStyles();
  const countdown = props.countdown;
  const countDownUnix = moment(countdown || new Date()).unix();

  useEffect(() => {
    const clockInterval = setInterval(() => {
      const now = unixTimeNow();
      if (now >= countDownUnix) {
        window.location.reload();
      }
    }, 1000);

    return () => {
      clearInterval(clockInterval);
    }
  }, []);

  // @ts-ignore
  return (
    <div className={styles.comingSoonWrapper}>
      <div className={styles.countdownWrapper}>
        <div className={styles.starterCommingSoon}>
          <Logo/>
          <div className={styles.comingsoonText}>Coming Soon</div>
        </div>

        {!!countdown &&
          <CountDownCounter
            countdown={countdown}
            campaignDetail={campaignDetail}
          />
        }

        {campaignDetail &&
          <div className={styles.campaignNext}>
            We Are Getting Ready To Launch &nbsp;<span className={styles.campaignTitle}>{campaignDetail.title}</span>&nbsp; Campaign!
          </div>
        }
      </div>
    </div>
  );
};


export default withRouter(ComingSoon);
