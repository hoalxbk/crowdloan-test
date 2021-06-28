<template>
  <div class="wrapper col-flex">
    <Dialog v-model="dialog" :data="person"/>
    <h3 class="title">Our Team</h3>
    <div class="grid">
      <div v-for="(member, i) in members" :key="i"
           class="member" @click.stop="openDialog(member)">
        <img alt :src="`members/${member.image}`"/>
        <div class="info">
          <div class="info-name">{{ member.name }}</div>
          <div class="info-title">{{ member.title }}</div>
          <div class="info-shortcut">
            {{ member.shortcut }}<span>[See more]</span>
          </div>
          <div class="info-link">
            <a v-for="(link, i) in member.links" target="_blank" :key="i" :href="link.href">
              <img alt :src="link.img"/>
            </a>
          </div>
        </div>
        <div class="member-info">
          <div class="info-name">{{ member.name }}</div>
          <div class="info-title">{{ member.title }}</div>
        </div>
      </div>
    </div>
    <h3 class="title">Advisors</h3>
    <div class="grid">
      <div v-for="(member, i) in advisors" :key="i"
           class="member" @click.stop="openDialog(member)">
        <img alt :src="`members/${member.image}`"/>
        <div class="info">
          <div class="info-name">{{ member.name }}</div>
          <div class="info-title">{{ member.title }}</div>
          <div class="info-shortcut">
            {{ member.shortcut }}<span>[See more]</span>
          </div>
          <div class="info-link">
            <a v-for="(link, i) in member.links" target="_blank" :key="i" :href="link.href">
              <img alt :src="link.img"/>
            </a>
          </div>
        </div>
        <div class="member-info">
          <div class="info-name">{{ member.name }}</div>
          <div class="info-title">{{ member.title }}</div>
        </div>
      </div>
    </div>
    <div class="advisor"></div>
    <h3 class="title">Backed by</h3>
    <div class="partner">
      <div class="partner-item">
        <a href="https://www.signum.capital/" target="_blank"><img src="../assets/partners/signum_capital.svg"
                                                                   alt="signum capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://morningstar.ventures/" target="_blank"><img src="../assets/partners/morningstar.png"
                                                                     alt="morningstar"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.sparkdigitalcapital.com/" target="_blank"><img src="../assets/partners/spark.svg"
                                                                            alt="spark digital"></a>
      </div>
      <div class="partner-item">
        <a href="https://master.ventures/" target="_blank"><img src="../assets/partners/master_ventures.svg"
                                                                alt="master ventures"></a>
      </div>
      <div class="partner-item">
        <a href="https://au21.capital/" target="_blank"><img src="../assets/partners/au21.svg" alt="au21 capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://x21digital.com/" target="_blank"><img src="../assets/partners/x21.svg" alt="x21 digital"></a>
      </div>
      <div class="partner-item">
        <a href="https://magnusdigitalassets.com/" target="_blank"><img src="../assets/partners/magnus_capital.png"
                                                                        alt="magnus capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://rarestone.capital/" target="_blank"><img src="../assets/partners/rarestone.svg"
                                                                  alt="rarestone capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://duckdao.io/" target="_blank"><img src="../assets/partners/duck_dao.svg" alt="duck dao"></a>
      </div>
      <div class="partner-item">
        <a href="https://icetea.io/" target="_blank"><img src="../assets/partners/icetea_labs.png"
                                                          alt="icetea labs"></a>
      </div>
      <div class="partner-item">
        <a href="https://twitter.com/BlockDreamFund" target="_blank"><img src="../assets/partners/blockdreamfund.png"
                                                                          alt="block dream fund"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.dfg.group/" target="_blank"><img src="../assets/partners/dfg.svg" alt="dfg"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.youbicapital.com/" target="_blank"><img src="../assets/partners/ub_capital.svg"
                                                                     alt="youbi capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://pnyx.ventures/" target="_blank"><img src="../assets/partners/pnyx.svg" alt="pnyx ventures"></a>
      </div>
      <div class="partner-item">
        <a href="https://momentum6.com/" target="_blank"><img src="../assets/partners/momentum6.png"
                                                              alt="momentum 6"></a>
      </div>
      <div class="partner-item">
        <a href="https://mantradao.com/" target="_blank"><img src="../assets/partners/mantra_dao.svg" alt="mantra dao"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.lotuscapital.me/" target="_blank"><img src="../assets/partners/lotus.svg"
                                                                    alt="lotus capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.blocksync.com/" target="_blank"><img src="../assets/partners/blocksync.svg"
                                                                  alt="blocksync ventures"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.vendetta.capital/" target="_blank"><img src="../assets/partners/vendetta.svg"
                                                                     alt="vendetta capital"></a>
      </div>
      <div class="partner-item">
        <a href="#" target="_blank"><img src="../assets/partners/inclusion.svg" alt="inclusion capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://moonwhale.ventures/" target="_blank"><img src="../assets/partners/moonwhale.png"
                                                                   alt="moonwhale"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.cryptodormfund.org/" target="_blank"><img src="../assets/partners/cryptodormfund.png"
                                                                       alt="crypto dorm fund"></a>
      </div>
      <div class="partner-item">
        <a href="https://blackedge.io/" target="_blank"><img src="../assets/partners/blackedge.png"
                                                             alt="black edge capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.linkedin.com/company/gestalt-venture-capital/" target="_blank"><img
            src="../assets/partners/gestalt.png" alt="gestalt capital"></a>
      </div>
      <div class="partner-item">
        <a href="https://www.das-kapital.io/" target="_blank"><img src="../assets/partners/das_capital.png"
                                                                   alt="das kapital"></a>
      </div>
    </div>
    <dot color="#2CC5F4" row="3" column="4" :position="{bottom: 0, right: '16px'}" gap="20"/>
  </div>
</template>

<script>
import Dialog from "@/components/Dialog";
import Dot from "@/components/Dot";

export default {
  name: "Team",
  components: {Dot, Dialog},
  data() {
    return {
      dialog: false,
      person: null,
      members: [
        {
          name: 'Thi Truong',
          title: 'Co-founder & CEO',
          image: 'thi.png',
          links: [{href: 'https://www.linkedin.com/in/mangcut/', img: 'linkedin.svg'}],
          descriptions: [
            'Thi has been a blockchain soldier with hands-on in-depth experience in blockchain area for several years.',
            'He started as a Software Engineer, then Solution Architect, then a Director at FPT Corp. After leaving FPT, he joined Kyber Network, one of the most successful blockchain projects in Asia, as a Product Manager.',
            'Thi founded PolkaFoundry at the end of 2018 after getting frustrated with blockchain dapps\' UX, with the determination to make the benefits of blockchain more accessible to normal people.'
          ],
          shortcut: 'Former senior manager at Kyber Network, a blockchain solder with hands-on in-dept experience for many years...'
        },
        {
          name: 'Ron Nguyen',
          title: 'Head of Partnerships',
          image: 'ron.png',
          links: [{href: 'https://www.linkedin.com/in/duyhn/', img: 'linkedin.svg'}],
          descriptions: [
            'A graduate of RMIT in Melbourne, Australia, armed with 10 years of experience in marketing, Ron has gained experience working with small to large companies in management positions, including Line Vietnam, NHG, and Enterprise Rent-a-Car.',
            'He is proficient in liaising with influencers and brand partners to forge strategic alliances, and building partnerships to deliver branding solutions.'
          ],
          shortcut: 'A graduate of RMIT in Melbourne, Australia, armed with 10 years of experience in marketing...'
        },
        {
          name: 'Trang Mai',
          title: 'Head of R&D',
          image: 'trang.png',
          links: [{href: 'https://www.linkedin.com/in/trangmx/', img: 'linkedin.svg'}],
          descriptions: [
            'Holding a Ph.D. and Postdoc from Kyoto University in Japan, Trang has won several world-class academic awards and co-authored many books.',
            'Trang is leading PolkaFoundry’s research efforts on current challenging blockchain frontiers, including quantum-resistant cryptography, multi-party computation, and atomic cross-chain operations.'
          ],
          shortcut: 'Holding a Ph.D. from Kyoto University in Japan, Trang has won several world-class academic awards...'
        },
        {
          name: 'Huy Hoang',
          title: 'Head of Platform Services',
          image: 'huy.png',
          links: [{href: '', img: 'linkedin.svg'}],
          descriptions: [
            'Huy has over 10 years of experience working directly with large-scale clients and IT vendors in Japan, including 3 years in the blockchain area.',
            'He is known for his skills and insights about decentralization protocol architecture, system scalability and security, and DeFi solutions.'
          ],
          shortcut: 'An expert in decentralization protocols with 10+ years of experience including 3 years in the blockchain area...'
        },
        {
          name: 'Luong Hoa',
          title: 'Lead Engineer',
          image: 'luong.png',
          links: [{href: 'https://www.linkedin.com/in/luonghoa/', img: 'linkedin.svg'}],
          descriptions: [
            'Luong is a seasoned Software Engineer with a demonstrated history of working in the IT and services industry, including the position as a Researcher at Nomura Research Institute, Japan.',
            'With years of experience developing the core of blockchain, he is actively involving in the rebuild of PolkaFoundry on Substrate framework.'
          ],
          shortcut: 'A seasoned blockchain engineer, former researcher at Nomura Research Institute in Tokyo...'
        }
      ],
      advisors: [
        {
          name: 'Lester Lim',
          title: 'Strategy Advisor',
          image: 'lesterlim.png',
          links: [{href: 'https://www.linkedin.com/in/lesterlim15/', img: 'linkedin.svg'}],
          descriptions: [
            'Founder of X21 Digital, also Strategic Advisor to MahaDao & Finxflo, etc.',
            'Lester guides PolkaFoundry on strategy, partnership and offers advice on various matters to help avoid mistakes and innovate faster to realize its vision.'
          ],
          shortcut: 'Founder of X21 Digital, also Strategic Advisor to MahaDao & Finxflo...'
        },
        {
          name: 'Garlam Won',
          title: 'Marketing Advisor',
          image: 'garlam.png',
          links: [{href: 'https://www.linkedin.com/in/garlam/', img: 'linkedin.svg'}],
          descriptions: [
            'Garlam was behind the marketing of some of the most successful projects including Harmony, Sandbox, MANTRADAO, APY.Finance and others.',
            'As an ex-investment banker at JP Morgan & ex-Management consultant at Deloitte, Garlam exerts influence in various parts of the blockchain ecosystem through his in-depth connections with the communities in China, Korea, Canada and the US.'
          ],
          shortcut: 'Behind the marketing of many successful projects including Harmony, Sandbox, MANTRADAO...'
        },
        {
          name: 'Tung Ta',
          title: 'Business Advisor',
          image: 'tung.png',
          links: [{href: 'https://www.linkedin.com/in/ta-son-tung-062454a9/', img: 'linkedin.svg'}],
          descriptions: [
            'Tung Ta, a Forbes 30  Under 30 in 2015, is the co-founder and executive chairman of RikkeiSoft, one of the largest software companies in Vietnam with a strong salesforce in Japan.',
            'Tung is helping PolkaFoundry to expand its ecosystem and form partnerships with key players in the Japanese market. Rikkeisoft also provides PolkaFoundry with talented developers whenever needed.'
          ],
          shortcut: 'Co-founder and executive chairman of RikkeiSoft, one of the largest software companies in Vietnam...'
        },
        {
          name: 'Eric Su',
          title: 'CEO of Exnetwork',
          image: 'eric.png',
          links: [{href: 'https://www.linkedin.com/in/ericsu', img: 'linkedin.svg'}],
          descriptions: [
            'Eric is one of PolkaFoundry’s highly value advisors, bringing immense expertise as an accomplished serial entrepreneur in markets of key strategic importance.',
            'Exnetwork also has direct investment ties with the Polkadot multi-chain. The company’s portfolio includes cross-chain token launchpad Polkastarter and liquidity aggregator Reef Finance — a Polkadot pioneer as the first parachain on Binance. Hence, we relished the opportunity to take into account Eric’s views on the role of PolkaFoundry in the development of DeFi dApps for an interoperable future.'
          ],
          shortcut: 'For our latest Advisor Spotlight, we are delighted to highlight Eric Su, CEO of Exnetwork...'
        },
        {
          name: 'Joe Wong',
          title: 'Advisor',
          image: 'joe.png',
          links: [{href: 'https://twitter.com/khunjoe5', img: 'twitter.svg'}],
          descriptions: [
            'Principal of Fomocraft Ventures & seasoned market of 23 years. CMO and Advisor for MANTRA DAO, Launchpool, FinNexus, Polkastarter and Royale.finance.',
            'Joe is a master of ensuring that a project\'s vision is faithfully executed & communicated to the community.'
          ],
          shortcut: 'Principal of Fomocraft Ventures & seasoned marketer of 23 years...'
        },
      ]
    }
  },
  methods: {
    openDialog(data) {
      this.person = data
      this.dialog = true
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 0 var(--padding-section) var(--padding-section);
  position: relative;
}

h3.title {
  margin-top: var(--margin-section);
  margin-bottom: 32px;
}

.partner {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 20px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 240px));
  grid-gap: 20px;
}

.member {
  position: relative;
}

.member:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 100%;
  background: linear-gradient(180deg, rgba(15, 12, 62, 0.6) 0%, #0F0C3E 99.88%);
  transition: bottom 0.5s;
  border-radius: 10px;
}

.member:hover:after {
  bottom: 4px;
}

.member:hover .info {
  opacity: 1;
}

.info {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  padding: 7%;
  opacity: 0;
  transition: opacity 0.5s;
}

.info-name {
  font-family: Konnect;
  font-weight: 500;
  font-size: 20px;
  line-height: 26px;
  margin-bottom: 4px;
}

.info-title {
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 8px;
}

.info-shortcut {
  font-size: 14px;
  line-height: 22px;
  font-weight: 300;
}

.info-shortcut span {
  margin-left: 4px;
  color: #0DDDFB;
  cursor: pointer;
}

.info-link {
  display: flex;
  align-items: center;
  margin-top: 4px;
}

.member-info {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 4%;
  background: linear-gradient(180deg, rgba(15, 12, 62, 0) 0%, rgba(15, 12, 62, 0.57) 40.3%, #0F0C3E 99.88%);
  border-radius: 0px 0px 12px 12px;
}

.member:hover .member-info {
  display: none;
}

.partner-item {
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  filter: grayscale(100%) invert(0.4);
}

.partner-item:hover {
  filter: none;
  background: rgba(255, 255, 255, 0.048);
  box-shadow: 0px 8px 16px rgba(27, 27, 27, 0.16), -2px -2px 0 rgba(255, 255, 255, 0.24);
  border-radius: 16px;
}

@media screen and (max-width: 600px) {
  .grid,
  .partner {
    grid-template-columns: 1fr 1fr;
    grid-gap: 12px;
  }

  .partner-item {
    filter: none;
    background: rgba(255, 255, 255, 0.048);
    box-shadow: 0px 8px 16px rgba(27, 27, 27, 0.16), -1px -1px 0 rgba(255, 255, 255, 0.16);
    border-radius: 16px;
  }

  .partner-item a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .partner-item img {
    max-width: 80%;
  }
}
</style>