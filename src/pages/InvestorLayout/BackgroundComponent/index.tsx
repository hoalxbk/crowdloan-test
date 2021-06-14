import useStyles from './style';

const backgroundImage = '/images/icons/background3.svg';

const BackgroundComponent = (props: any) => {
  const styles = useStyles();

  return (
    <div className={styles.backgroundComponent}>
      <div className={styles.mainContent}>
        <div>
          <img src={backgroundImage}/>
          <h1 className="title">Decentralize the way your ideas raise capital.</h1>
          <p className="description">Be the first to join Polkastarter, a Protocol built for cross-chain token pools and auctions, enabling projects to raise capital on a decentralized and interoperable environment based on Polkadot.</p>
        </div>
        <div className="form">
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default BackgroundComponent;