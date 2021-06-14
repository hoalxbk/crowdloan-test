import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    modalDeposit: {
      '& .modal-content__body': {
        background: '#11152A',
      }
    }
  };
});

export default useStyles;
