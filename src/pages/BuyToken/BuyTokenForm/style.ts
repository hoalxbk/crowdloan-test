import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    btnGroup: {
      marginTop: 40,

      '& button:first-child': {
        marginRight: 10
      },

      '& button': {
        padding: '0 25px',
        width: '130px',
        height: '42px',
        font: 'normal normal bold 14px/18px DM Sans',
      }
    },
    buyTokenForm: {
      marginTop: 30,
      marginRight: 120,
      width: '50%',
      [theme.breakpoints.down('md')]: {
        width: '70%'
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        marginRight: 0
      },

    },
    buyTokenFormTitle: {
      marginBottom: 20,
      lineHeight: '24px',
      font: 'normal normal bold 14px/18px DM Sans',
    },
    buyTokenInputForm: {
      background: '#11152A',
      maxWidth: '70%',
      padding: '10px 12px',
      borderRadius: 4,

      [theme.breakpoints.down('md')]: {
        maxWidth: '70%',
        marginRight: 0,
      },
      [theme.breakpoints.down('xs')]: {
        maxWidth: '100%',
        marginRight: 0,
      },
    },
    buyTokenInputWrapper: {
      marginTop: 15,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',

      '& span': {
        fontWeight: 'bold'
      }
    },
    buyTokenInput: {
      backgroundColor: 'transparent',
      border: 'none',
      color: 'white',
      font: 'normal normal normal 14px/24px Helvetica',
      '&:focus': {
        outline: 'none'
      }
    },
    buyTokenInputLabel: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#999999',
      font: 'normal normal normal 12px/18px Helvetica'
    },
    buyTokenFee: {
      color: '#999999',
      marginTop: 10,
      font: 'normal normal normal 12px/18px Helvetica'
    },
    buyTokenEstimate: {
      marginTop: 32
    },
    buyTokenEstimateLabel: {
      font: 'normal normal bold 14px/18px DM Sans'
    },
    buyTokenEstimateAmount: {
      color: '#6398FF',
      marginTop: 12,
      display: 'inline-block',
      font: 'normal normal bold 28px/32px DM Sans'
    },
    [theme.breakpoints.down('xs')]: {
      btnGroup: {
        display: 'flex',
        justifyContent: 'center',
        '& button': {
          padding: '0 25px',
          width: '130px',
        }
      }
    },
    poolErrorBuyWarning: {
      marginTop: 25,
      fontWeight: 'bold',
      color: '#fff100',
      fontSize: 15
    },
    poolErrorBuy: {
      marginTop: 25,
      fontWeight: 'bold',
      fontSize: 15,
      color: '#D01F36'
    },
    purchasableCurrency: {
      display: 'flex',
      alignItems: 'center',
      font: 'normal normal bold 14px/18px DM Sans'
    },
    purchasableCurrencyIcon: {
      width: 30,
      height: 30,
      marginRight: 7
    },
    purchasableCurrencyMax: {
      padding: '5px 10px',
      marginRight: 20,
      backgroundColor: 'rgb(50, 50, 220)',
      border: 'none',
      color: 'white',
      borderRadius: 5,
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: '.2s all ease-in',

      '&:hover': {
        opacity: '.9'
      },

      '&:focus': {
        outline: 'none'
      },

      '&:active': {
        transform: 'translateY(-3px)'
      }
    },
    approveWarning: {
      fontWeight: 'bold',
      marginTop: 30,
      fontSize: 16,
      color: '#8db4ff',
      fontFamily: 'DM Sans'
    },
    allowcationWrap: {

    },
    allowcationTitle: {
      minWidth: 130,
      display: 'inline-block',
    },
    allowcationContent: {
    },
  };
});

export default useStyles;
