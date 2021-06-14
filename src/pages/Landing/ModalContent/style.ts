import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    ModalContent: {
      borderRadius: '4px',
      '& .modal-content': {
        minHeight: '336px',
        width: '600px',
        padding: '80px 20px',
        overflow: 'hidden',
        background: 'none',

        '& .bg': {
          position: 'absolute',
          top: '-15px',
          left: '0',
          height: 'calc(100% + 20px)',
          width: '100%',
          objectFit: 'cover',
          zIndex: -1
        },

        '& .btn-close': {
          position: 'absolute',
          top: '20px',
          right: '10px',
          cursor: 'pointer'
        }
      },
      '& .modal-content__head .title': {
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '36px',
        lineHeight: '40px',
        textAlign: 'center',
        color: '#FFFFFF',
        marginBottom: '8px',
      },
      '& .modal-content__body': {
        margin: '0 0 40px 0',
        padding: '0'
      },
      '& .modal-content__body .subtitle span': {
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '16px',
        lineHeight: '26px',
        textAlign: 'center',
        color: '#FFFFFF',
        width: '100%'
      },
      '& .modal-content__foot': {
        justifyContent: 'center',

        '& button': {
          backgroundColor: '#3232DC!important'
        }
      },
      [theme.breakpoints.down('xs')]: {
        '& .modal-content': {
          width: '100%',
          padding: '60px 20px',
          borderRadius: '4px',
          overflow: 'hidden'
        },
        '& .MuiPaper-rounded': {
          overflow: 'hidden'
        }
      }
    }
  };
});

export default useStyles;
