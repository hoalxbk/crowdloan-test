import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TextField, CircularProgress } from '@material-ui/core';
import Container from '@material-ui/core/Container';
import { withRouter, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { alertFailure, alertSuccess } from '../../store/actions/alert';
import { BaseRequest } from '../../request/Request';
import useStyles from './style';
import {adminRoute, apiRoute, publicRoute} from "../../utils";
import {logout} from "../../store/actions/user";

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

const ChangePassword: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: loginInvestor } = useSelector((state: any) => state.investor);
  const { data: loginUser } = useSelector((state: any) => state.user);
  const { data: ethAddress } = useSelector((state: any) => state.userConnect);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const { register, watch, errors, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const password = useRef({});
  password.current = watch("newPassword", "");

  const { role } = useParams() as any;

  const renderErrorRequired = (errors: any, prop: string) => {
    if (errors[prop]) {
      if (errors[prop].type === "required") {
        return 'This field is required';
      }
    }
  }

  useEffect(() => {
    if (role === 'investor' && !loginInvestor) {
      props.history.push(publicRoute('/'));
    }
    if (role !== 'investor' && !loginUser) {
      props.history.push(adminRoute('/'));
    }
    // if ((role === 'investor' && !loginInvestor) || (role !== 'investor' && !loginUser)) {
    //   props.history.push('/');
    // }
  }, [loginUser, loginInvestor, role, props.history]);

  const handleFormSubmit = async (data: any) =>  {
    setResetPasswordLoading(true);

    const windowObj = window as any;
    const { ethereum } = windowObj;

     await ethereum.sendAsync({
          method: 'eth_signTypedData',
          params: [getMessageParams(role === 'investor'), ethAddress],
          from: ethAddress,
      }, async function(err: Error, result: any) {
        if (err || result.error) {
           const errMsg = err.message || result.error.message
           dispatch(alertFailure(errMsg));
           setResetPasswordLoading(false);
            return;
        }
        const baseRequest = new BaseRequest();

        let url = '';

        url = apiRoute('/change-password');

        const response = await baseRequest.post(url, {
          password_old: data.password,
          password_new: data.newPassword,
          signature: result.result,
          wallet_address: ethAddress,
        }, role === 'investor') as any;

        const resObj = await response.json();

       if (resObj?.status !== 200) {
         dispatch(alertFailure(resObj.message));
       } else {
         dispatch(alertSuccess('Change password successful!'));
         const isInvestor = role === 'investor';
         dispatch(logout(isInvestor));
         const redirectUrl = isInvestor ? publicRoute('/') : adminRoute('/login');
         props.history.push(redirectUrl);
       }

        setResetPasswordLoading(false);
      })
  }

  const render = () => {
    return (
      <>
        <div className="forgot-ps__title">
          Change Password
        </div>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="login__form">
          <TextField name="password" inputRef={register({ required: true })} inputProps={{ maxLength: 255, type: "password" }} label="Old Password *" color="secondary" className="login__form-field" />
          <p className="login__form-error-message">
            {
              renderErrorRequired(errors, 'password')
            }
          </p>
          <TextField
          name="newPassword"
          inputRef={register({
            required: true,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }
          })} inputProps={{ maxLength: 255, type: "password" }} label="New Password *" color="secondary" className="login__form-field" />
          <p className="login__form-error-message">
            {
              errors.newPassword && errors.newPassword.type !== 'required' ? errors.newPassword.message: renderErrorRequired(errors, 'newPassword')
            }
          </p>
          <TextField name="newPasswordConfirmation" inputRef={register({
            required: true ,
            validate: value => value === password.current || "New passwords do not match."
          })} inputProps={{ maxLength: 255, type: "password"  }} label="New Password Confirmation *" color="secondary" className="login__form-field" />
          <p className="login__form-error-message">
            {
              errors.newPasswordConfirmation && errors.newPasswordConfirmation.type !== 'required' ? errors.newPasswordConfirmation.message: errors.confirmationPassword ? errors.confirmationPassword.message: renderErrorRequired(errors, 'newPasswordConfirmation')
            }
          </p>
          <button disabled={resetPasswordLoading} type="submit" className="login__form-button">
            Submit
            {
              resetPasswordLoading && <CircularProgress size={20} style={{ marginLeft: 10 }}/>
            }
          </button>
        </form>
      </>
    )
  }

  return (
    <Container fixed>
      <div className={classes.forgotPassword}>
        <span className="forgot-ps__logo">
          <img src={loginLogo} alt="login-logo" />
          <h2 className="forgot-ps__brand">Red Kite</h2>
        </span>
        <div className="forgot-ps__wrap">
          {
            render()
          }
        </div>
      </div>
    </Container>
  )
};

export default withRouter(ChangePassword);
