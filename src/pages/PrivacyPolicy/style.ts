import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    privacyPolicy: {
      backgroundColor: '#030925',
      color: 'white',
      padding: '80px 500px',
      fontFamily: 'Helvetica',
      fontSize: 15
    },
    policyDesc: {
      marginTop: 50,
      '& > p:not(:first-child)': {
        marginTop: 20 
      }
    },
    policyExplain: {
      '& > div': {
        marginTop: 30
      },
      '& p': {
        marginTop: 30
      },
      '& ul': {
        marginTop: 20,
        paddingLeft: 30
      },
      '& li': {
        marginTop: 30,
        listStyleType: 'disc',
      }
    },
    header: {
      textAlign: 'center',

    },
    subHeader: {
      textAlign: 'center',
      marginTop: 25
    }
  };
});

export default useStyles;
