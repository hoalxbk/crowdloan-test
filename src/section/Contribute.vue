<template>
  <div id="contribute" class="polkaSmithMain">
    <div ref="contribute" class="polkaSmithContainer">
      <div class="introMain">
        <div class="introContainer">
          <div class="introBlock">
            <Countdown :endDate="endEarlyBird"/>
          </div>
          <div class="introBlock">
            <div class="introContribute">
              <v-select v-if="currentWallet && !isWalletLoading"
                        v-model="selectedAccount"
                        :options="selectOptions"
                        @input="onchangePolWallet()"
              >
                <template #selected-option="data">
                  <div style="display: flex; padding: 5px 0">
                    <div style="display: inline-block; width: 50px">
                      <svg class="" height="40" id="EXGNnCTkhG8yDUnoaqwdCWJR5Msh6D8mHDnfYF3j5NPFw9F" name="EXGNnCTkhG8yDUnoaqwdCWJR5Msh6D8mHDnfYF3j5NPFw9F" viewBox="0 0 64 64" width="64"><circle cx="32" cy="32" fill="#eee" r="32"></circle><circle cx="32" cy="8" fill="hsl(326, 70%, 75%)" r="5"></circle><circle cx="32" cy="20" fill="hsl(84, 70%, 53%)" r="5"></circle><circle cx="21.607695154586736" cy="14" fill="hsl(123, 70%, 35%)" r="5"></circle><circle cx="11.215390309173472" cy="20" fill="hsl(213, 70%, 15%)" r="5"></circle><circle cx="21.607695154586736" cy="26" fill="hsl(270, 70%, 75%)" r="5"></circle><circle cx="11.215390309173472" cy="32" fill="hsl(163, 70%, 15%)" r="5"></circle><circle cx="11.215390309173472" cy="44" fill="hsl(67, 70%, 75%)" r="5"></circle><circle cx="21.607695154586736" cy="38" fill="hsl(157, 70%, 35%)" r="5"></circle><circle cx="21.607695154586736" cy="50" fill="hsl(5, 70%, 15%)" r="5"></circle><circle cx="32" cy="56" fill="hsl(67, 70%, 75%)" r="5"></circle><circle cx="32" cy="44" fill="hsl(157, 70%, 35%)" r="5"></circle><circle cx="42.392304845413264" cy="50" fill="hsl(163, 70%, 15%)" r="5"></circle><circle cx="52.78460969082653" cy="44" fill="hsl(213, 70%, 15%)" r="5"></circle><circle cx="42.392304845413264" cy="38" fill="hsl(270, 70%, 75%)" r="5"></circle><circle cx="52.78460969082653" cy="32" fill="hsl(123, 70%, 35%)" r="5"></circle><circle cx="52.78460969082653" cy="20" fill="hsl(326, 70%, 75%)" r="5"></circle><circle cx="42.392304845413264" cy="26" fill="hsl(84, 70%, 53%)" r="5"></circle><circle cx="42.392304845413264" cy="14" fill="hsl(264, 70%, 53%)" r="5"></circle><circle cx="32" cy="32" fill="hsl(28, 70%, 53%)" r="5"></circle></svg>
                    </div>
                    <div style="display: inline-block; text-align: left; line-height: 1.2; margin: auto 0px">
                      <div style="padding-left: 10px; color: #1d1d1d">{{ data.label }}</div>
                      <div style="margin-left: 10px; color: #676767">
                        {{ truncateAddress(convertToKSM(data.value), 10)}}
                      </div>
                    </div>
                  </div>
                </template>
                <template v-slot:option="data">
                  <div style="display: flex; padding: 5px 0">
                    <div style="display: inline-block; width: 50px">
                      <svg class="" height="40" id="EXGNnCTkhG8yDUnoaqwdCWJR5Msh6D8mHDnfYF3j5NPFw9F" name="EXGNnCTkhG8yDUnoaqwdCWJR5Msh6D8mHDnfYF3j5NPFw9F" viewBox="0 0 64 64" width="64"><circle cx="32" cy="32" fill="#eee" r="32"></circle><circle cx="32" cy="8" fill="hsl(326, 70%, 75%)" r="5"></circle><circle cx="32" cy="20" fill="hsl(84, 70%, 53%)" r="5"></circle><circle cx="21.607695154586736" cy="14" fill="hsl(123, 70%, 35%)" r="5"></circle><circle cx="11.215390309173472" cy="20" fill="hsl(213, 70%, 15%)" r="5"></circle><circle cx="21.607695154586736" cy="26" fill="hsl(270, 70%, 75%)" r="5"></circle><circle cx="11.215390309173472" cy="32" fill="hsl(163, 70%, 15%)" r="5"></circle><circle cx="11.215390309173472" cy="44" fill="hsl(67, 70%, 75%)" r="5"></circle><circle cx="21.607695154586736" cy="38" fill="hsl(157, 70%, 35%)" r="5"></circle><circle cx="21.607695154586736" cy="50" fill="hsl(5, 70%, 15%)" r="5"></circle><circle cx="32" cy="56" fill="hsl(67, 70%, 75%)" r="5"></circle><circle cx="32" cy="44" fill="hsl(157, 70%, 35%)" r="5"></circle><circle cx="42.392304845413264" cy="50" fill="hsl(163, 70%, 15%)" r="5"></circle><circle cx="52.78460969082653" cy="44" fill="hsl(213, 70%, 15%)" r="5"></circle><circle cx="42.392304845413264" cy="38" fill="hsl(270, 70%, 75%)" r="5"></circle><circle cx="52.78460969082653" cy="32" fill="hsl(123, 70%, 35%)" r="5"></circle><circle cx="52.78460969082653" cy="20" fill="hsl(326, 70%, 75%)" r="5"></circle><circle cx="42.392304845413264" cy="26" fill="hsl(84, 70%, 53%)" r="5"></circle><circle cx="42.392304845413264" cy="14" fill="hsl(264, 70%, 53%)" r="5"></circle><circle cx="32" cy="32" fill="hsl(28, 70%, 53%)" r="5"></circle></svg>
                    </div>
                    <div style="display: inline-block; text-align: left; line-height: 1.2; margin: auto 0px">
                      <div style="padding-left: 10px; color: #1d1d1d">{{ data.label }}</div>
                      <div style="margin-left: 10px; color: #676767">
                        {{ truncateAddress(convertToKSM(data.value), 10)}}
                      </div>
                    </div>
                  </div>
                </template>
              </v-select>
              <button v-else class="connectWallet" @click="requestExtension">
                <span v-if="!currentWallet">Connect Polkadot.js Extension</span>
                <img v-else src="../assets/polkasmith/Loading.gif" width="30" height="30"/>
              </button>
              <a style="float: right; color: #6398FF; font-size: 16px"
                 href="https://polkadot.js.org/extension/" target="_blank">Get Polkadot.js
                extension?</a>
              <div v-if="!currentWallet" style="margin-top: 50px; text-align: left">
                <h4 style="color: #aeaeae">KSM to Contribute</h4>
                <input
                    class="input"
                    placeholder="KSM Amount"
                    type="number"
                    step=0.01
                    @input="calculatorKSMChange"
                />
                <h4 style="margin-top: 20px; color: #aeaeae">Estimated Rewards</h4>
                <h3>{{ formatNumber(ksmAmountCal * ratioReward, 2, false) }} PKS</h3>
              </div>

              <div v-else style="margin-top: 50px; text-align: left; display: flex; flex-wrap: wrap">
                <div class="detailInfo">
                  <h3 style="color: #aeaeae">Your Referral Code</h3>
                  <h2>
                    <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else>{{ refcode }} <a @click="copyRefcode"><img src="../assets/polkasmith/copy.png" width="20" height="20"/></a></span>
                  </h2>
                  <h3 style="color: #aeaeae">Your KSM Balance</h3>
                  <h2>
                    <img v-if="isLoadingBalance" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else>{{ formatNumber(ksmBalance.total, 2, false) }} KSM</span></h2>
                  <h3 style="color: #aeaeae; margin-top: 20px">Unlocked KSM Balance</h3>
                  <h2>
                    <img v-if="isLoadingBalance" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else>{{ formatNumber(ksmBalance.unlocked, 2, false) }} KSM</span></h2>
                </div>
                <div class="detailInfo" style="padding-left: 20px">
                  <h3 style="color: #aeaeae">KSM contributed</h3>
                  <h2>
                    <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else>{{ formatNumber(contributed / ksmDecimals, 2, false) }} KSM</span></h2>
                  <h3 style="margin-top: 20px; color: #aeaeae">Estimated Rewards</h3>
                  <h2>
                    <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else> {{ formatNumber(contributed * ratioReward / ksmDecimals, 0, false) }} PKS</span></h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="contributeForm" v-show="!!currentWallet">
            <h1 v-if="successStatus"><img src="../assets/polkasmith/success.png" width="30" height="30"/> You have successfully contributed
            </h1>
            <h1 v-else>Contribute KSM</h1>
            <div class="contributeInputGroup">
              <div class="contributeInputLabel">
                <h4>{{ successStatus ? "KSM Contributed" : "KSM to Contribute" }}</h4>
              </div>
              <div v-if="successStatus" class="contributeInput">
                <h2 style="display: inline-block; width: 100%; text-align: left">{{ formatNumber(ksmAmount, 2, false) }}
                  KSM</h2>
              </div>
              <div v-else class="contributeInput">
                <input
                    class="input"
                    type="number"
                    :style="{'border-color': ksmAmount > ksmBalance.unlocked ? 'red' : '#fff'}"
                    placeholder="KSM Amount"
                    autoComplete="off"
                    v-model="ksmAmount"
                    ref="amountKsmInput"
                    step=0.01
                />
                <button class="maxBtn" @click="setMax">
                  MAX
                </button>
              </div>
            </div>
            <div v-if="!successStatus" class="errorMessage">
              <span v-if="ksmReward > 0 && ksmAmount < 0.1">the contribution amount can not be less than 0.1 KSM</span>
              <span v-else>{{
                  ksmReward > 0 && ksmAmount > ksmBalance.unlocked ? 'the maximum contribution is no more than unlocked balance' : ""
                }}</span>
            </div>
            <div class="contributeInputGroup">
              <div class="contributeInputLabel">
                <h4>Estimated Reward</h4>
              </div>
              <div class="contributeInput">
                <h2 style="display: inline-block; width: 50%; text-align: left">
                  <img v-if="ksmAmount > 0 && isLoadingContributed" src="../assets/polkasmith/Loading.gif" width="20" height="20"/>
                  <span v-else>{{ formatNumber(ksmAmount * ratioReward, 2, false) }} PKS</span></h2>
                <div style="display: inline-block; width: 50%; text-align: right">
                  <h4>(1 KSM :
                    <img v-if="isLoadingContributed" src="../assets/polkasmith/Loading.gif" width="20" height="20"/>
                    <span v-else>{{ formatNumber(ratioReward, 0, false) }}</span> PKS)</h4></div>
              </div>
            </div>
            <div class="contributeInputGroup">
              <div class="contributeInputLabel">
                <h4>Your ERC20 Wallet</h4>
              </div>
              <div class="contributeInput">
                <h3 v-if="successStatus"> {{ erc20Wallet.value }}</h3>
                <input
                    v-else
                    class="input"
                    type="text"
                    v-model="erc20Wallet.value"
                    placeholder="Wallet to receive rewards"
                    :style="{'border-color': erc20Wallet.value && !erc20Wallet.isValid ? 'red' : '#fff'}"
                    @change="changeERC20"
                />
              </div>
            </div>
            <div class="contributeInputGroup">
              <div class="contributeInputLabel">
                <h4>Referral Code (Optional)</h4>
              </div>
              <div class="contributeInput">
                <h3 v-if="successStatus"> {{ referral }}</h3>
                <input
                    v-else
                    class="input"
                    type="text"
                    :disabled="haveReferral"
                    v-model="referral"
                    placeholder="Referral Code"
                />
              </div>
            </div>
            <div v-show="contributionHash">
              <div class="contributeInputGroup">
                <div class="contributeInputLabel">
                  <h4>Contribution Hash:</h4>
                </div>
                <div class="contributeInput">
                  <h3><a target="_blank" :href="'https://kusama.subscan.io/block/' + contributionHash"
                         style="color: #6398FF"> {{ truncateAddress(contributionHash, 13) }} </a>
                  </h3>
                </div>
              </div>
            </div>
            <div v-if="!contributionHash">
              <div class="policyConfirm">
                <input
                    name="approvePolicy"
                    type="checkbox"
                    style="width: 50px; height: 50px"
                    :checked="agreePolicy"
                    @change="agreePolicyChange"
                />
                <div style="display: inline-block; marginLeft: 20px">
      <span>I have read and accepted the <a href="/#/polkasmith-privacy" target="_blank"
                                            style="color: #6398FF"><b>Term and Conditions</b></a> as well as the <a
          href="https://redkite.polkafoundry.com/#/privacy" target="_blank" style="color: #6398FF">Privacy Policy</a>.
                            I agree to receive email communications about PolkaSmith and PolkaFoundry, including exclusive launch updates and liquidity provider programs.</span>
                </div>
              </div>
            </div>
            <div v-if="isSubmitting" class="statusMessage">
              <div class="statusTitle"><span>{{ statusMessage }}</span></div>
              <div class="statusTime"><span>{{ executeTime }}</span></div>
            </div>
            <button v-if="successStatus" class="connectWallet" @click="contributeMore">CONTRIBUTE
              MORE <img src="../assets/polkasmith/arrow-right.svg" style="margin-left: 5px"/></button>
            <button v-else class="connectWallet" @click="submitContribution"
                    :disabled="isSubmitting || !erc20Wallet.isValid || ksmAmount < 0.1 || ksmAmount > ksmBalance.unlocked || !agreePolicy">
              <span v-if="!isSubmitting">Submit Contribution</span>
              <img v-else src="../assets/polkasmith/Loading.gif" width="30" height="30"/>
            </button>
          </div>
        </div>
        <h3>📌 After PolkaSmith wins, 35% of PKS delivered immediately and 65% PKS vested over 10 months</h3>
        <h3>📌 Top 100 contributors joining the crowdloan via Polkasmith will receive a ticket to buy KABY tokens on the GameFI platform</h3>
        <h3>📌 The contributors who refer others to the crowdloan using their unique code will be rewarded with 10% of the amount of PKS of those referents</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Countdown from "@/components/Countdown";
import vSelect from 'vue-select'
import {ApiPromise, WsProvider} from '@polkadot/api'
import {web3Accounts, web3Enable, web3FromSource} from '@polkadot/extension-dapp'
import { decodeAddress, encodeAddress} from '@polkadot/util-crypto'
import WAValidator from 'wallet-address-validator'
import BN from "bn.js"
import 'vue-select/dist/vue-select.css';

export default {
  name: "Contribute",
  components: {Countdown, vSelect},
  data() {
    return {
      currentWallet: localStorage.getItem('SELECTED_KSM_WALLET'),
      isWalletLoading: false,
      selectedAccount: {data: null},
      selectOptions: [],
      ksmBalance: {free: null, total: 0, unlocked: 0},
      ksmAmount: "",
      ksmAmountCal: 0,
      erc20Wallet: {value: "", isValid: false},
      oldWallet: "",
      agreePolicy: false,
      ksmReward: 0,
      isSubmitting: false,
      contributionHash: "",
      contributed: 0,
      isLoadingContributed: false,
      isLoadingProfile: false,
      ratioReward: 1,
      successStatus: false,
      isLoadingBalance: true,
      polkaAPI: null,
      statusMessage: "",
      refcode: "",
      referral: "",
      haveReferral: false,
      executeTime: "00:00",
      headerImg: '../assets/polkasmith/header_img.png',
      infoIcon: '../assets/icon-info.svg',
      polkaLogo: '../assets/polkasmith/polka_logo.svg',
      success: '../assets/polkasmith/success.png',
      ksmDecimals: 1_000_000_000_000,
      parachanID: 2009,
      topContribute: [],
      poolSize: 10_500_000,
      endEarlyBird: new Date("2021-08-29T16:59:59Z"),
      message: {
        ok: false,
        info: ''
      }
    }
  },
  computed:{
    isDue() {
      if (!this.endEarlyBird) {
        return true
      }
      return this.endEarlyBird.getTime() < (new Date().getTime())
    }
  },
  methods: {
    formatNumber(value, faction, isRound) {
      if (isRound) {
        return parseFloat(value.toFixed(faction)).toLocaleString("us-US", {minimumFractionDigits: faction})
      }
      return (Math.floor(value * Math.pow(10, faction)) / Math.pow(10, faction)).toLocaleString("us-US", {minimumFractionDigits: faction})
    },
    alertFailure(msg) {
      this.$notify({
        type: 'error',
        title: msg
      });
    },
    alertSuccess(msg) {
      this.$notify({
        type: 'success',
        title: msg
      });
    },
    countExecuteTime() {
      const start = new Date()
      return setInterval(() => {
        const current = new Date()
        const offset = Math.floor((current.getTime() - start.getTime()) / 1000)
        let minutesCal = Math.floor(offset / 60) % 60
        this.executeTime = (minutesCal >= 10 ? String(minutesCal) : "0" + minutesCal) + ":" + (offset % 60 >= 10 ? String(offset % 60) : "0" + offset % 60)
      }, 1000)
    },
    truncateAddress(address, digit) {
      if (!address) {
        return null
      }
      return address.slice(0, digit) + "..." + address.slice(-digit)
    },
    convertToKSM(address) {
      if (!address) {
        return null
      }
      let plk = decodeAddress(address)
      return encodeAddress(plk, 2)
    },
    onchangePolWallet() {
      this.currentWallet = this.selectedAccount.data.address
      localStorage.setItem('SELECTED_KSM_WALLET', this.currentWallet)
      this.erc20Wallet = {value: "", isValid: false}
      this.getContribution()
      this.getBalance()
      this.getProfile()
    },
    async getBalance() {
      this.isLoadingBalance = true
      const api = await this.getAPI()
      api.query.system.account(this.currentWallet).then(account => {
        this.isLoadingBalance = false
        this.ksmBalance = {
          total: parseFloat((account.data.free / this.ksmDecimals).toString(10)),
          unlocked: parseFloat((account.data.free / this.ksmDecimals).toString(10))
        };
      })
    },
    requestExtension() {
      web3Enable('PolkaSmith Auction').then((extensions) => {
        if (extensions.length === 0) {
          this.alertFailure("Polkadot.js Extension is not installed!")
          return
        }
        web3Accounts().then((allAccounts) => {
          if (allAccounts.length === 0) {
            this.alertFailure("KSM wallet list is empty. Please create or import your wallet!")
            return
          }
          let options = []
          allAccounts.map((val) => {
            return options.push({value: val.address, label: val.meta.name, data: val});
          })
          localStorage.setItem('SELECTED_KSM_WALLET', options[0].data.address);
          this.selectOptions = options
          this.selectedAccount = options[0]
          this.currentWallet = options[0].data.address
          this.getContribution()
          this.getBalance()
          this.getProfile()
        });
      }).catch(() => {
        this.alertFailure("You have denied access to Polkadot.js Extension. Please accept access to Polkadot.js Extension")
      })
    },
    changeERC20(event) {
      if (WAValidator.validate(event.target.value, 'ETH')) {
        this.erc20Wallet = {value: event.target.value, isValid: true}
      } else {
        this.erc20Wallet = {value: event.target.value, isValid: false}
      }
    },
    async submitContribution() {
      if (!this.ksmAmount || this.ksmAmount < 0 || this.ksmAmount > this.ksmBalance.unlocked) {
        this.alertFailure('Invalid KSM amount or insufficient balance')
        return
      }
      if (!this.erc20Wallet.value || !this.erc20Wallet.isValid) {
        this.alertFailure("invalid ERC20 Address!")
        return
      }
      this.isSubmitting = true
      this.statusMessage = "Waiting for sign the transaction on Polkadot{.js} extension"
      const countTimeFunc = this.countExecuteTime()
      const val = new BN(this.ksmDecimals * this.ksmAmount)
      const api = await this.getAPI()
      const crowdloanEntrinsic = api.tx.crowdloan.contribute(this.parachanID, val.toString(), null)

      const injector = await web3FromSource(this.selectedAccount.data.meta.source);
      const txs = [crowdloanEntrinsic]
      let funcCall = crowdloanEntrinsic
      if (this.oldWallet.toLowerCase() !== this.erc20Wallet.value.toLocaleLowerCase()) {
        const memoEntrinsic = api.tx.crowdloan.addMemo(this.parachanID, this.erc20Wallet.value)
        txs.push(memoEntrinsic)
        funcCall = api.tx.utility.batchAll(txs)
      }
      funcCall.signAndSend(this.currentWallet, {signer: injector.signer}, ({status}) => {
        if (status.type === "Ready") {
          this.statusMessage = "Waiting for transaction confirmation"
        }
        if (status.isInBlock) {
          console.log(`Completed at block hash #${status.asInBlock.toString()}`)
          this.contributionHash = status.asInBlock.toString()
        } else {
          console.log(`Current status: ${status.type}`)
          if (status.type === "Finalized") {
            this.updateRefcode()
            this.statusMessage = ""
            clearInterval(countTimeFunc)
            this.alertSuccess('Contribution success.')
            this.isSubmitting = false
            this.successStatus = true
            this.getContribution()
            this.getBalance()
            this.getProfile()
          }
        }
      }).catch((error) => {
        this.isSubmitting = false
        this.statusMessage = ""
        clearInterval(countTimeFunc)
        this.alertFailure('Contribution failed:' + error.toString())
      });
    },
    setMax() {
      let max = Math.floor(this.ksmBalance.unlocked * 100) / 100
      if (max < 0.1) {
        max = 0.1
      }
      //  this.$refs.amountKsmInput.current.value = max
      this.ksmAmount = max
      this.ksmReward = (max * this.ratioReward)
    },
    agreePolicyChange() {
      this.agreePolicy = !this.agreePolicy
    },
    async getAPI() {
      if (!this.polkaAPI) {
        console.log('Init RPC connection')
        const provider = await new WsProvider('wss://kusama-rpc.polkadot.io')
        const apiBuff = await ApiPromise.create({provider})
        this.polkaAPI = apiBuff
        return apiBuff
      }
      return this.polkaAPI
    },
    async getContribution() {
      this.isLoadingContributed = true
      fetch(`https://polkasmith.polkafoundry.com/api/v1/statistic`)
          .then(response => response.json())
          .then(data => {
            if (!data || !data.data) {
              return
            }
            this.totalKSM = data.data.total
            const ratio = BigInt(this.poolSize) / (BigInt(this.totalKSM) / BigInt(this.ksmDecimals))
            this.ratioReward = parseInt(ratio.toString(10))
            this.isLoadingContributed = false
          })
    },
    contributeMore() {
      window.location.reload();
    },
    calculatorKSMChange(event) {
      let value = event.target.value
      if (!value) {
        value = 0
      }
      if (parseFloat(value) < 0) {
        event.target.value = 0
        value = 0
      }
      event.target.value = Math.floor(parseFloat(value) * 100) / 100
      this.ksmAmountCal(parseFloat(event.target.value))
    },
    getProfile() {
      this.isLoadingProfile = true
      const ksmAddr = this.convertToKSM(this.currentWallet)
      fetch(`https://polkasmith.polkafoundry.com/api/v1/profile?kusama=${ksmAddr}`)
          .then(response => response.json())
          .then(data => {
            if (!data || !data.data) {
              return
            }
            if (data.data.parent) {
              this.haveReferral = true
              this.referral = data.data.parent
            }
            this.contributed = parseInt(data.data.amount)
            this.erc20Wallet = {value: data.data.erc20_address, isValid: true}
            this.oldWallet = data.data.erc20_address
            this.refcode = data.data.code
            this.isLoadingProfile = false
          })
    },
    updateRefcode() {
      if (!this.referral) {
        return
      }
      const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      };
      const ksmAddr = this.convertToKSM(this.currentWallet)
      fetch(`https://polkasmith.polkafoundry.com/api/v1/ref?kusama=${ksmAddr}&referrer=${this.referral}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            if (!data || !data.data) {
              return
            }
            this.refcode = data.data.code
          })
    },
    copyRefcode() {
      navigator.clipboard.writeText(this.refcode)
      this.alertSuccess(`Copied "${this.refcode}"`)
    }
  },
  mounted() {
    this.getContribution(this.currentWallet).then()
    if (this.currentWallet) {
      this.isWalletLoading = true
      this.getProfile()
      web3Enable('Polkafoundry Crowdloan').then((extensions) => {
        if (extensions.length === 0) {
          this.alertFailure('Polkadot.js Extension not installed or denied access.')
          return
        }
        web3Accounts().then((allAccounts) => {
          if (allAccounts.length === 0) {
            return
          }
          let options = []
          allAccounts.map((val) => {
            options.push({value: val.address, label: val.meta.name, data: val})
            if (val.address === this.currentWallet) {
              this.selectedAccount = {value: val.address, label: val.meta.name, data: val}
            }
          })
          this.selectOptions = options
          if (!this.currentWallet) {
            this.selectedAccount = options[0]
            this.currentWallet = options[0].data.address
          }
        })
      })
    }

    this.isWalletLoading = false
  }
}
</script>

<style>
.polkaSmithMain {
  width: 100%;
  height: auto;
  font-size: 16px;
  padding: 0;
}

.polkaSmithContainer {
  max-width: 1280px;
  align-items: center;
  padding: 60px;
  margin: auto;
  color: white;
}

.headerText1 img {
  width: 40px;
  height: 40px;
}

.label h3 {
  font-size: 16px;
}

.label span {
  font-size: 16px;
  font-weight: bold
}

.introMain {
  background: linear-gradient(180deg, #1e225d 0%, #030925 100%);
  margin-top: 100px;
  height: max-content;
  width: 100%;
  border-radius: 10px;
  text-align: center;
  padding: 20px;
}

.introMain h3 {
  font-size: 16px;
}

.introContainer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;

}

.introBlock {
  display: inline-block;
  width: 50%;
  align-content: center;
  text-align: center;
  line-height: 2
}

.introContribute {
  border-width: 3px;
  padding: 30px;
  margin: 30px;
  border-style: solid;
  border-radius: 5px;
  border-color: #6398FF;
}

.connectWallet {
  height: 42px;
  width: 100%;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: #FFFFFF;
  border: none;
  outline: none;
  padding: 0 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #3232DC;
  margin: 10px auto 0;
  cursor: pointer
}

button:disabled {
  background-color: grey !important;
  cursor: not-allowed;
}

.input {
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  border-style: solid;
  border-color: white;
  margin-top: 10px
}

.questionContent a {
  color: #4e5bf1
}

.contributeForm {
  max-width: 630px;
  margin: 20px auto;
}

.contributeForm h1 {
  font-size: 36px;
}

.contributeForm h2 {
  font-size: 24px;
}

.contributeForm h4 {
  font-size: 16px;
}

.contributeInputGroup {
  display: flex;
  margin: 20px 0px;
}

.contributeInputGroup h2 {
  font-size: 24px;
}

.errorMessage {
  width: 100%;
  text-align: right;
  min-height: 20px;
  margin-top: -15px;
  color: #ff5151;
  font-size: 15px
}

.contributeInputLabel {
  display: inline-block;
  margin: auto 0px;
  text-align: left;
  width: 35%
}

.contributeInput {
  display: inline-flex;
  margin: auto 0px;
  position: relative;
  width: 65%
}

.policyConfirm {
  display: flex;
  text-align: left;
  margin: 20px 0;
}

.maxBtn {
  height: 30px;
  width: 60px;
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  color: #FFFFFF;
  border: none;
  outline: none;
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  background-color: #3232DC;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 5px;
  z-index: 9999;
  margin: auto
}

.statusMessage {
  display: flex;
  width: 100%;
  font-size: 14px;
  color: #ff8800
}

.statusTitle {
  display: inline-block;
  width: 80%;
  text-align: left
}

.statusTime {
  display: inline-block;
  width: 20%;
  text-align: right
}

.vs__dropdown-toggle,
.vs__dropdown-menu,
.v-select,
.vs__search::placeholder {
  border-radius: 10px;
  background-color: #f0f0f0 !important;
}

@media screen and (max-width: 680px) {
  .polkaSmithContainer {
    padding: 20px;
    display: block;
  }
  .introContainer {
    display: block;
  }
  .introBlock {
    width: 100%;
  }
  .introContribute {
    margin: 0;
    padding: 10px;
  }
  .vs__actions {
    display: none !important;
  }
  .detailInfo {
    padding-left: 10px !important;
  }
  .detailInfo h2 {
    font-size: 20px !important;
  }
  .contributeForm {
    margin-top: 50px;
  }
  .contributeForm h1 {
    font-size: 24px;
  }
  .contributeInputGroup h2 {
    font-size: 18px !important;
  }
  .contributeForm h2 {
    font-size: 18px !important;
  }
  .introMain h3 {
    font-size: 14px !important;
  }
  .introMain h4 {
    font-size: 14px !important;
  }
  .policyConfirm {
    font-size: 13px;
  }
}

</style>
