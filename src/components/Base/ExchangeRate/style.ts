import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    exchangeRate: {
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: 0.25,
      color: '#636363',
      marginTop: 20
    },
    groupShowRate: {
      display: 'flex',
    },
    formControlFlexBlock: {
      display: 'flex',
      flexDirection: 'column',
      width: '40%'
    },
    formControlFlex: {
      marginTop: 20,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    formControlLabel: {
      fontSize: 14,
      letterSpacing: '0.25px',
      color: '#363636'
    },
    formControlBlurLabel: {
      color: '#9A9A9A !important'
    },
    formControlInput: {
      display: 'block',
      border: '1px solid #DFDFDF',
      width: '100%',
      padding: '13px',
      borderRadius: 5,
      marginTop: 5,
      backgroundColor: 'white',
      transition: '.1s all ease-in',

      '&:focus': {
        borderColor: '#FFCC00',
        outline: 'none'
      }
    },
    formControlIcon: {
      display: 'inline-block',
      marginTop: 10
    },
    affiliateYes: {
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: 0.25,
      color: '#00AF12',
      display: 'flex',
      alignItems: 'center',

      '& .icon': {
        display: 'inline-block',
        width: 24,
        height: 24,
        maskImage: `url('/images/icon_check.svg')`,
        backgroundColor: '#00AF12',
        marginRight: 3,
      }
    },
    formControlRate: {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      marginTop: 5,
    },
  formInputBox: {
    border: '1px solid #DFDFDF',
    padding: '13px',
    maxWidth: '100%',
    width: '100%',
    fontSize: 14,
    borderRadius: 5,
    'border-top-right-radius': 0,
    'border-bottom-right-radius': 0,


    '&:focus': {
      outline: 'none'
    }
  },
  formInputBoxEther: {
    border: '1px solid #000000 !important',
  },
  formInputBoxBS: {
    backgroundColor: '#DFDFFF',
    color: '#3A39BB',

  },
  box: {
    right: 0,
    top: 0,
    width: 60,
    height: 44,
    backgroundColor: '#000000',
    fontSize: 14,
    color: 'white',
    border: 'none',
    display: 'inline-block',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    'border-top-right-radius': 5,
    'border-bottom-right-radius': 5,
    padding: 5
  },
  boxEther: {
    backgroundColor: '#3A39BB'
  },
    valueGroupShowTooltip: {
      fontSize: 13
    },
  }
});

export default useStyles;
