import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    MyTier: {
      marginTop: 30,
      width: '50%',
      font: 'normal normal bold 14px/18px DM Sans',
      marginRight: 120,
      [theme.breakpoints.down('md')]: {
        marginRight: 0,
        width: "100%",
      },
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
        width: "100%",
      },
    },
    MyTierWinningLottery: {
    },
    MyTierAccountRedirect: {
      color: '#999999',
      fontFamily: 'Helvetica',
      fontWeight: 'normal',
      lineHeight: '24px'
    },
    MyTierRulesHeader: {
      fontFamily: 'Helvetica',
      fontSize: 15,
      fontWeight: 'normal'
    },
    table: {
      '& .MuiTableBody-root td': {
        font: 'normal normal normal 14px/24px Helvetica'
      }
    },
    tableContainer: {
      maxWidth: '100%',
      width: '100%',
      background: 'transparent',
      color: '#999999',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      marginTop: 20,

      [theme.breakpoints.down('xs')]: {
        width: '100%'
      },

      '& th, & td': {
        color: '#999999'
      },

      '& .MuiTableCell-root': {
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }
    },
    tableHeaderWrapper: {
      backgroundColor: '#040D34',
      '& th': {
        font: 'normal normal bold 14px/18px DM Sans'
      }
    },
    tableHeader: {
      color: 'white !important' as any,
      fontWeight: 700,
      fontSize: 15,
      '& > span': {
        display: 'inline-block',
      },
      [theme.breakpoints.down('xs')]: {
        '& > span': {
          // width: '120px',
          display: 'inline-block'
        }
      },
      [theme.breakpoints.down('md')]: {
        '& > span': {
          width: '120px',
        }
      },
    },
  };
});

export default useStyles;
