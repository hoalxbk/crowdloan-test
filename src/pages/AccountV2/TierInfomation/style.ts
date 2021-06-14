import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    tierInfomation: {
      marginTop: "40px"
    },
    
    conversionRate: {
      display: 'flex',
      flexDirection: 'column',
      width: '300px',
      '& .group': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        minHeight: '42px',
      },
      '& .group:last-child': {
        borderBottom: 'none'
      },
      '& span': {
        color: '#fff',
        font: 'normal normal bold 14px/18px DM Sans',
        width: '40%',
      },
      '& span:last-child': {
        textAlign: 'right'
      },
      '& h3': {
        color: '#FFF',
        font: 'normal normal bold 18px/24px DM Sans',
        marginBottom: '12px'
      }
    },
    [theme.breakpoints.down('xs')]: {
      conversionRate: {
        width: '100%'
      }
    }
  };
});

export default useStyles;
