import React from 'react';
import useStyles from './style';
const metamskLogo = '/images/metamask-logo.png';

const NETWORK_NAME = process.env.REACT_APP_NETWORK_NAME as string;

const NetworkChange = (props: any) => {
  const classes = useStyles();
  const mainClass = classes.networkChange;

  return (
    <div className={mainClass}>
      <div className={`${mainClass}__wrap`}>
        <div className={`${mainClass}__title`}>
          Please change your metamask network to {NETWORK_NAME}
        </div>
        <div className={`${mainClass}__metamask-logo`}>
          <img src={metamskLogo} alt="logo-metamask" />
        </div>
      </div>
    </div>
  );
};

export default NetworkChange;