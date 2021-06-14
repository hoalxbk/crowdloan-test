import useStyles from './style';
import commonStyle from '../../../styles/CommonStyle'
//@ts-ignore
import { Fade } from 'react-reveal';

export const LandingCard = (props: any) => {
  const styles = useStyles();
  const common = commonStyle();

  const {
    cardInfo,
  } = props

  return (
      <div className={styles.cardContainer} style={{background: cardInfo.backgroundColor}}>
        <Fade bottom delay={800}>
          <div className={styles.cardImage}>
            <img src={cardInfo.image}/>
          </div>
          <div className={styles.mainContent}>
            <h2 className={"card__title " + common.nnb2432d}>{cardInfo.title}</h2>
            <p className={"card__description " + common.nnn1424h}>{cardInfo.description}</p>
          </div>
        </Fade>
      </div>
  );
};
