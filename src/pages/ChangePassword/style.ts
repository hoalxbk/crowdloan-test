import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    forgotPassword: {
      minHeight: '100vh',
      '& .forgot-ps__wrap': {
        width: '500px',
        maxWidth: '100%',
        textAlign: 'left',
        margin: '0 auto'
      },
      '& .forgot-ps__logo': {
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center'
      },
      '& .forgot-ps-logo': {
        width: 20
      },

      '& .forgot-ps__title': {
        fontSize: 35
      },

      '& .forgot-ps__banner': {
        marginTop: 20,
        color: '#8b8672'
      },

      '& .forgot-ps__logo img': {
        height: '40px',
      },

      '& .forgot-ps__brand': {
        fontWeight: 900,
        color: theme.custom.colors.primary,
        fontSize: '20px',
        marginLeft: 10
      },
      '& .logo__desc--bold': {
        fontWeight: 700,
        marginBottom: 5
      },

      '& .MuiFormControl-root': {
        width: '100%'
      },

      '& .login__form': {
        marginTop: 20,
      },

      '& .login__form-error-message': {
        marginTop: 7,
        color: 'red',
      },

      '& .login__form-field': {
        marginTop: 20
      },

      '& .login__form-button': {
        marginTop: 30,
        padding: '13px 25px',
        fontWeight: 600,
        borderRadius: 5,
        border: 'none',
        cursor: 'pointer',
        backgroundColor: '#FFCC00',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        transition: '.2s all ease-in',

        '&:hover': {
          backgroundColor: '#ffd118' 
        },

        '&:focus': {
          outline: 'none'
        }
      },

      '& .login__user-loading': {
        textAlign: 'center'
      },

      '& .login__user-loading-text': {
        fontWeight: 700,
        fontSize: 20,
        marginTop: 25
      },


      [theme.breakpoints.up('md')]: {
        '& .forgot-ps__brand': {
          lineHeight: '70px',
        },
        '& .forgot-ps__logo': {
          marginBottom: '30px',
          '& img': {

          }
        },
        '& .login__logo img': {
        },
        '& .login__description': {
          marginBottom: '60px',
        },
        '& .login__button button': {
          height: '60px',
        },
        '& .login__logo-metamask img': {
          width: 'auto',
        },
      },
    }
  };
});

export default useStyles
