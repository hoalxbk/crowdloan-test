<template>
  <div class="bg-linear col-flex top-contribute">
    <h1 class="top-title">Top Contributors</h1>
    <div class="kyc-notice">
      <img src="../assets/polkasmith/lighting-icon.png" width="50" height="50">
      <div class="notice-content">
        <span style="color: #fcd664; font-weight: bold" v-if="event.snapshot_time || event.snapshot_time > 0">Top Contributors snapshot at {{
            new Date(event.snapshot_time).toLocaleString()
          }}. Later contributions will not affect this list.</span>
        <span>If you are in top contributors, please proceed <a href="https://hub.gamefi.org/#/account" target="_blank">KYC immediately.</a></span>
        <span>If you are also a member of Red Kite, we recommend you to use the same wallet address.</span>
      </div>
    </div>
    <div class="ranking-container">
      <div class="ranking-item border-right border-bottom"><h3 class="info-title">Total Point:</h3>
        <h3 class="info-value">
          <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
          <span v-else>
          <span>{{ !profile.totalPoint ? 0 : profile.totalPoint.toFixed(3).toLocaleString("us-US", {minimumFractionDigits: 3}) }}</span>
          </span>
        </h3>
      </div>
      <div class="ranking-item border-right border-bottom"><h3 class="info-title">Early Bird Point:</h3>
        <h3 class="info-value">
          <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
          <span v-else>
          <span>{{ !profile.earlyPoint ? 0 : profile.earlyPoint.toFixed(3).toLocaleString("us-US", {minimumFractionDigits: 3}) }}</span>
          </span>
        </h3>
      </div>
      <div class="ranking-item border-bottom"><h3 class="info-title">Your Ranking:</h3>
        <h3 class="info-value">
          <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
          <span v-else>
          <span v-if="profile.rank < 0">>100</span>
          <span v-else>{{ profile.rank }}</span>
          </span>
        </h3>
      </div>
      <div class="ranking-item border-right"><h3 class="info-title" >Referral Point:</h3>
        <h3 class="info-value">
          <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
          <span v-else>
          <span>{{ !profile.refPoint ? 0 : profile.refPoint.toFixed(3).toLocaleString("us-US", {minimumFractionDigits: 3}) }}</span>
          <a @click="copyRefcode" title="Copy referral link"><svg class="svg-action" width="18" height="22" viewBox="0 0 18 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.8568 3.85706H1.92852C0.863427 3.85706 0 4.89317 0 6.17128V19.2852C0 20.5633 0.863427 21.5994 1.92852 21.5994H12.8568C13.9219 21.5994 14.7853 20.5633 14.7853 19.2852V6.17128C14.7853 4.89317 13.9219 3.85706 12.8568 3.85706Z" fill="#2CC5F4"/>
                <path d="M16.0709 1.49431e-09H4.49981C3.44048 -4.51982e-05 2.57943 1.02531 2.57129 2.29646C2.57129 2.30265 2.57129 2.30803 2.57129 2.31422H12.8567C14.631 2.31676 16.0688 4.04212 16.0709 6.17125V18.5138C16.0761 18.5138 16.0806 18.5138 16.0857 18.5138C17.1451 18.504 17.9995 17.4708 17.9995 16.1996V2.31422C17.9995 1.03611 17.136 1.49431e-09 16.0709 1.49431e-09Z" fill="#2CC5F4"/>
              </svg>
              </a>
          </span>
        </h3>
      </div>
      <div class="ranking-item border-right"><h3 class="info-title">Gleam Point:</h3>
        <h3 class="info-value">
          <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
          <span v-else>
          <span>{{ !profile.gleamPoint ? 0 : profile.gleamPoint }}</span>
             <a :href="!event.gleam ? '#' : event.gleam" title="Open gleam url" target="_blank"><svg class="svg-action" height="22" viewBox="0 0 512 512.00578" width="22" xmlns="http://www.w3.org/2000/svg"><path fill="#2CC5F4" d="m507.523438 148.890625-138.667969-144c-4.523438-4.691406-11.457031-6.164063-17.492188-3.734375-6.058593 2.453125-10.027343 8.320312-10.027343 14.847656v69.335938h-5.332032c-114.6875 0-208 93.3125-208 208v32c0 7.421875 5.226563 13.609375 12.457032 15.296875 1.175781.296875 2.347656.425781 3.519531.425781 6.039062 0 11.820312-3.542969 14.613281-9.109375 29.996094-60.011719 90.304688-97.28125 157.398438-97.28125h25.34375v69.332031c0 6.53125 3.96875 12.398438 10.027343 14.828125 5.996094 2.453125 12.96875.960938 17.492188-3.734375l138.667969-144c5.972656-6.207031 5.972656-15.976562 0-22.207031zm0 0"/><path fill="#2CC5F4" d="m448.003906 512.003906h-384c-35.285156 0-63.99999975-28.710937-63.99999975-64v-298.664062c0-35.285156 28.71484375-64 63.99999975-64h64c11.796875 0 21.332032 9.535156 21.332032 21.332031s-9.535157 21.332031-21.332032 21.332031h-64c-11.777344 0-21.335937 9.558594-21.335937 21.335938v298.664062c0 11.777344 9.558593 21.335938 21.335937 21.335938h384c11.773438 0 21.332032-9.558594 21.332032-21.335938v-170.664062c0-11.796875 9.535156-21.335938 21.332031-21.335938 11.800781 0 21.335937 9.539063 21.335937 21.335938v170.664062c0 35.289063-28.714844 64-64 64zm0 0"/></svg>
             </a></span>
        </h3>
      </div>
      <div class="ranking-item">
        <h3 class="info-title">KYC Status:</h3>
        <h3 class="info-value">
          <span v-if="!walletAddress">_</span>
          <span v-else>
            <span v-if="profile.kyc" style="color: #71FFAA;">
              Verified
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 6C12 9.31372 9.31372 12 6 12C2.68628 12 0 9.31372 0 6C0 2.68628 2.68628 0 6 0C9.31372 0 12 2.68628 12 6ZM5.30598 9.17695L9.7576 4.72534C9.90876 4.57418 9.90876 4.32907 9.7576 4.17791L9.21017 3.63048C9.05901 3.4793 8.8139 3.4793 8.66272 3.63048L5.03226 7.26092L3.33728 5.56594C3.18612 5.41478 2.94102 5.41478 2.78983 5.56594L2.2424 6.11337C2.09124 6.26453 2.09124 6.50964 2.2424 6.6608L4.75853 9.17693C4.90972 9.32811 5.1548 9.32811 5.30598 9.17695Z"
                    fill="#71FFAA"/>
              </svg>
            </span>
            <span v-else style="color: #D01F36;font-size: 16px;margin-left: -20px">
              Unverified
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M6.02344 0C2.72789 0 0 2.68102 0 5.97656C0 9.27211 2.72789 12 6.02344 12C9.31898 12 12 9.27211 12 5.97656C12 2.68102 9.31898 0 6.02344 0ZM8.98172 7.94039C9.25594 8.21461 9.25594 8.66063 8.98172 8.93508C8.70961 9.20695 8.26359 9.21141 7.98703 8.93508L6.02344 6.97078L4.01273 8.93531C3.73852 9.20953 3.2925 9.20953 3.01805 8.93531C2.74383 8.66109 2.74383 8.21508 3.01805 7.94062L4.98211 5.97656L3.01805 4.0125C2.74383 3.73805 2.74383 3.29203 3.01805 3.01781C3.2925 2.74359 3.73852 2.74359 4.01273 3.01781L6.02344 4.98234L7.98703 3.01781C8.26078 2.74406 8.7068 2.74312 8.98172 3.01781C9.25594 3.29203 9.25594 3.73805 8.98172 4.0125L7.01766 5.97656L8.98172 7.94039Z"
                    fill="#D01F36"/>
              </svg>
            </span>
            </span>
        </h3>
      </div>
    </div>
    <div class="top-table">
      <div class="table-container">
        <div class="table-item" v-for="(item, i) in currentDataPage" :key="i">
          <div class="label-address">{{ (currentPage - 1) * 20 + i + 1 }}. {{ item.kusama_address }}</div>
          <div class="label-amount">{{ item.totalPoint.toFixed(3).toLocaleString("us-US", {minimumFractionDigits: 3}) }} Points</div>
        </div>
      </div>
      <div class="pagination-container" align="center">
        <v-pagination
            v-model="currentPage"
            :classes="bootstrapPaginationClasses"
            :page-count="totalPage">
        </v-pagination>
      </div>
      <span style="font-size: 14px;"><i>*The result is updated hourly and will be announced after review</i></span>
    </div>
  </div>
</template>
<script>
import vPagination from 'vue-plain-pagination'

export default {
  name: 'TopContributor',
  props: ['isLoadingProfile', 'event', 'walletAddress', 'profile'],
  components: {vPagination},
  data() {
    return {
      currentPage: 1,
      totalPage: 1,
      currentDataPage: [],
      topContribute: [],
      bootstrapPaginationClasses: {
        ul: 'pagination',
        li: 'page-item',
        liActive: 'active',
        liDisable: 'disabled',
        button: 'page-link'
      }
    }
  },
  mounted() {
    if (!this.event) {
      return
    }
    this.loadTopContrubute()
  },
  watch: {
    event() {
      if (!this.event) {
        return
      }
      this.loadTopContrubute()
    },
    currentPage() {
      if (!this.currentPage) {
        return;
      }
      if (this.currentPage > 1) {
        this.currentDataPage = this.topContribute.slice((this.currentPage - 1) * 20, this.currentPage * 20 <= this.topContribute.length ? this.currentPage * 20 : -1)
      } else {
        this.currentDataPage = this.topContribute.slice(0, 20 <= this.topContribute.length ? this.currentPage * 20 : -1)
      }
    }
  },
  methods: {
    copyRefcode() {
      navigator.clipboard.writeText(`https://polkasmith.polkafoundry.com/#/event/${this.event.id}?ref=${this.profile.code}`)
      this.$notify({
        type: 'success',
        title: `Copied refcode URL`
      })
    },
    toKSM(amount) {
      const value = BigInt(amount) / BigInt(10_000_000_000)
      return (parseInt(value) / 100).toLocaleString("us-US", {minimumFractionDigits: 2})
    },
    loadTopContrubute() {
      if (!this.event || !this.event.id) {
        return
      }
      fetch(`https://polkasmith.polkafoundry.com/api/v1/event/${this.event.id}/top-100`)
          .then(response => response.json())
          .then(data => {
            console.log(data.data)
            if (!data || !data.data) {
              return
            }

            this.topContribute = data.data.sort(function(a,b) {
              return (a['totalPoint'] < b['totalPoint']) ? 1 : (a['totalPoint'] > b['totalPoint']) ? -1 : 0;
            });
            this.currentDataPage = this.topContribute
            if (this.currentPage * 20 < this.topContribute.length) {
              this.currentDataPage = this.topContribute.slice(0,  20)
            }
            this.totalPage = Math.ceil(this.topContribute.length / 20)
          })
    },
  }
}

</script>
<style>
.table-container {
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
}

.table-item {
  display: inline-flex;
  width: 50%;
  font-size: 18px;
  padding: 10px 20px;
  font-weight: normal;
  text-align: left;
}

.label-address {
  display: inline;
  width: 70%;
}

.label-amount {
  display: inline;
  width: 30%;
  font-weight: 600;
  text-align: right;
  color: #2CC5F4;
}

.pagination-container {
  width: 100%;
  margin-bottom: 20px;
}

.pagination {
  display: flex;
  width: fit-content;
}

.top-table {
  width: 100%;
  max-width: 1000px;
}

.page-item {
  color: white !important;
}

.page-link {
  color: white !important;
  font-size: 20px !important;
  cursor: pointer;
  border: unset !important;
  background-color: transparent !important;
}

.page-link.pagination-link--active {
  background-color: #2CC5F4 !important;
  color: black !important;
  border-radius: 5px;
}

.page-item button:disabled {
  cursor: not-allowed;
  border: 2px solid #989898 !important;
  background-color: transparent !important;
  border: unset !important;
  color: gray !important;
}

.kyc-notice {
  margin-top: 20px;
  display: flex;
  padding: 10px;
  color: #fff;
  border-radius: 20px;
  border: 1px solid #fcd664;
  animation-duration: 800ms;
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.kyc-notice img {
  display: inline;
  width: 50px;
  height: 100%;
  margin: auto;
  margin-right: 10px;
}

.notice-content {
  display: inline-block;
  text-align: left;
}

.notice-content span {
  display: block;
  margin-bottom: 5px;
}

.notice-icon {
  fill: #fcd664;
  animation-duration: 800ms;
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.notice-content span a {
  color: #2CC5F4;
  font-weight: 500;
  text-decoration-line: underline;
}

.ranking-container {
  display: flex;
  flex-wrap: wrap;
  max-width: 900px;
  border-radius: 20px;
  background-color: #ffffff32;
  margin: 10px;
}

.ranking-item {
  min-width: 280px;
  width: 33.33%;
  padding: 10px 20px;
  display: inline-flex;
  position: relative;
}
.border-right {
  border-right: 2px solid #0d1143;
}

.border-bottom {
  border-bottom: 2px solid #0d1143;
}

.ranking-item h3 {
  display: inline;
  margin: 10px 10px;
}
.info-title {
  color: #ccc;
  width: 50%;
  font-size: 16px;
  text-align: left;
}
.ranking-item .svg-action {
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 10px;
}
@keyframes blink {
  from {
    fill: #fcd664;
    border-color: #fcd664;
  }
  to {
    fill: #fcd66450;
    border-color: #fcd66450;
  }
}

@media screen and (max-width: 680px) {
  .table-item {
    width: 100%;
    font-size: 14px;
    text-align: left;
  }
  .ranking-container {
    background: transparent;
  }
  .ranking-item {
    width: 100%;
    border-radius: 20px;
    background: #ffffff32;
    margin-bottom: 10px;
    border-width: 0;
  }

  .notice-content {
    text-align: left;
  }

  .top-contribute {
    padding: 20px;
    text-align: center;
  }
}
</style>
