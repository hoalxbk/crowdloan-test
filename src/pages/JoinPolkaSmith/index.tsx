import {withRouter} from 'react-router-dom';
import useStyles from './style';
import withWidth from '@material-ui/core/withWidth';
import React, {useEffect, useRef, useState} from "react";
// @ts-ignore
import Collapse from "@kunukn/react-collapse";
import {ApiPromise, WsProvider} from '@polkadot/api';
// @ts-ignore
import Select from "react-select";
import {web3Accounts, web3Enable, web3FromSource} from '@polkadot/extension-dapp';
import Identicon from '@polkadot/react-identicon';
import LandingLayout from "../../components/Layout/LandingLayout";
import BN from "bn.js";
import {useDispatch} from "react-redux";
import {alertFailure, alertSuccess} from "../../store/actions/alert";

const {u8aConcat, u8aToHex} = require('@polkadot/util');
const {blake2AsU8a, encodeAddress, decodeAddress} = require('@polkadot/util-crypto');

const WAValidator = require('wallet-address-validator');
const banner = 'images/polkasmith/banner.png';
const headerImg = '/images/polkasmith/header_img.png';
const arrowRightIcon = '/images/icons/arrow-right.svg';
const iconUP = '/images/polkasmith/icon_up.png';
const arrowUp = '/images/polkasmith/arrow_up.png';
const polkaLogo = '/images/polkasmith/polka_logo.svg'
const loading = '/images/polkasmith/Loading.gif'
const provider = new WsProvider('wss://kusama.elara.patract.io');
const ksmDecimals = new BN(1_000_000).pow(new BN(2))
const parachanID = 2009
const whiteListContribute = [
    "FPB8DVu7rod1xXwYn6m1hYUKfky9CuDP3XWEYM4NQud8aUj",
    "Dd911qucscnXvz1gKdhLK2WCnRG1JgorWLnc9SdMvW6Jcza",
    "F2W4AjLp1mKiMJfp5yEoPg8ymqP4xa5e8x5G5sbqA47oTeQ"
]
const poolSize = 10_500_000

const JoinPolkaSmith = (props: any) => {
    const styles = useStyles();
    const amountKsmInput = useRef(null)
    const myRef = useRef(null)
    const dispatch = useDispatch();
    const [question, setQuestion] = useState(0);
    const [countDays, setCountDays] = useState("00");
    const [countHours, setCountHours] = useState("00");
    const [countMinutes, setCountMinutes] = useState("00");
    const [countSeconds, setCountSeconds] = useState("00");
    const [currentWallet, setCurrentWallet] = useState(localStorage.getItem('SELECTED_KSM_WALLET'));
    const [isWalletLoading, setIsWalletLoading] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState({data: null});
    const [selectOptions, setSelectOptions] = useState([]);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [ksmBalance, setKsmBalance] = useState({free: null, total: 0, unlocked: 0});
    const [isRejected, setIsRejected] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [ksmAmount, setKsmAmount] = useState(0);
    const [erc20Wallet, setErc20Wallet] = useState({value: "", isValid: false});
    const [email, setEmail] = useState({value: "", isValid: false});
    const [agreePolicy, setAgreePolicy] = useState(false);
    const [ksmReward, setKsmReward] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [contributionHash, setContributionHash] = useState("");
    const [contributed, setContributed] = useState(0);
    const [contributedList, setContributedList] = useState([]);
    const [totalUser, setTotalUser] = useState(0);
    const [totalKSM, setTotalKSM] = useState(0);
    const [isLoadingContributed, setIsLoadingContributed] = useState(false);
    const [ratioReward, setRatioReward] = useState(1);
    const formatNumber = (value: any, faction: number, isRound: boolean) => {
        if (isRound) {
            return parseFloat(value.toFixed(faction)).toLocaleString(navigator.language, {minimumFractionDigits: faction})
        }
        return (Math.floor(value * Math.pow(10, faction))/Math.pow(10, faction)).toLocaleString(navigator.language, {minimumFractionDigits: faction})
    }
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
    const selectQuestion = (index: React.SetStateAction<number>) => {
        if (index === question) {
            setQuestion(0)
        } else {
            setQuestion(index)
        }
    }
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    // @ts-ignore
    const executeScroll = () => myRef.current.scrollIntoView()
    document.addEventListener("scroll", (e) => {
        if (window.pageYOffset > 600) {
            setShowScrollTop(true)
        } else {
            setShowScrollTop(false)
        }
    });
    const truncateAddress = (address: string) => {
        if (!address) {
            return null
        }
        return address.slice(0, 10) + "..." + address.slice(-10)
    }
    // @ts-ignore
    const formatOptionLabel = ({value, label}) => (
        <div style={{display: "flex"}}>
            <div style={{display: "inline-block", width: 50}}>
                <Identicon
                    value={value}
                    size={32}
                    style={{marginTop: 10}}
                    theme={"polkadot"}
                /></div>
            <div style={{display: "inline-block", textAlign: "left", lineHeight: 1.2, margin: "auto 0px"}}>
                <div style={{paddingLeft: 10, color: "#1d1d1d"}}>{label}</div>
                <div style={{marginLeft: "10px", color: "#676767"}}>
                    {truncateAddress(convertToKSM(value))}
                </div>
            </div>
        </div>
    )
    const convertToKSM = (address: any) => {
        if (!address) {
            return null
        }
        let plk = decodeAddress(address)
        return encodeAddress(plk, 2)
    }
    const onchangePolWallet = (e: any) => {
        if (e.data.address === currentWallet) {
            return
        }
        setSelectedAccount(e)
        setCurrentWallet(e.data.address)
        localStorage.setItem('SELECTED_KSM_WALLET', e.data.address)
        //checkLinkedWallet(e.data.address)
        getBalance(e.data.address)
        getContribution(e.data.address)
    }
    const getBalance = (address: any) => {
        ApiPromise.create({provider}).then((api) => {
            api.query.system.account(address).then(account => {
                // @ts-ignore
                let val = new BN(account.data.free.toNumber() / ksmDecimals.toNumber())
                console.log(account.data.free.toString())
                console.log(ksmDecimals.toString())
                console.log(val.toString())
                // @ts-ignore
                return setKsmBalance({total: account.data.free.toNumber() / ksmDecimals.toNumber(), unlocked: account.data.free.toNumber() / ksmDecimals.toNumber()});
            })
        })
    }
    const requestExtension = () => {
        web3Enable('PolkaSmith Auction').then((extensions: any) => {
            if (extensions.length === 0) {
                setErrorMessage("Polkadot.js Extension is not installed!")
                return
            }
            web3Accounts().then((allAccounts) => {
                if (allAccounts.length === 0) {
                    setErrorMessage("KSM wallet list is empty. Please create or import your wallet!")
                    return
                }
                let options: { data: { address: any; }; }[] = []
                allAccounts.map((val) => {
                    // @ts-ignore
                    return options.push({value: val.address, label: val.meta.name, data: val});
                })
                localStorage.setItem('SELECTED_KSM_WALLET', options[0].data.address);
                // @ts-ignore
                setSelectOptions(options)
                // @ts-ignore
                setSelectedAccount(options[0])
                setCurrentWallet(options[0].data.address)
                getBalance(options[0].data.address)
                getContribution(options[0].data.address)
            });
        }).catch(reject => {
            localStorage.setItem('IS_REJECTED', String(true))
            setErrorMessage("You have denied access to Polkadot.js Extension. Please accept access to Polkadot.js Extension at \"Manage Website Access\" then reload this page.")
            setIsRejected(true)
        })
    }
    const changeAmount = (event: any) => {
        let value = event.target.value
        if (!value) {
            value = 0
        }
        if (parseFloat(value) < 0) {
            // @ts-ignore
            event.target.value = 0
            value = 0
        }
        event.target.value = Math.floor(parseFloat(value) * 100) / 100
        setKsmAmount(parseFloat(event.target.value))
        // @ts-ignore
        setKsmReward((event.target.value * ratioReward))
    }
    const changeERC20 = (event: any) => {
        if (WAValidator.validate(event.target.value, 'ETH')) {
            setErc20Wallet({value: event.target.value, isValid: true})
        } else {
            setErc20Wallet({value: event.target.value, isValid: false})
        }
    }
    const submitContribution = async () => {
        if (!ksmAmount || ksmAmount < 0 || ksmAmount > ksmBalance.unlocked) {
            dispatch(alertFailure('Invalid KSM amount or insufficient balance'));
            return
        }
        if (!erc20Wallet.value || !erc20Wallet.isValid) {
            dispatch(alertFailure("invalid ERC20 Address!"));
            return
        }
        setIsSubmitting(true)
        // @ts-ignore
        const val = new BN(ksmDecimals * ksmAmount)

        const api = await ApiPromise.create({provider})
        const crowdloanEntrinsic = api.tx.crowdloan.contribute(parachanID, val.toString(), null)
        const memoEntrinsic = api.tx.crowdloan.addMemo(parachanID, erc20Wallet.value)
        // @ts-ignore
        const injector = await web3FromSource(selectedAccount.data.meta.source);
        // @ts-ignore
        const txs = [crowdloanEntrinsic, memoEntrinsic]
        // @ts-ignore
        api.tx.utility.batchAll(txs).signAndSend(currentWallet, {signer: injector.signer}, ({status}) => {
            if (status.isInBlock) {
                console.log(`Completed at block hash #${status.asInBlock.toString()}`)
                setContributionHash(status.asInBlock.toString())
            } else {
                console.log(`Current status: ${status.type}`)
                if (status.type === "Finalized") {
                    dispatch(alertSuccess('Contribution success.'));
                    setIsSubmitting(false)
                }
            }
        }).catch((error: any) => {
            setIsSubmitting(false)
            dispatch(alertFailure('Contribution failed:' + error.toString()));
        });
    }
    const setMax = () => {
        let max = Math.floor(ksmBalance.unlocked * 100) / 100
        if (max < 0.1) {
            max = 0.1
        }
        // @ts-ignore
        amountKsmInput.current.value = max
        setKsmAmount(max)
        setKsmReward((max * ratioReward))
    }
    const agreePolicyChange = (event: any) => {
        setAgreePolicy(!agreePolicy)
    }
    const createChildKey = (trieIndex: any) => {
        return u8aToHex(
            u8aConcat(
                ':child_storage:default:',
                blake2AsU8a(
                    u8aConcat('crowdloan', trieIndex.toU8a())
                )
            )
        );
    }
    const getContribution = async (address: any) => {
        setIsLoadingContributed(true)
        const api = await ApiPromise.create({provider})
        const fund = await api.query.crowdloan.funds(parachanID);
        // @ts-ignore
        const trieIndex = fund.unwrap().trieIndex;
        const childKey = createChildKey(trieIndex);
        const keys = await api.rpc.childstate.getKeys(childKey, '0x');
        const ss58Keys = keys.map(k => encodeAddress(k, 2));
        const values = await Promise.all(keys.map(k => api.rpc.childstate.getStorage(childKey, k)));
        let total = 0
        let totalK = 0
        // @ts-ignore
        const contributions = values.map((v, idx) => ({from: ss58Keys[idx], data: api.createType('(Balance, Vec<u8>)', v.unwrap()).toJSON(),}));
        // @ts-ignore
        let buffList: any[] = []
        const addr = convertToKSM(address)
        contributions.map(val => {
            let ex = false
            totalK += val.data[0]
            const check = whiteListContribute.find(item => item.includes(val.from))
            if (check) {
                return
            }
            buffList.map((ele, index) => {
                if (val.from === ele.from) {
                    ex = true
                    buffList[index].total += val.data[0]
                }
            })
            if (!ex) {
                buffList.push({from: val.from, total: val.data[0]})
            }
            if (currentWallet && addr === val.from) {
                total += val.data[0]
            }
        })
        setTotalKSM(totalK)
        setTotalUser(contributions.length)
        setRatioReward(Math.round(poolSize / (totalK / ksmDecimals.toNumber())))
        buffList = buffList.sort((a, b) => (a.total < b.total) ? 1 : -1)
        // @ts-ignore
        setContributedList(buffList.slice(0, 10))
        setContributed(total)
        setIsLoadingContributed(false)
    }
    useEffect(() => {
        getContribution(currentWallet)
        let endDate = new Date("6/18/2021, 11:59:59 PM")
        countDown(endDate)
        if (currentWallet) {
            setIsWalletLoading(true)
            getBalance(currentWallet)
            //this.listenBalanceChanged(this.state.currentWallet)
            web3Enable('Polkafoundry Crowdloan').then((extensions) => {
                if (extensions.length === 0) {
                    setErrorMessage('Polkadot.js Extension not installed or denied access. Please install or accept access to Polkadot.js Extension at "Manage Website Access" then reload this page.')
                    return
                }
                web3Accounts().then((allAccounts) => {
                    if (allAccounts.length === 0) {
                        return
                    }
                    let options: { data: { address: any; }; }[] = []
                    allAccounts.map((val) => {
                        // @ts-ignore
                        options.push({value: val.address, label: val.meta.name, data: val})
                        if (val.address === currentWallet) {
                            // @ts-ignore
                            setSelectedAccount({value: val.address, label: val.meta.name, data: val})
                        }
                    })
                    // @ts-ignore
                    setSelectOptions(options)
                    if (!currentWallet) {
                        // @ts-ignore
                        setSelectedAccount(options[0])
                        setCurrentWallet(options[0].data.address)
                    }
                    //this.checkLinkedWallet(this.state.currentWallet)
                })
            })
        }
        ;
        setIsWalletLoading(false)
        //isSigning: false})
    }, [])
    // @ts-ignore
    // @ts-ignore
    return (
        <LandingLayout>
            <div className={styles.polkaSmithMain}>
                <div className={styles.polkaSmithContainer}>
                    <div className={styles.headerContainer}>
                        <div className={styles.headerText}>
                            <p><span className={styles.headerText1}>
                              <b>Join <img width={40} height={40} src={polkaLogo}/> Polka</b>Smith<b> on Kusama Parachain Auction</b>
                            </span></p>
                            <p className={styles.headerContent}>
                                PolkaSmith is the canary network of PolkaFoundry on Kusama.  It is more suitable for early-stage startups that need to grow quickly and easily experiment with bold new ideas. Once Kusama is bridged to Polkadot, PolkaSmith and PolkaFoundry will also be fully interoperable.
                            </p>
                            <p className={styles.headerContent}>
                                Participants who support PolkaSmith to win the Kusama auction will earn worthy rewards
                                in PKS. In addition, there are an extra 10% PKS for early birds who contribute in first 7 days
                            </p>
                            <button className={styles.joinBTN} style={{float: "left"}} onClick={() => {
                                executeScroll()
                            }}>
                                JOIN NOW
                                <img src={arrowRightIcon} style={{marginLeft: 5}}/>
                            </button>
                        </div>
                        <div className={styles.headerImg}>
                            <img src={headerImg} width={"100%"}/>
                        </div>
                    </div>
                    <div className={styles.overviewLabel}>
                        <div className={styles.label}>
                            <h3 style={{color: "#aeaeae"}}>Tokens to Contribute</h3>
                            <h2>KSM</h2>
                        </div>
                        <div className={styles.label} style={{textAlign: "center"}}>
                            <h3 style={{color: "#aeaeae"}}>Lockup Period (WIN)</h3>
                            <h2>48 Weeks</h2>
                        </div>
                        <div className={styles.label} style={{textAlign: "center"}}>
                            <h3 style={{color: "#aeaeae"}}>Lockup Period (LOSE)</h3>
                            <h2>6 Weeks</h2>
                        </div>
                        <div className={styles.label} style={{textAlign: "center"}}>
                            <h3 style={{color: "#aeaeae"}}>Current Reward Rate</h3>
                            <p>{ isLoadingContributed ?
                                <img src={loading} width={25} height={25}/> :
                                <span><span style={{fontSize: 24}}>{ formatNumber(ratioReward, 0, false) } PKS </span><span> \ KSM</span></span>}
                            </p>
                        </div>
                        <div className={styles.label} style={{textAlign: "right"}}>
                            <h3 style={{color: "#aeaeae"}}>Rewards Pool</h3>
                            <h2>{formatNumber(10500000, 0, false)} PKS</h2>
                        </div>
                    </div>
                    <div ref={myRef} className={styles.introMain}>
                        <div className={styles.introContainer}>
                            <div className={styles.introBlock}>
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
                            <div className={styles.introBlock}>
                                <div className={styles.introContribute}>
                                    {
                                        currentWallet && !isWalletLoading ?
                                            <Select
                                                value={selectedAccount}
                                                formatOptionLabel={formatOptionLabel}
                                                options={selectOptions}
                                                onChange={(event: any) => onchangePolWallet(event)}
                                            /> : <button className={styles.connectWallet} onClick={requestExtension}>
                                                {!currentWallet ? "Connect Polkadot.js Extension" :
                                                    <img src={loading} width={30} height={30}/>}
                                            </button>
                                    }

                                    <a style={{float: "right", color: "#6398FF", fontSize: 16}}
                                       href="https://polkadot.js.org/extension/" target={"_blank"}>Get Polkadot.js
                                        extension?</a>
                                    <div style={{marginTop: 50, textAlign: "left"}}>
                                        <h3 style={{color: "#aeaeae"}}>{!currentWallet ? "KSM to Contribute" : "KSM contributed"}</h3>
                                        {!currentWallet ?
                                            <input
                                                className={styles.input}
                                                name="KSM Amount"
                                                type={"number"}
                                                placeholder={"KSM Amount"}
                                            /> :
                                            <h2>{isLoadingContributed ?
                                                    <img src={loading} width={25} height={25}/> :
                                                formatNumber(contributed / ksmDecimals.toNumber(), 2, false)} KSM</h2>
                                        }
                                        <h3 style={{marginTop: 20, color: "#aeaeae"}}>Estimated Rewards</h3>
                                        <h2>{isLoadingContributed ?
                                                <img src={loading} width={25} height={25}/> :
                                                formatNumber(contributed * ratioReward / ksmDecimals.toNumber(), 2, false)} PKS</h2>
                                        <h2>{isLoadingContributed ?
                                                <img src={loading} width={25} height={25}/> :
                                            formatNumber(contributed * 500 / ksmDecimals.toNumber(),2 , false)} ePKF</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Collapse isOpen={currentWallet !== null}>
                            <div className={styles.contributeContainer}>
                                <div className={styles.contributeForm}>
                                    <h1>Contribute Additional KSM</h1>
                                    <div style={{display: "flex", margin: "20px 0"}}>
                                        <div className={styles.additionalLabelContainer}
                                             style={{width: "50%", paddingRight: 10}}>
                                            <div className={styles.additionalLabel}>
                                                <h3 style={{color: "#aeaeae"}}>Your KSM Balance</h3>
                                                <h2>{ formatNumber(ksmBalance.total, 2 , false) } KSM</h2>
                                            </div>
                                        </div>
                                        <div className={styles.additionalLabelContainer}
                                             style={{width: "50%", paddingLeft: 10}}>
                                            <div className={styles.additionalLabel}>
                                                <h3 style={{color: "#aeaeae"}}>Unlocked KSM Balance</h3>
                                                <h2>{ formatNumber(ksmBalance.unlocked, 2, false) } KSM</h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.contributeInputGroup}>
                                        <div className={styles.contributeInputLabel}>
                                            <h4>KSM to Contribute</h4>
                                        </div>
                                        <div className={styles.contributeInput}>
                                            <input
                                                className={styles.input}
                                                name="KSM Amount"
                                                type={"number"}
                                                style={{borderColor: ksmAmount > ksmBalance.unlocked ? "red" : "#fff"}}
                                                placeholder={"KSM Amount"}
                                                autoComplete={"off"}
                                                ref={amountKsmInput}
                                                onChange={changeAmount}
                                            />
                                            <button className={styles.maxBtn} onClick={setMax}>
                                                MAX
                                            </button>
                                        </div>
                                    </div>
                                    <div className={styles.errorMessage}>
                                        {
                                            ksmReward > 0 && ksmAmount < 0.1 ?
                                                <span>the contribution amount can not be less than 0.1 KSM</span>
                                                : <span >{ ksmReward > 0 && ksmAmount > ksmBalance.unlocked ?
                                                    <span>the maximum contribution is no more than unlocked balance
                                                    </span> : ""
                                                }</span>
                                        }
                                        </div>
                                    <div className={styles.contributeInputGroup}>
                                        <div className={styles.contributeInputLabel}>
                                            <h4>Estimated Reward</h4>
                                        </div>
                                        <div className={styles.contributeInput}>
                                            <h2 style={{
                                                display: "inline-block",
                                                width: "50%",
                                                textAlign: "left"
                                            }}>{formatNumber(ksmReward, 2, false)} PKS</h2>
                                            <div style={{display: "inline-block", width: "50%", textAlign: "right"}}>
                                                <h4>(1 KSM : {formatNumber(ratioReward, 0, false)} PKS)</h4></div>
                                        </div>
                                    </div>
                                    <div className={styles.contributeInputGroup}>
                                        <div className={styles.contributeInputLabel}>
                                            <h4>Early Bird Grant</h4>
                                        </div>
                                        <div className={styles.contributeInput}>
                                            <h2 style={{
                                                display: "inline-block",
                                                width: "50%",
                                                textAlign: "left"
                                            }}>{ formatNumber(ksmReward * 0.1, 2, false) } PKS</h2>
                                            <div style={{display: "inline-block", width: "50%", textAlign: "right"}}>
                                                <h4>(10%)</h4></div>
                                        </div>
                                    </div>
                                    <div className={styles.contributeInputGroup}>
                                        <div className={styles.contributeInputLabel}>
                                            <h4>Red Kite Grant</h4>
                                        </div>
                                        <div className={styles.contributeInput}>
                                            <h2 style={{
                                                display: "inline-block",
                                                width: "50%",
                                                textAlign: "left"
                                            }}>{ formatNumber(ksmAmount * 500, 2, false) } ePKF</h2>
                                            <div style={{display: "inline-block", width: "50%", textAlign: "right"}}>
                                                <h4>(1 KSM : 500 ePKF)</h4></div>
                                        </div>
                                    </div>
                                    <div className={styles.contributeInputGroup}>
                                        <div className={styles.contributeInputLabel}>
                                            <h4>Your ERC20 Wallet</h4>
                                        </div>
                                        <div className={styles.contributeInput}>
                                            <input
                                                className={styles.input}
                                                name="ERC20 Wallet"
                                                type={"text"}
                                                placeholder={"Wallet to receive rewards"}
                                                style={{borderColor: erc20Wallet.value && !erc20Wallet.isValid ? "red" : "#fff"}}
                                                onChange={changeERC20}
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.policyConfirm}>
                                        <input
                                            name="approvePolicy"
                                            type="checkbox"
                                            style={{width: 50, height: 50}}
                                            checked={agreePolicy}
                                            onChange={agreePolicyChange}
                                        />
                                        <div style={{display: "inline-block", marginLeft: 20}}>
                                        <span>I have read and accepted the <a href={"/#/polkasmith-privacy"} target={"_blank"} style={{color: "#6398FF"}}><b>Term and Conditions</b></a> as well as the Privacy Policy.
                                        I agree to receive email communications about PolkaSmith and PolkaFoundry, including exclusive launch updates and liquidity provider programs.</span>
                                        </div>

                                    </div>
                                    <button className={styles.connectWallet} onClick={submitContribution}
                                            disabled={isSubmitting || !erc20Wallet.isValid || ksmAmount < 0.1 || ksmAmount > ksmBalance.unlocked || !agreePolicy}>
                                        {!isSubmitting ? "Submit Contribution" :
                                            <img src={loading} width={30} height={30}/>}
                                    </button>
                                    <div style={{width: "100%", textAlign: "left", lineHeight: 2}}>
                                        {contributionHash ? <h4>Contribution Hash: <a target={"_blank"}
                                                                                      href={"https://kusama.subscan.io/block/" + contributionHash}
                                                                                      style={{color: "#6398FF"}}> {truncateAddress(contributionHash)} </a>
                                        </h4> : ""}
                                    </div>
                                </div>
                            </div>
                        </Collapse>
                        <h3>📌 Note: If your KSM are bonded, you will need to unbond your KSM at least seven days before
                            the crowdloan start date</h3>
                    </div>
                    <div className={styles.additionalContainer}>
                        <h1>Contribute Additional KSM</h1>
                        <div className={styles.additionalInfo}>
                            <div className={styles.additionalLabelContainer}>
                                <div className={styles.additionalLabel}>
                                    <h3 style={{color: "#aeaeae"}}>Participants</h3>
                                    <h2>{isLoadingContributed ?
                                        <img src={loading} width={25} height={25}/> :
                                        formatNumber(totalUser, 0, false)}</h2>
                                </div>
                            </div>
                            <div className={styles.additionalLabelContainer}
                                 style={{paddingLeft: 10, paddingRight: 10}}>
                                <div className={styles.additionalLabel}>
                                    <h3 style={{color: "#aeaeae"}}>KSM locked up</h3>
                                    <h2>{isLoadingContributed ?
                                        <img src={loading} width={25} height={25}/> :
                                        formatNumber(totalKSM / ksmDecimals.toNumber(), 0, true)} </h2>
                                </div>
                            </div>
                            <div className={styles.additionalLabelContainer}>
                                <div className={styles.additionalLabel}>
                                    <h3 style={{color: "#aeaeae"}}>Prize pool</h3>
                                    <h2>{
                                        formatNumber(10500000, 0, true) } PKS</h2>
                                </div>
                            </div>
                        </div>
                        <div className={styles.leaderBoardContainer}>
                            <h2>Contribute Leaderboard</h2>
                            <div className={styles.leaderBoardTable}>
                                {
                                    !isLoadingContributed ?
                                        contributedList.map((val, idx) => {
                                            // @ts-ignore
                                            return (<div key={idx} className={styles.leaderBoardItem} style={{padding: 10}}><h3>{val.from.substring(0, 24) + "..."}</h3><h2 style={{color: "#6398FF", textAlign: "right"}}>{ formatNumber(ratioReward * val.total / ksmDecimals, 0, false) } PKS</h2>
                                                </div>)
                                        }) :
                                        <div style={{marginTop: 50, width: "100%", textAlign: "center"}}><img
                                            src={loading} width={50} height={50}/></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.auctionPlan}>
                        <h1>PolkaSmith Auction Plan</h1>
                        <div className={styles.auctionPlanContainer}>
                            <div className={styles.auctionPlanDetail} style={{borderTopLeftRadius: 10}}>
                                <p><span
                                    style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>1st - 8th</span>
                                </p>
                                <div className={styles.auctionKeyword}>Parachain Slot</div>
                                <p className={styles.auctionDes}>PolkaSmith will participate in 1st-8th slot auctions to
                                    win. In other words, we aim to lease a parachain slot for 48 weeks (each lease
                                    period is
                                    six weeks). Understanding that competition for parachain is intense, if PolkaSmith
                                    doesn’t win the first auction, we will keep bidding until we won a slot and only
                                    give up
                                    after N rounds (TBA).</p>
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
                                    Note:
                                    This reward only applies to crowdloan on Red Kite.</p>
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
                    <div className={styles.askedQuestions}>
                        <h1 style={{fontSize: 44}}>Frequently Asked Questions</h1>
                        <div className={styles.questionList}>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(1)
                                }} className={styles.questionTitle}>
                                    <h3>When is the PolkaSmith (PolkaFoundry on Kusama) Crowdloan?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 1) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 1}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(2)
                                }} className={styles.questionTitle}>
                                    <h3>What does it mean to unbond my KSM, and how do I do it?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 2) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 2}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(3)
                                }} className={styles.questionTitle}>
                                    <h3>Do I have to unbond my KSM if they are on an exchange?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 3) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 3}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(4)
                                }} className={styles.questionTitle}>
                                    <h3>My friend filled out my referral code. Will we both get $PKF?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 4) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 4}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(5)
                                }} className={styles.questionTitle}>
                                    <h3>Can the pledged KSM be withdrawn at any time?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 5) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 5}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(6)
                                }} className={styles.questionTitle}>
                                    <h3>Will my KSM be returned after the parachain lease ends?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 6) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 6}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(7)
                                }} className={styles.questionTitle}>
                                    <h3>What if PolkaSmith doesn’t win the parachain auction - what happens to my
                                        KSM?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 7) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 7}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                            <div className={styles.questionItem}>
                                <div onClick={() => {
                                    selectQuestion(8)
                                }} className={styles.questionTitle}>
                                    <h3>Where to trade my $PKF reward?</h3>
                                    <div style={{display: "inline-block", textAlign: "right"}}>
                                        <img className={styles.navQuestion} src={iconUP} width={15} height={8}
                                             style={(question === 8) ? {transform: "rotate(180deg)"} : {}}/>
                                    </div>
                                </div>
                                <div className={styles.questionContent}>
                                    <Collapse isOpen={question === 8}>
                                        <p>Not necessarily. You need to contact your exchange to find out how to
                                            participate
                                            directly on the exchange. In case it is not supported on your exchange, you
                                            would need to unbound, transfer your KSM to polkadot-js extension wallet and
                                            use
                                            one of the aforementioned methods to participate.</p></Collapse>
                                </div>
                            </div>
                        </div>
                        <div onClick={() => {
                            scrollToTop()
                        }} className={styles.scrollTop}
                             style={(showScrollTop) ? {display: "block"} : {display: "none"}}>
                            <img width={32} height={32} src={arrowUp}/>
                            <h3>Back to top</h3>
                        </div>
                    </div>
                </div>
            </div>
        </LandingLayout>
    );
};

export default withWidth()(withRouter(JoinPolkaSmith));