import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import { approve } from '../../../store/actions/sota-token';
import { deposit } from '../../../store/actions/sota-tiers';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { CONVERSION_RATE } from '../../../constants';
import { numberWithCommas } from '../../../utils/formatNumber';
import NumberFormat from 'react-number-format';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const closeIcon = '/images/icons/close.svg';
const REGEX_NUMBER = /^-?[0-9]{0,}[.]{0,1}[0-9]{0,6}$/;

const ModalDeposit = (props: any) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const commonStyles = useCommonStyle();

  const [depositAmount, setDepositAmount] = useState('');
  const [disableDeposit, setDisableDeposit] = useState(true);

  const { data: allowance = 0 } = useSelector((state: any) => state.allowance);
  const { data: userInfo = {} } = useSelector((state: any) => state.userInfo);
  const { data: balance = {} } = useSelector((state: any) => state.balance);
  const { loading } = useSelector((state: any) => state.approve)
  const { account: connectedAccount, library } = useWeb3React();
  const { data: appChainID } = useSelector((state: any) => state.appNetwork);
  const { data: rates } = useSelector((state: any) => state.rates);

  const {
    setOpenModalDeposit,
    setOpenModalTransactionSubmitting,
    listTokenDetails,
    open,
    totalStaked
  } = props;
  const [currentToken, setCurrentToken] = useState(undefined) as any;
  const [currentBalance, setCurrentBalance] = useState('0');
  const [currentStaked, setCurrentStaked] = useState('0');
  const [currentAllowance, setCurrentAllowance] = useState('0');
  const [currentRate, setCurrentRate] = useState(0);

  const setDefaultToken = () => {
    setCurrentToken(listTokenDetails[0])
    setCurrentBalance(balance.pkf)
    setCurrentStaked(userInfo.pkfStaked)
    setCurrentAllowance(allowance.pkf)
    setCurrentRate(1)
  }

  useEffect(() => {
    setDefaultToken();
  }, [balance, userInfo, listTokenDetails])

  useEffect(() => {
    if(depositAmount === '' || depositAmount === '0') {
      setDisableDeposit(true)
      return
    }
    if(!connectedAccount) return
    if(!isNaN(parseFloat(currentBalance))
      && !isNaN(parseFloat(depositAmount)))
    {
      const tokenBalance = new BigNumber(currentBalance).multipliedBy(new BigNumber(10).pow(18))
      const amount = new BigNumber(depositAmount).multipliedBy(new BigNumber(10).pow(18))
      const zero = new BigNumber('0')
      setDisableDeposit(tokenBalance.lt(amount) || amount.lte(zero))
    }
  }, [connectedAccount, balance, depositAmount, currentToken]);

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

  const onDeposit = () => {
    if(disableDeposit) return
    dispatch(deposit(connectedAccount, depositAmount, library, currentToken.address));
    setOpenModalTransactionSubmitting(true);
    setOpenModalDeposit(false);
    setDepositAmount('')
    setDefaultToken();
  }

  const onApprove = () => {
    dispatch(approve(connectedAccount, library, currentToken.address));
    setOpenModalTransactionSubmitting(true);
    setOpenModalDeposit(false);
    setDepositAmount('')
    setDefaultToken();
  }

  const handleClose = () => {
    setOpenModalDeposit(false);
    setDepositAmount('')
    setDefaultToken();
  }

  const handleSelectToken = (e: any) => {
    const tokens = listTokenDetails.filter((tokenDetails: any) => {
      return tokenDetails.symbol == e.target.value
    })
    setCurrentToken(tokens[0])
    if(e.target.value == 'PKF') {
      setCurrentBalance(balance.pkf)
      setCurrentStaked(userInfo.pkfStaked)
      setCurrentAllowance(allowance.pkf)
    } else if(e.target.value == CONVERSION_RATE[0].key && appChainID.appChainID == '5'
      || e.target.value == CONVERSION_RATE[0].keyMainnet && appChainID.appChainID == '1')
    {
      setCurrentBalance(balance.uni)
      setCurrentStaked(userInfo.uniStaked)
      setCurrentAllowance(allowance.uni)
    } else if(e.target.value == CONVERSION_RATE[1].key && appChainID.appChainID == '5'
      || e.target.value == CONVERSION_RATE[1].keyMainnet && appChainID.appChainID == '1')
    {
      setCurrentBalance(balance.mantra)
      setCurrentStaked(userInfo.mantraStaked)
      setCurrentAllowance(allowance.mantra)
    }
  }
  const handleChange = (e: any) => {
    const value = e.target.value.replaceAll(",", "")
    if (value === '' || REGEX_NUMBER.test(value)) {
      setDepositAmount(value);
    }
  }

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={commonStyles.modal + ' ' + styles.modalDeposit}
    >
      <div className="modal-content">
        <DialogTitle id="alert-dialog-slide-title" className="modal-content__head">
          <img src={closeIcon} className="btn-close" onClick={handleClose}/>
          <h2 className="title">You have {numberWithCommas(totalStaked)} {listTokenDetails[0]?.symbol} staked</h2>
          <p className={styles.description}>{currentAllowance == '0' ? 'You need to Approve once (and only once) before you can start staking.'
            : 'You have approved. Click Stake to stake.'}
          </p>
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
                <span>Your wallet balance</span>
                <span>{ !currentBalance ? 0 : numberWithCommas(currentBalance) } {
                  currentToken?.symbol == 'PKF' ? 'PKF'
                  : (appChainID.appChainID == '5' && currentToken?.symbol == CONVERSION_RATE[0].key ||
                    appChainID.appChainID == '1' && currentToken?.symbol == CONVERSION_RATE[0].keyMainnet) ? CONVERSION_RATE[0]?.symbol : CONVERSION_RATE[1]?.symbol
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
                value={depositAmount}
                min={0}
                maxLength={255}
              />
              <div>
                <button className="btn-max" id="btn-max-deposit" onClick={() => setDepositAmount(currentBalance)}>MAX</button>
              </div>
            </div>
            <div className="balance" style={{marginTop: '10px'}}>
              <div>
                <span>Equivalent</span>
                <span>{numberWithCommas((parseFloat(depositAmount) * currentRate || 0).toString())} {listTokenDetails[0]?.symbol}</span>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions className="modal-content__foot">
          {currentAllowance=='0' ? <button
            className={"btn-approve" + (loading ? 'disabled' : '')}
            onClick={onApprove}
            disabled={loading}
          >Approve</button> : <button
            className={"btn-staking " + (disableDeposit ? 'disabled' : '')}
            onClick={onDeposit}
          >Stake</button>}
          <button
            className="btn-cancel"
            onClick={handleClose}
          >Cancel</button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ModalDeposit;
