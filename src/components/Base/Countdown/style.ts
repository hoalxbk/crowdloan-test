import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    countdownPart: {
      display: 'inline-block',
      listStyleType: 'none',
      padding: '.9em',
      color: 'white',
      font: 'normal normal bold 18px/24px DM Sans',

      '& span': {
        display: 'block',
        fontSize: '28px',
        fontWeight: 700,
        font: 'normal normal bold 28px/32px DM Sans',
        textAlign: 'center'
      }
    },
    countdownInfo: {
      color: '#999999',
      font: 'normal normal normal 12px/18px Helvetica!important'
    },
    [theme.breakpoints.down('xs')]: {
      countdownPart: {
        padding: '10px 5px',

        '&.number': {
          padding: '5px 5px 15px 5px'
        }
      }
    }
  };
});

export default useStyles;
