import React from 'react';
import useStyles from './style';

type PoolAboutProps = {
  website: string | undefined,
  exchangeRate: string | undefined | number
  description: string | undefined
}   

const PoolAbout: React.FC<PoolAboutProps> = ({ website, exchangeRate, description }: PoolAboutProps) => {
  const styles = useStyles();

  return (
    <div className={styles.PoolAbout}>
      {/* <div className={styles.PoolAboutBlock}> */}
      {/*   <span className={styles.PoolAboutLabel}>Website</span> */}
      {/*   <strong className={styles.PoolAboutText}> */}
      {/*     {website} */}
      {/*     <img */} 
      {/*       src="/images/hyperlink.svg" */} 
      {/*       className={styles.PoolAboutIcon} */}
      {/*       onClick={() => window.open(website, '_blank')} */}
      {/*     /> */}
      {/*   </strong> */}
      {/* </div> */}
      {/* <div className={styles.PoolAboutBlock}> */}
      {/*   <span className={styles.PoolAboutLabel}>White Paper</span> */}
      {/*   <strong className={styles.PoolAboutText}> */}
      {/*     {'polkafoundry.pdf'} */}
      {/*     <img src="/images/download.svg" className={styles.PoolAboutIcon} /> */}
      {/*   </strong> */}
      {/* </div> */}
      {/* <div className={styles.PoolAboutBlock}> */}
      {/*   <span className={styles.PoolAboutLabel}>Exchange Rate</span> */}
      {/*   <strong className={styles.PoolAboutText}> */}
      {/*     {exchangeRate} */}
      {/*   </strong> */}
      {/* </div> */}
      <p className={styles.PoolAboutDesc}>
        {description}
      </p>
    </div>
  )
}

export default PoolAbout;
