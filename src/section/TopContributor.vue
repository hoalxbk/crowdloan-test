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
      <div class="ranking-item"><h3 style="color: #aeaeae">Your Ranking:</h3>
        <h3>
          <img v-if="isLoadingProfile" src="../assets/polkasmith/Loading.gif" width="25" height="25"/>
          <span v-else>
          <span v-if="userRanking < 0">>100</span>
          <span v-else>{{ userRanking }}</span>
          </span>
        </h3>
      </div>
      <div class="ranking-item">
        <h3 style="color: #aeaeae">KYC Status:</h3>
        <h3>
          <span v-if="!walletAddress">_</span>
          <span v-else>
            <span v-if="isKYC" style="color: #71FFAA;">
              Verified
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M12 6C12 9.31372 9.31372 12 6 12C2.68628 12 0 9.31372 0 6C0 2.68628 2.68628 0 6 0C9.31372 0 12 2.68628 12 6ZM5.30598 9.17695L9.7576 4.72534C9.90876 4.57418 9.90876 4.32907 9.7576 4.17791L9.21017 3.63048C9.05901 3.4793 8.8139 3.4793 8.66272 3.63048L5.03226 7.26092L3.33728 5.56594C3.18612 5.41478 2.94102 5.41478 2.78983 5.56594L2.2424 6.11337C2.09124 6.26453 2.09124 6.50964 2.2424 6.6608L4.75853 9.17693C4.90972 9.32811 5.1548 9.32811 5.30598 9.17695Z"
                    fill="#71FFAA"/>
              </svg>
            </span>
            <span v-else style="color: #D01F36;">
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
          <div class="label-amount">{{ toKSM(item.total) }} KSM</div>
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
  props: ['isKYC', 'userRanking', 'isLoadingProfile', 'event', 'walletAddress'],
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
            this.topContribute = data.data
            this.currentDataPage = this.topContribute.slice(0, this.currentPage * 20 < this.topContribute.length ? 20 : -1)
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
}

.ranking-item {
  background-color: #ffffff16;
  padding: 10px;
  margin: 10px;
  border-radius: 20px;
  display: inline-flex;
}

.ranking-item h3 {
  display: inline;
  margin: 20px 10px;
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

  .ranking-item {
    width: 100%;
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
