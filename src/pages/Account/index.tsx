import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import { getBalance } from '../../store/actions/balance';
import { getTiers, getUserTier, getUserInfo } from '../../store/actions/sota-tiers';
import { getAllowance } from '../../store/actions/sota-token';
import Tiers from './Tiers';
import DefaultLayout from '../../components/Layout/DefaultLayout';
import AccountInformation from './AccountInformation';
import ManageTier from './ManageTier';
import useStyles from './style';
import useAuth from '../../hooks/useAuth';
import useTokenDetails from '../../hooks/useTokenDetails';
import useFetch from '../../hooks/useFetch';
import { USER_STATUS } from '../../constants';

const TOKEN_ADDRESS = process.env.REACT_APP_PKF || '';

const iconWarning = "/images/icons/warning.svg";
const iconClose = "/images/icons/close.svg";

const Account = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { data: balance = {} } = useSelector((state: any) => state.balance);
  const { data: userInfo = {} } = useSelector((state: any) => state.userInfo);
  const { isAuth, connectedAccount, wrongChain } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const { tokenDetails } = useTokenDetails(TOKEN_ADDRESS, 'eth');
  const { data: data = {}, loading, error } = useFetch<any>(`/user/profile?wallet_address=${connectedAccount}`);
  const [emailVerified, setEmailVeryfied] = useState(0);
  const [email, setEmail] = useState<string>('');
  const [showAlertVerifyEmail, setShowAlertVerifyEmail] = useState(true);
  useEffect(() => {
    if (isAuth && connectedAccount && !wrongChain) { 
      dispatch(getBalance(connectedAccount));
      dispatch(getUserInfo(connectedAccount));
      dispatch(getUserTier(connectedAccount));
      dispatch(getAllowance(connectedAccount));
    }
  }, [isAuth, wrongChain, connectedAccount]);

  // useEffect(()=>{
  //   if(!connectedAccount) {
  //     props.history.push('/dashboard');
  //   }
  // }, [connectedAccount])

  useEffect(() => {
    console.log('data', data)
    if(data && data.user && data.user) {
      setEmail(data.user.email)
      setEmailVeryfied(data.user.status)
    } else {
      setEmail('')
      setEmailVeryfied(USER_STATUS.UNVERIFIED)
    }
  }, [data]);

  return (
    <DefaultLayout>
      {emailVerified == USER_STATUS.UNVERIFIED && !loading && showAlertVerifyEmail && connectedAccount && <div className={classes.alertVerifyEmail}>
        &nbsp;&nbsp;<img src={iconWarning}/>
        <img src={iconClose} className="btn-close" onClick={() => setShowAlertVerifyEmail(false)}/>
        &nbsp;&nbsp;
        <span>Your account has not been verified. To verify your account, please click on Verify Email button.</span>
      </div>}
      <div className={classes.accountContainer}>
        <div className={classes.leftPanel}>
          <AccountInformation
            classNamePrefix="account-infomation"
            balance={balance}
            userInfo={userInfo}
            tokenDetails={tokenDetails}
            email={email}
            emailVerified={emailVerified}
            setEmail={setEmail}
          ></AccountInformation>
          <Tiers
            showMoreInfomation={false}
            tokenSymbol={tokenDetails?.symbol}
          />
        </div>
        <div className={classes.rightPanel}>
          <ManageTier tokenDetails={tokenDetails} emailVerified={emailVerified}/>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default withRouter(Account);
