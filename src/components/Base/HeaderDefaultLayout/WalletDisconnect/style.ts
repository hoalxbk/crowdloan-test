import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        padding: 40,
        minWidth: 600,
        borderRadius: 15,
        backgroundColor: '#191f2a',
        border: '1px solid #273a55!important'
      }
    },
    dialogContentTypo: {
      color: 'white',
      fontSize: 16,
      marginTop: 40,
      fontWeight: 700,

      '&:first-child': {
        marginTop: 0
      }
    },
    dialogContentBlock: {
      marginTop: 20,
    },
    dialogTitle: {
      '& .MuiTypography-h6': {
        font: 'normal normal bold 28px/32px DM Sans',
        paddingBottom: 16,
      },

      '& .MuiSvgIcon-root': {
        fontSize: '1rem'
      }
    },
    dialogPrivacy: {
      display: 'flex',
      alignItems: 'center'
    },
    dialogPrivacyText: {
     fontSize: 16 
    },
    dialogPrivacyHighlight: {
      color: '#3C5EA2'
    },
    dialogCheckbox: {
      padding: 0,
      marginRight: 8,

      '& .MuiSvgIcon-root': {
        fill: 'white'
      }
    },
    dialogNetworks: {
      display: 'flex'
    },
    dialogContent: {
      padding: '0 !important' as any,
      position: 'relative'
    },
    loadingIcon: {
      position: 'absolute',
      left: '50%',
      top: '30%',
      transform: 'translate(-50%, -50%)'
    },
    accountDetails: {
      backgroundImage: "url('/images/linear-bg.png')",
      width: '100%',
      backgroundSize: 'cover',
      backgroundPosition: '100%',
      padding: 10,
      borderRadius: 10,
      color: 'white',
      display: 'flex',
    },
    accountDetailBlocks: {
      display: 'flex',
      marginLeft: 20,
      width: '90%',
      justifyContent: 'space-between'
    },
    accountDetailBlock: {
      display: 'flex',
      flexDirection: "column",
      alignItems: 'flex-start',
      justifyContent: 'center',
    },
    accountDetailBlockLabel: {
      font: 'normal normal normal 12px/18px Helvetica'
    },
    accountDetailBlockText: {
      font: 'normal normal bold 14px/18px DM Sans'
    },
    accountDetailsIcon: {
      width: 50
    },
    accountDetailAddress: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 20,
      backgroundColor: '#0d0f14',
      border: '1px solid #263246',
      boxShadow: 'inset 0 16px 30px rgba(0,0,0,.5)' ,
      padding: '10px 5px',
      borderRadius: 16
    },
    accountDetailAddressText: {
      marginLeft: 10,
      color: 'white',
      font: 'normal normal normal 14px/24px Helvetica'
    },
    walletNameIcon: {
      width: 30,
      marginLeft: 10
    },
    accountDetailCta: {
      textAlign: 'right',
      marginTop: 20,
    },
    accountDetailCtaIcon: {
      marginRight: 8,
      display: 'inline-block'
    },
    accountDetailDisconnect: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#59f',
      cursor: 'pointer',
      font: 'normal normal bold 14px/18px DM Sans'
    },
    [theme.breakpoints.down('xs')]: {
      dialog: {
        '& .MuiPaper-root': {
          padding: '20px',
          minWidth: 'unset',
          maxWidth: '100%',
          width: '100%',
          margin: '20px',
          borderRadius: 15,
          backgroundColor: '#191f2a',
          border: '1px solid #273a55!important'
        }
      }
    }
  };
});

export default useStyles;
