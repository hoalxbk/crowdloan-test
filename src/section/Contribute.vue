<template>
  <div id="contribute" class="polkaSmithMain">
    <div ref="contribute" class="polkaSmithContainer">
      <div class="introMain">
        <div class="about-event">
          <span >About the event</span>
          <p>{{ !event || !event.about ? "" : event.about }}</p>
          <a v-if="event && event.guide" :href="event.guide" target="_blank">Read more</a>
        </div>
        <div class="introContainer">
          <div class="contribute-block">
            <div class="contributeForm">
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
                <span v-if="ksmAmount > 0 && ksmAmount < 0.1">the contribution amount can not be less than 0.1 KSM</span>
                <span v-else>{{  ksmAmount > ksmBalance.unlocked ? 'the maximum contribution is no more than unlocked balance' : "" }}</span>
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
                      :readonly="haveReferral"
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
                <span v-if="!isSubmitting">{{ !currentWallet ? "Please connect wallet to contribute" : "Submit Contribution" }}</span>
                <img v-else src="../assets/polkasmith/Loading.gif" width="30" height="30"/>
              </button>
            </div>
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
              <a v-else class="connectWallet" @click="requestExtension">
                <span v-if="!currentWallet">Connect Polkadot.js Extension</span>
                <img v-else src="../assets/polkasmith/Loading.gif" width="30" height="30"/>
              </a>
              <a style="float: right; color: #6398FF; font-size: 16px; margin-top: 10px"
                 href="https://polkadot.js.org/extension/" target="_blank">Get Polkadot.js
                extension?</a>
              <div style="margin-top: 50px; text-align: left; display: flex; flex-wrap: wrap">
                <div class="detailInfo">
                  <h3 style="color: #aeaeae">Your KSM Balance</h3>
                  <h2 v-if="currentWallet">
                    <img v-if="isLoadingBalance" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else>{{ formatNumber(ksmBalance.total, 2, false) }} KSM</span></h2>
                  <h2 v-else>_</h2>
                  <h3 style="color: #aeaeae; margin-top: 20px">Unlocked KSM Balance</h3>
                  <h2 v-if="currentWallet">
                    <img v-if="isLoadingBalance" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else>{{ formatNumber(ksmBalance.unlocked, 2, false) }} KSM</span></h2>
                  <h2 v-else>_</h2>
                </div>
                <div class="detailInfo" style="padding-left: 20px">
                  <h3 style="color: #aeaeae">KSM contributed</h3>
                  <h2 v-if="currentWallet">
                    <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else>{{ formatNumber(contributed / ksmDecimals, 2, false) }} KSM</span></h2>
                  <h2 v-else>_</h2>
                  <h3 style="margin-top: 20px; color: #aeaeae">Estimated Rewards</h3>
                  <h2 v-if="currentWallet">
                    <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                    <span v-else> {{ formatNumber(contributed * ratioReward / ksmDecimals, 0, false) }} PKS</span></h2>
                  <h2 v-else>_</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="currentWallet" class="affiliate" style="display: none">
          <div class="affiliate-title">Affiliation</div>
          <div class="affiliate-block">
            <div class="affiliate-item">
              <h3 style="color: #eee; text-align: left">Total Referrals</h3>
              <h2 v-if="currentWallet" style="text-align: left">
                <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                <span v-else>{{ refs }} Referrals</span>
              </h2>
              <h2 v-else>_</h2>
            </div>
            <div class="affiliate-item">
              <h3 style="color: #eee; text-align: left">Your Referral Link</h3>
              <h2 v-if="currentWallet">
                <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
                <div class="refcode-value" v-else>{{ `https://polkasmith.polkafoundry.com/#/event/${event.id}?ref=${refcode}` }}<a @click="copyRefcode"><svg width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.8568 3.85706H1.92852C0.863427 3.85706 0 4.89317 0 6.17128V19.2852C0 20.5633 0.863427 21.5994 1.92852 21.5994H12.8568C13.9219 21.5994 14.7853 20.5633 14.7853 19.2852V6.17128C14.7853 4.89317 13.9219 3.85706 12.8568 3.85706Z" fill="#2CC5F4"/>
                  <path d="M16.0709 1.49431e-09H4.49981C3.44048 -4.51982e-05 2.57943 1.02531 2.57129 2.29646C2.57129 2.30265 2.57129 2.30803 2.57129 2.31422H12.8567C14.631 2.31676 16.0688 4.04212 16.0709 6.17125V18.5138C16.0761 18.5138 16.0806 18.5138 16.0857 18.5138C17.1451 18.504 17.9995 17.4708 17.9995 16.1996V2.31422C17.9995 1.03611 17.136 1.49431e-09 16.0709 1.49431e-09Z" fill="#2CC5F4"/>
                </svg>
                </a></div>
              </h2>
              <h2 v-else>_</h2>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div>
    <TopContributor :profile="profile" :isLoadingProfile="isLoadingProfile" :event="event" :walletAddress="currentWallet"/>
  </div>
</template>

<script>
import TopContributor from "@/section/TopContributor";
import vSelect from 'vue-select'
import {ApiPromise, WsProvider} from '@polkadot/api'
import {web3Accounts, web3Enable, web3FromSource} from '@polkadot/extension-dapp'
import { decodeAddress, encodeAddress} from '@polkadot/util-crypto'
import WAValidator from 'wallet-address-validator'
import BN from "bn.js"
import 'vue-select/dist/vue-select.css';

export default {
  name: "Contribute",
  props: ['event'],
  components: {vSelect, TopContributor},
  data() {
    return {
      currentWallet: localStorage.getItem('SELECTED_KSM_WALLET'),
      isWalletLoading: false,
      isKYC: false,
      userRanking: 0,
      selectedAccount: {data: null},
      selectOptions: [],
      ksmBalance: {free: null, total: 0, unlocked: 0},
      ksmAmount: "",
      profile: {},
      ksmAmountCal: 0,
      erc20Wallet: {value: "", isValid: false},
      oldWallet: "",
      agreePolicy: false,
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
      refs: 0,
      refcode: "",
      referral: this.$route.query.ref ? this.$route.query.ref : "",
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
      if (!value) {
        return 0
      }
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
      let max = Math.floor((this.ksmBalance.unlocked > 0.0001 ? this.ksmBalance.unlocked - 0.0001 : 0) * 100) / 100
      if (max < 0.1) {
        max = 0.1
      }
      //  this.$refs.amountKsmInput.current.value = max
      this.ksmAmount = max
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
    getProfile() {
      this.isLoadingProfile = true
      const ksmAddr = this.convertToKSM(this.currentWallet)
      fetch(`https://polkasmith.polkafoundry.com/api/v1/profile?kusama=${ksmAddr}`)
          .then(response => response.json())
          .then(data => {
            if (!data || !data.data) {
              return
            }
            this.profile = data.data
            if (data.data.parent) {
              this.haveReferral = true
              this.referral = data.data.parent
            }
            this.refs = data.data.refs
            this.isKYC = data.data.kyc
            this.userRanking = data.data.rank
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
      navigator.clipboard.writeText(`https://polkasmith.polkafoundry.com/#/event/${this.event.id}?ref=${this.refcode}`)
      this.alertSuccess(`Copied refcode URL`)
    }
  },
  mounted() {
    this.getContribution()
    if (this.currentWallet) {
      this.getBalance()
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
.affiliate-title {
  font-size: 24px;
  font-weight: 600;
  text-align: left;
  padding: 20px 0 10px 0;
}
.affiliate-block {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}
.affiliate-item {
  display: inline-block;
  width: 50%;
}
.refcode-value {
  word-break: break-word;
  font-size: 14px;
  font-weight: normal;
  background-color: #FFFFFF;
  border: 1px solid #ffffff60;
  border-radius: 5px;
  padding: 10px;
  padding-right: 40px;
  color: #000;
  text-align: left;
  position: relative;
}
.refcode-value a{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}
.about-event {
  text-align: left;
  margin: 0 20px;
  font-size: 26px;
  padding-bottom: 20px;
  border-bottom: 2px solid #FFFFFF32;
}
.about-event p {
  font-size: 16px;
  font-weight: 400;
}
.about-event a {
  font-size: 16px;
  color: #00C7F4;
}
.polkaSmithMain {
  width: 100%;
  height: auto;
  font-size: 16px;
  padding: 0;
  margin-bottom: 100px;
}

.polkaSmithContainer {
  max-width: 1280px;
  align-items: center;
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
  background: linear-gradient(180deg, #0DDDFB48 0%, #3232DC48 0%, #0F0D3548 35.97%);
  height: max-content;
  width: 100%;
  border-radius: 40px;
  text-align: center;
  padding: 40px;
}

.introMain h3 {
  font-size: 16px;
  font-weight: normal;
}

.introContainer {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  border-bottom: 2px solid #FFFFFF32;
  padding-bottom: 20px;
  margin-bottom: 10px;
}
.contribute-block {
  display: inline-block;
  width: 55%;
  align-content: center;
  text-align: center;
  line-height: 2
}
.introBlock {
  display: inline-block;
  width: 45%;
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
  padding-bottom: 50px;
}

.connectWallet {
  background: #2CC5F4;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 60px;
  color: #050940;
  padding: 16px 36px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-height: 50px;
}

.connectWallet img {
  margin-top: -10px;
}

.connectWallet:hover {
  color: white;
  font-weight: 800;
  box-shadow: -5px 5px 10px #ffffff40, 5px -5px 10px #ffffff;
}

button:disabled {
  background-color: grey !important;
  cursor: not-allowed;
  box-shadow: unset !important;
  color: initial !important;
  font-weight: 600;
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
  font-size: 24px;
  font-weight: 600;
  text-align: left;
}

.contributeForm h2 {
  font-size: 24px;
  font-weight: 500;
}

.contributeForm h4 {
  font-size: 16px;
  font-weight: 500;
}

.contributeInputGroup {
  display: flex;
  margin-top: -15px;
}

.contributeInputGroup h2 {
  font-size: 20px;
  font-weight: 500;
}

.errorMessage {
  width: 100%;
  text-align: right;
  min-height: 20px;
  margin-top: -15px;
  color: #ff5151;
  font-size: 13px
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
  font-size: 14px;
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
  z-index: 9;
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

@media screen and (max-width: 1200px) {
  .introContainer {
    flex-wrap: wrap-reverse;
  }
  .contribute-block {
    width: 100%;
  }
  .introBlock {
    width: 100%;
    max-width: 680px;
    margin: 0 auto;
  }
  .detailInfo {
    width: 50%;
  }
}
@media screen and (max-width: 680px) {
  .affiliate-item {
    width: 100%;
  }

  .refcode-value {
    width: 100%;
    font-size: 10px;
  }
  .polkaSmithContainer {
    display: block;
    width: auto;
    margin: 0 -15px;
  }
  .introMain {
    padding: 50px 10px;
  }
  .introContainer {
    display: flex;
    flex-wrap: wrap-reverse;
  }
  .contribute-block {
    width: 100%;
  }
  .table-container {
    padding: 0;
  }
  .introBlock {
    height: 100%;
    width: 100%;
    margin-top: 10px;
  }
  .introContribute {
    margin: 0;
    padding: 10px;
    border-width: 0;
    border-bottom: 1px solid #ffffff32;
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
