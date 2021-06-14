import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Switch, withRouter, RouteComponentProps, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { useWeb3React } from '@web3-react/core';
import useProviderConnect from './components/Base/HeaderDefaultLayout/hooks/useProviderConnect';
import { settingAppNetwork, NetworkUpdateType } from './store/actions/appNetwork';
import { AppContext } from './AppContext';

import { clearAlert } from './store/actions/alert'
import ErrorPage from './pages/ErrorPage';
import NotFoundPage from './pages/NotFoundPage';
import ErrorBoundary from './components/Base/ErrorBoundary';
import PrivateRoute from './components/Base/PrivateRoute';

import BuyToken from './pages/BuyToken';
import Dashboard from './pages/Dashboard';
import NetworkChange from './pages/NetworkChange';
import ChangePassword from './pages/ChangePassword';
import ConfirmEmail from './pages/ConfirmEmail';
import AppContainer from "./AppContainer";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";

import InvestorRegister from "./pages/Register/InvestorRegister";
import InvestorForgotPassword from "./pages/ForgotPassword/InvestorForgotPassword";
import InvestorResetPassword from "./pages/ResetPassword/InvestorResetPassword";
import InvestorLogin from "./pages/Login/InvestorLogin";

import AccountV2 from "./pages/AccountV2";
import Landing from "./pages/Landing";
import Pools from "./pages/Pools";

import JoinPolkaSmith from "./pages/JoinPolkaSmith"
//@ts-ignore
import { NotificationContainer, NotificationManager } from 'react-notifications'
import 'react-notifications/lib/notifications.css';
import {adminRoute, publicRoute} from "./utils";
import ComingSoon from "./pages/ComingSoon/ComingSoon";

/**
 * Main App routes.
 */
const Routes: React.FC<RouteComponentProps> = (props: RouteComponentProps) => {
    const dispatch = useDispatch();
    const alert = useSelector((state: any) => state.alert);
    const { history } = props;

    const { deactivate } = useWeb3React();
    const [binanceAvailable, setBinanceAvailable] = useState(false);
    const [openConnectWallet, setOpenConnectWallet] = useState<boolean>(false);
    const [currentConnectedWallet, setCurrentConnectedWallet] = useState<any>(undefined);

    const logout = () => {
        deactivate();
        dispatch(settingAppNetwork(NetworkUpdateType.Wallet, undefined));
        setCurrentConnectedWallet(undefined);
        handleConnectorDisconnect();
    }

    const {
        handleProviderChosen,
        connectWalletLoading,
        currentConnector,
        walletName,
        setWalletName,
        loginError,
        appNetworkLoading,
        handleConnectorDisconnect,
    } = useProviderConnect(
        setOpenConnectWallet,
        openConnectWallet,
        binanceAvailable
    );

    useEffect(() => {
        document.onreadystatechange = function () {
            if (document.readyState == "complete") {
                setBinanceAvailable(true);
            }
        }
    }, []);

    useEffect(() => {
        const { type, message } = alert;
        if (type && message) {
            NotificationManager[type](message);
        }
    }, [alert]);

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(clearAlert());
        });
    }, []);

    return (
        <AppContext.Provider
            value={{
                binanceAvailable,
                handleProviderChosen,
                connectWalletLoading,
                walletName,
                setWalletName,
                loginError,
                appNetworkLoading,
                handleConnectorDisconnect,
                currentConnector,
                logout,
                setCurrentConnectedWallet,
                openConnectWallet,
                setOpenConnectWallet,
                currentConnectedWallet
            }}
        >
            <div>
                <Switch>
                    {/* <Route
            exact path="/"
            render={() => <Redirect to={`${'/home'}`} />}
          /> */}
                    <Route path={`${'/join-polkasmith'}`} component={JoinPolkaSmith} />
                    <Route exact path={`${'/dashboard'}`} component={Dashboard} />
                    <Route path={`${'/buy-token/:id'}`} component={BuyToken} />
                    <Route path={'/register'} component={InvestorRegister} />
                    <Route path={'/login'} component={InvestorLogin} />
                    <Route path={'/forgot-password/investor'} exact component={InvestorForgotPassword} />
                    <Route path={'/reset-password/investor/:token'} component={InvestorResetPassword} />
                    <Route path={'/confirm-email/:token'} component={ConfirmEmail} />
                    <Route path={'/network-change'} component={NetworkChange} />
                    <Route path={'/change-password/:role?'} component={ChangePassword} />
                    <Route path={'/account'} component={AccountV2} />
                    <Route path={'/pools'} component={Pools} />
                    <Route path={'/privacy'} component={PrivacyPolicy} />
                    <Route path={'/terms'} component={Terms} />
                    <Route path={'/'} component={Landing} />

                    <Route path={'/coming-soon'} component={ComingSoon} />
                    <Route component={NotFoundPage} />
                </Switch>
            </div>
        </AppContext.Provider>
    )
};

const RoutesHistory = withRouter(Routes);

const routing = function createRouting() {
    return (
        <>
            <NotificationContainer />
            <Router>
                <AppContainer>
                    <ErrorBoundary>
                        <RoutesHistory />
                    </ErrorBoundary>
                </AppContainer>
            </Router>
        </>
    );
};
/**
 * Wrap the app routes into router
 *
 * PROPS
 * =============================================================================
 * @returns {React.Node}
 */
export default routing;
