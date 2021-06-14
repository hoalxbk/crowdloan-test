import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    textTitleHeader: {
      color: '#FFFFFF',
      fontSize: 33,
      fontWeight: 600,
      paddingBottom: 10,
    },
    textSubTitleHeader: {
      padding: 15,
      fontWeight: 600,
      fontSize: 16,
      color: 'white',
    },
    connectYourWallet__wrapper: {
      margin: '50px 0px',
      display: 'flex',
      alignItems: 'flex-start',
      backgroundColor: 'white',
      padding: '50px 20px',
      borderRadius: 12,
    },
    connectYourWallet__etherLogo: {
      width: 40,
      backgroundColor: 'transparent',
      margin: '15px 20px 15px 20px',
    },
    connectYourWallet__desc: {
      textAlign: 'left',
      marginLeft: 30,
      paddingTop: 10,
    },
    connectYourWallet__desc_bold: {
      fontWeight: 700,
      marginBottom: 5,
    },

    buyToken: {
      backgroundColor: theme.custom.colors.mainBackground,
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'left',
      background: '#020719',
      overflow: 'auto',
      '&__not-purchasable': {
        fontSize: 16,
        fontWeight: 500,
        color: '#f07f7f',
        marginBottom: 20
      },
      '&__logout': {
        position: 'absolute',
        right: 30,
        top: 20,
        padding: '10px 30px',
        color: 'white',
        backgroundColor: '#FFCC00',
        cursor: 'pointer',
        fontWeight: 700,
        borderRadius: 5,

        '&:focus': {
          outline: 'none'
        }
      },
      '& .form': {
        width: '480px',
        borderRadius: '20px',
        backgroundColor: 'rgba(255, 255, 255, 0.06)',
        padding: '30px 40px',
      },
      '&__logo': {
        textAlign: 'center',
        marginBottom: '42px',
      },
      '&__wrapper': {
        width: '100%',
        maxWidth: '100%',
      },
      '&__campaign': {
        backgroundColor: '#fff',
        border: '1px solid #F0F0F0',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '45px 60px',
        marginBottom: '20px',
      },
      '&__campaign-duration': {
        fontSize: '16px',
        fontWeight: '500',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '5px',
        '& span': {
          marginLeft: '9px',
          position: 'relative',
          top: '-2px',
        }
      },
      '&__campaign-title': {
        fontSize: '20px',
        fontWeight: 'bold',
        letterSpacing: '0.15px',
        lineHeight: '30px',
        marginBottom: '10px',
      },
      '&__campaign-title--wordBreak': {
        width: '100%',
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
      },
      '&__campaign-total': {
        letterSpacing: '0.15px',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
        '& .total': {
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 'bold',
          fontSize: '30px',
        },
        '& .unit': {
          fontSize: '16px',
          marginLeft: '10px',
        }
      },

      '&__campaign-progress': {
        marginBottom: '20px',
      },
      '&__campaign-explication': {
        display: 'flex',
        justifyContent: 'space-between',
      },

      '&__form-wrapper': {
        backgroundColor: '#fff',
        border: '1px solid #F0F0F0',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '45px 60px',
        marginBottom: '20px',
      },
      '&__input-wrapper': {
        height: '70px',
        border: '1px solid #DFDFDF',
        padding: '12px 15px',
        borderRadius: '5px',
      },

      '&__input-label': {
        display: 'block',
        fontSize: '12px',
        letterSpacing: '0.4px',
        color: '#9A9A9A',
      },

      '&__input': {
        width: '100%',
        height: '30px',
        maxWidth: '100%',
        letterSpacing: '0.4px',
        color: theme.custom.colors.secondaryText,
        border: 0,
        outline: 'none',
        fontWeight: 'bold',
        fontSize: '20px',
      },
      '&__input-error': {
        marginTop: '5px',
      },

      '&__form-amount-unit': {
        display: 'flex',
      },
      '&__form-token-convert-unit-wrap': {
        display: 'flex',
      },
      '&__form-token-convert': {
        flexGrow: 1,
      },

      '&__form-amount': {
        flexGrow: 1,
        marginBottom: '12px',
      },
      '&__form-exchange': {
        marginBottom: '12px',
        display: 'flex',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: '12px',
        color: theme.custom.colors.secondary,
        '& span': {
          marginLeft: '5px',
        }
      },
      '&__loading': {
        textAlign: 'center',
        '& svg': {
          color: theme.custom.colors.primary,
        }
      },
      '&__loading--blue': {
        textAlign: 'center',
        '& svg': {
          color: 'blue !important' as any
        }
      },
      '&__campaign-not-found': {
        backgroundColor: '#fff',
        border: '1px solid #F0F0F0',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '45px 60px',
        marginBottom: '20px',
      },
      '&__form-reason-not-show-button': {
        backgroundColor: '#fff',
        border: '1px solid #F0F0F0',
        boxShadow: '0 0 15px rgba(255, 255, 255, 0.3)',
        borderRadius: '10px',
        padding: '15px 60px',
        marginBottom: '20px',
        color: 'red',
        textAlign: 'center',
      },
      '&__form-reason-sold-out': {
        fontSize: 16,
        fontWeight: 500,
        color: '#f07f7f',
        marginTop: 11,
        marginBottom: 20,
        textAlign: 'center',
      },
      '&__balance': {
        marginBottom: '30px',
      },
      '&__balance-title': {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '5px',
      },
      '&__balance-content': {
        display: 'flex',
      },
      '&__balance-item': {
        fontSize: '16px',
        fontWeight: 500,
        '& span': {
          color: theme.custom.colors.secondary,
        },
        '&.usdt': {
          marginLeft: '30px',
        }
      },

      '& .login__form': {
        marginTop: 20,
      },

      '& .login__form-field': {
        marginTop: 20,
        width: '100%'
      },

      '& .MuiInputBase-input': {
        color: 'white'
      },

      '& .MuiFormLabel-root': {
        color: 'white',
        transform: 'translate(0, -8px) scale(1)'
      },

      '& .MuiInput-underline:before': {
        content: 'none'
      },

      '& .MuiInput-colorSecondary.MuiInput-underline:after': {
        content: 'none'
      },

      '&__title': {
        color: 'white',
        fontSize: 30,
        fontWeight: 600,
        textAlign: 'left',
        marginTop: 20
      },

      '& .login__form-privacy': {
        textAlign: 'left'
      },

      '& .login__form-privacy a': {
        color: '#6398FF'
      },

      '& .login__form-cta': {
        padding: '15px 30px',
        backgroundColor: '#3232DC',
        border: 'none',
        marginTop: '20px',
        color: '#FFFFFF',
        width: '100%',
        borderRadius: '60px',
        cursor: 'pointer',
        height: '42px',
        boxShadow: 'none',
        font: 'normal normal bold 14px/18px DM Sans',

        '&:focus': {
          outline: 'none'
        }
      },

      '& .login__form-desc': {
        color: 'rgba(255, 255, 255, 0.6)',
        marginTop: 20,
      },

      '& .login__form-desc-link': {
        color: '#FFCC00',
        cursor: 'pointer'
      },

      '& .login__user-loading-text': {
        color: 'white',
        marginTop: 30,
        fontSize: 20,
        fontWeight: 700
      },

      '& .login__form-error-message': {
        marginTop: 7,
        color: 'red',
        textAlign: 'left'
      },

      '& .login__form-forgot-password': {
        font: 'normal normal bold 14px/18px DM Sans',
        cursor: 'pointer',
        color: '#6398FF',
      },

      '& .signup span': {
        font: 'normal normal normal 14px/24px Helvetica',
        color: '#FFFFFF',
      },

      '& .signup': {
        marginTop: '120px'
      },

      '& .login__form-redirect': {
        cursor: 'pointer',
        fontWeight: '700',
        fontSize: 15.5,
        color: '#FFCC00',
        display: 'block',
        textAlign: 'center',
        marginTop: 20
      },
    }
  };
});

export default useStyles;
