import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    content: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '8px', 
      padding: '25px 40px 35px 40px',
      marginTop: '270px',

      '& .button-area': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
      },

      '& .button-area .btn': {
        height: '42px',
        borderRadius: '40px',
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#FFFFFF',
        border: 'none',
        outline: 'none',
        padding: '0 35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',

        '&:hover': {
          cursor: 'pointer'
        },

        '&.disabled': {
          backgroundColor: 'silver'
        },
      },

      '& .button-area .btn-lock': {
        background: '#3232DC',
        marginRight: '7%'
      },

      '& .button-area .btn-unlock': {
        background: '#D01F36',
      },
      [theme.breakpoints.down('md')]: {
        marginTop: '0',
      },

      [theme.breakpoints.down('xs')]: {
        padding: '25px 24px 35px 24px',
        marginTop: '0',

        '& .button-area': {
          flexDirection: 'column',

          '& .btn': {
            width: '100%',
          },

          '& .btn-lock': {
            marginRight: '0',
            marginBottom: '12px'
          },
        }
      },
    },
    noteNetwork: {
      font: 'normal normal bold 14px/18px DM Sans',
      color: '#D01F36',
      marginTop: '15px',
    },
    manageTier: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    walletBalance: {
      marginTop: '55px'
    },
    tableHead: {
      color: '#fff',
      font: 'normal normal bold 14px/18px DM Sans',
      marginBottom: '20px',

      '& .group': {
        display: 'flex',
        justifyContent: 'space-between'
      }
    },
    tableBody:  {
      color: '#fff',
      height: '200px',
      '& .group': {
        display: 'flex',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: '48px',
        alignItems: 'center'
      },

      '& .group span': {
        width: '33%',

        '&:first-child': {
          font: 'normal normal bold 14px/18px DM Sans',
          color: '#fff'
        },
        '&:last-child': {
          textAlign: 'right',
          font: 'normal normal normal 14px/24px Helvetica',
          color: '#999999'
        },
        '&:nth-child(2)': {
          textAlign: 'center',
          font: 'normal normal normal 14px/24px Helvetica',
          color: '#999999'
        }
      }
    },
    noteStake: {
      font: 'normal normal bold 14px/18px DM Sans',
      color: '#FFF',
      marginBottom: '50px'
    },
    textDefault: {
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '24px',
      color: '#999999',
    },
    balance: {
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '28px',
      lineHeight: '32px',
      color: '#FFFFFF',
      marginTop: '8px',
      marginBottom: '13px',
    },
    title: {
      color: '#FFF',
      font: 'normal normal bold 24px/32px DM Sans'
    }
  };
});

export default useStyles;
