import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _, { gt } from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import { withdraw, getWithdrawFee } from '../../../store/actions/sota-tiers';
import { convertFromWei, convertToWei, convertToBN } from '../../../services/web3';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';

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

  const {
    setOpenModalWithdraw,
    setOpenModalTransactionSubmitting,
    token
  } = props;

  const onWithDraw = () => {
    if(disableWithdraw) return
    dispatch(withdraw(connectedAccount, withdrawAmount, library, process.env.REACT_APP_PKF as string));
    setOpenModalTransactionSubmitting(true);
    setOpenModalWithdraw(false);
  }

  const handleClose = () => {
    setOpenModalWithdraw(false);
  }

  useEffect(() => {
    if(withdrawAmount === '' || withdrawAmount === '0') {
      setDisableWithdraw(true)
      return
    }
    if(!connectedAccount) return
    if(!isNaN(parseFloat(userInfo.staked))
      && !isNaN(parseFloat(withdrawAmount)))
    {
      const staked = new BigNumber(userInfo.staked).multipliedBy(new BigNumber(10).pow(18))
      const amount = new BigNumber(withdrawAmount).multipliedBy(new BigNumber(10).pow(18))
      const zero = new BigNumber('0')
      setDisableWithdraw(staked.lt(amount) || amount.lte(zero));
    }
  }, [connectedAccount, userInfo, withdrawAmount]);

  useEffect(() => {
    dispatch(getWithdrawFee(connectedAccount, withdrawAmount === '' ? '0' : withdrawAmount))
  }, [withdrawAmount])

  return (
    <>
      <div className={commonStyles.modal + ' ' + styles.modalWithdraw}>
        <div className="modal-content">
          <div className="modal-content__head">
            <img src={closeIcon} className="btn-close" onClick={handleClose}/>
            <h2 className="title">You have {userInfo.staked} {token?.symbol} locked-in</h2>
          </div>
          <div className="modal-content__body">
            <div className="subtitle">
              <span>Input</span>
              <span>Your wallet staked: { _.isEmpty(userInfo) ? 0 : parseFloat(userInfo.staked).toFixed() } {token?.symbol}</span>
            </div>
            <div className="subtitle">
                <span>Penalty</span>
                {withdrawAmount !== '' &&  <span>{ withdrawFee.fee?.toString() || 0 } {token?.symbol}</span>}
                {withdrawAmount === '' && <span>0 {token?.symbol}</span>}
              </div>
            <div className="input-group">
              <input
                type="text"
                value={withdrawAmount}
                onChange={e => (e.target.value === '' || REGEX_NUMBER.test(e.target.value)) && setWithdrawAmount(e.target.value)}
                placeholder="0.00"
              />
              <div>
                <button className="btn-max" onClick={() => setWithdrawAmount(userInfo.staked)}>MAX</button>
              </div>
            </div>
          </div>
          <div className="modal-content__foot">
            <button
              className={"btn-staking " + (disableWithdraw ? 'disabled' : '')}
              onClick={onWithDraw}
            >Unlock</button>
            <button
              className="btn-cancel"
              onClick={() => setOpenModalWithdraw(false)}
            >cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalWithdraw;
