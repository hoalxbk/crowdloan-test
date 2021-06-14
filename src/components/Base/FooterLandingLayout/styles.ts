import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    footer: {
      gridArea: 'footer',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '0 80px',
      backgroundColor: '#020618',
      [theme.breakpoints.down('xs')]: {
        padding: '0px'
      }
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '20px',
      padding: '60px 20px',
      width: '100%',
      [theme.breakpoints.down('xs')]: {
        gap: '0',
        padding: '60px 0',
        placeItems: 'center',
      }
    },
    infoRedKite: {
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '24px',
      color: '#999999',
      width: '100%',

      '& > a': {
        display: 'block',
        width: '43px',
        margin:  '15px auto'
      },
      '& p': {
        textAlign: 'center',
        margin: '0 20px'
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%'
      }
    },
    logo: {

    },
    shareLink: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',

      '& li': {
        margin: '0 10px'
      },
      '& i': {
        fontSize: '20px',
        '&::before': {
          color: '#9F9F9F'
        },

        '&:hover::before': {
          color: '#D01F37'
        }
      }
    },
    teleGram: {

    },
    twitter: {

    },
    facebook: {

    },
    github: {

    },
    infoCompany: {
      paddingTop: '60px',
    },
    companyLink: {
      display: 'flex',
      flexDirection: 'column',
    },
    help: {
      paddingTop: '60px',
    },
    helpLink: {
      display: 'flex',
      flexDirection: 'column',
    },
    developers: {
      paddingTop: '60px',
    },
    developerLink: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '18px',
      lineHeight: '24px',
      color: '#FFFFFF',
    },
    link: {
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '32px',
      color: '#999999',
    },
    endContent: {
      height: '50px',
      width: '100%'
    },
    copyRight: {
      textAlign: 'center',
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '12px',
      lineHeight: '50px',
      color: '#666666',
    }
  };
});

export default useStyles;
