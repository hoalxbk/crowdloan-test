import React, {useEffect, useState} from 'react';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import useStyles from './style';
import moment from "moment";
import {unixTimeNow} from "../../utils/convertDate";

const minuteSeconds = 60;
const hourSeconds = 3600;
const daySeconds = 86400;

const timerProps = {
  isPlaying: true,
  size: 150,
  strokeWidth: 8,
  // trailColor: '#FFCC00',
  trailColor: 'white',
};

const getTimeSeconds = (time: any) => (minuteSeconds - time) | 0;
const getTimeMinutes = (time: any) => ((time % hourSeconds) / minuteSeconds) | 0;
const getTimeHours = (time: any) => ((time % daySeconds) / hourSeconds) | 0;
const getTimeDays = (time: any) => (time / daySeconds) | 0;

const CountDownCounter = (props: any) => {
  const styles = useStyles();
  const renderTime = (dimension: any, time: any) => {
    return (
      <div className={styles.timeWrapper}>
        <div className={styles.timeText}>{time < 10 ? '0' + time : time}</div>
        <div className={styles.timeDimension}>{dimension}</div>
      </div>
    );
  };

  const startTime = unixTimeNow(); // use UNIX timestamp in seconds
  const countdown = moment(props.countdown || new Date());
  let endTime = countdown.unix(); // use UNIX timestamp in seconds

  const remainingTime = endTime - startTime;
  const days = Math.ceil(remainingTime / daySeconds);
  const daysDuration = days * daySeconds;

  // @ts-ignore
  return (
    <div className={styles.timers}>
      <CountdownCircleTimer
        {...timerProps}
        // colors={[["#7E2E84"]]}
        // colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        colors={'#FFCC00'}
        duration={daysDuration}
        initialRemainingTime={remainingTime}
      >
        {({ elapsedTime }) => {
          return renderTime("days", getTimeDays(daysDuration - (elapsedTime || 0)))
        }}
      </CountdownCircleTimer>

      <CountdownCircleTimer
        {...timerProps}
        colors={'#FFCC00'}
        duration={daySeconds}
        initialRemainingTime={remainingTime % daySeconds}
        onComplete={(totalElapsedTime) => {
          return [
            remainingTime - totalElapsedTime > hourSeconds,
            0
          ]
        }}
      >
        {({ elapsedTime }) =>
          renderTime("hours", getTimeHours(daySeconds - (elapsedTime || 0)))
        }
      </CountdownCircleTimer>


      <CountdownCircleTimer
        {...timerProps}
        colors={'#FFCC00'}
        duration={hourSeconds}
        initialRemainingTime={remainingTime % hourSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > minuteSeconds,
          0
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("minutes", getTimeMinutes(hourSeconds - (elapsedTime || 0)))
        }
      </CountdownCircleTimer>

      <CountdownCircleTimer
        {...timerProps}
        colors={'#FFCC00'}
        duration={minuteSeconds}
        initialRemainingTime={remainingTime % minuteSeconds}
        onComplete={(totalElapsedTime) => [
          remainingTime - totalElapsedTime > 0,
          0
        ]}
      >
        {({ elapsedTime }) =>
          renderTime("seconds", getTimeSeconds(elapsedTime))
        }
      </CountdownCircleTimer>
    </div>

  );
};

export default CountDownCounter;
