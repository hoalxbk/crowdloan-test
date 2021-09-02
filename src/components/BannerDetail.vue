<template>
  <div style="padding-top: 50px">
    <img src="../assets/polkasmith/banner.png" width="100%"/>
    <Countdown :end-date="endDate"></Countdown>
  </div>
</template>

<script>

import Countdown from "@/components/Countdown";
export default {
  name: 'BannerDetail',
  components: {Countdown},
  props: ['endDate'],
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>

