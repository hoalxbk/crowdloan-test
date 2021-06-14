import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    dialog: {
      '& .MuiPaper-root': {
        // background: '#020616',
        padding: 40,
        maxWidth: 900,
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
        fontWeight: 700,
        paddingBottom: 16,
        font: 'normal normal bold 18px/24px DM Sans',
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
      display: 'flex',
      justifyContent: 'space-between',
      margin: '0 -20px',
      padding: '0 !important' as any,
      position: 'relative'
    },
    loadingIcon: {
      position: 'absolute',
      left: '50%',
      top: '30%',
      transform: 'translate(-50%, -50%)'
    }
  };
});

export default useStyles;
