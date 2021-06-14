import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    walletBox: {
      padding: '16px 16px',
      maxWidth: 120,
      width: 120,
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      transition: '.1s all linear',
      boxSizing: 'border-box',
      
      '&:hover': {
        backgroundColor: '#1B1F2D',
        borderRadius: 4,
      },

      '&:not(:first-child)': {
        marginLeft: 16
      }
    },
    walletBoxText: {
      color: '#999999',
      marginTop: 10,
      font: 'normal normal normal 12px/18px Helvetica!important'
    },
    walletBoxIconWrap: {
      position: 'relative',
    },
    walletBoxIcon: {
       width: 40
    },
    walletBoxCheck: {
      position: 'absolute',
      bottom: '-3px',
      right: '-7px'
    },
    [theme.breakpoints.down('xs')]: {
      walletBox: {
        '&:not(:first-child)': {
          marginLeft: 0
        }
      },
    }
  };
});

export default useStyles;
