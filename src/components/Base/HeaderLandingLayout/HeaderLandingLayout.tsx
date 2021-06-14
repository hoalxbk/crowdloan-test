import useStyles from './styles';
import { useState } from 'react'

const BrightStartIcon = "/images/bright-star.svg";
const logo = '/images/logo-red-kite.svg';
const iconClose = "/images/icons/close.svg";

const HeaderDefaultLayout = () => {
  const styles = useStyles();
  const [showBanner, setShowBanner] = useState(true)

  return (
    <>
      <div className={styles.navBar}>
        <div>
          <div className="pool">
            <a href="#/dashboard"><img src={BrightStartIcon} alt=""/></a>
            <a href="#/dashboard"><span>&nbsp;&nbsp;Pool</span></a>
          </div>
          <div className="logo">
            <img src={logo} alt=""/>
          </div>
          <div className="connects">
            <a href="https://t.me/polkafoundry/" target="_blank"><i className="custom-icon-telegram"></i></a>
            <a href="https://twitter.com/polkafoundry/" target="_blank"><i className="custom-icon-twitter"></i></a>
            {/* <a href="#"><i className="custom-icon-facebook"></i></a>
            <a href="#"><i className="custom-icon-github"></i></a> */}
          </div>
        </div>
        {/*{showBanner && <div className={styles.banner}>*/}
        {/*  <img src="/images/icons/ring.svg" alt="red-warning icon" />*/}
        {/*  <img src={iconClose} onClick={() => setShowBanner(false)} className={styles.closeBtn}/>*/}
        {/*  <span className={styles.loginErrorBannerText}>*/}
        {/*  NFTify (N1) launches on 4 June.*/}
        {/*  &nbsp;&nbsp;<button*/}
        {/*    className={styles.btnChangeAppNetwork}*/}
        {/*    onClick={() => {window.open('#/buy-token/23', '_blank')}}*/}
        {/*  >*/}
        {/*    View Details*/}
        {/*  </button>*/}
        {/*  </span>*/}
        {/*</div>}*/}
      </div>
    </>
  );
};

export default HeaderDefaultLayout;
