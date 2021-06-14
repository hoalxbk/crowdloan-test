import React from 'react';
import MainDefaultLayout from '../../Base/MainDefaultLayout';
import HeaderDefaultLayout from '../../Base/HeaderDefaultLayout';
import FooterLandingLayout from '../../Base/FooterLandingLayout';
import { useCommonStyle } from '../../../styles';

const DefaultLayout = (props: any) => {
  const commonStyle = useCommonStyle();

  return (
    <div className={commonStyle.DefaultLayout}>
      <HeaderDefaultLayout/>
      <MainDefaultLayout>{props.children}</MainDefaultLayout>
      <FooterLandingLayout/>
    </div>
  );
};

export default DefaultLayout;
