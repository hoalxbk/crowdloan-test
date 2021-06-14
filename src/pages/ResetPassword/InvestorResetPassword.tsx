import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress, TextField} from '@material-ui/core';
import {Link, useParams, withRouter} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import _ from 'lodash';
import {alertFailure, alertSuccess} from '../../store/actions/alert';
import {BaseRequest} from '../../request/Request';
import {adminRoute, apiRoute, publicRoute} from "../../utils";
import InvestorLayout from "../InvestorLayout/InvestorLayout";
import TextTitle from "../InvestorLayout/TextTitle";
import TextSubTitle from "../InvestorLayout/TextSubTitle";
import Button from "../../components/Base/Button";

const MESSAGE_SIGNATURE = process.env.REACT_APP_MESSAGE_INVESTOR_SIGNATURE || "";

const msgParams = [
  {
    type: 'string',      // Any valid solidity type
    name: 'Message',     // Any string label you want
    value: MESSAGE_SIGNATURE  // The value to sign
 },
];

const InvestorResetPassword: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const baseRequest = new BaseRequest();

  const { token } = useParams() as any;
  const { data: loginInvestor } = useSelector((state: any) => state.investor);
  const { data: loginUser } = useSelector((state: any) => state.user);
  const { data: ethAddress } = useSelector((state: any) => state.userConnect);
  const [isAvailableLoading, setIsAvailableLoading] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const [resetPasswordLoading, setResetPasswordLoading] = useState(false);

  const { register, watch, errors, handleSubmit } = useForm({
    mode: 'onChange'
  });

  const password = useRef({});
  password.current = watch("password", "");

  const renderErrorRequired = (errors: any, prop: string) => {
    if (errors[prop]) {
      if (errors[prop].type === "required") {
        return 'This field is required';
      }
    }
  }

  useEffect(() => {
    const isInvestor = true;
    const dataLoginInvestor = _.cloneDeep(loginInvestor);
    if (isInvestor && !!dataLoginInvestor) {
      props.history.push(publicRoute('/'));
    }
  }, [loginInvestor]);

  useEffect(() => {
    const isAvailableToken = async () => {
      setIsAvailableLoading(true);

      const response = await baseRequest.get(apiRoute(`/check-token/${token}`)) as any;
      const resObj = await response.json();

      if (resObj?.status !== 200 || resObj?.data.status !== 200) {
        dispatch(alertFailure('Forgot password link has expired'));
        props.history.push(publicRoute('/login'));
        return ;
      }
      setIsAvailableLoading(false);
      setIsAvailable(true);
    };

    if (!loginInvestor) {
      isAvailableToken();
    }
  }, [token]);

  const handleFormSubmit = async (data: any) =>  {
     try {
      setResetPasswordLoading(true);

      const windowObj = window as any;
      const { ethereum } = windowObj;

      await ethereum.sendAsync({
        method: 'eth_signTypedData',
        params: [msgParams, ethAddress],
        from: ethAddress,
      }, async function(err: Error, result: any) {
        if (err || result.error) {
          const errMsg = err.message || result.error.message
          dispatch(alertFailure(errMsg));
          setResetPasswordLoading(false);
          return;
        }

        const response = await baseRequest.post(apiRoute(`/reset-password/${token}`), {
          password: data.password,
          signature: result.result,
          wallet_address: ethAddress,
        }) as any;

        const resObj = await response.json();

        if (resObj?.status !== 200) {
          dispatch(alertFailure(resObj.message));
        } else {
          dispatch(alertSuccess('Reset password successful!'));
        }
        setResetPasswordLoading(false);

        const isInvestor = true;
        const redirectUrl = isInvestor ? publicRoute('/login') : adminRoute('/login');
        props.history.push(redirectUrl);
      })
    } catch (err) {
      dispatch(alertFailure(err.message));
      setResetPasswordLoading(false);
    }
  }

  const render = () => {
    if (isAvailableLoading) {
      return <div style={{ textAlign: 'center' }}><CircularProgress size={70} /></div>
    } else if (!isAvailableLoading && isAvailable) {
    return (
      <>
        <TextTitle>
          Reset Password
        </TextTitle>
        <TextSubTitle>
          Enter your new password below to reset password
        </TextSubTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="login__form">
          <TextField name="password" inputRef={register({
            required: true ,
            minLength: {
              value: 8,
              message: "Password must have at least 8 characters"
            }})} inputProps={{ maxLength: 255, type: 'password' }} label="Password *" color="secondary" className="login__form-field" />
          <p className="login__form-error-message">
          {
            errors.password && errors.password.type !== 'required' ? errors.password.message: renderErrorRequired(errors, 'password')
          }
          </p>
          <TextField name="passwordConfirmation" inputRef={register({
            required: true,
            validate: value => value === password.current || "The passwords do not match"
          })} inputProps={{ maxLength: 255, type: 'password' }} label="Password Confirmation *" color="secondary" className="login__form-field" />
          <p className="login__form-error-message">
          {
            errors.passwordConfirmation && errors.passwordConfirmation.type !== 'required' ? errors.passwordConfirmation.message: errors.confirmationPassword ? errors.confirmationPassword.message: renderErrorRequired(errors, 'passwordConfirmation')
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
  }

  return (
    <InvestorLayout>
      {render()}
    </InvestorLayout>
  )
};

export default withRouter(InvestorResetPassword);
