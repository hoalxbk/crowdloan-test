import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => {
  return {
    polkaSmithMain: {
      width: "100%",
      height: "auto",
      paddingTop: 20,
      fontSize: 16,
    },
    polkaSmithContainer: {
      maxWidth: 1280,
      alignItems: "center",
      padding: 60,
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
      width: "45%"
    },
    headerImg: {
      display: "inline-block",
      width: "55%",
      paddingLeft: 50
    },
    headerText1: {
      fontSize: 48,
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
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "#ffffff36"
    },
     label: {
      width: "25%",
       padding: 20,
       lineHeight: 1.8,
       borderRight: "inherit"
     },
    introMain: {
      marginTop: 100,
      background: "linear-gradient(#1e225d, #030925)",
      height: "max-content",
      width: "100%",
      borderRadius: 10,
      textAlign: "center",
      padding: 20,
    },
    introContainer: {
      display: "flex",
      width: "100%",
    },
    introCounting: {
      marginTop: 50,
      marginBottom: 50,
      display: "flex",
      justifyContent: "center"
    },
    introBlock: {
      display: "inline-block",
      width: "50%",
      alignContent: "center",
      textAlign: "center",
      lineHeight: 2
    },
    timeContainer: {
      borderRadius: 10,
      width: 70,
      height: 70,
      lineHeight: 2,
      backgroundColor: "#ffffff16",
      textAlign: "center",
    },
    introContribute: {
      borderWidth: 3,
      padding: 30,
      margin: 30,
      borderStyle: "solid",
      borderRadius: 5,
      borderColor: "#6398FF"
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
      padding: 100,
      lineHeight: 1.8
    },
    additionalInfo: {
      display: "flex",
      marginTop: 40
    },
    additionalLabelContainer: {
      display: "inline-block",
      width: "33.333%",
    },
    additionalLabel: {
      width: "100%",
      borderRadius: 5,
      backgroundColor: "#ffffff16",
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
      width: "50%",
      "& h3": {
        display: "inline-block",
        width: "70%",
        fontSize: 16,
        margin: "auto",
        fontWeight: 500,
      },
      "& h2": {
        fontSize: 18,
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
    auctionPlanContainer: {
      marginTop: 30,
      display: "flex",
      flexWrap: "wrap",
    },
    auctionPlanDetail: {
      display: "inline-block",
      background: "linear-gradient(#481845, #080C33)",
      width: "33.333%",
      padding: '50px 20px'
    },
    auctionPlanDetail1: {
      display: "inline-block",
      background: "linear-gradient(#E6447D90, #080C3380)",
      width: "33.333%",
      textAlign: "center",
      padding: '50px 20px'
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
      margin: '15px 0'
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
    contributeForm: {
      maxWidth: 630,
      margin: "20px auto",
    },
    contributeInputGroup: {
      display: "flex",
      margin: "20px 0px"
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
