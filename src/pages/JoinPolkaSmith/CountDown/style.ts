import { makeStyles } from '@material-ui/core';
import {isMobile} from 'react-device-detect';

// @ts-ignore
const useStyles = makeStyles((theme: any) => {
  return {
    introCounting: {
      marginTop: 50,
      marginBottom: 50,
      display: "flex",
      justifyContent: "center",
      "& h1" :{
        fontSize: isMobile ? "28px !important" : "36px",
      },
      "& span" :{
        fontSize: isMobile ? "14px !important" : "16px",
      }
    },
    introBlock: {
      display: "inline-block",
      width: isMobile ? "100%" : "50%",
      alignContent: "center",
      textAlign: "center",
      lineHeight: 2
    },
    timeContainer: {
      borderRadius: 10,
      width: isMobile ? 45 : 70,
      height: isMobile ? 45 : 70,
      lineHeight: isMobile ? 1.5 : 2,
      backgroundColor: "#ffffff16",
      textAlign: "center",

    },
  };
});

export default useStyles;
