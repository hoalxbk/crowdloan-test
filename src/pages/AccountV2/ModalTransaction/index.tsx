import _, { set } from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const closeIcon = '/images/icons/close.svg'

const ModalTransaction = (props: any) => {
  const styles = useStyles();
  const commonStyles = useCommonStyle();

  const {
    transactionHashes,
    setTransactionHashes,
    open
  } = props;

  const handleClose = () => {
    let array = [...transactionHashes];
    array.shift();
    setTransactionHashes(array);
    console.log(array)
  }

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={commonStyles.modal + ' ' + styles.modalTransaction}
    >
      <div className="modal-content">
        <DialogTitle id="alert-dialog-slide-title" className="modal-content__head">
        <img src={closeIcon} className="btn-close" onClick={handleClose}/>
            <h2 className="title">Transaction Submitted</h2>
        </DialogTitle>
        <DialogContent className="modal-content__body">
          <div className="subtitle">
            <span>TXn Hash</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={transactionHashes[0].tnx}
              disabled
            />
          </div>
        </DialogContent>
        <DialogActions className="modal-content__foot">
          <a
            href={`https://etherscan.io/tx/${transactionHashes[0].tnx}`}
            target="_blank"
            className={commonStyles.nnb1418d}
          >View on Etherscan</a>
        </DialogActions>
        {transactionHashes[0].isApprove && <p className={styles.notice}>Please be patient and no need to approve again, you can check the transaction status on Etherscan.</p>}
      </div>
    </Dialog>
  );
};

export default ModalTransaction;
