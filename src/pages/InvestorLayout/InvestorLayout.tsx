import React from 'react';
import useStyles from './style_dark';
import Logo from "./Logo";
import BackgroundComponent from './BackgroundComponent'

const InvestorLayout = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.buyToken}>
      <div className={`${classes.buyToken}__wrapper`}>
        <div className={`${classes.buyToken}__loading`}>
          <BackgroundComponent>{props.children}</BackgroundComponent>
        </div>
      </div>
    </div>
  );
}

export default InvestorLayout;
