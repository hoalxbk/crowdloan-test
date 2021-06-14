import {makeStyles} from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
  buttonGoto: {
    backgroundColor: "#FFCC00 !important",
    fontWeight: 700,
    color: "white",
    borderRadius: 30,
    marginLeft: "auto",
    minWidth: 150,
    '& .iconButton': {
      backgroundColor: '#FEDC00',
      borderRadius: '50%',
      width: 25,
      height: 25,
      display: 'flex',
      justifyContent: 'center',
    },
    '& .MuiButton-label': {
      justifyContent: 'space-between',
      paddingLeft: 20,
    },
    '& a': {
      color: 'white',
      textTransform: 'capitalize',
      '&:hover': {
        color: theme.custom.colors.primaryText,
      }
    }
  },
    campaignProgress: {
      '&--wordBreak': {
        width: '100%',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'inline-block'
      },
      '&__left': {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '15px',
      },
      '&__left-value--flex': {
        display: 'flex',
        alignItems: 'center'
      },
      '&__left-value': {
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 'bold',
        fontSize: '30px',
        letterSpacing: '0.15px',
        width: '100%',
      },
      '&__left-title': {
        fontSize: '16px',
        marginLeft: '10px',
        fontWeight: 500,
        verticalAlign: 'middle'
      },
      '&__progress': {
        height: '15px',
        backgroundColor: '#FEDC00',
        borderRadius: '5px',
        marginBottom: '20px',
      },
      '&__progress-sold': {
        height: '100%',
        background: 'linear-gradient(90deg, #FFCC00 0%, #FF4C00 100%)',
        borderRadius: '5px',
      },
      '&__explication': {
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%'
      },
      '&__explication-item': {
        display: 'flex',
        maxWidth: '48%',
      },
      '&__explication-item-inner-title': {
        display: 'block',
        width: 150,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
      },
      '&__explication-item-bar': {
        width: '30px',
        height: '4px',
        borderRadius: '4px',
        marginRight: '15px',
        marginTop: '8px',
        '&.sold': {
          background: 'linear-gradient(90deg, #FFCC00 0%, #FF4C00 100%)',
        },
        '&.total': {
          backgroundColor: '#FEDC00',
        }
      },
      '&__explication-item-detail-subtitle': {
        marginBottom: '4px',
      },
      '&__explication-item-detail-title': {
        fontWeight: 500,
      }
    }
  };
});

export default useStyles;
