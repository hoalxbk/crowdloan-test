import React, {useState} from 'react';
import {withRouter} from 'react-router-dom';
import useStyles from './style';
import commonStyles from '../../styles/CommonStyle'
import {LandingCard} from './Card';
import LandingLayout from '../../components/Layout/LandingLayout'
import withWidth, {isWidthDown, isWidthUp} from '@material-ui/core/withWidth';
//@ts-ignore
import {Fade, LightSpeed} from 'react-reveal';
import ModalContent from './ModalContent';

const cardImage = '/images/icons/card-image.jpg';
const arrowRightIcon = '/images/icons/arrow-right.svg';
const background = '/images/icons/background2.svg';
const landingBackground2 = '/images/landing/landing-bg2.svg'
const landingBackground = '/images/landing/landing-bg.svg'
const landingBackgroundXs = '/images/landing/landing-bg-xs.svg'
const projectBg = '/images/landing/project-bg.png'
const contributeBg = '/images/landing/contribute-bg.png'

const Dashboard = (props: any) => {
  const styles = useStyles();
  const common = commonStyles();
  const [showModal, setShowModal] = useState(false);

  const cardsInfo = [{
    image: '/images/landing/image1.svg',
    title: 'Multi-chain, flexible options',
    description: 'Red Kite supports both Ethereum and BSC pools, and are testing Polkadot pools on PolkaFoundry testnet to become the first launchpad on Polkadot, with flexible pool types and whitelist conditions.',
    backgroundColor: 'linear-gradient(180deg, rgba(147, 19, 51, 0.69) 0%, #060B26 50%)'
  },
    {
      image: '/images/landing/image2.svg',
      title: 'Hand-picked projects',
      description: 'We hand-pick projects cautiously, scrutinize and verify the project team’s origin and legitimacy, innovation of idea, and their capacity to execute their vision.',
      backgroundColor: 'linear-gradient(180deg, #234650 0%, #060B26 50%)'
    },
    {
      image: '/images/landing/image6.svg',
      title: 'Tier and Reputation',
      description: "Our bot system automatically monitors participants' behavior to set reputation points for each partcicipants based on their actions. Reputation will affect a participant's tier and their ability to participate in next launches.",
      backgroundColor: 'linear-gradient(180deg, #50A3CF 0%, #060B26 50%)'
    },
    {
      image: '/images/landing/image3.svg',
      title: 'Fairness',
      description: "We understand that opportunities should be delivered fairly and efficiently. Red Kite's lane-based swap system ensures everybody has a chance to join accordingly based on their tier without having to resort to gas war.",
      backgroundColor: 'linear-gradient(180deg, #50307D 0%, #060B26 50%)'
    },
    {
      image: '/images/landing/image4.svg',
      title: 'Integrated Vesting Schedule',
      description: 'Red Kite goes with a Distribution Portal for projects to vest their sold tokens. This feature can also be used for pre-sale or post-sale secondary offerings.',
      backgroundColor: 'linear-gradient(180deg, #274F89 0%, #060B26 43.95%)'
    },
    {
      image: '/images/landing/image5.svg',
      title: 'Parachain Crowdloan',
      description: 'Kusama and Polkadot parachain auctions are around the corner. Red Kite supports crowdloan campaigns for projects to collect KSM and DOT tokens effectively for winning the auction.',
      backgroundColor: 'linear-gradient(180deg, #5C274F 0%, #060B26 43.33%)'
    }]

  return (
      <LandingLayout>
        <div className={styles.container + ' ' + styles.animation} style={{height: '600px'}}>
          {isWidthUp('sm', props.width) && <img src={landingBackground} alt=""/>}
          {isWidthDown('xs', props.width) && <img src={landingBackgroundXs} alt=""/>}
          <div className="main-content">
            {isWidthUp('sm', props.width) && <div className="title">
              <Fade left>
                <h1 className={common.nnb1214d}>Soar with Red Kite</h1>
              </Fade>
            </div>}
            {isWidthDown('xs', props.width) && <div className="title">
              <h1 className={common.nnb1214d}>Soar with <br/>Red Kite</h1>
            </div>}
            <Fade right>
              <div className="description">
                <p className={common.nnb1824d}>Launch hand-picked projects and help them shine.<br/>Hold $PKF to
                  participate.</p>
              </div>
            </Fade>
            <Fade bottom>
              <div className="buttons">
                <a href="https://t.me/PolkaFoundryANN" target="_blank">
                  <button className={common.nnb1418d + ' btn'}>
                    Subscribe to upcoming projects&nbsp;&nbsp;
                    <img src={arrowRightIcon}/>
                  </button>
                </a>
              </div>
            </Fade>
          </div>
        </div>
        <div className="main-content">
          <Fade>
            <div className={styles.projectMain}>
              <div className={styles.projectContainer}>
                <Fade bottom delay={500}>
                  <div className={styles.projectDetail}>
                    <Fade bottom delay={500}>
                      <h1>Token Sale Launchpad</h1>
                      <h3>Access public & special rounds for high-quality crypto projects</h3>
                      <a className={"btn"} href="/#/dashboard">
                        <button className={styles.btn}>View all project</button>
                      </a>
                    </Fade>
                    <Fade bottom delay={500}>
                      <img width={"90%"} src={projectBg}/>
                    </Fade>
                  </div>
                </Fade>
              </div>
              <div className={styles.projectContainer}>
                <Fade bottom delay={500}>
                  <div className={styles.projectDetail}>
                    <Fade bottom delay={500}>
                      <h1>PolkaSmith Parachain Crowdloan</h1>
                      <h3>Support PolkaSmith by locking KSM & earn tokens as rewards</h3>
                      <a className={"btn"} href="/#/join-polkasmith">
                        <button className={styles.btn}>Join PolkaSmith</button>
                      </a>
                    </Fade>
                    <Fade bottom delay={500}>
                      <a href="/#/join-polkasmith"><img width={"75%"} src={contributeBg}/></a>
                    </Fade>
                  </div>
                </Fade>
              </div>
            </div>
          </Fade>
        </div>
        <div className={styles.cardContainer}>
          <h2 className={common.nnb2832d}>Unparalleled Features</h2>
          <div className="main-content">
            <Fade>
              {cardsInfo.map((cardInfo, index) => {
                return <LandingCard key={index} cardInfo={cardInfo}/>
              })}
            </Fade>
          </div>
        </div>
        <div className={styles.container}>
          <img src={landingBackground2} alt="" className="bg2"/>
          <div className="main-content">
            <LightSpeed delay={1500} left>
              <div className="title">
                {isWidthUp('sm', props.width) &&
                <h2 className={common.nnb1214d}>The first IDO will start in the first half of May,<br/>subscribe to
                  PolkaFoundry Telegram for updates</h2>}
                {isWidthDown('xs', props.width) && <h2 className={common.nnb1214d}>Get Alerts For <br/>New Pools</h2>}
                {/* {isWidthDown('xs', props.width) && <h2 className={common.nnb1214d}>Get Alerts For New Pools</h2>} */}
              </div>
              <div className="description">
                {isWidthDown('xs', props.width) &&
                <p className={common.nnn1424h} style={{opacity: 0.7, margin: '19px 0 -23px 0'}}>Subscribe to get
                  notified about new pools and other relevant events.</p>}
              </div>
              <div className="buttons">
                <a href="https://t.me/PolkaFoundryANN" target="_blank">
                  <button className={common.nnb1418d + ' btn'}>
                    Subscribe to upcoming projects&nbsp;&nbsp;
                    <img src={arrowRightIcon}/>
                  </button>
                </a>
              </div>
            </LightSpeed>
          </div>
        </div>
        {showModal && <ModalContent setShowModal={setShowModal}/>}
      </LandingLayout>
  );
};

export default withWidth()(withRouter(Dashboard));
