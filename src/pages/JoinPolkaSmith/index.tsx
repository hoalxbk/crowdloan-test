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
const { u8aConcat, u8aToHex } = require('@polkadot/util');
const { blake2AsU8a, encodeAddress, decodeAddress } = require('@polkadot/util-crypto');

const WAValidator = require('wallet-address-validator');
const banner = 'images/polkasmith/banner.png';
const headerImg = '/images/polkasmith/header_img.png';
const arrowRightIcon = '/images/icons/arrow-right.svg';
const iconUP = '/images/polkasmith/icon_up.png';
const arrowUp = '/images/polkasmith/arrow_up.png';
const polkaLogo = '/images/polkasmith/polka_logo.svg'
const loading = '/images/polkasmith/Loading.gif'
const provider = new WsProvider('wss://kusama.elara.patract.io');
const ratioReward = 1 / 350 //%
const ksmDecimals = new BN(1_000_000).pow(new BN(2))
const parachanID= 2009

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
    const [ksmBalance, setKsmBalance] = useState({free: null, total: new BN(0), unlocked: new BN(0)});
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
    const [isLoadingContributed, setIsLoadingContributed] = useState(false);

    const countDown = (time: Date) => {
        setInterval(() => {
            let now = new Date()
            let offset = Math.floor((time.getTime() - now.getTime()) / 1000)
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
        setSelectedAccount(e)
        setCurrentWallet(e.data.address)
        localStorage.setItem('SELECTED_KSM_WALLET', e.data.address)
        //checkLinkedWallet(e.data.address)
        getBalance(e.data.address)
    }
    const getBalance = (address: any) => {
        ApiPromise.create({provider}).then((api) => {
            api.query.system.account(address).then(account => {
                // @ts-ignore
                return setKsmBalance({ total: account.data.free.toBn() / ksmDecimals, unlocked: account.data.free.toBn() / ksmDecimals});
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
                getBalance(currentWallet)
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
            event.target.value = 0
            value = 0
        }
        setKsmAmount(parseFloat(value))
        // @ts-ignore
        setKsmReward((value / ratioReward))
    }
    const changeERC20 = (event: any) => {
        if (WAValidator.validate(event.target.value, 'ETH')) {
            setErc20Wallet({value: event.target.value, isValid: true})
        } else {
            setErc20Wallet({value: event.target.value, isValid: false})
        }
    }
    const submitContribution = async () => {
        if (!ksmAmount || ksmAmount < 0 || ksmAmount > parseFloat(ksmBalance.unlocked.toString())) {
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
        const crowdloanEntrinsic = api.tx.crowdloan.contribute(parachanID,  val.toString(), null)
        const memoEntrinsic = api.tx.crowdloan.addMemo(parachanID,  erc20Wallet.value)
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
                }
            }
        }).catch((error: any) => {
            setIsSubmitting(false)
            dispatch(alertFailure('Contribution failed:' + error.toString()));
        });
    }
    const setMax = () => {
        let max = parseFloat(ksmBalance.unlocked.toString())
        // @ts-ignore
        amountKsmInput.current.value = max
        setKsmAmount(max)
        setKsmReward((max / ratioReward))
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
    const getContribution = async () => {
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
        // @ts-ignore
        const contributions = values.map((v, idx) => ({from: ss58Keys[idx], data: api.createType('(Balance, Vec<u8>)', v.unwrap()).toJSON(),}));
        // @ts-ignore
        let buffList: any[] = []
        const addr = convertToKSM(currentWallet)
        contributions.map(val => {
            let ex = false
            buffList.map((ele, index) => {
                if (val.from === ele.from) {
                    ex =  true
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
        buffList = buffList.sort((a, b) => (a.total < b.total) ? 1 : -1)
        // @ts-ignore
        setContributedList(buffList.slice(0,10))
        setContributed(total)
        setIsLoadingContributed(false)
    }
    useEffect(() => {
        getContribution()
        let endDate = new Date("6/21/2021, 11:59:59 PM")
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
                                PolkaSmith is the canary network of PolkaFoundry on Kusama. PolkaSmith’s native token is
                                PKS, which we
                                migrated from PolkaFoundry’s PKF at a 1:1 ratio.
                            </p>
                            <p className={styles.headerContent}>
                                Participants who support PolkaSmith to win the Kusama auction will earn worthy rewards
                                in PKS. In
                                addition, there are an extra 5% PKS for participants on Red Kite, 0.5% for referrals,
                                and 10% for
                                early birds.
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
                            <h3 style={{color: "#aeaeae"}}>Lockup Period</h3>
                            <h2>336 days</h2>
                        </div>
                        <div className={styles.label} style={{textAlign: "center"}}>
                            <h3 style={{color: "#aeaeae"}}>Rewards Rate</h3>
                            <h2>350+ PKS/ 1 KSM</h2>
                        </div>
                        <div className={styles.label} style={{textAlign: "right"}}>
                            <h3 style={{color: "#aeaeae"}}>Rewards Pool</h3>
                            <h2>10,500,000 PKS</h2>
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
                                                {!currentWallet ? "Connect Polkadot.js Extension" : <img src={loading} width={30} height={30}/>}
                                            </button>
                                    }

                                    <a style={{float: "right", color: "#6398FF", fontSize: 16}}
                                       href="https://polkadot.js.org/extension/" target={"_blank"}>Get Polkadot.js
                                        extension?</a>
                                    <div style={{marginTop: 50, textAlign: "left"}}>
                                        <h3 style={{color: "#aeaeae"}}>KSM to Contribute</h3>
                                        {!currentWallet ?
                                            <input
                                                className={styles.input}
                                                name="KSM Amount"
                                                type={"number"}
                                                placeholder={"KSM Amount"}
                                            /> :
                                            <h2>0 KSM</h2>
                                        }
                                        <h3 style={{marginTop: 20, color: "#aeaeae"}}>Estimated Rewards (PKS)</h3>
                                        <h2>0 PKS</h2>
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
                                                <h2>{parseFloat(ksmBalance.total.toString()).toFixed(2)} KSM</h2>
                                            </div>
                                        </div>
                                        <div className={styles.additionalLabelContainer}
                                             style={{width: "50%", paddingLeft: 10}}>
                                            <div className={styles.additionalLabel}>
                                                <h3 style={{color: "#aeaeae"}}>Unlocked KSM Balance</h3>
                                                <h2>{parseFloat(ksmBalance.unlocked.toString()).toFixed(2)} KSM</h2>
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
                                                style={{borderColor: ksmAmount > parseFloat(ksmBalance.unlocked.toString()) ? "red" : "#fff"}}
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
                                    <div className={styles.contributeInputGroup}>
                                        <div className={styles.contributeInputLabel}>
                                            <h4>Estimated Reward</h4>
                                        </div>
                                        <div className={styles.contributeInput}>
                                            <h2 style={{
                                                display: "inline-block",
                                                width: "50%",
                                                textAlign: "left"
                                            }}>{ (ksmReward).toLocaleString(navigator.language, { minimumFractionDigits: 2 }) } PKS</h2>
                                            <div style={{display: "inline-block", width: "50%", textAlign: "right"}}>
                                                <h4>(1 KSM : 350+ PKS)</h4></div>
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
                                            }}>{(ksmReward * 0.1).toLocaleString(navigator.language, { minimumFractionDigits: 2 })} PKS</h2>
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
                                            }}>{(ksmAmount * 500).toLocaleString(navigator.language, { minimumFractionDigits: 2 })} ePKF</h2>
                                            <div style={{display: "inline-block", width: "50%", textAlign: "right"}}>
                                                <h4>(10%)</h4></div>
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
                                        <span>I have read and accepted the <a href={"#"} style={{color: "#6398FF"}}><b>Term and Conditions</b></a> as well as the Privacy Policy.
                                        I agree to receive email communications about PolkaSmith and PolkaFoundry, including exclusive launch updates and liquidity provider programs.</span>
                                        </div>

                                    </div>
                                    <button className={styles.connectWallet} onClick={submitContribution}
                                            disabled={isSubmitting || !erc20Wallet.isValid || ksmAmount > parseFloat(ksmBalance.unlocked.toString()) || !agreePolicy}>
                                        { !isSubmitting ? "Submit Contribution"  : <img src={loading} width={30} height={30}/>}
                                    </button>
                                    <div style={{width: "100%", textAlign: "left", lineHeight: 2}}>
                                    { contributionHash ? <h4 >Contribution Hash: <a target={"_blank"} href={"https://kusama.subscan.io/block/" + contributionHash} style={{color: "#6398FF"}}> { truncateAddress(contributionHash) } </a></h4> : ""}
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
                                    <h2>4,684</h2>
                                </div>
                            </div>
                            <div className={styles.additionalLabelContainer}
                                 style={{paddingLeft: 10, paddingRight: 10}}>
                                <div className={styles.additionalLabel}>
                                    <h3 style={{color: "#aeaeae"}}>KSM locked up</h3>
                                    <h2>246,536</h2>
                                </div>
                            </div>
                            <div className={styles.additionalLabelContainer}>
                                <div className={styles.additionalLabel}>
                                    <h3 style={{color: "#aeaeae"}}>Estimated PKS to be Rewarded</h3>
                                    <h2>1,578,567</h2>
                                </div>
                            </div>
                        </div>
                        <div className={styles.leaderBoardContainer}>
                            <h2>Contribute Leaderboard</h2>
                            <div className={styles.leaderBoardTable}>
                                {
                                    !isLoadingContributed ?
                                    contributedList.map((val, idx)=> {
                                        // @ts-ignore
                                        return (<div key={idx} className={styles.leaderBoardItem} style={{padding: 10}}><h3>{ val.from.substring(0, 24) + "..." }</h3><h2 style={{color: "#6398FF", textAlign: "right"}}>{ (350 * val.total / ksmDecimals).toFixed(0).toLocaleString(navigator.language, { minimumFractionDigits: 0 }) } PKS</h2></div>)
                                    }) :
                                        <div style={{marginTop: 50, width: "100%", textAlign: "center"}} ><img src={loading} width={30} height={30}/></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.auctionPlan}>
                        <h1>PolkaSmith Auction Plan</h1>
                        <div className={styles.auctionPlanContainer}>
                            <div className={styles.auctionPlanDetail} style={{borderTopLeftRadius: 10}}>
                                <p><span style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>1st - 8th</span></p>
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
                                <p><span style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>350+ PKS</span><span>/ 1 KSM</span></p>
                                <div className={styles.auctionKeyword}>Winning reward</div>
                                <p className={styles.auctionDes}>If PolkaSmith wins, every KSM that supports PolkaSmith
                                    in
                                    the Kusama Parachain Slot auction through the crowdloan will be entitled to 100 $PKS
                                    as
                                    a reward. PKS is the native token of PolkaSmith, which you can claim from PKF at a
                                    1:1
                                    ratio. Note that if PolkaSmith wins Kusama Slot, the value for PKF may scale
                                    significantly. </p>
                            </div>
                            <div className={styles.auctionPlanDetail} style={{borderTopRightRadius: 10}}>
                                <p><span style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>500 ePKF</span><span>/ 1 KSM</span></p>
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
                                <p><span style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>0.5</span><span>%</span></p>
                                <div className={styles.auctionKeyword}>Early bird</div>
                                <p className={styles.auctionDes}>The reward is also exclusive for crowdloan on Red Kite.
                                    Community members of PolkaFoundry/PolkaSmith can earn some PKF directly by referring
                                    friends to join the project’s crowdloan on Red Kite. Each referrer and the referred
                                    person will receive the amount of PKF equivalent to 0.5% of the referred person’s
                                    auction incentives.</p>
                            </div>
                            <div className={styles.auctionPlanDetail}>
                                <p><span style={{display: "inline-block", fontSize: 44, lineHeight: 2, fontWeight: "bold"}}>10,500,000 PKS</span></p>
                                <div className={styles.auctionKeyword}>Prize Pool</div>
                                <p className={styles.auctionDes}>The PolkaSmith’s prize tool for Kusama Parachain Slot
                                    Auction is worth 7,000,000 PKS, equivalent to 7,000,000 PKF, 3.5% of PKF’s total
                                    supply
                                    (200,000,000 PKF). That means when the KSM in the PolkaSmith crowdloan reaches
                                    70,000,
                                    there are no more PKS that can be distributed to contributors and we will stop
                                    receiving
                                    contributions.</p>
                            </div>
                            <div className={styles.auctionPlanDetail1} style={{borderBottomRightRadius: 10}}>
                                <p><span style={{display: "inline-block", fontSize: 44, lineHeight: 1.5, fontWeight: "bold"}}>Rewards<br/>Distribution</span></p>
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