import React from 'react';
import {createStyles, Theme, withStyles, WithStyles} from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {ClipLoader} from "react-spinners";
import {useTypedSelector} from '../../../hooks/useTypedSelector';
import {ETH_CHAIN_ID} from '../../../constants/network';

import useStyles from './style';

const ETHERSCAN_URL = process.env.REACT_APP_ETHERSCAN_BASE_URL || "";
const BCSSCAN_URL = process.env.REACT_APP_BSCSCAN_BASE_URL || "";

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
  customClass: string,
  networkAvailable?: string,
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

const TransactionSubmitModal: React.FC<any> = (props: any) => {
  const styles = useStyles();
  const { appChainID } = useTypedSelector(state => state.appNetwork).data;
  const { opened, handleClose, transactionHash, additionalText, networkAvailable } = props;

  return (
      <Dialog open={opened} onClose={handleClose} className={styles.dialog}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose} customClass={styles.dialogTitle} >
          Transaction {transactionHash ? 'Submitted': 'Submitting'}
        </DialogTitle>
        <DialogContent>
          <div>
            {
              transactionHash ? (
                <>
                <span className={styles.dialogLabel}>TXn Hash</span>
                <input value={transactionHash} className={styles.dialogInput} disabled={true} />
                <a
                  href={ETH_CHAIN_ID == appChainID ? `${ETHERSCAN_URL}/tx/${transactionHash}` : `${BCSSCAN_URL}/tx/${transactionHash}`}
                  className={styles.dialogButton}
                  target="_blank"
                >
                  View on {ETH_CHAIN_ID == appChainID ? 'Etherscan' : 'Bscscan'}
                </a>
                {
                  additionalText && (
                    <p style={{ marginTop: 30, fontWeight: 'bold', lineHeight: '18px', fontSize: 15.5, color: '#8db4ff', fontFamily: 'Helvetica' }}>
                      {additionalText}
                    </p>
                  )
                }
                </>
              ): <ClipLoader color={'white'}/>
            }
          </div>
        </DialogContent>
      </Dialog>
  )
}

export default TransactionSubmitModal;
