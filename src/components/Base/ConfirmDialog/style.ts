import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
  return {
    dialog: {
      '& .MuiDialog-paperWidthSm': {
        width: 600
      }
    },
    dialogContent: {
      padding: '8px 24px',
      overflowY: 'initial'
    },
    dialogActions: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '8px 24px',
      marginTop: 15,

      '& > *:not(:last-child)': {
        marginRight: 5 
      }
    },
    dialogInput: {
      borderRadius: 5,
      border: '1px solid black',
      padding: '10px',
      transition: '.1s all ease-in',

      '&:focus': {
        borderColor: '#FFCC00',
        outline: 'none'
      }
    },
    dialogLabel: {
      marginRight: 10,
      color: '#363636'
    },
    dialogButton: {
      textTransform: 'inherit',
      backgroundColor: '#FFCC00',
      color: 'white',
      fontWeight: 600,

      '&:hover': {
        backgroundColor: '#c29f15'
      }
    },
    dialogButtonCancel: {
      backgroundColor: '#e51d1d',

      '&:hover': {
        backgroundColor: '#a0033b'
      }
    }
  }
});

export default useStyles;

