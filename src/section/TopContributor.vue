<template>
  <div class="bg-linear col-flex">
    <h1 class="top-title">Top 100 Contributors</h1>
    <span><i>( *This table will be updated hourly. )</i></span>
    <div class="top-table">
      <div class="table-container">
        <div class="table-item" v-for="(item, i) in currentDataPage" :key="i">
          <div class="label-address">{{ (currentPage - 1) * 20 + i + 1 }}. <i>{{ item.kusama_address }}</i></div>
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

    </div>
  </div>
</template>
<script>
import vPagination from 'vue-plain-pagination'

export default {
  name: 'TopContributor',
  components: { vPagination },
  data() {
    return {
      currentPage: 1,
      totalPage: 1,
      currentDataPage:[],
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
    this.loadTopContrubute()
  },
  watch: {
    currentPage() {
      if (!this.currentPage) {
        return;
      }
      if (this.currentPage > 1) {
        this.currentDataPage = this.topContribute.slice((this.currentPage - 1) * 20 - 1, this.currentPage * 20 < this.topContribute.length ? this.currentPage * 20 - 1 : -1)
      } else {
        this.currentDataPage = this.topContribute.slice(0, 20 < this.topContribute.length ? this.currentPage * 20 : -1)
      }
    }
  },
  methods: {
    toKSM(amount) {
      const value = BigInt(amount) / BigInt(10_000_000_000)
      return  (parseInt(value)/100).toLocaleString("us-US", {minimumFractionDigits: 2})
    },
    loadTopContrubute() {
      fetch(`https://polkasmith.polkafoundry.com/api/v1/top-100`)
          .then(response => response.json())
          .then(data => {
            if (!data || !data.data) {
              return
            }
            this.topContribute = data.data
            this.currentDataPage = this.topContribute.slice(0, this.currentPage * 20 < this.topContribute.length ? 20 : - 1)
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
  font-weight: bold;
}
.label-address {
  display: inline;
  width: 70%;
}
.label-amount {
  display: inline;
  width: 30%;
  text-align: right;
  color: #6398FF;
}

.pagination-container {
  width: 100%;
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
.page-link  {
  color: white !important;
  font-size: 20px !important;
  cursor: pointer;
  border: 2px solid #f0f0f0 !important;
  background-color: transparent !important;
}
.page-link.pagination-link--active {
  color: #6398FF !important;
}
button:disabled {
  cursor: not-allowed;
  border: 2px solid #989898 !important;
  background-color: transparent !important;
}
@media screen and (max-width: 680px) {
  .table-item {
    width: 100%;
    font-size: 14px;
  }
}
</style>
