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
      [theme.breakpoints.down('md')]: {
        padding: '10px 40px',
      },
      [theme.breakpoints.only('xs')]: {
        padding: '10px 20px',
      }
    },
    mainContent: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr 1fr 1fr',
      gap: '20px',
      padding: '60px 0',
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        gridTemplateColumns: `1fr 1fr`,
      },
      [theme.breakpoints.only('xs')]: {
        gridTemplateColumns: '1fr',
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
    },
    logo: {
      marginBottom: 15
    },
    shareLink: {
      marginTop: 15,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',

      '& li': {
        margin: '0 20px 0 0'
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
      [theme.breakpoints.only('xs')]: {
        paddingTop: '0',
      }
    },
    companyLink: {
      display: 'flex',
      flexDirection: 'column',
    },
    help: {
      paddingTop: '60px',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '0',
      }
    },
    helpLink: {
      display: 'flex',
      flexDirection: 'column',
    },
    developers: {
      paddingTop: '60px',
      [theme.breakpoints.down('sm')]: {
        paddingTop: '0',
      }
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
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
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
    },
  };
});

export default useStyles;
