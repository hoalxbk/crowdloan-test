import React, {useState} from "react";
import useStyles from './style';
// @ts-ignore
import {Fade, LightSpeed} from 'react-reveal';
import {isMobile} from 'react-device-detect';


const bannerLanding = '/images/polkasmith/BannerLanding.png'

const BannerLanding = () => {
    const styles = useStyles();
    const [show, setShow] = useState(true);
    const hide = () => {
        setShow(false)
    }
    return (
        <div className={styles.bannerContainer} style={{display: show && !isMobile ? "flex" : "none"}}>
            <Fade right delay={500} >
            <img src={bannerLanding}/>
            <div onClick={hide} className={styles.closeBtn}>x</div>
            </Fade>
            <div className={styles.content}>
            <div className={styles.left}>
                <Fade left delay={500}>
                    <div style={{margin: "auto 50px"}}>
                        <h3>PolkaSmith Parachain Crowdloan</h3>
                        <h2>Support project by locking your KSM & earn tokens as rewards</h2>
                    </div>
                </Fade>
            </div>
            <div className={styles.right}>
                <Fade right delay={500}>
                    <div style={{margin: "auto"}}><a href={"/#/join-polkasmith"} className={styles.btn}>Join Now</a></div>
                </Fade>
                </div>
            </div>
        </div>
    )
};
export default BannerLanding;