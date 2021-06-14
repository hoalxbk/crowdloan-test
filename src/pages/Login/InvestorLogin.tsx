import React, {useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { useWeb3React } from '@web3-react/core';
import {useDispatch} from 'react-redux';
import {TextField} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import { HashLoader } from 'react-spinners';
import {useForm} from 'react-hook-form';

import { AppContext } from '../../AppContext';
import { userActions } from '../../store/constants/user';
import { alertFailure } from '../../store/actions/alert';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { disconnectWalletLayer2 } from '../../store/actions/wallet';
import { login, register as userRegister } from '../../store/actions/user';
import useStyles from './style';
import Button from '../../components/Base/Button';
import {userAlreadyExists} from '../../utils/user';
import InvestorLayout from "../InvestorLayout/InvestorLayout";
import TextTitle from "../InvestorLayout/TextTitle";
import useCommonStyle from '../../styles/CommonStyle'
import Logo from '../InvestorLayout/Logo'

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const InvestorLogin: React.FC<any> = (props: any) => {
  const classes = useStyles();
  const common = useCommonStyle();
  const dispatch = useDispatch();
  const history = useHistory();

  const { handleConnectorDisconnect } = useContext(AppContext);
  const [loadingUserExists, setLoadingUserExists] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const { loading: investorLoginLoading, error } = useTypedSelector(state => state.investor);
  const { loading: investorRegisterLoading } = useTypedSelector(state => state.investorRegister);
  const { account:  connectedAccount, library } = useWeb3React();
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
    dispatch(alertFailure(error));

    return () => {
      dispatch({ type: userActions.INVESTOR_PURGE });
    }
  }, [error]);

  useEffect(() => {
    const checkUserExists = async () => {
      if (connectedAccount) {
        setLoadingUserExists(true);

        const userExists = await userAlreadyExists(connectedAccount, true);
        setLoadingUserExists(false);

        setUserExists(userExists);
      }     
    } 

    connectedAccount ? checkUserExists(): history.push('/');

    return () => { 
      const accessToken = localStorage.getItem("investor_access_token");
      if (!accessToken) {
        dispatch(disconnectWalletLayer2()); 
      }

      if (!connectedAccount) {
        handleConnectorDisconnect && handleConnectorDisconnect();
      }
    }
  }, [connectedAccount, handleConnectorDisconnect]);

  const handleFormSubmit = (data: any) => {
    if (userExists) {
      connectedAccount && library && dispatch(login(connectedAccount, library));
    } else {
      connectedAccount && library && dispatch(userRegister({ 
        email: data.email, 
        address: connectedAccount, 
        library 
      }));
    }
  }

  const render = () => {
    if (loadingUserExists) {
      return (
        <div className="login__user-loading" style={{ height: 660, maxHeight: 660, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column'}}>
          <HashLoader color={'#3232DC'} />
          <p className="login__user-loading-text" style={{ textAlign: 'center', color: '#999999' }}>Loading Ethereum Wallet</p>
        </div>
       );
    } else {
      return (
        <>
          <Logo/>
          <TextTitle>
            Wallet Connected
          </TextTitle>
          <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.loginForm}>
            <TextField id="standard-secondary" value={connectedAccount} label="Current Ethereum Address" color="secondary" className="login__form-field" disabled />
            {
              !userExists && (
                <>
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
                </>
              )
            }
            <p className={"login__form-desc login__form-privacy " + common.nnn1424h}>
              By clicking sign in you indicate that you have read and agree to our <a>Terms of Service</a> and <a>Privacy Policy</a>
            </p>
            <Button
              label={userExists ? 'Sign in': 'Sign up'}
              buttonType="primary"
              className={'login__form-cta'}
              loading={investorLoginLoading || investorRegisterLoading}
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

export default withRouter(InvestorLogin);
