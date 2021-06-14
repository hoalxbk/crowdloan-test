import { makeStyles } from '@material-ui/core'
import { Theme } from '@material-ui/core/styles/createMuiTheme'

interface Props {
  spacing: number;
}

const useStyles = makeStyles<Theme, Props>(props => ({
  button: {
    backgroundColor: '#FFCC00',
    border: 'none',
    borderRadius: 10,
    display: 'inline-block',
    fontFamily: 'Roboto-Medium',
    cursor: 'pointer',
    transition: '.2s all ease-in',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      boxShadow: '0px 15px 20px rgba(0, 0, 0, .1)',
      transform: 'translateY(-7px)'
    }
  },
  buttonContent: {
    display: 'flex',
    padding: '12px 15px',
    alignItems: 'center',
    fontSize: 14,
    color: 'white',
    fontWeight: 500
  },
  buttonText: {
    marginLeft: props => props.spacing,
    font: 'normal normal bold 14px/18px DM Sans'
  }
}));

export default useStyles;
