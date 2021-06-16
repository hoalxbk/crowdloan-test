import { makeStyles } from '@material-ui/core';
import {isMobile} from 'react-device-detect';

// @ts-ignore
const useStyles = makeStyles((theme: any) => {
  return {
    auctionPlanContainer: {
      marginTop: 30,
      display: "flex",
      flexWrap: "wrap",
    },
    auctionPlanDetail: {
      display: "inline-block",
      background: "linear-gradient(#481845, #080C33)",
      width: isMobile ? "100%" : "33.333%",
      padding: isMobile ? "50px 10px" : '50px 20px'
    },
    auctionPlanDetail1: {
      display: "inline-block",
      background: "linear-gradient(#E6447D90, #080C3380)",
      width: isMobile ? "100%" : "33.333%",
      textAlign: "center",
      padding: isMobile ? "50px 10px" : '50px 20px'
    },
    auctionKeyword: {
      height: '32px',
      width: 180,
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: 16,
      lineHeight: '18px',
      color: '#FFFFFF',
      border: 'none',
      outline: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '60px',
      backgroundColor: '#DA366E',
      margin: '10px auto 0',
    },
    auctionDes: {
      color: "#D9DAF2",
      marginTop: 20,
      lineHeight: 1.5
    },
  }
});

export default useStyles;
