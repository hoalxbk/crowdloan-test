import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    tierComponent: {
      transition: '1s',
      '&.inactive': {
        opacity: 0,
      },
      '&.active': {
        opacity: 1,
      }
    },
    title: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: '20px',
      width: '100%',
      maxWidth: '100%',

      '& p': {
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '14px',
        lineHeight: '24px',
        color: '#999999',
      }
    },
    tierLinkToAccount: {
      color: '#6399FF',
      textDecoration: 'underline'
    },
    tierList: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'relative',
      marginTop: '40px',

      '&::before': {
        content: '""',
        display: 'block',
        width: '100%',
        height: '12px',
        position: 'absolute',
        top: '11.5px',
        left: '0',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '20px'
      },

      '& li.process': {
        display: 'block',
        height: '12px',
        position: 'absolute',
        top: '11.5px',
        left: '0',
        backgroundColor: '#232394',
        zIndex: 1,
        transition: '1s',
        transitionDelay: '0.5s',
        transitionTimingFunction: 'linear',

        '&.inactive': {
          width: '0!important'
        }
      }
    },
    tierInfo: {
      width: '25%',
      position: 'relative',
      '&:last-child': {
        width: '0',
      },
      '& > div': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        zIndex: 2,
        width: '1px',
        whiteSpace: 'nowrap',
      },

      '& > div:before': {
        content: '""',
        display: 'block',
        height: '12px',
        width: '1px',
        backgroundColor: '#000',
        position: 'absolute',
        top: '11.5px',
      },

      '& .icon': {
        marginBottom: '15px',
        width: '28px',
        height: '28px',
        minWidth: '28px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '50%',
        position: 'relative',
        marginTop: '-10px',

        '& img:first-child': {
          position: 'absolute',
          left: '50%',
          top: '0',
          transform: 'translate(-50%, -50%)',
          zIndex: '0',
        },

        '& img:last-child': {
          position: 'absolute',
          left: '50%',
          top: '-2px',
          transform: 'translate(-50%, -50%)',
          width: '13px',
        },
      },

      '& .progress-bar': {
        display: 'block',
        height: '12px',
        position: 'absolute',
        top: '11.5px',
        left: '1px',
        width: 'calc(100% - 2px)',

        '&.inactive': {
          width: '0',
        }
      },

      '&.first-tier': {
        '& .icon img:first-child': {
          left: '2px',
        },

        '& .icon img:last-child': {
          left: '2px',
        },
        '& > div:before': {
          display: 'none'
        },
        '& .progress-bar': {
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px'
        }
      },

      '& .info': {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },

      '&:nth-last-child(2) .progress-bar': {
        borderTopRightRadius: '20px',
        borderBottomRightRadius: '20px'
      },

      '&:last-child > div': {
        alignItems: 'flex-end',

        '& .icon img:first-child': {
          left: 'calc(100% - 2px)',
        },

        '& .icon img:last-child': {
          left: 'calc(100% - 2px)'
        },
  
        '& .info': {
          alignItems: 'flex-end'
        },

        '&:before': {
          display: 'none'
        },
      },

      '&:first-child > div': {
        alignItems: 'flex-start'
      },

      '&:first-child > div .info': {
        alignItems: 'flex-start'
      },

      '& .tier-name.active': {
        opacity: 1,
      },

      '& span': {
        fontFamily: 'Helvetica',
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: '12px',
        lineHeight: '18px',
        color: '#FFFFFF',
        opacity: 0.4,
      },

      '& .tier-name': {
        font: 'normal normal bold 14px/18px DM Sans',
        opacity: '1'
      },
    },
    [theme.breakpoints.down('xs')]: {
      tierInfo: {
        display: 'flex',
        flexDirection: 'row',
        width: 'auto',
        height: '25%',
        '&:last-child': {
          height: '0!important',
        },

        '& .info': {
          alignItems: 'flex-start',
          marginLeft: '10px',
        },

        '& .icon, & .info': {
          marginBottom: '0',
          marginTop: '-20px'
        },

        '&:first-child .icon, &:first-child .info': {
          marginBottom: '0',
          marginTop: '0px'
        },

        '&:last-child .icon, &:last-child .info': {
          marginBottom: '0',
          marginTop: '0px'
        },

        '& .icon img:first-child': {
          top: '50%!important',
          left: '50%!important'
        },

        '& .icon img:last-child': {
          top: 'calc(50% - 2px)!important',
          left: '50%!important'
        },

        '& span:last-child': {
          height: '18px',
        },
        '&:nth-child(2) span:last-child': {
          width: '100%',
          display: 'block',
        },
        '&:last-child span:last-child': {
          textAlign: 'right'
        },

        '&:last-child .info': {
          alignItems: 'flex-start',
        },

        '& > div': {
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          position: 'relative',
          width: 'auto',
          marginLeft: '33px'
        },
        '& > div:before': {
          top: '-1px',
          height: '1px',
          marginLeft: '-21px',
          width: '12px'
        },
        '& .progress-bar': {
          display: 'block',
          width: '12px',
          position: 'absolute',
          top: '0',
          left: '11.5px',
          height: 'calc(100% - 2px)',

          borderBottomLeftRadius: '0',
          borderTopLeftRadius: '0',

          '&.inactive': {
            width: '0',
          }
        },

        '&.first-tier .progress-bar': {
          borderTopLeftRadius: '20px',
          borderTopRightRadius: '20px',
          borderBottomLeftRadius: '0',
        },

        '&:last-child .progress-bar': {
          borderBottomLeftRadius: '20px',
          borderBottomRightRadius: '20px',
          borderTopRightRadius: '0',
        }
      },
      tierList: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        position: 'relative',
        height: '310px',

        '&::before': {
          content: '""',
          display: 'block',
          width: '12px',
          height: '100%',
          position: 'absolute',
          top: '0',
          left: '11.5px',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
        '& li.process': {
          height: '0',
          width: '12px',
          position: 'absolute',
          top: '0',
          left: '11.5px',
  
          '&.inactive': {
            width: '5!important',
            height: '0!important'
          }
        },
      }
    }
  };
});

export default useStyles;
