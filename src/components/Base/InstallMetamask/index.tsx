import React from 'react';
import useStyles from './style';
const metamskLogo = '/images/metamask-logo.png';

const InstallMetameask = (props: any) => {
  const classes = useStyles();
  const mainClass = classes.installMetameask;
  return (
    <div className={mainClass}>
      <div className={`${mainClass}__wrap`}>
        <div className={`${mainClass}__title`}>
          Please install metamask extension
        </div>
        <div className={`${mainClass}__metamask-logo`}>
          <img src={metamskLogo} alt="logo-metamask" />
        </div>
      </div>
    </div>
  );
};

export default InstallMetameask;