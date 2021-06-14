import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    loginForm: {
      marginTop: 20,

      '& .login__form-field': {
        marginTop: 20,
        width: '100%'
      },

      '& .login__user-loading': {
        textAlign: 'center'
      },
  
      '& .login__form-field input': {
        color: '#0A0A16',
        background: '#FFFFFF',
        font: 'normal normal normal 14px/24px Helvetica',
        borderRadius: '4px',
        height: '42px',
        padding: '0 20px',
      },
    
      '& .login__form-field label': {
        font: 'normal normal bold 14px/18px DM Sans',
        color: '#999999',
        marginBottom: '5px'
      },

      '& .MuiInput-underline.Mui-disabled:before': {
        content: 'none',
      },

      '& .MuiInput-underline:after, & .MuiInput-underline:before': {
        content: 'none',
      },

      '& .MuiInput-underline.Mui-focused:after': {
        transform: 'scaleX(0)'
      },

      '& .MuiInputLabel-shrink': {
        transform: 'translate(0, -8px) scale(1)'
      },

      '& .MuiInputLabel-formControl': {
        transform: 'translate(0, -8px) scale(1)'
      },
      
      '& .MuiInputLabel-formControl:focus': {
        transform: 'translate(0, -8px) scale(1)'
      },
      
    },


    //   [theme.breakpoints.up('md')]: {
    //     '& .login__title': {
    //       lineHeight: '70px',
    //     },
    //     '& .login__logo': {
    //       marginBottom: '30px',
    //       '& img': {

    //       }
    //     },
    //     '& .login__logo img': {
    //     },
    //     '& .login__description': {
    //       marginBottom: '60px',
    //     },
    //     '& .login__button button': {
    //       height: '60px',
    //     },
    //     '& .login__logo-metamask img': {
    //       width: 'auto',
    //     },
    //   },
    // }
  };
});

export default useStyles
