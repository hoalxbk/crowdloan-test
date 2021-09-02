<template>
  <div class="wrapper col-flex">
    <div class="information">
      <img class="desktop" alt src="../assets/introduction.png"/>
      <img class="mobile" alt src="../assets/introduction_mb.png"/>
      <div class="detail">
        <img alt src="../assets/bird.svg">
        <h2 class="title">Why built on Kusama?</h2>
        <p>Kusama and Polkadot are independent, standalone networks built on very similar codebases, but Kusama has
          faster governance parameters and lower barriers to entry.</p>
        <p>Kusama offers an early, adventurous version of Polkadot to allow teams and developers to build parachains and
          deploy applications in an environment with economic incentives that will mirror those on Polkadot. In
          addition, Kusama will organize its parachain auction in advance starting from 15 June 2021.</p>
      </div>
      <dot color="#FFFFFF66" column="7" row="5" :position="{bottom: 0, right: '-100px'}"/>
    </div>
    <div class="bg-radial col-flex">
      <h1 class="title gradient">
        Like Polkadot and Kusama, PolkaFoundry and PolkaSmith are a pair of Mainnet - Canary.
      </h1>
      <div class="subtitle">
        While PolkaFoundry is built on Polkadot and will bid for Polkadot parachain auction, PolkaSmith is built on
        Kusama and will bid for Kusama parachain auction.
      </div>
      <img class="desktop" alt src="../assets/info.png"/>
      <img class="mobile" alt src="../assets/info_mb.png"/>
      <div class="info">
        <p>PolkaSmith is great for early-stage startups that need to grow quickly and easily experiment with bold new
          ideas. Meanwhile, PolkaFoundry is implemented on the Polkadot Network to serve enterprises and B2B
          applications that require high stability and dependability.
        </p>
        <p>PolkaSmith will be the canary environment to try out all PolkaFoundry features. Other dapps built on
          PolkaFoundry like NFTify and Swaperry also don’t have to wait for Polkadot to create a runnable application;
          instead, they can work and experiment on our canary environment.
        </p>
        <dot column="4" row="3" color="#2CC5F4" :position="{bottom: '-48px', left: '-48px'}" gap="24"/>
      </div>
    </div>
    <div class="pie">
      <div class="card" style="display: flex; flex-direction: column">
        <h3 class="title">PKS - PolkaSmith Native Token</h3>
        <div class="chart">
          <div id="chartdiv"></div>
          <div class="chart-detail">
            <div class="chart-detail_header">
              <div>Total Supply</div>
              <div class="fw-600 konnect">70,000,000 PKS</div>
            </div>
            <div class="chart-detail_row" v-for="(row, i) in chartData" :key="i">
              <div class="dot" :style="{background: row.color}"/>
              <div class="title">{{ row.title }}</div>
              <div class="fw-600 konnect">{{ row.percent }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card" style="max-width: 360px; padding-bottom: 12px">
        <h3 class="title">PKS Utilities</h3>
        <div class="utility">
          <div class="utility-title">
            <img alt src="../assets/tick.svg"/>
            <span class="konnect fw-600">Transaction Fees Payment</span>
          </div>
          <div class="utility-detail">
            PolkaSmith users need to pay PKS to proceed on-chain transactions, for example computation, storage.
          </div>
          <div class="utility-title">
            <img alt src="../assets/tick.svg"/>
            <span class="konnect fw-600">Network Staking</span>
          </div>
          <div class="utility-detail">
            Collators, who collect transactions and produce blocks, and nominators, who nominate specific collators, can stake PKS on the network to earn rewards.
          </div>
          <div class="utility-title">
            <img alt src="../assets/tick.svg"/>
            <span class="konnect fw-600">On-Chain Governance</span>
          </div>
          <div class="utility-detail">
            Any PKS token holder can participate in the on-chain governance process, for example voting on proposals, and earn rewards.
          </div>
          <div class="utility-title">
            <img alt src="../assets/tick.svg"/>
            <span class="konnect fw-600">Launchpad Staking</span>
          </div>
          <div class="utility-detail">
            Any PKS token holder can stake PKS to join token launches on the Red Kite launchpad - PolkaSmith version.
          </div>
        </div>
      </div>
    </div>
    <div class="bg-linear col-flex">
      <div class="plan">
        <h2 class="title">PolkaSmith Auction Plan</h2>
        <div class="plan-grid">
          <div class="plan-item">
            <h4 class="title">8-Lease Period<br/>Parachain Duration</h4>
            <p class="plan-detail">
              We bid for an 8-lease period which lasts for 48 weeks. If PolkaSmith doesn't win the first auction, we
              will continue to bid in the subsequent auctions.
            </p>
          </div>
          <div class="plan-item">
            <h4 class="title">350+ PKS/KSM<br/>Winning Rewards</h4>
            <p class="plan-detail">
              If PolkaSmith wins, every KSM contributed to PolkaSmith in the Kusama Parachain auction through the
              crowdloan will be entitled to at least 350 $PKS as a reward.
            </p>
          </div>
          <div class="plan-item">
            <h4 class="title">Referral Program</h4>
            <p class="plan-detail">
              The contributors who refer others to the crowdloan using their unique code will be rewarded with 10% of the amount of PKS of those referents.
            </p>
          </div>
          <div class="plan-item">
            <h4 class="title">Early bird</h4>
            <p class="plan-detail">
              Before 5:00 PM UTC, August 29, the top 100 contributors who lock the largest number of KSM will each receive one ticket to join the Kaby Arena ($KABY) public sale on GameFi Launchpad. Each ticket will be equivalent to a 500$ worth allocation of $KABY token.
            </p>
          </div>
          <div class="plan-item">
            <h4 class="title">10,500,000 PKS<br/>Reward Pool</h4>
            <p class="plan-detail">
              The PolkaSmith’s prize tool for Kusama Parachain Slot Auction is worth 10,500,000 PKS, 15% of PKS’s total
              supply (70,000,000 PKS).</p>
          </div>
          <div class="plan-item">
            <h4 class="title">Rewards Distribution</h4>
            <p class="plan-detail">
              Contributors will receive 35% of their reward PKS on the day PolkaSmith starts its parachain, the
              remaining PKS is vested monthly over 10 months.
            </p>
          </div>
        </div>
        <div class="link">
          Get to know more about PolkaSmith Auction Plan
          <a target="_blank"
             href="https://medium.com/polkafoundry/jun-14-official-update-about-polkasmith-and-parachain-auction-plan-on-kusama-network-f29c00e1e466">here</a>.
        </div>
      </div>
      <div class="divider inset"></div>
      <div class="crowdloan">
        <h2 class="title">Join PolkaSmith Crowdloan</h2>
        <div class="crowdloan-grid">
          <a href="https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama-rpc.polkadot.io#/parachains/crowdloan" target="_blank">
            <img alt src="../assets/kusama.png"/>
          </a>
          <a href="https://www.okex.com/earn/slotauction" target="_blank">
            <img alt src="../assets/okex.png"/>
          </a>
          <a href="https://fearlesswallet.io/" target="_blank">
            <img alt src="../assets/fearless.png"/>
          </a>
          <a href="https://newland.finance/en/pc/KSM-auction" target="_blank">
            <img alt src="../assets/newland.png"/>
          </a>
          <a href="https://www.gate.io/hodl/607" target="_blank">
            <img alt src="../assets/gate.jpg"/>
          </a>
          <a href="https://www.mexc.io/slot/assessment" target="_blank">
            <img alt src="../assets/mexc.jpg"/>
          </a>
          <div class="upcoming">
            <img alt src="../assets/kraken.jpg"/>
            <div class="hover">
              <p>Upcomming</p>
            </div>
          </div>
          <div class="upcoming">
            <img alt src="../assets/kucoin.jpg"/>
            <div class="hover">
              <p>Upcomming</p>
            </div>
          </div>
        </div>
        <div class="link">
          Get to know more about How to join PolkaSmith Crowdloan
          <a target="_blank"
             href="https://medium.com/polkafoundry/the-ultimate-guide-for-polkasmith-crowdloan-fa384b1b1181">here</a>.
        </div>
      </div>
      <dot color="rgba(255,255,255,0.2)" column="5" row="5" :position="{left: '20px', bottom: '60%'}"/>
    </div>
  </div>
</template>

<script>
import Dot from "@/components/Dot";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";

export default {
  name: "Infomation",
  components: {Dot},
  data() {
    return {
      chartData: [{
        "title": "Parachain Auctions",
        "amount": 21000000,
        "color": "#B83574",
        "percent": "30%"
      }, {
        "title": "Parachain Auction Reserve",
        "amount": 3500000,
        "color": "#F9469B",
        "percent": "5%"

      }, {
        "title": "Ecosystem",
        "amount": 17500000,
        "color": "#FF57C4",
        "percent": "25%"
      }, {
        "title": "Treasury",
        "amount": 10500000,
        "color": "#FF69EF",
        "percent": "15%"
      }, {
        "title": "Marketing",
        "amount": 7000000,
        "color": "#FF7BFF",
        "percent": "10%"
      }, {
        "title": "Team",
        "amount": 3500000,
        "color": "#FF8EFF",
        "percent": "5%"
      }, {
        "title": "Backers",
        "amount": 7000000,
        "color": "#FFA1FF",
        "percent": "10%"
      }]
    }
  },
  mounted() {
    let chart = am4core.create("chartdiv", am4charts.PieChart3D);

    chart.data = this.chartData;

    let pieSeries = chart.series.push(new am4charts.PieSeries3D());
    pieSeries.dataFields.category = "title";
    pieSeries.dataFields.value = "amount";

    pieSeries.labels.template.disabled = true;
    pieSeries.ticks.template.disabled = true;

    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries.slices.template.states.getKey("active").properties.shiftRadius = 0;
    pieSeries.slices.template.states.getKey("hover").properties.scale = 1.1;

    pieSeries.slices.template.tooltipText = "{category}: {value.percent.formatNumber('#.#')}%"

    pieSeries.colors.list = this.chartData.map(({color}) => am4core.color(color))
  },
  methods: {}
}
</script>

<style scoped>
.wrapper {
  padding: var(--padding-section) 0;
}

.bg-radial {
  background: radial-gradient(50% 50% at 50% 50%, #94D2E634 0%, rgba(5, 9, 64, 0.12) 90.14%);
  padding: 0 var(--padding-section);
}

.bg-linear {
  background: linear-gradient(180deg, #0F0C3E 0%, #0D0B32 100%);
  width: 100%;
  padding: var(--padding-section);
  position: relative;
  margin-top: 20px;
}

.gradient {
  background: linear-gradient(273.46deg, #D52D6F 0%, #FF2D79 0.01%, #F98395 48.66%, #1DCAFF 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  max-width: 1000px;
}

.subtitle {
  font-size: 20px;
  line-height: 32px;
  text-align: center;
  margin-top: 24px;
  margin-bottom: 60px;
  max-width: 800px;
}

.info {
  display: flex;
  justify-content: center;
  position: relative;
}

.info p {
  font-size: 16px;
  line-height: 26px;
  flex: 0 0 440px;
  margin: 20px;
  font-weight: 300;
}

.pie {
  display: flex;
  align-items: stretch;
  padding: var(--padding-section);
  margin-top: 100px;
}

.pie > .card:first-child {
  margin: 0 20px 0 0;
}

.card {
  padding: var(--padding-article);
}

h3.title {
  margin-bottom: 12px;
}

.chart,
.chart-detail,
.chart-detail_header,
.chart-detail_row {
  display: flex;
}

.chart {
  align-items: stretch;
}

.chart-detail {
  flex-direction: column;
  justify-content: space-evenly;
}

.chart-detail_header {
  justify-content: space-between;
  padding: 10px 20px;
  background: #FFFFFF14;
  border-radius: 4px;
}

.chart-detail_row {
  align-items: center;
}

.chart-detail_row .dot {
  width: 8px;
  height: 8px;
  border-radius: 8px;
  margin-right: 12px;
}

.chart-detail_row .title {
  flex: 1;
  margin-right: 24px;
}

#chartdiv {
  width: 375px;
  height: 375px;
}

#chartdiv::v-deep g[opacity='0.4'] {
  display: none;
}

.utility-title {
  display: flex;
  align-items: center;
}

.utility-title img {
  margin-right: 12px;
}

.utility-detail {
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
  margin: 2px 0 12px 26px;
}

.plan {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: var(--margin-section);
}

.plan-grid {
  display: grid;
  grid-template-columns: 360px 360px;
  grid-gap: 20px;
  margin-top: 40px;
}

.plan-item {
  box-shadow: 0px 8px 16px rgba(27, 27, 27, 0.16), -1px -1px 0 rgba(255, 255, 255, 0.24);
  background: linear-gradient(180deg, #E6447D50 0%, #080C33 100%);
  border-radius: 40px;
  padding: 40px 32px;
  text-align: center;
}

.plan-detail {
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
  margin: 12px 0 0;
}

.link {
  margin-top: 40px;
  font-family: Konnect;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
}

.link a {
  color: #0DDDFB;
  text-decoration: underline;
}

.crowdloan {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: var(--margin-section);
}

.crowdloan-grid {
  display: grid;
  grid-template-columns: minmax(0, 332px) minmax(0, 332px) minmax(0, 332px);
  grid-gap: 20px;
  margin-top: 40px;
}

.crowdloan-grid a {
  position: relative;
}

.crowdloan-grid a:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.crowdloan-grid a:hover:after {
  background: url("../assets/hover.png");
  background-size: cover;
}

.crowdloan-grid img {
  width: 100%;
  border-radius: 24px;
}

.upcoming {
  position: relative;
}

.upcoming:hover .hover {
  visibility: visible;
}

.hover {
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(180deg, rgba(15, 19, 62, 0.54) 0%, #0F133E 99.88%);
  border-radius: 24px;
}

.hover p {
  padding: 6px 24px;
  background: #2CC5F4;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 24px;
  font-family: Konnect;
  font-weight: 600;
  font-size: 16px;
  line-height: 26px;
  color: #050940;
  user-select: none;
}

.information {
  position: relative;
  z-index: 2;
  margin-bottom: 100px;
}

.detail {
  position: absolute;
  top: 60px;
  left: 100px;
  width: 515px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-weight: 300;
}

@media screen and (max-width: 600px) {
  .information {
    margin-top: 100px;
  }

  .detail {
    top: 0;
    left: 0;
    right: 0;
    width: auto;
    align-items: center;
    padding: 28px;
  }
  .subtitle {
    font-size: 16px;
    line-height: 26px;
    margin: 12px 0;
    font-weight: 300;
  }

  .info {
    flex-direction: column;
    margin-top: 40px;
  }

  .info p {
    flex: unset;
    margin: 0 0 12px;
    text-align: center;
    color: #D9DAF2;
    font-size: 14px;
    line-height: 22px;
  }

  .pie,
  .chart {
    flex-direction: column;
    align-items: center;
  }

  .pie > .card:first-child {
    margin-right: 0;
    margin-bottom: 12px;
  }

  #chartdiv {
    width: 300px;
    height: 300px;
  }

  .chart-detail_row {
    margin: 6px;
  }

  .plan-grid {
    grid-template-columns: 1fr;
    grid-gap: 12px;
  }

  .plan-item {
    box-shadow: 0px 8px 16px rgba(27, 27, 27, 0.16);
  }

  .link {
    text-align: center;
  }

  .crowdloan-grid {
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
  }

  .hover p {
    font-size: 10px;
    line-height: 16px;
    padding: 2px 8px;
  }
}
</style>
