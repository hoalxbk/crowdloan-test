import React, { Children, useState } from 'react';
import useStyles from './style';

const warningIcon = '/images/icons/warning.svg';
const closeIcon = '/images/icons/close.svg';
const backgroundImage = '/images/icons/background.svg';
const arrowRightIcon = '/images/icons/arrow-right.svg';

const BackgroundComponent = (props: any) => {
  const styles = useStyles();

  const [showAlert, setShowAlert] = useState(true)

  return (
    <div className={styles.backgroundComponent}>
      <img src={backgroundImage}/>
      <div className={styles.mainContent}>
        <h1 className="title">Decentralize the way your ideas raise capital.</h1>
        <p className="description">Be the first to join Polkastarter, a Protocol built for cross-chain token pools and auctions, enabling projects to raise capital on a decentralized and interoperable environment based on Polkadot.</p>
        <div className={styles.buttonArea}>
          <a href="/" className="btn btn-view-pool">View all Pools</a>
          <a href="/" className="btn btn-subscriber">
            Subscribe to upcoming pools&nbsp;
            <img src={arrowRightIcon}/>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BackgroundComponent;
