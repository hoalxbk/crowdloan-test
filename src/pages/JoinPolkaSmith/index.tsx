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
import FAQs from "./FAQs";
import {isMobile} from 'react-device-detect';
import CountDown from "./CountDown";
import AuctionPlan from "./AuctionPlan";

const {u8aConcat, u8aToHex} = require('@polkadot/util');
const {blake2AsU8a, encodeAddress, decodeAddress} = require('@polkadot/util-crypto');
const WAValidator = require('wallet-address-validator');
const headerImg = '/images/polkasmith/header_img.png';
const arrowRightIcon = '/images/icons/arrow-right.svg';
const polkaLogo = '/images/polkasmith/polka_logo.svg'
const success = '/images/polkasmith/success.png'
const loading = '/images/polkasmith/Loading.gif'
const provider = new WsProvider('wss://kusama.elara.patract.io');
const ksmDecimals = new BN(1_000_000).pow(new BN(2))
const parachanID = 2009
const poolSize = 10_500_000
export const formatNumber = (value: any, faction: number, isRound: boolean) => {
    if (isRound) {
        return parseFloat(value.toFixed(faction)).toLocaleString(navigator.language, {minimumFractionDigits: faction})
    }
    return (Math.floor(value * Math.pow(10, faction)) / Math.pow(10, faction)).toLocaleString(navigator.language, {minimumFractionDigits: faction})
}

const JoinPolkaSmith = (props: any) => {
    const styles = useStyles();
    const amountKsmInput = useRef(null)
    const myRef = useRef(null)
    const dispatch = useDispatch();

    const [currentWallet, setCurrentWallet] = useState(localStorage.getItem('SELECTED_KSM_WALLET'));
    const [isWalletLoading, setIsWalletLoading] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState({data: null});
    const [selectOptions, setSelectOptions] = useState([]);
    const [ksmBalance, setKsmBalance] = useState({free: null, total: 0, unlocked: 0});
    const [ksmAmount, setKsmAmount] = useState(0);
    const [ksmAmountCal, setKsmAmountCal] = useState(0);
    const [erc20Wallet, setErc20Wallet] = useState({value: "", isValid: false});
    const [oldWallet, setOldWallet] = useState("");
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
    const [successStatus, setSuccessStatus] = useState(false)
    const [isLoadingBalance, setIsLoadingBalance] = useState(false)
    const onWheel = () => {
        // @ts-ignore
        amountKsmInput.current.blur();
    };
    // @ts-ignore
    const executeScroll = () => myRef.current.scrollIntoView({behavior: "smooth"})
    const truncateAddress = (address: string, digit: number) => {
        if (!address) {
            return null
        }
        return address.slice(0, digit) + "..." + address.slice(-digit)
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
                    {truncateAddress(convertToKSM(value), 10)}
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
        setErc20Wallet({value: "", isValid: false})
        getBalance(e.data.address)
        getContribution(e.data.address)
    }
    const getBalance = (address: any) => {
        setIsLoadingBalance(true)
        ApiPromise.create({provider}).then((api) => {
            api.query.system.account(address).then(account => {
                setIsLoadingBalance(false)
                // @ts-ignore
                return setKsmBalance({
                    total: account.data.free.toNumber() / ksmDecimals.toNumber(),
                    unlocked: account.data.free.toNumber() / ksmDecimals.toNumber()
                });
            })
        })
    }
    const requestExtension = () => {
        web3Enable('PolkaSmith Auction').then((extensions: any) => {
            if (extensions.length === 0) {
                dispatch(alertFailure("Polkadot.js Extension is not installed!"))
                return
            }
            web3Accounts().then((allAccounts) => {
                if (allAccounts.length === 0) {
                    dispatch(alertFailure("KSM wallet list is empty. Please create or import your wallet!"))
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
            dispatch(alertFailure("You have denied access to Polkadot.js Extension. Please accept access to Polkadot.js Extension"))
        })
    }
    const changeAmount = (event: any) => {
        let value = event.target.value
        if (!event.target.value) {
            value = 0
        }
        if (parseFloat(value) < 0) {
            // @ts-ignore
            event.target.value = 0
            value = event.target.value
        }
        setKsmAmount(parseFloat(value))
        // @ts-ignore
        setKsmReward((value * ratioReward))
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

        // @ts-ignore
        const injector = await web3FromSource(selectedAccount.data.meta.source);
        // @ts-ignore
        const txs = [crowdloanEntrinsic]
        let funcCall = crowdloanEntrinsic
        if (oldWallet.toLowerCase() !== erc20Wallet.value.toLocaleLowerCase()) {
            const memoEntrinsic = api.tx.crowdloan.addMemo(parachanID, erc20Wallet.value)
            txs.push(memoEntrinsic)
            funcCall = api.tx.utility.batchAll(txs)
        }
        // @ts-ignore
        funcCall.signAndSend(currentWallet, {signer: injector.signer}, ({status}) => {
            if (status.isInBlock) {
                console.log(`Completed at block hash #${status.asInBlock.toString()}`)
                setContributionHash(status.asInBlock.toString())
            } else {
                console.log(`Current status: ${status.type}`)
                if (status.type === "Finalized") {
                    dispatch(alertSuccess('Contribution success.'));
                    setIsSubmitting(false)
                    setSuccessStatus(true)
                    getBalance(currentWallet)
                    getContribution(currentWallet)
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
            totalK += val.data[0]
            buffList.push({from: val.from, total: val.data[0]})
            if (currentWallet && addr === val.from) {
                if (WAValidator.validate(val.data[1], 'ETH')) {
                    setErc20Wallet({value: val.data[1], isValid: true})
                    setOldWallet(val.data[1])
                }

                total += val.data[0]
            }
        })

        setTotalKSM(totalK)
        setTotalUser(contributions.length)
        setRatioReward(Math.round(poolSize / (totalK / ksmDecimals.toNumber())))
        buffList = buffList.sort((a, b) => (a.total < b.total) ? 1 : -1)
        let showList: any[] = []
        buffList.map(val => {
            if (val.total / ksmDecimals.toNumber() > 400) {
                return
            }
            if (showList.length < 10) {
                showList?.push(val)
            }
        })
        // @ts-ignore
        setContributedList(showList)
        setContributed(total)
        setIsLoadingContributed(false)
    }
    const contributeMore = () => {
        window.location.reload();
    }
    const calculatorKSMChange = (event: any) => {
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
        setKsmAmountCal(parseFloat(event.target.value))
    }

    useEffect(() => {
        getContribution(currentWallet)
        if (currentWallet) {
            setIsWalletLoading(true)
            getBalance(currentWallet)
            web3Enable('Polkafoundry Crowdloan').then((extensions) => {
                if (extensions.length === 0) {
                    dispatch(alertFailure('Polkadot.js Extension not installed or denied access.'))
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
                                <b>Join</b> <span style={{display: isMobile ? "block" : "inline"}}> <img
                                src={polkaLogo}/><b> Polka</b>Smith</span><b> on Kusama Parachain Auction</b>
                            </span></p>
                            <p className={styles.headerContent}>
                                PolkaSmith is the canary network of PolkaFoundry on Kusama. It is more suitable for
                                early-stage startups that need to grow quickly and easily experiment with bold new
                                ideas. Once Kusama is bridged to Polkadot, PolkaSmith and PolkaFoundry will also be
                                fully interoperable.
                            </p>
                            <p className={styles.headerContent}>
                                Participants who support PolkaSmith to win the Kusama auction will earn worthy rewards
                                in PKS. In addition, there are an extra 10% PKS for early birds who contribute in first
                                7 days
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
                            <p>{isLoadingContributed ?
                                <img src={loading} width={25} height={25}/> :
                                <span><span
                                    style={{fontSize: 24}}>{formatNumber(ratioReward, 0, false)} PKS </span><span> \ KSM</span></span>}
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
                                <CountDown/>
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
                                    {!currentWallet ?
                                        <div style={{marginTop: 50, textAlign: "left"}}>
                                            <h4 style={{color: "#aeaeae"}}>KSM to Contribute</h4>
                                            <input
                                                className={styles.input}
                                                name="KSM Amount"
                                                type={"number"}
                                                onWheel={onWheel}
                                                placeholder={"KSM Amount"}
                                                step={0.01}
                                                onChange={calculatorKSMChange}
                                            />
                                            <h4 style={{marginTop: 20, color: "#aeaeae"}}>Estimated Rewards</h4>
                                            <h3>{formatNumber(ksmAmountCal * ratioReward, 2, false)} PKS</h3>
                                            <h3>{formatNumber(ksmAmountCal * 500, 2, false)} ePKF</h3>
                                        </div> :

                                        <div style={{
                                            marginTop: 50,
                                            textAlign: "left",
                                            display: "flex",
                                            flexWrap: "wrap"
                                        }}>
                                            <div className={styles.detailInfo}>
                                                <h3 style={{color: "#aeaeae"}}>Your KSM Balance</h3>
                                                <h2>{isLoadingBalance ?
                                                    <img src={loading} width={25} height={25}/> :
                                                    formatNumber(ksmBalance.total, 2, false)} KSM</h2>
                                                <h3 style={{color: "#aeaeae", marginTop: 20}}>Unlocked KSM Balance</h3>
                                                <h2>{isLoadingBalance ?
                                                    <img src={loading} width={25} height={25}/> :
                                                    formatNumber(ksmBalance.unlocked, 2, false)} KSM</h2>
                                            </div>
                                            <div className={styles.detailInfo}>
                                                <h3 style={{color: "#aeaeae"}}>KSM contributed</h3>
                                                <h2>{isLoadingContributed ?
                                                    <img src={loading} width={25} height={25}/> :
                                                    formatNumber(contributed / ksmDecimals.toNumber(), 2, false)} KSM</h2>
                                                <h3 style={{marginTop: 20, color: "#aeaeae"}}>Estimated Rewards</h3>
                                                <h2>{isLoadingContributed ?
                                                    <img src={loading} width={25} height={25}/> :
                                                    formatNumber(contributed * ratioReward / ksmDecimals.toNumber(), 2, false)} PKS</h2>
                                                <h2>{isLoadingContributed ?
                                                    <img src={loading} width={25} height={25}/> :
                                                    formatNumber(contributed * 500 / ksmDecimals.toNumber(), 2, false)} ePKF</h2>
                                            </div>

                                        </div>}

                                </div>
                            </div>
                        </div>
                        <Collapse isOpen={currentWallet !== null}>
                            <div className={styles.contributeForm}>
                                {successStatus ?
                                    <h1><img src={success} width={30} height={30}/> You have successfully contributed
                                    </h1> :
                                    <h1>Contribute KSM</h1>}
                                <div className={styles.contributeInputGroup}>
                                    <div className={styles.contributeInputLabel}>
                                        <h4>{successStatus ? "KSM Contributed" : "KSM to Contribute"}</h4>
                                    </div>
                                    {successStatus ?
                                        <div className={styles.contributeInput}>
                                            <h2 style={{
                                                display: "inline-block",
                                                width: "100%",
                                                textAlign: "left"
                                            }}>{formatNumber(ksmAmount, 2, false)} KSM</h2>
                                        </div> :
                                        <div className={styles.contributeInput}>
                                            <input
                                                className={styles.input}
                                                name="KSM Amount"
                                                onWheel={onWheel}
                                                type={"number"}
                                                style={{borderColor: ksmAmount > ksmBalance.unlocked ? "red" : "#fff"}}
                                                placeholder={"KSM Amount"}
                                                autoComplete={"off"}
                                                ref={amountKsmInput}
                                                step={0.01}
                                                onChange={changeAmount}
                                            />
                                            <button className={styles.maxBtn} onClick={setMax}>
                                                MAX
                                            </button>
                                        </div>
                                    }
                                </div>
                                {successStatus ? <div/> :
                                    <div className={styles.errorMessage}>
                                        {
                                            ksmReward > 0 && ksmAmount < 0.1 ?
                                                <span>the contribution amount can not be less than 0.1 KSM</span>
                                                : <span>{ksmReward > 0 && ksmAmount > ksmBalance.unlocked ?
                                                <span>the maximum contribution is no more than unlocked balance
                                        </span> : ""
                                                }</span>
                                        }
                                    </div>}
                                <div className={styles.contributeInputGroup}>
                                    <div className={styles.contributeInputLabel}>
                                        <h4>Estimated Reward</h4>
                                    </div>
                                    <div className={styles.contributeInput}>
                                        <h2 style={{
                                            display: "inline-block",
                                            width: "50%",
                                            textAlign: "left"
                                        }}>{ksmAmount > 0 && isLoadingContributed ?
                                            <img src={loading} width={25} height={25}/> :
                                            formatNumber(ksmAmount * ratioReward, 2, false)} PKS</h2>
                                        <div style={{display: "inline-block", width: "50%", textAlign: "right"}}>
                                            <h4>(1 KSM : {
                                                isLoadingContributed ?
                                                    <img src={loading} width={20} height={20}/> :
                                                    formatNumber(ratioReward, 0, false)} PKS)</h4></div>
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
                                        }}>{ksmAmount > 0 && isLoadingContributed ?
                                            <img src={loading} width={20} height={20}/> :
                                            formatNumber(ksmAmount * ratioReward * 0.1, 2, false)} PKS</h2>
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
                                        }}>{formatNumber(ksmAmount * 500, 2, false)} ePKF</h2>
                                        <div style={{display: "inline-block", width: "50%", textAlign: "right"}}>
                                            <h4>(1 KSM : 500 ePKF)</h4></div>
                                    </div>
                                </div>
                                <div className={styles.contributeInputGroup}>
                                    <div className={styles.contributeInputLabel}>
                                        <h4>Your ERC20 Wallet</h4>
                                    </div>
                                    <div className={styles.contributeInput}>
                                        {successStatus ?
                                            <h3> {erc20Wallet.value}</h3> :
                                            <input
                                                className={styles.input}
                                                name="ERC20 Wallet"
                                                type={"text"}
                                                value={erc20Wallet.value}
                                                placeholder={"Wallet to receive rewards"}
                                                style={{borderColor: erc20Wallet.value && !erc20Wallet.isValid ? "red" : "#fff"}}
                                                onChange={changeERC20}
                                            />
                                        }
                                    </div>
                                </div>
                                {successStatus ? <div className={styles.contributeInputGroup}>
                                        <div className={styles.contributeInputLabel}>
                                            <h4>Contribution Hash:</h4>
                                        </div>
                                        <div className={styles.contributeInput}>
                                            <h3><a target={"_blank"}
                                                   href={"https://kusama.subscan.io/block/" + contributionHash}
                                                   style={{color: "#6398FF"}}> {truncateAddress(contributionHash, 13)} </a>
                                            </h3>
                                        </div>
                                    </div> :
                                    <div className={styles.policyConfirm}>
                                        <input
                                            name="approvePolicy"
                                            type="checkbox"
                                            style={{width: 50, height: 50}}
                                            checked={agreePolicy}
                                            onChange={agreePolicyChange}
                                        />
                                        <div style={{display: "inline-block", marginLeft: 20}}>
                            <span>I have read and accepted the <a href={"/#/polkasmith-privacy"} target={"_blank"}
                                                                  style={{color: "#6398FF"}}><b>Term and Conditions</b></a> as well as the Privacy Policy.
                            I agree to receive email communications about PolkaSmith and PolkaFoundry, including exclusive launch updates and liquidity provider programs.</span>
                                        </div>

                                    </div>}
                                {successStatus ?
                                    <button className={styles.connectWallet} onClick={contributeMore}>CONTRIBUTE
                                        MORE <img src={arrowRightIcon} style={{marginLeft: 5}}/></button> :
                                    <button className={styles.connectWallet} onClick={submitContribution}
                                            disabled={isSubmitting || !erc20Wallet.isValid || ksmAmount < 0.1 || ksmAmount > ksmBalance.unlocked || !agreePolicy}>
                                        {!isSubmitting ? "Submit Contribution" :
                                            <img src={loading} width={30} height={30}/>}
                                    </button>}
                            </div>
                        </Collapse>
                        <h3>📌 100% Red Kite point and 35% of PKS delivered immediately</h3>
                        <h3>📌 65% PKS locked the first month and vested over 10 months</h3>
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
                                        formatNumber(10500000, 0, true)} PKS</h2>
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
                                            return (<div key={idx} className={styles.leaderBoardItem} style={{padding: 10}}><h3>{val.from.substring(0, 24) + "..."}</h3><h2 style={{color: "#6398FF", textAlign: "right"}}>{formatNumber(ratioReward * val.total / ksmDecimals, 0, false)} PKS</h2></div>)
                                        }) :
                                        <div style={{marginTop: 50, width: "100%", textAlign: "center"}}><img
                                            src={loading} width={50} height={50}/></div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.auctionPlan}>
                        <AuctionPlan/>
                    </div>
                    <FAQs/>
                </div>
            </div>
        </LandingLayout>
    );
};

export default withWidth()(withRouter(JoinPolkaSmith));