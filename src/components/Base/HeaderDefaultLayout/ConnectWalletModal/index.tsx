import { useContext } from 'react';
import { useSelector } from 'react-redux';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import useStyles from './style';
import ConnectWalletBox from '../ConnectWalletBox';
import { AppContext } from '../../../../AppContext';
import { APP_NETWORKS, APP_NETWORKS_NAME, appNetworkType, ETH_CHAIN_ID } from '../../../../constants/network';
import { SUPPORTED_WALLETS, connectorsSupportByNetwork } from '../../../../constants/connectors';
import { HeaderContext, HeaderContextType } from '../context/HeaderContext';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
      background: '#020616',
      paddingTop: 0
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
    }
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
  width: any;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, customClass, onClose, ...other } = props;

  const customStyles = {
    color: 'white',
  }

  return (
    <MuiDialogTitle disableTypography className={`${classes.root} ${customClass}`} {...other} style={customStyles}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    color: '#999999'
  },
}))(MuiDialogContent);

const ConnectWalletModal: React.FC<ComponentProps> = (props: ComponentProps) => {
  const styles = useStyles();
  const { opened, handleClose } = props;
  const { walletName, handleProviderChosen, connectWalletLoading } = useContext(AppContext);
  const { setAgreedTerms, agreedTerms } = useContext<HeaderContextType>(HeaderContext);
  const { appChainID } = useSelector((state: any) => state.appNetwork).data;
  const connectorsByNetwork = appChainID === ETH_CHAIN_ID ? SUPPORTED_WALLETS: connectorsSupportByNetwork[APP_NETWORKS_NAME.BSC];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target && setAgreedTerms(event.target.checked);
  };

  return (
    <Dialog open={opened} onClose={handleClose} className={styles.dialog}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose} customClass={styles.dialogTitle} >
        Connect Wallet
      </DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom className={styles.dialogContentTypo}>
          1. Accept
        </Typography>
        <div className={`${styles.dialogContentBlock} ${styles.dialogPrivacy}`}>
          <Checkbox
            checked={agreedTerms}
            onChange={handleChange}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            className={styles.dialogCheckbox}
          />
          <span className={styles.dialogPrivacyText}>
            I read and accept the
            <Link className={styles.dialogPrivacyHighlight} to="/terms" target="_blank"> Terms of Service</Link> and&nbsp;
            <Link className={styles.dialogPrivacyHighlight} to="/privacy" target="_blank"> Privacy Policy</Link>
          </span>
        </div>
        <Typography gutterBottom className={styles.dialogContentTypo} >
          2. Choose Network
        </Typography>
        <div className={`${styles.dialogContentBlock} ${styles.dialogNetworks}`}>
          {
            Object.keys(APP_NETWORKS).map((key: string) => {
              const network = APP_NETWORKS[key as appNetworkType];
              return <ConnectWalletBox key={key} appNetwork={network} isAppNetwork/>
            })
          }
        </div>
        <Typography gutterBottom className={styles.dialogContentTypo}>
          3. Choose Wallet
        </Typography>
        <div className={`${styles.dialogContentBlock} ${styles.dialogNetworks}`}>
          {
            Object.keys(connectorsByNetwork).map((key: string) => {
              const network = connectorsByNetwork[key];
              const isMobile = isWidthDown('xs', props.width);
              const showConnectorInMobile = isMobile ? network.mobile: true;
              return showConnectorInMobile && <ConnectWalletBox 
                  key={key}
                  wallet={network} 
                  isAppNetwork={false} 
                  handleProviderChosen={handleProviderChosen} 
                  connectWalletLoading={connectWalletLoading}
                  walletName={walletName}
                />
            })
          }
        </div>
      </DialogContent>
    </Dialog>
  )

}

export default withWidth()(ConnectWalletModal);
