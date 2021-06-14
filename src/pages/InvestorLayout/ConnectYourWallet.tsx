import React from 'react';
import useStyles from './style_dark';
import TextTitle from "./TextTitle";

const ConnectYourWallet = (props: any) => {
  const classes = useStyles();
  return (
    <>
      <TextTitle>
        Connect Your Wallet
      </TextTitle>
      <div className={classes.connectYourWallet__wrapper}>
        <img src="/images/ethereum.jpg" className={classes.connectYourWallet__etherLogo} />
        <div className={classes.connectYourWallet__desc}>
          <p className={classes.connectYourWallet__desc_bold}>
            Web3 Wallet Detected
          </p>
          <p>Connect to continue signing in!</p>
        </div>
      </div>
      {props.children}
    </>
  );
}

export default ConnectYourWallet;
