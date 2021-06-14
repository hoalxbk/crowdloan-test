import React, {useState} from 'react';
import useStyles from "../style";
import Tooltip from "@material-ui/core/Tooltip";
import {ACCEPT_CURRENCY} from "../../../constants";
import BigNumber from "bignumber.js";
import {getIconCurrencyUsdt} from "../../../utils/usdt";

function ExchangeRateUsdtRow(props: any) {
  const styles = useStyles();
  const {
    poolDetail, poolDetails, key, label, force,
  } = props;
  const [showRateReserveUSDT, setShowRateReverseUSDT] = useState<boolean>(false);

  const { currencyIcon, currencyName } = getIconCurrencyUsdt(poolDetails);
  const tokenDetails = poolDetails?.tokenDetails;

  let reverseRate = `1 ${tokenDetails.symbol} = ${poolDetails?.ethRate} ${currencyName}`;
  let displayRate = `1 ${currencyName} = ${new BigNumber(1).div(poolDetails?.ethRate).toNumber()} ${tokenDetails?.symbol}`;

  if (force) {
    reverseRate = `1 ${tokenDetails.symbol} = ${poolDetails.priceUsdt} USD`;
    displayRate = `1 USD = ${new BigNumber(1).div(poolDetails.priceUsdt).toNumber()} ${tokenDetails?.symbol}`;
  }

  // console.log('[ExchangeRateUsdtRow] - reverseRate', reverseRate);
  // console.log('[ExchangeRateUsdtRow] - displayRate', displayRate);

  return (
    <>
      <div className={styles.poolDetailBasic} key={key}>
        <span className={styles.poolDetailBasicLabel}>{poolDetail.label || label}</span>
        <p className={styles.poolsDetailBasicText}>
          <Tooltip title={<p style={{ fontSize: 15 }}>{displayRate}</p>}>
            <span>
              {poolDetails?.purchasableCurrency != ACCEPT_CURRENCY.ETH &&
                <>
                  {/*NOTETH--USDT--*/}
                  {/*{poolDetails?.purchasableCurrency}--{key}-{displayRate}---*/}

                  {showRateReserveUSDT ? reverseRate : displayRate}
                </>
              }

              {poolDetails?.purchasableCurrency === ACCEPT_CURRENCY.ETH &&
                <>
                  {showRateReserveUSDT ? reverseRate : displayRate}
                </>
              }

            </span>
          </Tooltip>
          <img
            src={poolDetail.utilIcon}
            className={styles.poolDetailUtil}
            onClick={() => {
              setShowRateReverseUSDT(!showRateReserveUSDT);
            }}
            key={key}
          />
        </p>
      </div>
    </>
  );
}

export default ExchangeRateUsdtRow;
