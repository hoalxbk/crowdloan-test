import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    modalVerifyEmail: {
      '& .modal-content__body': {
        padding: 0,
        '& .input-group input': {
          paddingRight: '0'
        }
      },
      '& .modal-content__body .input-group': {
        background: '#11152A',
        padding: '0 10px',
        marginTop: '10px'
      },
      '& .disabled': {
        backgroundColor: 'silver'
      }
    },

    [theme.breakpoints.down('xs')]: {
      modalVerifyEmail: {
        '& .modal-content': {
          maxWidth: '100%',
          padding: '15px'
        },
        '& .modal-content__foot button': {
          paddingRight: '50px',
          paddingLeft: '50px'
        }
      }
    }
  };
});

export default useStyles;
