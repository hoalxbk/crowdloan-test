import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    installMetameask: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '&__wrap': {
        width: '500px',
        maxWidth: '100%',
        textAlign: 'center',
      },
      '&__title': {
        color: 'red',
        fontSize: '30px',
        marginBottom: '30px',
      }
    }
  };
});

export default useStyles
