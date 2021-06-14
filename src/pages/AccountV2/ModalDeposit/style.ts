import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    modalDeposit: {
      '& .modal-content': {
        backgroundColor: '#1C1D36'
      },
      '& .modal-content__body': {
        padding: 0,
        marginTop: '30px',
        marginBottom: '20px',
        '& select': {
          backgroundColor: '#030925',
          width: '100%',
          height: '36px',
          border: 'none',
          outline: 'none',
          borderRadius: '4px',
          color: '#FFF',
          padding: '0 12px',
        },
      },
    },
    description: {
      font: 'normal normal normal 14px/18px Helvetica',
      color: '#FFF',
      textAlign: 'center',
      marginTop: '10px'
    },
    group: {
      padding: '10px',
      backgroundColor: '#030925',
      borderRadius: '4px',
      marginTop: '10px',

      '& input': {
        color: '#fff',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)!important'
      },
      '& button#btn-max-deposit': {
        font: 'normal normal bold 12px/14px DM Sans',
        color: '#FFF',
        backgroundColor: '#3232DC',
        borderRadius: '4px',
        width: 'auto',
        padding: '0 6px'
      },
      '& .balance': {
        color: '#9999',
        font: 'normal normal normal 12px/18px Helvetica',
      },
      '& .balance > div': {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      }
    }
  };
});

export default useStyles;
