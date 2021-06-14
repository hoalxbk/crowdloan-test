

import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    confirmEmail: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
      '& img': {
        height: '100px',
        marginBottom: '20px'
      },
      '& h2': {
        color: '#fff',
        textAlign: 'center',
        font: 'normal normal bold 36px/40px DM Sans',
        marginBottom: '8px'
      },
      '& p': {
        color: '#999999',
        font: 'normal normal normal 16px/26px Helvetica',
        textAlign: 'center',
        marginBottom: '28px'
      },
      '& a': {
        width: '200px',
        height: '42px',
        border: 'none',
        borderRadius: '40px',
        backgroundColor: '#3232DC',
        outline: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFF',
        font: 'normal normal bold 14px/18px DM Sans'
      }
    },
    contentLoading: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      '& p': {
        color: '#fff',
        font: 'normal normal bold 14px/18px DM Sans'
      }
    }
  };
});

export default useStyles
