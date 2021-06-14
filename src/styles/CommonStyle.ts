import { makeStyles } from '@material-ui/core';
import { NONAME } from 'dns';

const useCommonStyle = makeStyles((theme) => {
  return {
    DefaultLayout: {
      minHeight: '100vh',
  
      /* grid container settings */
      display: 'grid',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: 
        `'header'
        'main'
        'footer'`,
    },
    headPage: {
      display: 'flex',
      marginBottom: 25,
    },
    headPageLeft: {

    },
    headPageRight: {
      marginLeft: 'auto',
      display: 'flex',
    },
    btnBack: {
      background: '#FFCC00',
      boxShadow: '0px 0px 15px rgba(243, 203, 25, 0.3)',
      borderRadius: 8,
      height: 40,
      minWidth: 92,
      fontWeight: 500,
      fontSize: 14,
      lineHeight: 160,
      alignItems: 'center',
      color: '#FFFFFF',
      textTransform: 'inherit',
      fontFamily: 'Roboto-Bold',
      overflow: 'hidden',
      '&:hover': {
        background: '#FFCC00',
      }
    },
    TimePicker: {
      '& .react-time-picker__wrapper': {
        background: '#F0F0F0',
        borderRadius: 8,
        border: 'none',
        height: 40,
        padding: '5px 10px',
      },
      '& .react-time-picker__inputGroup': {
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: '#9A9A9A',
        '& input': {
          outline: 'none',
          border: 'none',
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.25px',
          color: '#9A9A9A',
        }
      },
      '& .react-time-picker__button': {
        padding: 5,
        outline: 'none',
        border: 'none',

        '& svg': {
          width: 16,
          stroke: '#9A9A9A',
        }
      },
      '& .react-time-picker__inputGroup__input': {
        outline: 'none',
        border: 'none',
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: '#9A9A9A',
      }
    },
    DatePicker: {
      '& .react-date-picker__wrapper': {
        background: '#F0F0F0',
        borderRadius: 8,
        border: 'none',
        height: 40,
        padding: '5px 10px',
      },
      '& .react-date-picker__inputGroup': {
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: '#9A9A9A',
        '& input': {
          outline: 'none',
          border: 'none',
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.25px',
          color: '#9A9A9A',
        }
      },
      '& .react-date-picker__button': {
        padding: 5,
        outline: 'none',
        border: 'none',

        '& svg': {
          width: 16,
          stroke: '#9A9A9A',
        }
      }
    },
    DateTimePicker: {
      '& .react-datetime-picker__wrapper': {
        background: '#F0F0F0',
        borderRadius: 8,
        border: 'none',
        height: 40,
        padding: '5px 10px',
        color: 'black'
      },
      '& .react-datetime-picker__inputGroup': {
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: '0.25px',
        color: '#9A9A9A',
        '& input': {
          outline: 'none',
          border: 'none',
          fontSize: 14,
          lineHeight: '20px',
          letterSpacing: '0.25px',
          color: 'black',
        }
      },
      '& .react-datetime-picker__inputGroup__divider': {
        color: 'black'
      },
      '& .react-datetime-picker__inputGroup__leadingZero': {
        color: 'black'
      },

      '& .react-datetime-picker__button': {
        padding: 5,
        outline: 'none',
        border: 'none',

        '& svg': {
          width: 16,
          stroke: '#9A9A9A',
        }
      }
    },
    iconLine: {
      margin: '0px 8px',
      position: 'relative',
      width: 12,
    },
    boxSearch: {
      position: 'relative',
      marginLeft: 12,
    },
    inputSearch: {
      background: '#F0F0F0',
      borderRadius: 8,
      width: 228,
      maxWidth: '100%',
      height: 40,
      outline: 'none',
      border: 'none',
      fontSize: 14,
      lineHeight: '20px',
      letterSpacing: '0.25px',
      color: 'black',
      padding: '10px 15px',
      paddingRight: 40,
    },
    iconSearch: {
      position: 'absolute',
      right: 16,
      top: 12,
    },
    loadingTransaction: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      zIndex: 10,
      '& .MuiBackdrop-root': {
        backgroundColor: 'rgba(3, 9, 46, 0.6)',
      },
      '& .MuiPaper-rounded': {
        background: 'none',
      },

      '& .content': {
        padding: '60px',
        background: '#020616',
        borderRadius: '4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },

      '& .content img': {
        position: 'absolute',
        top: '10px',
        right: '10px',
        cursor: 'pointer',
      },

      '& .content > span': {
        textAlign: 'center',
        marginBottom: '40px',
        display: 'block',
        width: '100%',
        color: '#ffffff'
      }
    },
    modalTransactionInfomation: {
      '& .modal-content__body span': {
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '24px',
        color: '#FDFDFD',
      },

      '& .MuiBackdrop-root': {
        background: 'none',
      },
      '& .MuiPaper-rounded': {
        background: 'none',
      },
      '& .modal-content__body': {
        backgroundColor: 'unset!important'
      },

      '& .modal-content__foot button': {
        padding: '12px!important',
        background: 'none'
      }
    },
    modal: {
      position: 'fixed',
      width: '100%',
      height: '100%',
      top: '0',
      left: '0',
      zIndex: 5,
      backgroundColor: 'rgba(3, 9, 46, 0.6)',

      '& .MuiBackdrop-root': {
        background: 'none',
      },
      '& .MuiPaper-rounded': {
        background: 'none',
      },
      '& .modal-content': {
        width: '480px',
        maxWidth: '100%',
        maxHeight: '80%',
        overflow: 'auto',
        padding: '60px',
        background: '#020616',
        borderRadius: '4px',
      },

      '& .modal-content__head': {
        padding: '10px 0',
        '& .title': {
          color: '#FFFFFF',
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '18px',
          lineHeight: '24px',
          textAlign: 'center'
        },

        '& .btn-close': {
          position: 'absolute',
          top: '10px',
          right: '10px',
          cursor: 'pointer',
        },
      },

      '& .modal-content__body': {
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
          paddingRight: '60px',
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
        padding: 0,

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

          '&.disabled': {
            backgroundColor: '#727272!important'
          },

          '&:first-child': {
            backgroundColor: '#3232DC'
          },

          '&.btn-cancel': {
            backgroundColor: '#727272'
          }
        }
      },
    },
    nnb2832d: {
      font: 'normal normal 700 28px/32px DM Sans',
    },
    nnb1824d: {
      font: 'normal normal 700 18px/24px DM Sans',
    },
    nnb1624d: {
      font: 'normal normal 700 16px/24px DM Sans',
    },
    nnb1418d: {
      font: 'normal normal 700 14px/18px DM Sans',
    },
    nnb1214d: {
      font: 'normal normal 700 12px/14px DM Sans',
    },
    nnb2432d: {
      font: 'normal normal 700 24px/32px DM Sans',
    },
    nnn1424h: {
      font: 'normal normal 400 14px/24px Helvetica',
    },
    nnn1218h: {
      font: 'normal normal 400 12px/18px Helvetica',
    },

    tooltip: {
      maxWidth: 500,
      backgroundColor: '#030925',
      boxShadow: '0px 12px 20px rgba(0, 0, 0, 0.07)',
      borderRadius: '4px',
      padding: '7px 10px',
      '&:before': {
        content: '""',
        width: '10px',
        height: '10px',
        display: 'block',
        backgroundColor: '#030925',
        transform: 'rotate(-45deg)',
        position: 'absolute',
        left: '5px',
        bottom: '10px'
      }
    },

    [theme.breakpoints.down('xs')]: {
      modal: {
        '& .modal-content__body': {
          padding: '0'
        },
        '& .modal-content': {
          padding: '15px',
        },
        '& .modal-content__foot': {
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
  
          '& button': {
            padding: '12px 30px',
            width: '100%',
            marginBottom: '15px',
          }
        },
        '& .MuiDialogActions-spacing > :not(:first-child)': {
          marginLeft: '0',
        }
      },
      loadingTransaction: {
        width: '100vw',
        height: '100vh',
        '& .MuiPaper-rounded': {
          width: '100%'
        },
        '& .content': {
          padding: '15px',
        },
      },
    }
  };
});

export default useCommonStyle;
