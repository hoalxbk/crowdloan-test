import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    poolDetailClaim: {
      marginTop: 20,
      padding: '60px 40px',
      backgroundColor: 'rgba(255, 255, 255, 0.06)',
      borderRadius: 8,
      width: '50%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      
      '& button': {
        padding: '0 60px',
        height: '42px',
        font: 'normal normal bold 14px/18px DM Sans'
      },

      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: 40
      },
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        '& #countdown': {
          marginTop: 30
        },
        '& ul': {
          textAlign: 'center'
        },
        '& button': {
          width: '100%',
          padding: '0 60px',
          height: '42px',
          font: 'normal normal bold 14px/18px DM Sans'
        }
      }
    },
    poolDetailClaimTitle: {
      '& span': {
        marginRight: 20,
        color: '#999999',
        font: 'normal normal normal 14px/24px Helvetica',
      }
    },
    poolDetailClaimInfo: {
      marginTop: 30,
      marginBottom: 40
    },
    poolDetailClaimInfoBlock: {
      display: 'grid',
      gridTemplateColumns: '1fr 2fr',
      font: 'normal normal normal 14px/24px Helvetica',
      color: '#FFF',

      [theme.breakpoints.down('xs')]: {
        gridTemplateColumns: '1fr 1fr'
      },
      '& span:first-child': {
        color: '#999999'
      },

      '&:not(:first-child)': {
        marginTop: 25,
      },
    },
  };
});

export default useStyles;
