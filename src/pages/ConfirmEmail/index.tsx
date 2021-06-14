import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CircularProgress } from '@material-ui/core';
import { withRouter, useParams } from 'react-router-dom';

import { alertFailure, alertSuccess } from '../../store/actions/alert';
import { BaseRequest } from '../../request/Request';
import useStyles from './style';
import { apiRoute } from "../../utils";
import DefaultLayout from '../../components/Layout/DefaultLayout';
import { Link } from 'react-router-dom';

const logo = '/images/logo-red-kite.svg'

const ConfirmEmail: React.FC<any> = (props: any) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const [confirmEmailLoading, setConfirmEmailLoading] = useState(false);
  const [verifySuccess, setVerifySuccess] = useState(false);

  const { token } = useParams() as any;

  useEffect(() => {
    const confirmEmail = async () => {
      setConfirmEmailLoading(true);

      if (token) {
        const baseRequest = new BaseRequest();

        const response = await baseRequest.get(apiRoute(`/confirm-email/${token}`)) as any;
        const resObj = await response.json();

        if (resObj.status && resObj.status === 200) {
          dispatch(alertSuccess('Email address confirmed'));
          setVerifySuccess(true)
        } else {
          dispatch(alertFailure(resObj.message));
          setVerifySuccess(false)
        }
      }

      setConfirmEmailLoading(false);
    }

    confirmEmail();
  }, []);

  return (
    <DefaultLayout>
      {confirmEmailLoading && <div className={styles.contentLoading}>
        <div style={{ textAlign: 'center' }}>
          <CircularProgress size={80} />
          <p style={{ marginTop: 10, fontSize: 17, fontWeight: 600 }}>
            Email Confirmation Processing ...
          </p>
        </div>
      </div>}
      {!confirmEmailLoading && verifySuccess && <div className={styles.confirmEmail}>
        <img src={logo} alt=""/>
        <h2>Email address confirmed</h2>
        <p>You have successfully updated your email address. Please use your new email address to log in.</p>
        <Link to="/account">Return</Link>
      </div>}
      {!confirmEmailLoading && !verifySuccess && <div className={styles.confirmEmail}>
        <img src={logo} alt=""/>
        <h2>Email address verify failure</h2>
        <p>Active account link has expried.</p>
        <Link to="/account">Return</Link>
      </div>}
    </DefaultLayout>
  )
};

export default withRouter(ConfirmEmail);
