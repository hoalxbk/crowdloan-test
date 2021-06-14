import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    poolsContainer: {
      padding: '100px'
    },
    tabs: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
    },
    btnTab: {
      height: '28px',
      position: 'relative',
      border: 'none',
      background: 'none',
      outline: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      marginRight: '60px',
      padding: '12px 0',

      '&.active': {
        color: '#6398FF',
      },
      '&.active:after': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '3px',
        borderRadius: '20px',
        backgroundColor: '#6398FF',
        position: 'absolute',
        bottom: '0',
        left: '0',
      }
    },
    tabContent: {
      '& h2': {
        font: 'normal normal bold 28px/32px DM Sans',
        color: '#fff',
        margin: '20px 0 24px 0'
      }
    },
    searchGroup: {
      position: 'relative',
      width: '600px',
      height: '42px',
      maxWidth: '100%',
      marginBottom: '20px',

      '& input': {
        background: '#11152A',
        border: '1px solid #2D2F36',
        boxSizing: 'border-box',
        borderRadius: '4px',
        outline: 'none',
        color: '#fff',
        width: '100%',
        height: '42px',
        padding: '10px 30px 10px 10px'
      },
      '& input:placeholder': {
        font: 'normal normal normal 14px/24px Helvetica',
        color: 'rgba(153, 153, 153, 0.5)'
      },
      '& img': {
        position: 'absolute',
        right: '12px',
        transform: 'translateY(-50%)',
        top: '50%',
      }
    },
    listPools: {

    },
    poolsHead: {
      padding: '0 35px',
      display: 'flex',
      alignItems: 'center',
      height: '60px',
      width: '100%',
      background: '#040D34',
      borderRadius: '4px 4px 0px 0px',
      font: 'normal normal bold 14px/18px DM Sans',
      color: '#FFF',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      '& th': {
        textAlign: 'left',
        width: '100%',
      },
      '& tr': {
        width: '100%',
        display: 'flex',
        flexDirection: 'row'
      }
    },
    poolsBody: {
      // minHeight: '460px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      width: '100%',

      '&.loading': {
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },

      '& tr': {
        width: '100%'
      },
      '& td': {
        width: '100%',
        display: 'block'
      },

      '& .loading td': {
        display: 'flex',
        align: 'center',
        alignItems: 'center',
        justifyContent: 'center'
      }
    },
    [theme.breakpoints.down('xs')]: {
      searchGroup: {
        width: '100%',
      },
      poolsContainer: {
        padding: '20px'
      },
      poolsHead: {
        padding: '0 15px'
      },
      btnTab: {
        width: 'auto',
        marginRight: '0'
      },
      tabs: {
        justifyContent: 'space-between'
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
