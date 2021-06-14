import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import { CircularProgress } from '@material-ui/core';
import { getWithdrawPercent, getWithdrawFee } from '../../../store/actions/sota-tiers';
import ModalDeposit from '../ModalDeposit';
import ModalWithdraw from '../ModalWithdraw';
import ModalTransaction from '../ModalTransaction';
import useAuth from '../../../hooks/useAuth';
import { sotaTiersActions } from '../../../store/constants/sota-tiers';
import { sotaTokenActions } from '../../../store/constants/sota-token';
//@ts-ignore
import AnimatedNumber from "animated-number-react";
import { numberWithCommas } from '../../../utils/formatNumber';
import { timeAgo } from '../../../utils/convertDate';
import { USER_STATUS, CONVERSION_RATE } from '../../../constants';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';
import { ETH_CHAIN_ID } from '../../../constants/network';

const iconClose = '/images/icons/close.svg'

const ManageTier = (props: any) => {
  const styles = useStyles();
  const commonStyles = useCommonStyle();
  const dispatch = useDispatch()

  const [openModalDeposit, setOpenModalDeposit] = useState(false)
  const [openModalWithdraw, setOpenModalWithdraw] = useState(false)
  const [openModalTransactionSubmitting, setOpenModalTransactionSubmitting] = useState(false)
  const [transactionHashes, setTransactionHashes] = useState([]) as any;


  const { data: depositTransaction, error: depositError } = useSelector((state: any) => state.deposit);
  const { data: approveTransaction, error: approveError } = useSelector((state: any) => state.approve);
  const { data: withdrawTransaction, error: withdrawError } = useSelector((state: any) => state.withdraw);
  const { data: userInfo = {} } = useSelector((state: any) => state.userInfo);
  const { data: balance = {} } = useSelector((state: any) => state.balance);
  const { connectedAccount, isAuth, wrongChain } = useAuth();
  const { appChainID } = useSelector((state: any) => state.appNetwork).data

  const {
    classNamePrefix = '',
    emailVerified,
    listTokenDetails,
    totalUnstaked,
    total
  } = props;

  useEffect(() => {
    dispatch(getWithdrawPercent());
  }, [])

  useEffect(() => {
    if(depositTransaction?.hash) {
      setTransactionHashes([...transactionHashes, {tnx: depositTransaction.hash, isApprove: false}]);
      setOpenModalTransactionSubmitting(false);
      dispatch({
        type: sotaTiersActions.DEPOSIT_SUCCESS,
        payload: undefined,
      });
    }
    if(depositError.message) setOpenModalTransactionSubmitting(false);
  }, [depositTransaction, depositError])

  useEffect(() => {
    if(approveTransaction?.hash) {
      setTransactionHashes([...transactionHashes, {tnx: approveTransaction.hash, isApprove: true}]);
      setOpenModalTransactionSubmitting(false);
      dispatch({
        type: sotaTokenActions.APPROVE_SUCCESS,
        payload: undefined,
      });
    }
    if(approveError.message) setOpenModalTransactionSubmitting(false);
  }, [approveTransaction, approveError])

  useEffect(() => {
    if(withdrawTransaction?.hash) {
      setTransactionHashes([...transactionHashes, {tnx: withdrawTransaction.hash, isApprove: false}]);
      setOpenModalTransactionSubmitting(false);
      dispatch({
        type: sotaTiersActions.WITHDRAW_SUCCESS,
        payload: undefined,
      });
    }
    if(withdrawError.message) setOpenModalTransactionSubmitting(false);
  }, [withdrawTransaction, withdrawError])

  const renderToken = (symbol: string, balance: any, staked: any) => {
    return <div className="group">
      <span>{symbol}</span>
      {(wrongChain || !isAuth) && <span>0</span>}
      {!wrongChain && isAuth && <span>{numberWithCommas(balance || 0)}</span>}
      {(wrongChain || !isAuth) && <span>0</span>}
      {!wrongChain && isAuth && <span>{numberWithCommas(staked || 0)}</span>}
    </div>
  }

  return (
    <div className={`${classNamePrefix}__component`}>
      <div className={styles.content}>
        <div className={styles.manageTier}>
          <h2 className={styles.title}>Wallet balance</h2>
        </div>
        <div className={styles.walletBalance}>
          <div className={styles.tableHead}>
            <div className="group">
              <span>Currency</span>
              <span>Available Balance</span>
              <span>Staked</span>
            </div>
          </div>
          <div className={styles.tableBody}>
            {renderToken('PKF', balance?.pkf, userInfo?.pkfStaked)}
            {renderToken(CONVERSION_RATE[0]?.symbol, balance?.uni, userInfo?.uniStaked)}
            {renderToken(CONVERSION_RATE[1]?.symbol, balance?.mantra, userInfo?.mantraStaked)}
          </div>
        </div>
        <div className="button-area">
          <button
            className={`btn btn-lock ${(emailVerified == USER_STATUS.UNVERIFIED || wrongChain || !isAuth || ETH_CHAIN_ID !== appChainID) ? 'disabled' : ''}`}
            onClick={() => {setOpenModalDeposit(true)}}
            disabled={emailVerified == USER_STATUS.UNVERIFIED || wrongChain || !isAuth || ETH_CHAIN_ID !== appChainID}
          >
            Stake
          </button>
          <button
            className={`btn btn-unlock ${(emailVerified == USER_STATUS.UNVERIFIED || wrongChain || !isAuth || ETH_CHAIN_ID !== appChainID) ? 'disabled' : ''}`}
            onClick={() => {setOpenModalWithdraw(true)}}
            disabled={emailVerified == USER_STATUS.UNVERIFIED || wrongChain || !isAuth || ETH_CHAIN_ID !== appChainID}
          >
            Unstake
          </button>
        </div>
        {ETH_CHAIN_ID !== appChainID && <p className={styles.noteNetwork}>Note: To change tier, please switch to ETH network to do Stake/Unstake</p>}
        {/* <p className={styles.balance}>
          {(wrongChain || !isAuth) && <AnimatedNumber
            value={0}
            formatValue={numberWithCommas}
          />}
          {!wrongChain && isAuth && <AnimatedNumber
            value={balance.token}
            formatValue={numberWithCommas}
          />}
          &nbsp;{tokenDetails?.symbol}
        </p> */}
      </div>
      <ModalDeposit
        setOpenModalDeposit={setOpenModalDeposit}
        setOpenModalTransactionSubmitting={setOpenModalTransactionSubmitting}
        listTokenDetails={listTokenDetails}
        open={openModalDeposit}
        totalStaked={total}
      />
      <ModalWithdraw
        setOpenModalWithdraw={setOpenModalWithdraw}
        setOpenModalTransactionSubmitting={setOpenModalTransactionSubmitting}
        listTokenDetails={listTokenDetails}
        open={openModalWithdraw}
        totalStaked={total}
      />

      <Dialog
        open={openModalTransactionSubmitting}
        keepMounted
        onClose={() => setOpenModalTransactionSubmitting(false)}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        className={commonStyles.loadingTransaction}
      >
        <DialogContent className="content">
          <img src={iconClose} onClick={() => setOpenModalTransactionSubmitting(false)}/>
          <span className={commonStyles.nnb1824d}>Transaction Submitting</span>
          <CircularProgress color="primary" />
        </DialogContent>
      </Dialog>

      {transactionHashes.length > 0 && <ModalTransaction
        transactionHashes={transactionHashes}
        setTransactionHashes={setTransactionHashes}
        open={transactionHashes.length > 0}
      />}
    </div>
  );
};

export default ManageTier;
