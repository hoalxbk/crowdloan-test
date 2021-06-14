import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    LotteryWinners: {
      marginRight: 120,
      width: "50%",
      [theme.breakpoints.down('md')]: {
        marginRight: 0,
        width: "100%",
      },
      [theme.breakpoints.down('xs')]: {
        marginRight: 0,
        width: "100%",
      },
    },
    LotteryWinnersDesc: {
      marginTop: 15,
      marginBottom: 16,
      font: 'normal normal normal 14px/24px Helvetica'
    },
    LotteryWinnersMessage: {
      marginBottom: 16,
      font: 'normal normal normal 14px/24px Helvetica',
      fontWeight: 'bold',
      fontSize: 15,
      color: '#8db4ff'
    },
    table: {
      '& .MuiTableBody-root td': {
        font: 'normal normal normal 14px/24px Helvetica'
      }
    },
    tableContainer: {
      maxWidth: 700,
      width: 700,
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
        width: '200px',
      },
      [theme.breakpoints.down('xs')]: {
        '& > span': {
          width: '120px',
          display: 'inline-block'
        }
      },
      [theme.breakpoints.down('md')]: {
        '& > span': {
          width: '120px',
        }
      },
    },
    tableSearchWrapper: {
      maxWidth: 360,
      position: 'relative',
      background: '#11152A',
      border: '1px solid #2D2F36',
      borderRadius: 4,
      '& input': {
        font: 'normal normal normal 14px/24px Helvetica',
        height: '36px',
        padding: '0 40px 0 12px',
        width: '100%'
      },
      '& input #placeholder': {
        color: 'rgba(153, 153, 153, 0.5)',
        font: 'normal normal normal 14px/24px Helvetica!important'
      },

    },
    tableSearchIcon: {
      position: 'absolute',
      right: 10,
      top: '50%',
      transform: 'translateY(-50%)'
    },
    tableSearch: {
      background: 'transparent',
      padding: '14px 0px 14px 12px',
      border: 'none',
      color: 'white',
      width: '80%',

      '&:focus': {
        outline: 'none'
      },

      '&::placeholder': {
        color: '#999999',
        fontWeight:  400,
        fontSize: 15
      }
    },
    pagination: {
      '& *': {
        color: 'white'
      }
    }
  };
});

export default useStyles;
