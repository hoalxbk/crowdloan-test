import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _, { gt } from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import { withdraw, getWithdrawFee } from '../../../store/actions/sota-tiers';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { CONVERSION_RATE } from '../../../constants';
import { numberWithCommas } from '../../../utils/formatNumber';
import NumberFormat from 'react-number-format';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const closeIcon = '/images/icons/close.svg';
const REGEX_NUMBER = /^-?[0-9]{0,}[.]{0,1}[0-9]{0,6}$/;

const ModalWithdraw = (props: any) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const commonStyles = useCommonStyle();

  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [disableWithdraw, setDisableWithdraw] = useState(true);

  const { data: userInfo = {} } = useSelector((state: any) => state.userInfo);
  const { data: withdrawFee = {} } = useSelector((state: any) => state.withdrawFee);
  const { account: connectedAccount, library } = useWeb3React();
  const { data: appChainID } = useSelector((state: any) => state.appNetwork);
  const { data: rates } = useSelector((state: any) => state.rates);

  const {
    setOpenModalWithdraw,
    setOpenModalTransactionSubmitting,
    listTokenDetails,
    open,
    totalStaked
  } = props;
  const [currentToken, setCurrentToken] = useState(undefined) as any;
  const [currentStaked, setCurrentStaked] = useState('0');
  const [currentRate, setCurrentRate] = useState(0);

  const setDefaultToken = () => {
    setCurrentToken(listTokenDetails[0])
    setCurrentStaked(userInfo.pkfStaked)
    setCurrentRate(1)
  }

  useEffect(() => {
    setDefaultToken()
  }, [userInfo, listTokenDetails])

  const onWithDraw = () => {
    if(disableWithdraw) return
    dispatch(withdraw(connectedAccount, withdrawAmount, library, currentToken.address));
    setOpenModalTransactionSubmitting(true);
    setOpenModalWithdraw(false);
    setWithdrawAmount('');
    setDefaultToken();
  }

  const handleClose = () => {
    setOpenModalWithdraw(false);
    setWithdrawAmount('');
    setDefaultToken();
  }

  useEffect(() => {
    if(withdrawAmount === '' || withdrawAmount === '0') {
      setDisableWithdraw(true)
      return
    }
    if(!connectedAccount) return
    if(!isNaN(parseFloat(currentStaked))
      && !isNaN(parseFloat(withdrawAmount)))
    {
      const staked = new BigNumber(currentStaked).multipliedBy(new BigNumber(10).pow(18))
      const amount = new BigNumber(withdrawAmount).multipliedBy(new BigNumber(10).pow(18))
      const zero = new BigNumber('0')
      setDisableWithdraw(staked.lt(amount) || amount.lte(zero));
    }
  }, [connectedAccount, userInfo, withdrawAmount, currentToken]);

  useEffect(() => {
    dispatch(getWithdrawFee(connectedAccount, withdrawAmount === '' ? '0' : withdrawAmount))
  }, [withdrawAmount])

  useEffect(() => {
    if(listTokenDetails.length == 0 || rates.length == 0 || !currentToken) return
    if(currentToken?.symbol == listTokenDetails[0]?.symbol) {
      setCurrentRate(1)
    } else if(currentToken?.symbol == listTokenDetails[1]?.symbol) 
    {
      setCurrentRate(parseFloat(rates?.data[0]?.rate))
    } else if(currentToken?.symbol == listTokenDetails[2]?.symbol)
    {
      setCurrentRate(parseFloat(rates?.data[1]?.rate))
    }
  }, [rates, currentToken, listTokenDetails])

  const handleSelectToken = (e: any) => {
    const tokens = listTokenDetails.filter((tokenDetails: any) => {
      return tokenDetails.symbol == e.target.value
    })
    setCurrentToken(tokens[0])
    if(e.target.value == 'PKF') {
      setCurrentStaked(userInfo.pkfStaked)
    } else if(e.target.value == CONVERSION_RATE[0].key && appChainID.appChainID == '5'
      || e.target.value == CONVERSION_RATE[0].keyMainnet && appChainID.appChainID == '1')
    {
      setCurrentStaked(userInfo.uniStaked)
    } else if(e.target.value == CONVERSION_RATE[1].key && appChainID.appChainID == '5'
      || e.target.value == CONVERSION_RATE[1].keyMainnet && appChainID.appChainID == '1')
    {
      setCurrentStaked(userInfo.mantraStaked)
    }
  }
  const handleChange = (e: any) => {
    const value = e.target.value.replaceAll(",", "")
    if (value === '' || REGEX_NUMBER.test(value)) {
      setWithdrawAmount(value);
    }
  }

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={commonStyles.modal + ' ' + styles.modalWithdraw}
    >
      <div className="modal-content">
        <DialogTitle id="alert-dialog-slide-title" className="modal-content__head">
          <img src={closeIcon} className="btn-close" onClick={handleClose}/>
          <h2 className="title">You have {numberWithCommas(totalStaked)} {listTokenDetails[0]?.symbol} staked</h2>
        </DialogTitle>
        <DialogContent className="modal-content__body">
          {open && <select name="select_token" id="select-token" onChange={(e) => handleSelectToken(e)}>
            {listTokenDetails && listTokenDetails.map((tokenDetails: any, index: number) => {
              return <option value={tokenDetails?.symbol} key={index}>{
                index === 0 ? 'Polkafoundry (PKF)' : `${CONVERSION_RATE[index - 1].name} (${CONVERSION_RATE[index - 1].symbol})`
              }</option>
            })}
          </select>}
          <div className={styles.group}>
            <div className="balance">
              <div>
                <span>Your wallet staked</span>
                <span>{ _.isEmpty(currentStaked) ? 0 : numberWithCommas(currentStaked) } {
                  currentToken?.symbol == 'PKF' ? 'PKF'
                  : (currentToken?.symbol == CONVERSION_RATE[0].keyMainnet && appChainID.appChainID == '1' ||
                    currentToken?.symbol == CONVERSION_RATE[0].key && appChainID.appChainID == '5') ? CONVERSION_RATE[0]?.symbol : CONVERSION_RATE[1]?.symbol
                }</span>
              </div>
            </div>
            <div className="subtitle">
              <span>Input</span>
            </div>
            <div className="input-group">
              <NumberFormat 
                type="text"
                placeholder={'0'} 
                thousandSeparator={true}  
                onChange={e => handleChange(e)} 
                decimalScale={6}
                value={withdrawAmount}
                min={0}
                maxLength={255}
              />
              <div>
                <button className="btn-max" id="btn-max-withdraw" onClick={() => setWithdrawAmount(currentStaked)}>MAX</button>
              </div>
            </div>
            <div className="balance" style={{marginTop: '10px'}}>
              <div>
                <span>Equivalent</span>
                <span>{numberWithCommas((parseFloat(withdrawAmount) * currentRate || 0).toString())} {listTokenDetails[0]?.symbol}</span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="modal-content__foot">
          <button
            className={"btn-staking " + (disableWithdraw ? 'disabled' : '')}
            onClick={onWithDraw}
          >Unstake</button>
          <button
            className="btn-cancel"
            onClick={handleClose}
          >Cancel</button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ModalWithdraw;
