import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import _ from 'lodash';
import useStyles from './style';
import useCommonStyle from '../../../styles/CommonStyle';
import { useWeb3React } from '@web3-react/core';
import useWalletSignature from '../../../hooks/useWalletSignature';
import axios from 'axios';
import { alertFailure, alertSuccess } from '../../../store/actions/alert';

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
    setEmail
  } = props;

  useEffect(() => {
    setInputEmail(email);
  }, [email])

  useEffect(() => {
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
        !email && setEmail(inputEmail)
        dispatch(alertSuccess('Register success, please check verify email'));
        setOpenModalVerifyEmail(false);
      }).catch(() => {
        dispatch(alertFailure('email register failure, please try again later'));
      })
    }
  }, [signature])

  useEffect(() => {
    console.log(REGEX.test(inputEmail) )
    if(!REGEX.test(inputEmail) || inputEmail == '') setDisableVerify(true);
    else setDisableVerify(false);
  }, [inputEmail])

  const handleVerifyEmail = () => {
    if(inputEmail != '' && REGEX.test(inputEmail) == false || inputEmail == '') {
      setInvalidEmail(true);
      return;
    }
    setInvalidEmail(false);
    signMessage();
  }

  return (
    <>
      <div className={commonStyles.modal + ' ' + styles.modalVerifyEmail}>
        <div className="modal-content">
          <div className="modal-content__head">
            <img src={closeIcon} className="btn-close" onClick={() => setOpenModalVerifyEmail(false)}/>
            <h2 className="title">Verify Email</h2>
          </div>
          <div className="modal-content__body">
            <div className="subtitle">
              <span>Email</span>
            </div>
            <div className="input-group">
              <input
                type="text"
                value={inputEmail}
                onChange={e => setInputEmail(e.target.value)}
                placeholder="Please enter email"
                disabled={email}
                maxLength={190}
              />
            </div>
            {invalidEmail && <span style={{color: '#D01F36'}}>Invalid Email</span>}
          </div>
          <div className="modal-content__foot">
            <button
              className={"btn-approve" + ((disableVerify) ? ' disabled': '')}
              onClick={() => handleVerifyEmail()}
              disabled={disableVerify}
            >Verify</button>
            <button
              className="btn-cancel"
              onClick={() => setOpenModalVerifyEmail(false)}
            >cancel</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalVerifyEmail;
