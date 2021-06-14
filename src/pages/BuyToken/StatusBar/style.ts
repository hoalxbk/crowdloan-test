import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    statusBar: {
      marginTop: 20
    },
    statusBarStatus: {
      position: 'relative',
      width: 90,
      display: 'inline-block',
      textAlign: 'center',
      '&:not(:last-child)': {
        marginRight: 2
      },
      '&:last-child': {
        '& > span': {
          'border-top-right-radius': 60,
          'border-bottom-right-radius': 60,
        }
      },
      '&:first-child': {
        '& > span': {
          'border-top-left-radius': 60,
          'border-bottom-left-radius': 60,
        }
      },
    },
    statusBarText: {
      font: 'normal normal bold 14px/18px DM Sans',
      fontFamily: 'DM Sans',
      fontWeight: 'bold',
    },
    statusBarLine: {
      content: "''",
      position: 'absolute',
      top: '-10px',
      width: '100%',
      height: 5,
      left: 0,
      opacity: 1,

    },
    statusBarActive: {

    }
  };
});

export default useStyles;
