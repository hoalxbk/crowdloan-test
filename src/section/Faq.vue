<template>
  <div class="wrapper col-flex">
    <h2 class="title">Frequently Asked Questions</h2>
    <div class="content">
      <qa-item v-for="(item, i) in faqs" :key="i" :a="item.a" :q="item.q"/>
    </div>
    <dot column="7" row="5" color="rgba(255,255,255,0.2)" :position="{bottom: 0, left: '16px'}" gap="24"/>
  </div>
</template>

<script>
import QaItem from "@/components/QaItem";
import Dot from "@/components/Dot";

export default {
  name: "Faq",
  components: {Dot, QaItem},
  data() {
    return {
      faqs: [
        {
          q: 'What are the similarities and differences between PolkaSmith and PolkaFoundry?',
          a: '<div>Similarities:' +
              '<ul>' +
              '<li>- PolkaFoundry and PolkaSmith are both one-stop production hubs for creating borderless and frictionless Defi & NFT applications. So they share similar features.</li>' +
              '<li>- PolkaFoundry and PolkaSmith are sister chains since they share the same project team.</li>' +
              '</ul>' +
              '</div>' +
              '<div style="margin-top: 8px">Differences:' +
              '<ul>' +
              '<li>- PolkaFoundry is implemented on the Polkadot Network to serve enterprises and B2B applications that require high stability and dependability. Meanwhile, PolkaSmith, which is implemented on Kusama Network, is more suitable for early-stage startups that need to grow quickly and easily experiment with bold new ideas.</li>' +
              '<li>- PolkaFoundry will bid for the Polkadot parachain auction while PolkaSmith will bid for the Kusama parachain auction.</li>' +
              '</ul>' +
              '</div>'
        },
        {
          q: 'Has PolkaSmith launched?',
          a: '<li>Not yet. Even though we have our testnet and all the technical aspects ready, we will have to wait for a parachain slot to bring into practice. We will launch PolkaSmith once we win a parachain on Kusama Network.</li>'
        },
        {
          q: 'Are PKS and PKF different?',
          a: '<li>Yes, PKS and PKF are two separate tokens.PKF is the native token of PolkaFoundry, while PKS is the native token of PolkaSmith. But please note that PolkaSmith is PolkaFoundry sister/ canary chain on Kusama.</li>'
        },
        {
          q: 'Is PKS listed yet?',
          a: '<li>PKS isn\'t listed yet. But we will list PKS as soon as we win the parachain slot on Kusama.</li>'
        }
      ]
    }
  }
}
</script>

<style scoped>
.wrapper {
  position: relative;
  padding: var(--padding-section);
  margin-top: 20px;
}

.content {
  background: #0D1143;
  margin-top: 40px;
  position: relative;
  z-index: 2;
}

@media screen and (max-width: 600px) {
  .content {
    margin-top: 20px;
  }
}
</style>
