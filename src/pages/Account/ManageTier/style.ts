import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    content: {
      width: '100%',
      background: 'rgba(255, 255, 255, 0.06)',
      borderRadius: '8px', 
      padding: '25px 40px 15px 40px',

      [theme.breakpoints.down('xs')]: {
        padding: '25px 20px 15px 20px',
      },

      '& .button-area': {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row'
      },

      '& .button-area .btn': {
        height: '28px',
        borderRadius: '40px',
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        textAlign: 'right',
        color: '#FFFFFF',
        border: 'none',
        outline: 'none',
        padding: '0 35px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        '&:hover': {
          cursor: 'pointer'
        },

        '&.disabled': {
          backgroundColor: 'silver'
        }
      },

      '& .button-area .btn-lock': {
        background: '#3232DC',
        marginRight: '8px'
      },

      '& .button-area .btn-unlock': {
        background: '#D01F36',
      }
    },
    textDefault: {
      fontFamily: 'Helvetica',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontSize: '14px',
      lineHeight: '24px',
      color: '#999999',
    },
    balance: {
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '28px',
      lineHeight: '32px',
      color: '#FFFFFF',
      marginTop: '8px',
      marginBottom: '13px',
    },
    PenaltyInfomation: {
      marginTop: '40px',
      '& .title': {
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '18px',
        lineHeight: '24px',
        color: '#FFFFFF',
      },

      '& .subcription': {
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '24px',
        color: '#FFFFFF',
      },

      '& ul li': {
        height: '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
      },

      '& ul li:last-child': {
        marginBottom: 'none'
      },

      '& ul li span:last-child': {
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        textAlign: 'right',
        color: '#FFFFFF',

      },

      '& .subtitle': {
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        color: '#FFFFFF',
        marginTop: '20px',
        marginBottom: '16px'
      },

      '& .current-penalty': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '40px'
      },

      '& .last-deposit': {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        height: '40px'
      },

      '& .current-penalty span:last-child, & .last-deposit span:last-child': {
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '14px',
        lineHeight: '18px',
        textAlign: 'right',
        color: '#FFFFFF',
      }
    },
    modalDeposit: {

    },
    modal: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
      top: '0',
      left: '0',
      zIndex: 5,

      '& .modal-content': {
        width: '480px',
        maxHeight: '80%',
        overflow: 'auto',
        padding: '60px',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
        top: '40%',
        left: '50%',
        background: '#020616',
        borderRadius: '4px',
      },

      '& .modal-content__head': {
        '& .title': {
          color: '#FFFFFF',
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '18px',
        }
      },

      '& .modal-content__body': {
        background: '#11152A',
        borderRadius: '4px',
        padding: '10px 12px',
        margin: '20px 0 32px 0',

        '& .subtitle': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          color: '#999999',
          fontFamily: 'Helvetica',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '18px',
        },

        '& .input-group': {
          position: 'relative'
        },

        '& .input-group input': {
          width: '100%',
          height: '40px',
          background: 'none',
          fontFamily: 'Helvetica',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '14px',
          lineHeight: '24px',
          color: '#FDFDFD',
          border: 'none',
          outline: 'none',
        },

        '& .input-group .btn-max': {
          width: '50px',
          height: '20px',
          color: '#000',
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '12px',
          lineHeight: '14px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          outline: 'none',
          background: '#FFFFFF',
          padding: '0 12px',
          borderRadius: '1rem',

          '&:hover': {
            cursor: 'pointer'
          },
        },

        '& .input-group span': {
          color: '#000'
        },

        '& .input-group div': {
          position: 'absolute',
          right: '0',
          top: '10px'
        }
      },

      '& .modal-content__foot': {
        display: 'flex', 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

        '& button': {
          borderRadius: '60px',
          color: '#FFFFFF',
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '18px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          border: 'none',
          outline: 'none',
          padding: '12px 60px',

          '&:hover': {
            cursor: 'pointer'
          },

          '&:first-child': {
            backgroundColor: '#29C08A'
          },

          '&.btn-cancel': {
            backgroundColor: '#727272'
          }
        }
      }
    }
  };
});

export default useStyles;
