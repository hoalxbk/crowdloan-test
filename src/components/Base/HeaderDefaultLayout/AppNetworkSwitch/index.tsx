import { useContext } from 'react';
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import { APP_NETWORKS, appNetworkType } from '../../../../constants/network';
import { AppContext } from '../../../../AppContext';
import ConnectWalletBox from '../ConnectWalletBox';

import useStyles from './style';

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
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, customClass, onClose, ...other } = props;

  const customStyles = {
    color: 'white',
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

const AppNetworkSwitch: React.FC<ComponentProps> = (props: ComponentProps) => {
  const styles = useStyles();
  const { opened, handleClose } = props;
  const { appNetworkLoading } = useContext(AppContext);

  return (
    <Dialog open={opened} onClose={handleClose} className={styles.dialog}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose} customClass={styles.dialogTitle} >
        Switch Network
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {
          Object.keys(APP_NETWORKS).map((key: string) => {
            const network = APP_NETWORKS[key as appNetworkType];
            return <ConnectWalletBox 
              key={key} 
              appNetwork={network} 
              handleClose={handleClose}
              isAppNetwork 
              forceEnable 
            />
          })
        }
        {
          appNetworkLoading && (
            <div className={styles.loadingIcon}>
              <img src="/images/loading.png" alt="loading image" />
            </div>
          )
        }
      </DialogContent>
    </Dialog>
  )

}

export default AppNetworkSwitch;
