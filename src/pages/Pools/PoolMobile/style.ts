import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    link: {
      display: 'block',
      width: '100%',
    },
    row: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: '46px',
      mixBlendMode: 'normal',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '0 35px',
      borderTop: 'none',
      width: '100%'
    },
    name: {
      color: '#fff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      minWidth: '240px',
      width: '24%',

      '& img': {
        width: '28px',
        height: '28px',
        marginRight: '10px',
        borderRadius: '50%',
      }
    },
    ratio: {
      minWidth: '120px',
      width: '12%',
    },
    status: {
      '& div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '26px',
        minWidth: '140px',
        width: '12%',
        padding: '6px 24px',
        borderRadius: '20px',
      },
      '& .up-comming': {
        backgroundColor: '#6398FF',
        color: '#fff'
      },
      '& .in-progress': {
        backgroundColor: '#FFDE30',
        color: '#030925'
      },
      '& .closed': {
        backgroundColor: '#D01F36',
        color: '#fff'
      },
      '& .filled': {
        backgroundColor: '#12A064',
        color: '#fff'
      },
      '& .joining': {
        backgroundColor: '#12A064',
        color: '#fff'
      },
    },
    poolType: {
      textTransform: 'capitalize',
      minWidth: '120px',
      width: '12%'
    },
    progress: {
      minWidth: '400px',
      width: '40%',
      color: '#fff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      '& > span': {
        marginRight: '10px',
        minWidth: '60px'
      },
      '& .progress': {
        width: '280px',
        height: '5px',
        borderRadius: '10px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        position: 'relative',
      },
      '& .current-progress': {
        width: '280px',
        height: '5px',
        borderRadius: '10px',
        backgroundColor: '#232394',
        position: 'absolute',
        left: 0,
        top: 0,
      }
    },
    [theme.breakpoints.down('xs')]: {
      row: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        height: 'auto',
        mixBlendMode: 'normal',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '0 15px',
      },
      ratio: {
        display: 'none'
      },
      poolType: {
        display: 'none'
      },
      progress: {
        width: '20%',
        minWidth: '60px',
        '& .progress': {
          display: "none"
        }
      },
      name: {
        width: '40%',
        minWidth: '120px',
      },
      status: {
        width: '40%',
        minWidth: '120px',
      }
    }
  };
});

export default useStyles;
