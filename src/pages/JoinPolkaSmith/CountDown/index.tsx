import React, {useEffect, useState} from "react";
import useStyles from './style';


const banner = 'images/polkasmith/banner.png';


const CountDown = (props: any) => {
    const styles = useStyles();
    const [countDays, setCountDays] = useState("00");
    const [countHours, setCountHours] = useState("00");
    const [countMinutes, setCountMinutes] = useState("00");
    const [countSeconds, setCountSeconds] = useState("00");
    const countDown = (time: Date) => {
        const countDownInterval = setInterval(() => {
            let now = new Date()
            let offset = Math.floor((time.getTime() - now.getTime()) / 1000)
            if (offset <= 0) {
                clearInterval(countDownInterval)
                return
            }
            let minutesCal = Math.floor(offset / 60) % 60
            let hoursCal = Math.floor(offset / (60 * 60)) % 24
            let daysCal = Math.floor(offset / (60 * 60 * 24))
            setCountDays(daysCal >= 10 ? String(daysCal) : "0" + daysCal)
            setCountHours(hoursCal >= 10 ? String(hoursCal) : "0" + hoursCal)
            setCountMinutes(minutesCal >= 10 ? String(minutesCal) : "0" + minutesCal)
            setCountSeconds(offset % 60 >= 10 ? String(offset % 60) : "0" + offset % 60)
        }, 1000)
    }
    useEffect(() => {
        let endDate = new Date("2021-06-19T23:59:59Z")
        countDown(endDate)
    }, [])
    return (
        <div>
            <img src={banner} width={"100%"}/>
            <div className={styles.introCounting}>
                <div style={{width: "80", padding: 5}}>
                    <div className={styles.timeContainer}>
                        <h1 style={{fontSize: 36}}>{countDays}</h1>
                    </div>
                    <span style={{color: "#aeaeae", fontSize: 16}}>Days</span>
                </div>
                <h1 style={{fontSize: 36, marginRight: 10, marginLeft: 10}}>:</h1>
                <div style={{width: "80", padding: 5}}>
                    <div className={styles.timeContainer}>
                        <h1 style={{fontSize: 36}}>{countHours}</h1>
                    </div>
                    <span style={{color: "#aeaeae", fontSize: 16}}>Hours</span>
                </div>
                <h1 style={{fontSize: 36, marginRight: 10, marginLeft: 10}}>:</h1>
                <div style={{width: "80", padding: 5}}>
                    <div className={styles.timeContainer}>
                        <h1 style={{fontSize: 36}}>{countMinutes}</h1>
                    </div>
                    <span style={{color: "#aeaeae", fontSize: 16}}>Minutes</span>
                </div>
                <h1 style={{fontSize: 36, marginRight: 10, marginLeft: 10}}>:</h1>
                <div style={{width: "80", padding: 5}}>
                    <div className={styles.timeContainer}>
                        <h1 style={{fontSize: 36}}>{countSeconds}</h1>
                    </div>
                    <span style={{color: "#aeaeae", fontSize: 16}}>Seconds</span>
                </div>
            </div>
        </div>
    )
}

export default CountDown;