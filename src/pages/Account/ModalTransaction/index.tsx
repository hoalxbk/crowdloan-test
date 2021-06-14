import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { ETH_CHAIN_ID } from '../../../constants/network';
import React from "react";

const closeIcon = '/images/icons/close.svg'
const ETHERSCAN_URL = process.env.REACT_APP_ETHERSCAN_BASE_URL || "";
const BCSSCAN_URL = process.env.REACT_APP_BSCSCAN_BASE_URL || "";

const ModalTransaction = (props: any) => {
  const styles = useStyles();
  const commonStyles = useCommonStyle();
  const { appChainID } = useTypedSelector(state => state.appNetwork).data;

  const {
    transactionHashes,
    setTransactionHashes
  } = props;

  const handleClose = () => {
    let array = [...transactionHashes];
    array.shift();
    setTransactionHashes(array);
    console.log(array)
  }

  return (
    <>
      <div className={commonStyles.modal + ' ' + styles.modalTransaction}>
        <div className="modal-content">
          <div className="modal-content__head">
            <img src={closeIcon} className="btn-close" onClick={handleClose}/>
            <h2 className="title">Transaction Submitted</h2>
          </div>
          <div className="modal-content__body">
            <div className="subtitle">
              <span>TXn Hash</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                value={transactionHashes[0]}
                disabled
              />
            </div>
          </div>
          <div className="modal-content__foot">
            <a
              href={ETH_CHAIN_ID == appChainID ? `${ETHERSCAN_URL}/tx/${transactionHashes[0]}` : `${BCSSCAN_URL}/tx/${transactionHashes[0]}`}
              target="_blank"
              className={commonStyles.nnb1418d}
            >View on {ETH_CHAIN_ID == appChainID ? 'Etherscan' : 'Bscscan'}</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalTransaction;
