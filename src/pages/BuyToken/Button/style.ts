import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    button: {
      color: 'white',
      border: 'none',
      fontWeight: 700,
      fontSize: 14,
      padding: '15px 50px',
      borderRadius: 60,
      cursor: 'pointer',
      transition: '.2s all ease-in',
      width: 180,

      '&:focus': {
        outline: 'none',
      },

      '&:hover': {
        opacity: .8
      },

      '&:active': {
        transform: 'translateY(-3px)'
      },

      '&:disabled': {
        backgroundColor: '#b5b5b5 !important' as any
      }
    }
  };
});

export default useStyles;
