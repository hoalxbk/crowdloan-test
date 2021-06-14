import React from 'react';
import useStyles from './style_dark';
import TextTitle from "./TextTitle";

const byTokenLogo = '/images/logo-red-kite.svg';

const Logo = (props: any) => {
  const classes = useStyles();

  return (
    <div className={`${classes.buyToken}__logo`}>
      <img src={byTokenLogo} alt="logo" />
      {/* <TextTitle>
        Sotatek Starter Launchpad
      </TextTitle> */}
    </div>
  );
}

export default Logo;
