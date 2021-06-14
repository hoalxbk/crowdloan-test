import React from 'react';
import useStyles from "../style";
import {INSTRUCTION_WHITELIST_LINK, WHITELIST_LINK} from "../../../constants";
import moment from "moment";

function WhiteListUserGuideBanner(props: any) {
  const styles = useStyles();
  const { poolDetails } = props;
  if (!poolDetails?.whitelistBannerSetting) {
    return <></>
  }
  return (
    <>
      {/*<p className={styles.poolTicketWinner}>*/}
      {/*  <div>*/}
      {/*    <img src="/images/tick.svg" alt="warning" />*/}
      {/*  </div>*/}
      {/*  <span style={{ marginLeft: 14 }}>*/}
      {/*    You must click the Apply Whitelist button to join the pool whitelist.*/}
      {/*  </span>*/}
      {/*</p>*/}

      <div className={styles.poolWhitelistGuide} style={{  }}>
        <div className={styles.poolWhiteListLineSmall}>
          You have successfully clicked the Apply Whitelist button. {' '}
        </div>
        <div className={styles.poolWhiteListLineSmall}>
          Please fill out the {' '}
          <a style={{ color: '#1a73e8', textDecoration: 'underline' }} href={poolDetails.whitelistBannerSetting.whitelist_link} target={'_blank'}>whitelist form</a>{' '}
          to join the whitelist. {' '}
        </div>
        <div className={styles.poolWhiteListLineSmall}>
          ONCE YOU HAVE SUBMITTED THE FORM, YOU HAVE COMPLETED ALL STEPS AND ARE QUALIFIED FOR THE WHITELIST.
        </div>

        <div className={styles.poolWhiteListLineSmall} style={{ color: 'red', fontWeight: 'bold' }}>
          Please wait for the winner announcement on {' '}
          {moment.unix(poolDetails.whitelistBannerSetting.announcement_time).format('dddd, MMMM DD, YYYY')}.
        </div>
        <div className={styles.poolWhiteListLineSmall}>
          You can read more about the instruction {' '}
          <a style={{ color: '#1a73e8', textDecoration: 'underline' }} href={poolDetails.whitelistBannerSetting.guide_link} target={'_blank'}>here</a>.
        </div>

        {/* Old Message */}
        {/*<div className={styles.poolWhiteListLineSmall}>✓ Verified KYC</div>*/}
        {/*<div className={styles.poolWhiteListLineSmall}>✓ Clicked the "Apply Whitelist" button</div>*/}
        {/*<div className={styles.poolWhiteListLineSmall}>*/}
        {/*  x  You need to fill out the Whitelist Form, please click {' '}*/}
        {/*  <a style={{ color: '#1a73e8', textDecoration: 'underline' }} href={poolDetails.whitelistBannerSetting.whitelist_link} target={'_blank'}>here</a>.*/}
        {/*  (Skip if you have already filled out the form)*/}
        {/*</div>*/}

        {/*<div className={styles.poolWhiteListLine}>*/}
        {/*  You are ready for the lottery after completing the above 3 steps.  Please stay tuned for the winner announcement on*/}
        {/*  {' '}*/}
        {/*  {moment.unix(poolDetails.whitelistBannerSetting.announcement_time).format('dddd, MMMM DD, YYYY')}.*/}
        {/*  /!*Tuesday, June 1, 2021.*!/*/}
        {/*  You can read more about the instruction {' '}*/}
        {/*  <a style={{ color: '#1a73e8', textDecoration: 'underline' }} href={poolDetails.whitelistBannerSetting.guide_link} target={'_blank'}>here</a>.*/}
        {/*</div>*/}
        {/*<div className={styles.poolWhiteListLine}></div>*/}

      </div>

    </>
  );
}

export default WhiteListUserGuideBanner;
