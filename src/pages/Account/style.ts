import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    alertVerifyEmail: {
      position: 'relative',
      width: '100%',
      padding: '10px 0',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(50, 50, 200, 0.4)',

      '& .btn-close': {
        position: 'absolute',
        top: '50%',
        right: '15px',
        transform: 'translateY(-50%)'
      },

      '& span': {
        font: 'normal normal 400 14px/24px Helvetica',
        color: '#FFFFFF',
        paddingRight: '40px'
      }
    },
    errorBanner: {
      color: 'white',
      backgroundColor: '#FF4C00',
      textAlign: 'center',
      padding: 12,
      marginBottom: 0,
      flex: 1,
    },
    accountContainer: {
      display: 'grid',
      gridTemplateColumns: '5fr 4fr',
      gap: '100px',
      padding: '120px 80px 80px 80px',
      marginTop: '0',
      marginBottom: '120px',
      position: 'relative',
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: '1fr',
      },
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: '1fr',
        padding: '40px',
        paddingTop: '150px',
      },
      [theme.breakpoints.only('xs')]: {
        gridTemplateColumns: '1fr',
        padding: '20px',
        paddingTop: '100px',
      },
    },
    leftPanel: {
    },
    rightPanel: {
      maxWidth: '100%',
      width: '100%'
    }
  };
});

export default useStyles;
