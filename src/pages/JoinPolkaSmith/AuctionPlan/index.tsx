import React, {useEffect, useState} from "react";
import useStyles from './style';
import {formatNumber} from "../index";

const banner = 'images/polkasmith/banner.png';


const AuctionPlan = (props: any) => {
    const styles = useStyles();
    return (
        <div>
            <h1>PolkaSmith Auction Plan</h1>
            <div className={styles.auctionPlanContainer}>
                <div className={styles.auctionPlanDetail} style={{borderTopLeftRadius: 10}}>
                    <p><span
                        style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>1st - 8th</span>
                    </p>
                    <div className={styles.auctionKeyword}>Parachain Slot</div>
                    <p className={styles.auctionDes}>if PolkaSmith doesn't win the first auction,we  will continue to bid in the subsequent auctions. If PolkaSmith fails to win any auction for six weeks after the beginning of the crowdloan, then it will end the crowdloan and return all funds to holders.</p>
                </div>
                <div className={styles.auctionPlanDetail1}>
                    <p><span
                        style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>~350 PKS</span><span>/ 1 KSM</span>
                    </p>
                    <div className={styles.auctionKeyword}>Winning reward</div>
                    <p className={styles.auctionDes}>If PolkaSmith wins, every KSM that supports PolkaSmith
                        in
                        the Kusama Parachain Slot auction through the crowdloan will be entitled to ~350
                        $PKS
                        as
                        a reward. PKS is the native token of PolkaSmith. </p>
                </div>
                <div className={styles.auctionPlanDetail} style={{borderTopRightRadius: 10}}>
                    <p><span
                        style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>500 ePKF</span><span>/ 1 KSM</span>
                    </p>
                    <div className={styles.auctionKeyword}>Whether Win or Lose</div>
                    <p className={styles.auctionDes}>ePKF is the “equivalent PKF” token on our launchpad,
                        Red
                        Kite, which means even if you don't stake any PKF on Red Kite, you can get the same
                        tier
                        benefits when owning a corresponding amount of ePKF. For example, owning 500 ePKFs
                        gives
                        you all the Dove tier benefits (including joining IDOs) without staking 500 PKFs.
                    </p>
                </div>
                <div className={styles.auctionPlanDetail1} style={{borderBottomLeftRadius: 10}}>
                    <p><span style={{
                        display: "inline-block",
                        fontSize: 44,
                        lineHeight: 2,
                        fontWeight: "bold"
                    }}>10</span><span>%</span></p>
                    <div className={styles.auctionKeyword}>Early bird</div>
                    <p className={styles.auctionDes}>Contributors who contribute their KSM for PolkaSmith’s
                        crowdloan regardless of the platform for the first seven days since the crowdloan
                        starts will receive an additional 10% of their reward PKS.</p>
                </div>
                <div className={styles.auctionPlanDetail}>
                    <p><span
                        style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>{formatNumber(10500000, 0, false)} PKS</span>
                    </p>
                    <div className={styles.auctionKeyword}>Prize Pool</div>
                    <p className={styles.auctionDes}>The PolkaSmith’s prize tool for Kusama Parachain Slot
                        Auction is worth {formatNumber(10500000, 0, false)} PKS, equivalent to {formatNumber(10500000, 0, false)} PKF, 15% of PKF’s total
                        supply
                        ({formatNumber(70000000, 0, false)} PKF). All contributors will share the auction reward pool. The amount of
                        PKS each contributor receives will be prorated based on the amount of KSM each
                        person has contributed.</p>
                </div>
                <div className={styles.auctionPlanDetail1} style={{borderBottomRightRadius: 10}}>
                    <p><span style={{
                        display: "inline-block",
                        fontSize: 44,
                        lineHeight: 1.5,
                        fontWeight: "bold"
                    }}>Rewards<br/>Distribution</span></p>
                    <p className={styles.auctionDes}>As soon as contributors join the PolkaSmith crowdloan,
                        100%
                        ePKF rewards will be delivered immediately. After PolkaSmith wins a parachain slot,
                        35%
                        of the PKS tokens in the reward pool will go to the contributors' wallet addresses.
                        The
                        remaining 65% of PKS tokens will be locked during the 1st month then be vested over
                        10
                        months later.</p>
                </div>
            </div>
        </div>
    )
}

export default AuctionPlan;