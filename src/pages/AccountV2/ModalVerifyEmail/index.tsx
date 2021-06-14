import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import { useWeb3React } from '@web3-react/core';
import useWalletSignature from '../../../hooks/useWalletSignature';
import axios from 'axios';
import { alertFailure, alertSuccess } from '../../../store/actions/alert';
import {Dialog, DialogTitle, DialogContent, DialogActions} from '@material-ui/core';

const closeIcon = '/images/icons/close.svg';
const REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const ModalVerifyEmail = (props: any) => {
  const styles = useStyles();
  const commonStyles = useCommonStyle();
  const dispatch = useDispatch();

  const { account: connectedAccount } = useWeb3React();
  const { signature, signMessage, setSignature, error } = useWalletSignature();
  const [inputEmail, setInputEmail] = useState('');
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [disableVerify, setDisableVerify] = useState(true);

  const {
    setOpenModalVerifyEmail,
    email,
    setEmail,
    setEmailVeryfied,
    open
  } = props;

  useEffect(() => {
    setInputEmail(email);
  }, [email])

  useEffect(() => {
    console.log('signature', signature)
    if(signature != '') {
      const data = {
        email: inputEmail,
        signature: signature,
        wallet_address: connectedAccount || ''
      }
      console.log(data)
      const options = {
        headers: {
          msgSignature: process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE
        }
      }
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/user/register-email`, data, options)
      .then(res => {
        if(res.data.status == 200) {
          dispatch(alertSuccess(res.data.message));
          window.location.reload();
          setEmail(inputEmail)
          setOpenModalVerifyEmail(false);
          setEmailVeryfied(1);
        } else if(res.data.status == 400) {
          dispatch(alertFailure(res.data.message));
        }
      }).catch(() => {
        dispatch(alertFailure('Email register failure, please try again later'));
      })
      setSignature('');
    }
  }, [signature])

  useEffect(() => {
    console.log(REGEX.test(inputEmail) )
    if(!REGEX.test(inputEmail) || inputEmail == '') setDisableVerify(true);
    else setDisableVerify(false);
  }, [inputEmail])

  const handleVerifyEmail = async () => {
    if(inputEmail != '' && REGEX.test(inputEmail) == false || inputEmail == '') {
      setInvalidEmail(true);
      return;
    }
    setInvalidEmail(false);
    await signMessage();
  }

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={() => setOpenModalVerifyEmail(false)}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      className={commonStyles.modal + ' ' + styles.modalVerifyEmail}
    >
      <div className="modal-content">
        <DialogTitle id="alert-dialog-slide-title" className="modal-content__head">
          <img src={closeIcon} className="btn-close" onClick={() => setOpenModalVerifyEmail(false)}/>
          <h2 className="title">Verify Email</h2>
        </DialogTitle>
        <DialogContent className="modal-content__body">
          <div className="subtitle">
            <span>Email</span>
          </div>
          <div className="input-group">
            <input
              type="text"
              value={inputEmail}
              onChange={e => setInputEmail(e.target.value)}
              placeholder="Please enter email"
              maxLength={190}
            />
          </div>
          {invalidEmail && <span style={{color: '#D01F36'}}>Invalid Email</span>}
        </DialogContent>
        <DialogActions className="modal-content__foot">
          <button
            className={"btn-approve" + ((disableVerify) ? ' disabled': '')}
            onClick={() => handleVerifyEmail()}
            disabled={disableVerify}
          >Verify</button>
          <button
            className="btn-cancel"
            onClick={() => setOpenModalVerifyEmail(false)}
          >Cancel</button>
        </DialogActions>
      </div>
    </Dialog>
  );
};

export default ModalVerifyEmail;
