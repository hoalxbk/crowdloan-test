import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {CircularProgress, TextField} from '@material-ui/core';
import {Link, withRouter} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import { useWeb3React } from '@web3-react/core';

import {alertFailure} from '../../store/actions/alert';
import {connectWallet, register as registerAccount, resetUserState} from '../../store/actions/user';
import Button from '../../components/Base/Button';
import {userAlreadyExists} from '../../utils/user';
import {publicRoute} from "../../utils";
import InvestorLayout from "../InvestorLayout/InvestorLayout";
import TextTitle from "../InvestorLayout/TextTitle";
import ConnectYourWallet from "../InvestorLayout/ConnectYourWallet";
import useStyles from './style'
import Logo from '../InvestorLayout/Logo'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const InvestorRegister: React.FC<any> = (props: any) => {
  const dispatch = useDispatch();
  const styles = useStyles();

  const [loadingUserExists, setLoadingUserExists] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [currentPage, setCurrentPage] = useState('walletConnect');
  const { loading: userRegisterLoading = false, error: errorRegister } = useSelector((state: any) => state.userRegister);
  const { data: loginInvestor, loading: investorLoginLoading, error } = useSelector((state: any) => state.investor);
  const { account: connectedAccount, library } = useWeb3React();

  const { register, watch, getValues, setValue, errors, handleSubmit } = useForm({
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
    if (error || errorRegister) {
      dispatch(alertFailure(error || errorRegister));
    }
  }, [error, errorRegister]);

  useEffect(() => {
    if (connectedAccount) {
      setCurrentPage('signIn');
    } else {
      setCurrentPage('walletConnect');
    }
  }, [connectedAccount]);

  useEffect(() => {
    const checkUserExists = async () => {
      if (currentPage === 'signIn' && connectedAccount) {
        setLoadingUserExists(true);

        const userExists = await userAlreadyExists(connectedAccount);
        setLoadingUserExists(false);

        setUserExists(userExists);
      } else setUserExists(false);
    }

    connectedAccount && checkUserExists();
  }, [currentPage, connectedAccount, loginInvestor]);

  useEffect(() => {
    if (loginInvestor) {
      props.history.push(publicRoute('/'));
    }

    return () => {
      error && dispatch(resetUserState());
    }
  }, [loginInvestor, error]);

  const handleFormSubmit = (data: any) =>  {
    dispatch(registerAccount({
      ...data,
      address: connectedAccount,
      library
    }));
  }

  const render = () => {
    if (currentPage === 'walletConnect') {
      return (
        <ConnectYourWallet>
          <Button
            label={'Connect Wallet'}
            buttonType="primary"
            onClick={handleUserLogin}
          />
        </ConnectYourWallet>
      )
    } else {
      if (loadingUserExists) {
        return (
          <div className="login__user-loading">
            <CircularProgress size={75} thickness={4} value={100} />
            <p className="login__user-loading-text">Loading Ethereum Wallet</p>
          </div>
        );
      } else {
        return (
          <>
            <div className="login__logo-ether-title">
              <Logo></Logo>
              <TextTitle>
                Create An Account
              </TextTitle>
            </div>
            <form onSubmit={handleSubmit(handleFormSubmit)} className={styles.loginForm}>
              <TextField id="standard-secondary" value={connectedAccount} label="Current Ethereum Address" color="secondary" className="login__form-field" disabled />
              <div>
                <TextField
                  label="Email *"
                  name="email"
                  inputProps={{ maxLength: 100 }}
                  inputRef={register({
                    required: true,
                    validate: {
                      isValidEmail: value => {
                        if (!EMAIL_REGEX.test(value)) {
                          return 'Invalid email address';
                        }

                        return true;
                      }
                    }
                  })}
                  color="secondary"
                  className="login__form-field"
                />
                <p className="login__form-error-message">
                  {
                    errors.email && errors.email.type !== 'required' ? errors.email.message: renderErrorRequired(errors, 'email')
                  }
                </p>
              </div>

              <Button
                label={'Sign up'}
                buttonType="primary"
                className={'login__form-cta'}
                loading={investorLoginLoading}
                disabled={investorLoginLoading}
              />
              <div className="signup">
                <span>Have an account ?&nbsp;</span>
                <Link className="login__form-desc login__form-forgot-password" to={publicRoute('/login')}>Sign in ?</Link>
              </div>
            </form>
          </>
        )
      }
    }
  }

  const handleUserLogin = () => {
    dispatch(connectWallet());
  };

  return (
    <InvestorLayout>
      {render()}
    </InvestorLayout>
  )
};

export default withRouter(InvestorRegister);
