import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import {withRouter, useParams, Link} from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { alertFailure, alertSuccess } from '../../store/actions/alert';
import { BaseRequest } from '../../request/Request';
import useStyles from './style';
import {adminRoute, apiRoute, publicRoute} from "../../utils";
import InvestorLayout from "../InvestorLayout/InvestorLayout";
import TextTitle from "../InvestorLayout/TextTitle";
import TextSubTitle from "../InvestorLayout/TextSubTitle";
import Button from "../../components/Base/Button";

const MESSAGE_INVESTOR_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || "";

const getMessageParams = (isInvestor: boolean = false) => {
  const msgSignature = MESSAGE_INVESTOR_SIGNATURE;

  return [{
    type: 'string',      // Any valid solidity type
    name: 'Message',     // Any string label you want
    value: msgSignature  // The value to sign
  }]
};

const loginLogo = '/images/login-logo.png';

const InvestorForgotPassword: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: loginInvestor } = useSelector((state: any) => state.investor);
  const { data: ethAddress } = useSelector((state: any) => state.userConnect);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const { register, errors, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const renderErrorRequired = (errors: any, prop: string) => {
    if (errors[prop]) {
      if (errors[prop].type === "required") {
        return 'This field is required';
      }
    }
  }

  useEffect(() => {
    if (loginInvestor) {
      props.history.push('/');
    }
  }, [loginInvestor, props.history]);

  const handleFormSubmit = async (data: any) =>  {
    setResetPasswordLoading(true);

    const windowObj = window as any;
    const { ethereum } = windowObj;

     await ethereum.sendAsync({
          method: 'eth_signTypedData',
          params: [getMessageParams(true), ethAddress],
          from: ethAddress,
      }, async function(err: Error, result: any) {
        if (err || result.error) {
           const errMsg = err.message || result.error.message
           dispatch(alertFailure(errMsg));
           setResetPasswordLoading(false);
            return;
        }

        let url = apiRoute('/forgot-password');
        const baseRequest = new BaseRequest();
        const response = await baseRequest.post(url, {
          signature: result.result,
          email: data.email,
          wallet_address: ethAddress,
        }) as any;

        const resObj = await response.json();

       if (resObj?.status !== 200) {
         dispatch(alertFailure(resObj.message));
       } else {
         dispatch(alertSuccess('Request successful, please check your inbox.'));
       }

        setResetPasswordLoading(false);
      })
  }

  const render = () => {
    return (
      <>
        <TextTitle>
          Forgot Password
        </TextTitle>
        <TextSubTitle>
          Enter your email address below to reset password
        </TextSubTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="login__form">
          <TextField
            name="email"
            label="Email"
            inputRef={register({ required: true })}
            inputProps={{ maxLength: 255 }}
            color="secondary"
            className="login__form-field"
          />
          <p className="login__form-error-message">
          {
            renderErrorRequired(errors, 'email')
          }
          </p>
          <Link className="login__form-desc login__form-forgot-password" to={publicRoute('/login')}>Sign in ?</Link>
          <Link className="login__form-desc login__form-forgot-password" to={publicRoute('/register')}>Sign up ?</Link>

          <Button
            label={'Submit'}
            buttonType="primary"
            className={'login__form-cta'}
            loading={resetPasswordLoading}
            disabled={resetPasswordLoading}
          />

        </form>
      </>
    )
  }


  return (
    <InvestorLayout>
      {render()}
    </InvestorLayout>
  )
};

export default withRouter(InvestorForgotPassword);
