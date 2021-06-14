import { useContext } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { ETH_CHAIN_ID } from '../../../../constants/network';
import { ConnectorNames } from '../../../../constants/connectors';
import { AppContext } from '../../../../AppContext';
import {withWidth, isWidthDown, isWidthUp} from '@material-ui/core';
import useStyles from './style';
import { trimMiddlePartAddress } from '../../../../utils/accountAddress';
import {useWeb3React} from "@web3-react/core";
import {checkIsWalletLink, disconnectWalletLink} from "../../../../utils";

const linkIcon = '/images/hyperlink.svg';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      paddingTop: 0,
      borderRadius: 50,
      display: 'flex',
      justifyContent: 'space-between'
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: 'black',
      backgroundColor: '#4B4B4B',
      padding: 4,

      "&:hover" : {
        backgroundColor: '#D4D4D4'
      }
    },
    svgIcon: {
      fontSize: 5
    },
  });

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
  customClass: string
}

export interface ComponentProps {
  opened: boolean,
  handleClose: () => void;
  currentWallet: any;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, customClass, onClose, ...other } = props;

  const customStyles = {
    color: 'white',
    padding: 0,
  }

  return (
    <MuiDialogTitle disableTypography className={`${classes.root} ${customClass}`} {...other} style={customStyles}>
      <Typography variant="h6">{children}</Typography>
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    color: '#999999'
  },
}))(MuiDialogContent);

const WalletDisconnect: React.FC<ComponentProps> = (props: any) => {
  const styles = useStyles();
  const { logout: disconnectWallet } = useContext(AppContext);
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  const { opened, handleClose, currentWallet } = props;

  const walletName = currentWallet && currentWallet.title;
  const address = currentWallet ? currentWallet.addresses[0] : '';
  const balance = address ? currentWallet.balances[address]: 0;
  const networkName = appChainID === ETH_CHAIN_ID ? 'Ethereum': 'Binance Smart Chain';
  const currency = appChainID === ETH_CHAIN_ID ? 'ETH': 'BNB'
  const walletIconPath = currentWallet ? `/images/${currentWallet.typeId}.svg`: '';

  const {connector} = useWeb3React();
  const handleAccountLogout = async () => {
    if (walletName === ConnectorNames.WalletConnect && localStorage.getItem("walletconnect")) {
      localStorage.removeItem("walletconnect");
    }

    // Disconnect WalletLink
    if (checkIsWalletLink(connector)) {
      connector && disconnectWalletLink(connector);
    }

    handleClose();
    disconnectWallet && disconnectWallet();
  }

  return (
    <Dialog open={opened} onClose={handleClose} className={styles.dialog}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose} customClass={styles.dialogTitle}>
        <span>
          Account&nbsp;&nbsp;
          <Link to="/account"><img src={linkIcon}/></Link>
        </span>
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        <div className={styles.accountDetails}>
          <div className={styles.accountDetailsIcon}>
            <img src="images/logo-red-kite.svg" style={{ width: '100%' }}/>
          </div>
          <div className={styles.accountDetailBlocks}>
            <div className={styles.accountDetailBlock}>
              <span className={styles.accountDetailBlockLabel}>
                Balance
              </span>
              <p className={styles.accountDetailBlockText}>{balance} {currency}</p>
            </div>
            <div className={styles.accountDetailBlock}>
              <span className={styles.accountDetailBlockLabel}>
                Network
              </span>
              <p className={styles.accountDetailBlockText}>{networkName}</p>
            </div>
            <div className={styles.accountDetailBlock}>
              <span className={styles.accountDetailBlockLabel}>
                Wallet
              </span>
              <p className={styles.accountDetailBlockText}>{walletName}</p>
            </div>
          </div>
        </div>
        <div className={styles.accountDetailAddress}>
          {
            walletIconPath && <img src={walletIconPath} alt={walletName} className={styles.walletNameIcon} />
          }
          <span className={styles.accountDetailAddressText}>
            {isWidthUp('sm', props.width) && address}
            {isWidthDown('xs', props.width) && trimMiddlePartAddress(address, 10)}
          </span>
        </div>
        <div className={styles.accountDetailCta}>
          <div className={styles.accountDetailDisconnect} onClick={handleAccountLogout}>
            <img src="/images/disconnect.svg" className={styles.accountDetailCtaIcon} />
            <span>Disconnect</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )

}

export default withWidth()(WalletDisconnect);
