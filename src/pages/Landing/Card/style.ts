import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    cardImage: {
      '& img': {
        width: '100%',
        marginBottom: '30px'
      }
    },
    mainContent: {
      '& h2': {
        padding: '0 32px',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: '8px',
        minHeight: '64px'
      },

      '& p': {
        padding: '0 12px',
        textAlign: 'center',
        color: 'rgba(255, 255, 255, 0.6)'
      }
    },
    cardContainer: {
      height: '100%',
      paddingBottom: '50px',
      borderRadius: '16px',
    },
  };
});

export default useStyles;
