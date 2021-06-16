import { makeStyles } from '@material-ui/core';
import {isMobile} from 'react-device-detect';

// @ts-ignore
const useStyles = makeStyles((theme: any) => {
  return {
    polkaSmithMain: {
      width: "100%",
      height: "auto",
      paddingTop: 20,
      fontSize: 16,
      padding: isMobile ? 20 : 0
    },
    polkaSmithContainer: {
      maxWidth: 1280,
      alignItems: "center",
      padding: isMobile ? 0 : 60,
      fontFamily: 'DM Sans',
      margin: "auto",
      color: "white",
    },
    headerContainer: {
      display: "flex",
      width: "100%",
    },
    headerText: {
      display: "inline-block",
      width: !isMobile ? "45%" : "100%"
    },
    headerImg: {
      display: !isMobile ? "inline-block" : "none",
      width: "55%",
      paddingLeft: 50
    },
    headerText1: {
      fontSize: isMobile ? 36 : 48,
      "& img": {
        width: isMobile ? 32 : 40,
        height: isMobile ? 32 : 40
      }
    },
    headerContent :{
      marginTop: 20,
      fontSize: 16,
      lineHeight: 1.5,
      color: "#AEAEAE"
    },
    overviewLabel: {
      width: "100%",
      marginTop: 60,
      display: "flex",
      flexWrap: "wrap",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#ffffff36"
    },
     label: {
      width: isMobile ? "100%" : "20%",
       padding: 20,
       lineHeight: 1.8,
       border: isMobile ? "inherit" : "unset",
       textAlign: isMobile ? "center !important" : "unset",
       borderRight: "inherit",
       "& h3": {
        fontSize: 16,
       },
       "& span": {
         fontSize: 16,
         fontWeight: "bold"
       }
     },
    introMain: {
      marginTop: 100,
      background: "linear-gradient(#1e225d, #030925)",
      height: "max-content",
      width: "100%",
      borderRadius: 10,
      textAlign: "center",
      padding: isMobile ? 10 : 20,
      "& h3" :{
        fontSize: isMobile ? "14px !important" : "16px",
      },
    },
    introContainer: {
      display: "flex",
      width: "100%",
      flexWrap: "wrap",

    },
    introBlock: {
      display: "inline-block",
      width: isMobile ? "100%" : "50%",
      alignContent: "center",
      textAlign: "center",
      lineHeight: 2
    },
    introContribute: {
      borderWidth: 3,
      padding: isMobile ? 10 : 30,
      margin: isMobile ? 0 : 30,
      borderStyle: "solid",
      borderRadius: 5,
      borderColor: "#6398FF",
    },
    joinBTN: {
      height: '42px',
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#FFFFFF',
      border: 'none',
      outline: 'none',
      padding: '0 27px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '60px',
      backgroundColor: '#3232DC',
      margin: '40px auto 0',
      cursor: 'pointer'
    },
    connectWallet: {
      height: '42px',
      width: "100%",
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '14px',
      lineHeight: '18px',
      color: '#FFFFFF',
      border: 'none',
      outline: 'none',
      padding: '0 27px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: '#3232DC',
      margin: '10px auto 0',
      cursor: 'pointer'
    },
    input: {
      padding: 10,
      borderRadius: 5,
      width: "100%",
      fontSize: 16,
      borderStyle: "solid",
      borderColor: "white",
      marginTop: 10
    },
    additionalContainer: {
      textAlign: "center",
      marginTop: isMobile ? 50 : 100,
      padding: isMobile ? 0 : 100,
      lineHeight: 1.8
    },
    additionalInfo: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: 40
    },
    additionalLabelContainer: {
      display: "inline-block",
      width: isMobile ? "100%" : "33.333%",
      paddingLeft: isMobile ? "0 !important" : 0,
      paddingRight: isMobile ? "0 !important" : 0,
      padding: isMobile ? 10 : 0,
    },
    additionalLabel: {
      width: "100%",
      borderRadius: 5,
      backgroundColor: "#ffffff16",
      margin: isMobile ? "10" : "unset",
      padding: 10,
      "& h2" : {
        fontSize: 24
      }
    },
    leaderBoardContainer :{
      marginTop: 50,
      textAlign: "left"
    },
    leaderBoardTable: {
      marginTop: 20
    },
    leaderBoardRow: {
      display: "flex",
      marginTop: 10
    },
    leaderBoardItem: {
      display: "inline-flex",
      width: isMobile ? "100%" : "50%",
      "& h3": {
        display: "inline-block",
        width: "70%",
        fontSize: isMobile ? 14: 16,
        margin: "auto",
        fontWeight: 500,
      },
      "& h2": {
        fontSize: isMobile ? 14: 18,
        display: "inline-block",
        width: "30%",
        margin: "auto",
      }
    },
    auctionPlan : {
      marginTop: 50,
      textAlign: "center",
      "& h1": {
        lineHeight: 2,
        fontSize: 44
      }
    },
    askedQuestions : {
      textAlign: "center",
      marginTop: 150
    },
    questionList: {
      margin: "60px auto",
      maxWidth: 680,
      textAlign: "left"
    },
    questionItem: {
      borderBottom: "1px solid #ffffff20"
    },
    questionTitle: {
      marginTop: 20,
      display: "flex",
      width: "100%",
      "& h3" : {
        display: "inline-block",
        width: "-webkit-fill-available",
        padding: '10px 0'
      },
      cursor: "pointer"
    },
    questionContent: {
      color: "#D9DAF2",
      height: "fit-content",
      transition: "height 600ms ease-out",
      marginBottom: '15px',
      lineHeight: 1.5,
      "& a" : {
        color: "#4e5bf1"
      }
    },
    navQuestion: {
      marginTop: 20,
      transition: "all 0.5s"
    },
    scrollTop: {
      position: "fixed",
      bottom: 50,
      right: 50,
      cursor: "pointer",
      textAlign: "center"
    },
    contributeContainer: {
      borderTop: "1px solid #ffffff32",
      borderBottom: "1px solid #ffffff32",
      margin: "20px 0 40px 0",
      padding: "20px 0 40px 0"
    },
    detailInfo: {
      display: "inline-block",
      width: isMobile ? "100%" : "50%",
      "& h3" :{
        fontSize: 16
      },
      "& h2" : {
        fontSize: 22
      }
    },
    contributeForm: {
      maxWidth: 630,
      margin: "20px auto",
      "& h1" :{
        fontSize: isMobile ? "28px !important" : "36px",
      },
      "& h2" :{
        fontSize: isMobile ? "22px !important" : "24px",
      },
      "& h4" :{
        fontSize: isMobile ? "14px !important" : "16px",
      }
    },
    contributeInputGroup: {
      display: "flex",
      margin: "20px 0px"
    },
    errorMessage: {
      width: "100%",
      textAlign: "right",
      minHeight: 20,
      marginTop: -15,
      color: "#ff5151",
      fontSize: 15
    },
    contributeInputLabel: {
      display: "inline-block",
      margin: "auto 0px",
      textAlign: "left",
      width: "35%"
    },
    contributeInput: {
      display: "inline-flex",
      margin: "auto 0px",
      position: "relative",
      width: "65%"
    },
    policyConfirm: {
      display: "flex",
      textAlign: "left",
      margin: "20px 0",
    },
    maxBtn : {
      height: '30px',
      width: "60px",
      fontFamily: 'DM Sans',
      fontStyle: 'normal',
      fontWeight: 'bold',
      fontSize: '13px',
      color: '#FFFFFF',
      border: 'none',
      outline: 'none',
      padding: '0 5px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5,
      backgroundColor: '#3232DC',
      cursor: 'pointer',
      position: "absolute",
      top: 15,
      right: 5,
      zIndex: 9999
    }
  };
});

export default useStyles;
