import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import { TIERS, CONVERSION_RATE } from '../../../constants';
import useStyles from './style';
import withWidth, {isWidthDown, isWidthUp} from '@material-ui/core/withWidth';

const swapIcon = '/images/icons/swap.svg';

const Tiers = (props: any) => {
  const styles = useStyles();

  const {data: rates} = useSelector((state: any) => state.rates);

  return (
    <div className={styles.tierInfomation}>
      <div className={styles.conversionRate}>
        <h3 className="title">Conversion Rate</h3>
        {rates.data && rates.data.map((rate: any) => {
          return <div className="group" key={rate.symbol}>
            <span>1 {rate.name}</span>
            <img src={swapIcon}/>
            <span>{rate.rate} PKF</span>
          </div>
        })}
      </div>
    </div>
  );
};

export default withWidth()(Tiers);
