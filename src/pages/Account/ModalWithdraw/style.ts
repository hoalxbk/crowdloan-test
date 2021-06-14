import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    modalWithdraw: {
      '& .modal-content__body': {
        background: '#11152A',
      },
      '& .modal-content__foot button.btn-staking': {
        backgroundColor: '#D01F36'
      }
    }
  };
});

export default useStyles;
