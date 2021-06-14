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
      color: '#999999'
    },
    status: {
      '& div': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '26px',
        minWidth: '90px',
        width: '12%',
        padding: '6px 15px',
        borderRadius: '20px',
        '& span': {
          font: 'normal normal bold 12px/14px DM Sans'
        }
      },
      '& .tba': {
        backgroundColor: '#9E63FF',
        color: '#fff'
      },
      '& .up-comming': {
        backgroundColor: '#6398FF',
        color: '#fff'
      },
      '& .joining': {
        backgroundColor: '#12A064',
        color: '#fff'
      },
      '& .in-progress': {
        backgroundColor: '#FFDE30',
        color: '#fff'
      },
      '& .filled': {
        backgroundColor: '#12A064',
        color: '#fff'
      },
      '& .closed': {
        backgroundColor: '#D01F36',
        color: '#fff'
      },
      '& .claimable': {
        backgroundColor: '#FF9330',
        color: '#fff'
      },
      '& .none': {
        backgroundColor: '#FF9330',
        color: '#fff'
      },
    },
    poolType: {
      textTransform: 'capitalize',
      minWidth: '120px',
      width: '12%',
      color: '#999999'
    },
    progress: {
      minWidth: '400px',
      width: '40%',
      color: '#fff',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      transition: '.2s all ease-in',

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
        transition: '.2s all ease-in',
      },
      '& .current-progress': {
        width: '280px',
        height: '5px',
        borderRadius: '10px',
        backgroundColor: '#232394',
        position: 'absolute',
        left: 0,
        top: 0,
        transition: '.2s all ease-in',
      }
    },
    [theme.breakpoints.down('xs')]: {
      row: {
        padding: '0 15px',
        minHeight: '46px',
        height: 'auto'
      },
      ratio: {
        display: 'none'
      },
      poolType: {
        display: 'none'
      },
      progress: {
        width: '30%',
        minWidth: '90px',
        '& .progress': {
          display: "none"
        }
      },
      name: {
        width: '50%',
        minWidth: '150px',
      },
      status: {
        width: '20%',
        minWidth: '60px',

        '& div': {
          padding: '0 10px',
          minWidth: '70px',
          width: '70px',
          '& span': {
            font: 'normal normal bold 10px/12px DM Sans'
          }
        }
      }
    }
  };
});

export default useStyles;
