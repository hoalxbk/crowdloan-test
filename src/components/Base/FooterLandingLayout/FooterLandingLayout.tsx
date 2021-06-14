import useStyles from './styles';
import { Link } from 'react-router-dom';
const byTokenLogo = '/images/logo-red-kite.svg';

const FooterLandingLayout = () => {
  const styles = useStyles();

  return (
    <div className={styles.footer}>
      <div className={styles.mainContent}>
        <div className={styles.infoRedKite}>
          <Link to={'/'}>
            <img className={styles.logo} src={byTokenLogo} alt="" />
          </Link>
          <p>Launch hand-picked projects and help them shine.</p>
          <ul className={styles.shareLink}>
            <li className={styles.teleGram}>
              <a href="https://t.me/polkafoundry/" target="_blank"><i className="custom-icon-telegram"></i></a>
            </li>
            <li className={styles.twitter}>
              <a href="https://twitter.com/polkafoundry/" target="_blank"><i className="custom-icon-twitter"></i></a>
            </li>
            {/* <li className={styles.facebook}>
              <a href="#"><i className="custom-icon-facebook"></i></a>
            </li>
            <li className={styles.github}>
              <a href="#"><i className="custom-icon-github"></i></a>
            </li> */}
          </ul>
        </div>
      </div>
      <div className={styles.endContent}>
        <p className={styles.copyRight}>Copyright © 2021 Icetea Labs. All rights reserved.</p>
      </div>
    </div>
  );
};

export default FooterLandingLayout;
