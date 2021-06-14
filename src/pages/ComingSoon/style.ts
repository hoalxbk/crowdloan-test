import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    comingSoonWrapper: {
      width: '100%',
      minHeight: '100vh',
      overflowY: 'hidden',
      overflowX: 'hidden',
      padding: '150px 0 0 0',
      backgroundColor: '#2d2a28',

      // background: 'linear-gradient(180deg, #FFCC00 0%, #FF4C00 100%)',
      // background: 'rgb(255,184,0)',
      // background: 'linear-gradient(183deg, rgba(246,233,199,1) 0%, rgba(255,223,94,1) 50%, rgba(254,183,84,1) 100%)',
      // background: 'linear-gradient(183deg, rgba(254,183,84,1) 0%, rgba(255,232,140,1) 50%, rgba(254,183,84,1) 100%)',
      // background: 'linear-gradient(183deg, rgba(254,183,84,1) 0%, rgba(249,246,236,1) 50%, rgba(254,183,84,1) 100%)',
      // background: 'background: linear-gradient(183deg, rgba(14,10,6,1) 0%, rgba(232,232,230,1) 50%, rgba(46,35,19,1) 100%);',
      // backgroundColor: '#ffd54f',
      // backgroundColor: 'black',
      //  #FFCC00 0%, #FF4C00
    },
    countdownWrapper: {
      display: 'block',
      textAlign: 'center',
      minWidth: 500,
      maxWidth: 900,
      margin: 'auto',
    },
    timers: {
      display: 'flex',
      justifyContent: 'space-around',
      textAlign: 'center',
      paddingTop: 40,
    },
    timeWrapper: {
      textAlign: 'center'
    },
    timeCircle: {

    },
    timeText: {
      fontSize: 55,
      // color: '#8e9462',
      color: 'white',
    },
    timeDimension: {
      fontSize: 20,
      color: 'white',
    },
    starterCommingSoon: {

    },
    starterText: {
      color: '#FFCC00',
      fontSize: 50,
      fontWeight: 700,
    },
    comingsoonText: {
      fontSize: 58,
      fontWeight: 600,
      color: '#FFCC00',
      paddingBottom: 40,
    },
    campaignNext: {
      color: '#FFCC00',
      fontSize: 25,
      paddingTop: 45,
    },
    campaignTitle: {
      fontSize: 40,
    }
  };
});

export default useStyles
