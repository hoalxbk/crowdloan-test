import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    modalTransaction: {
      '& .modal-content': {
        width: '600px',
      },
      '& .modal-content__body': {
        padding: '0',

        '& .input-group': {
          background: '#11152A',
          padding: '0 10px',
          borderRadius: '4px'
        },
        '& .input-group input': {
          cursor: 'default',
          padding: '0'
        },
        '& .subtitle span': {
          textIndent: '10px',
          marginBottom: '5px'
        }
      },
      '& .modal-content__foot a': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#3232DC',
        borderRadius: '60px',
        height: '42px',
        width: '100%',
        color: '#FFFFFF'
      }
    },
    [theme.breakpoints.down('xs')]: {
      modalTransaction: {
        '& .modal-content': {
          width: 'calc(100% - 40px)',
        },
        '& .modal-content__body': {
          padding: '0'
        }
      }
    }
  };
});

export default useStyles;
