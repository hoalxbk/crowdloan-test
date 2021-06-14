import React from 'react';
import InvestorLayout from "../InvestorLayout/InvestorLayout";
import TextTitle from "../InvestorLayout/TextTitle";
// import { Grid } from '@material-ui/core';
// import DefaultLayout from '../../components/Layout/DefaultLayout';
// import { Empty } from '@prive/prive-core-ui';
// import { Help } from '@material-ui/icons';
// import useStyles from './styles';

const ErrorPage = () => {
  // const styles = useStyles();

  return (
    <InvestorLayout>
      <TextTitle>
        Error!!! Something went wrong
      </TextTitle>
    </InvestorLayout>
  );

  // return (
  //   <div>
  //     ErrorPage
  //     {/* <Grid container direction="row" justify="center" alignItems="center" className={styles.container} spacing={10}>
  //       <Grid item xs={12} sm={6}>
  //         <Empty title="500 Server Error!" subTitle="Ohh...Something went wrong!" icon={Help} state="negative" />
  //       </Grid>
  //     </Grid> */}
  //   </div>
  // );
};

export default ErrorPage;
