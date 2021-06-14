import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    card: {
      borderRadius: '20px',
      background: 'linear-gradient(360deg, rgba(55, 57, 73, 0.4) 0%, rgba(37, 39, 50, 0.4) 23.38%)',
      overflow: 'hidden',
      height: '100%',

      '&:hover': {
        border: '1px solid rgba(208, 31, 54, 0.4)',
        boxShadow: '0 10px 20px rgba(208, 31, 54), 0 15px 12px rgba(99, 152, 255, 0.4)'
      }
    },
    cardHeader: {
      position: 'relative',

      '& > img': {
        width: '100%',
        maxHeight: '160px',
        height: '160px',
        objectFit: 'cover',
      },

      '& .time': {
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: '#030925',
        borderRadius: '40px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Sans',
        fontStyle: 'normal',
        fontWeight: 'bold',
        fontSize: '12px',
        lineHeight: '14px',
        color: '#FFFFFF',
        padding: '6px 15px',

        '&.filled': {
          backgroundColor: 'deeppink'
        },
        '&.in-progress': {
          backgroundColor: '#FFDE30'
        },
        '&.ended': {
          backgroundColor: '#D01F36'
        },
        '&.joining': {
          backgroundColor: '#12A064'
        },
        '&.claimable': {
          backgroundColor: '#FF9330'
        },
        '&.upcoming': {
          backgroundColor: '#6398FF'
        },
        '&.tba': {
          backgroundColor: '#9E63FF'
        }
      }
    },
    cardBody: {
      padding: '16px 24px',
      '& .card-content__title': {
        display: 'flex',
        flexDirection: 'row',

        '& img': {
          minWidth: '36px',
          width: '36px',
          height: '36px',
          marginRight: '10px',
          borderRadius: '50%',
        },

        '& > div': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          width: '100%'
        },

        '& > div h2': {
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '18px',
          lineHeight: '24px',
          color: '#FFFFFF',
          textAlign: 'left',
          marginBottom: '0'
        },

        '& > div p': {
          fontFamily: 'Helvetica',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '18px',
          color: '#999999',
          textTransform: 'uppercase'
        }
      },

      '& .card-content__content': {
        display: 'flex',
        flexDirection: 'column',

        '& li': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '10px',

          '& span:first-child': {
            fontFamily: 'Helvetica',
            fontStyle: 'normal',
            fontWeight: 'normal',
            fontSize: '12px',
            lineHeight: '18px',
            color: '#999999',
          },

          '& span:last-child': {
            fontFamily: 'DM Sans',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '14px',
            lineHeight: '18px',
            color: '#FFFFFF',
          },

          '& .total': {
            fontFamily: 'DM Sans',
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '18px',
            lineHeight: '24px',
            color: '#6398FF',
          },
        },
      },

      '& .token-area': {
        marginTop: '30px',
        display: 'flex',
      },
      '& .token-area > div': {
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px',
        padding: '5px 17px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '12px'
      },
      '& .token-area img': {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        marginRight: '10px'
      },
      '& .token-area span': {
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '18px',
        color: '#999999',
      },

      '& .progress-area': {
        marginTop: '30px',

        '& p': {
          fontFamily: 'Helvetica',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '18px',
          color: '#999999',
        },

        '& .progress': {
          display: 'block',
          width: '100%',
          height: '6px',
          background: '#C4C4C4',
          borderRadius: '20px',
          margin: '12px 0 8px 0',

          '& .current-progress': {
            height: '6px',
            background: '#12A064',
            borderRadius: '20px',
            display: 'block',
            transition: '2s',
            '&.inactive': {
              width: '0!important',
            }
          },
        },

        '& div': {
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between'
        },

        '& div span': {
          fontFamily: 'Helvetica',
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontSize: '12px',
          lineHeight: '18px',
          color: '#999999',
        },

        '& div div span:first-child': {
          fontFamily: 'DM Sans',
          fontStyle: 'normal',
          fontWeight: 'bold',
          fontSize: '14px',
          lineHeight: '18px',
          color: '#FFFFFF',
        },
      }
    },
    [theme.breakpoints.down('xs')]: {
      card: {
        '&:hover': {
          border: 'none',
          boxShadow: 'none'
        }
      },
    }
  };
});

export default useStyles;
