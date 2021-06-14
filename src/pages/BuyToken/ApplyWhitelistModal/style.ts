import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        background: '#020616',
        padding: 60,
        maxWidth: 540,
        width: 540,
        textAlign: 'center'
      }
    },
    dialogLabel: {
      font: 'normal normal normal 12px/18px Helvetica',
      textAlign: 'left'
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
        paddingBottom: 16,
        font: 'normal normal bold 18px/24px DM Sans'
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
    dialogInput: {
      width: '100%',
      padding: '8px 15px',
      marginTop: 15,
      background: '#11152A',
      borderRadius: 4,
      border: 'none',
      color: 'white',
      font: 'normal normal normal 14px/24px Helvetica',

      '&:focus': {
        outline: 'none',
        color: 'white'
      }
    },
    dialogButton: {
      marginTop: 25,
      display: 'flex',
      width: '100%',
      background: '#3232DC',
      borderRadius: 60,
      padding: '0',
      color: 'white',
      border: 'none',
      font: 'normal normal bold 14px/18px DM Sans',
      cursor: 'pointer',
      transition: '.2s all ease-out',
      height: '42px',
      alignItems: 'center',
      justifyContent: 'center',

      '&:focus': {
        outline: 'none'
      },

      '&:hover': {
        opacity: .8,
        color: 'white'
      },

      '&:active': {
        transform: 'translateY(-3px)'
      },
    }
  };
});

export default useStyles;
