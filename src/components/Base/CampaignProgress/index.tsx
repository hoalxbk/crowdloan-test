import React from 'react';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';
import {Button, Tooltip } from '@material-ui/core';
import { getShortNumberBuyDecimals  } from '../../../utils/formatNumber';
import { getShortTokenSymbol  } from '../../../utils/token';

import useStyles from './style';
import {publicRoute} from "../../../utils";

interface CampaignProgressProps {
  campaign: {
    tokenSold: number;
    tokenLeft: number;
    totalTokens: number;
    tokenSymbol?: string;
    tokenClaimed?: number;
    ethRaised?: number;
  };

  className?: string;
  buyNow?: string;
}

const CampaignProgress: React.FC<CampaignProgressProps> = (props: CampaignProgressProps) => {
  const classes = useStyles();
  const mainClass = classes.campaignProgress;

  const {
    campaign,
    className = '',
    buyNow
  } = props;

  const {
    totalTokens,
    tokenSold,
    tokenLeft,
    tokenSymbol = '',
    tokenClaimed = 0,
  } = campaign;

  let progress = 0;
  if (totalTokens) {
    const tokenSoldNumber = new BigNumber(tokenSold);
    const totalTokensNumber = new BigNumber(totalTokens).plus(tokenClaimed);
    // console.log('totalTokens', totalTokens, tokenSoldNumber.toFixed(), totalTokensNumber.toFixed(), tokenLeft);

    progress = 100 * tokenSoldNumber.div(totalTokensNumber).toNumber();
  }

  const progressStyleObject = {
    width: `${progress}%`,
  };

  const tokenLeftNumber = new BigNumber(tokenLeft).plus(tokenClaimed).toFixed();

  return (
    <div className={`${mainClass} ${className}`}>
      <div className={`${mainClass}__left`}>
          <div className={`${mainClass}__left-value`}>
            <Tooltip title={<p style={{ fontSize: 15 }}>{getShortNumberBuyDecimals(tokenLeftNumber)} {tokenSymbol}</p>}>
              <div className={` ${mainClass}__left-value--flex`}>
                {getShortNumberBuyDecimals(tokenLeftNumber)}
                <span className={`${mainClass}__left-title`}>
                  {getShortTokenSymbol(tokenSymbol)} Left
                </span>
              </div>
            </Tooltip>
          </div>
      </div>

      <div className={`${mainClass}__progress`}>
        <div className={`${mainClass}__progress-sold`} style={progressStyleObject} />
      </div>

      <div className={`${mainClass}__explication`}>
        <div className={`${mainClass}__explication-item`}>
          <div className={`${mainClass}__explication-item-bar sold`}></div>
          <div className={`${mainClass}__explication-item-detail`}>
            <div className={`${mainClass}__explication-item-detail-subtitle`}>
              Coins sold
            </div>
            <div className={`${mainClass}__explication-item-detail-title`}>
              <Tooltip title={<p style={{ fontSize: 15 }}>{`${getShortNumberBuyDecimals(tokenSold)} ${tokenSymbol}`}</p>}>
                <span>
                  {getShortNumberBuyDecimals(tokenSold)} &nbsp;
                  {getShortTokenSymbol(tokenSymbol)}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>

        <div className={`${mainClass}__explication-item`}>
          <div className={`${mainClass}__explication-item-bar total`}></div>
          <div className={`${mainClass}__explication-item-detail`}>
            <div className={`${mainClass}__explication-item-detail-subtitle`}>
              Total coins need to sold out
            </div>
            <div className={`${mainClass}__explication-item-detail-title`}>
              <Tooltip title={<p style={{ fontSize: 15 }}>{`${getShortNumberBuyDecimals(totalTokens)} ${tokenSymbol}`}</p>}>
                  <span>
                    {getShortNumberBuyDecimals(new BigNumber(totalTokens).plus(tokenClaimed).toFixed())} &nbsp;
                    {getShortTokenSymbol(tokenSymbol)}
                  </span>
              </Tooltip>
            </div>
          </div>
        </div>
        {
          buyNow && (
          <div className={`${mainClass}__explication-item`}>
            <Button endIcon={<span className='iconButton'><img src="/images/icon-right-arrow.svg" alt="right-arrow"/></span>}
                className={classes.buttonGoto}>
              <Link to={publicRoute(`/buy-token?campaignId=${buyNow}`)}>Buy Now</Link>
            </Button>
          </div>
          )
        }
      </div>
    </div>
  );
};

export default CampaignProgress;
