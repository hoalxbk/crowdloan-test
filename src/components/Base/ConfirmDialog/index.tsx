import React, { ReactNode } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import { CircularProgress } from '@material-ui/core';

import Transition from '../Transition';
import useStyles from './style';


type ConfirmDialogType = {
  title: string;
  children: Element | ReactNode,
  open: boolean;
  confirmLoading: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  btnLoading?: boolean
}

const ConfirmDialog: React.FC<ConfirmDialogType> = (props: ConfirmDialogType) => {
  const { title, children, open, onConfirm, onCancel, confirmLoading, btnLoading = false } = props;
  const styles = useStyles();

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      aria-labelledby="form-dialog-title"
      className={styles.dialog}
    >
      <DialogTitle id="form-dialog-title">{title}</DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {children}
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Button className={styles.dialogButton} disabled={confirmLoading} onClick={onConfirm} color="primary">
          Submit
          {
            btnLoading && confirmLoading && <CircularProgress size={25} style={{ marginLeft: 10 }} /> 
          }
        </Button>
        <Button disabled={confirmLoading} className={`${styles.dialogButton} ${styles.dialogButtonCancel}`} onClick={onCancel} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}
 
export default ConfirmDialog;
