import React from 'react';
import { Tooltip } from '@material-ui/core';
import { getShortNumberBuyDecimals } from '../../../utils/formatNumber';

import useStyles from './style';

interface ExchangeRateProps {
  from: string;
  to: string;
  rate: number;
}

const ExchangeRate: React.FC<ExchangeRateProps> = (props: ExchangeRateProps) => {
  const styles = useStyles();

  const { from, to , rate } = props;

  return (
    <div className={`${styles.groupShowRate} ${styles.formControlFlex}`}>
      <div className={styles.formControlFlexBlock}>
        <label className={`${styles.formControlLabel} ${styles.formControlBlurLabel}`}>You have</label>
        <div className={styles.formControlRate}>
          <input
            type="number"
            name="ethFor"
            disabled={true}
            value={1}
            className={`${styles.formInputBox} ${styles.formInputBoxEther}`}
          />
          <button disabled className={styles.box}>{from}</button>
        </div>
      </div>
      <img className={styles.formControlIcon} src="/images/icon-exchange.svg" alt="" />
      <div className={styles.formControlFlexBlock}>
        <label className={`${styles.formControlLabel} ${styles.formControlBlurLabel}`}>You get*</label>
        <div className={styles.formControlRate}>
          <Tooltip title={<p className={styles.valueGroupShowTooltip}>{getShortNumberBuyDecimals(rate)}</p>}>
            <input
              type="text"
              name="tokenByETH"
              disabled={true}
              className={`${styles.formInputBox} ${styles.formInputBoxBS}`}
              value={getShortNumberBuyDecimals(rate)}
            />
          </Tooltip>
          <Tooltip title={<p className={styles.valueGroupShowTooltip}>{to}</p>}>
            <button onClick={(e: any) => e.preventDefault()} className={`${styles.box} ${styles.boxEther}` }>{to}</button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default ExchangeRate;
