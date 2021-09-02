<template>
  <div class="wrapper col-flex event-detail-main">
    <div class="event-container">
      <div class="banner-container">
          <div class="banner-title">{{ event.title }}</div>
      </div>
      <div class="countdown-main">
          <Countdown v-if="event && event.end_time && event.end_time > 0" :end-date="event.end_time"></Countdown>
      </div>
    </div>
    <contribute :event="event"/>
    <subscribe/>
  </div>
</template>

<script>
import Subscribe from "@/section/Subscribe";
import Countdown from "@/components/Countdown";
import Contribute from "@/section/Contribute";
export default {
name: "EventDetail",
  components: { Contribute, Countdown, Subscribe},
  data() {
    return {
      event: {},
      event_mock: {
        id: 1,
        title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
        end_time: new Date(1630577690424),
        start_time: new Date(),
        detail: 'We are also running a referral program that lets you earn bonuses on any contributions made to our crowdloan via your personalized referral link.',
        raised: 30000,
        notes: [
            "After PolkaSmith wins, 35% of PKS delivered immediately and 65% PKS vested over 10 months",
            "Top 100 contributors joining the crowdloan via Polkasmith will receive a ticket to buy KABY tokens on the GameFI platform",
        ],
        snapshot_time: 1630256408000
      },
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.getEvent(this.$route.params.id)
    }
  },
  methods: {
    getEvent(id) {
      fetch(`https://polkasmith.polkafoundry.com/api/v1/event/${id}`)
          .then(response => response.json())
          .then(data => {
            if (!data || !data.data) {
              return
            }
            console.log(data)
            if (data.code === 200) {
              this.event = data.data
            } else {
              this.$notify({
                type: 'error',
                title: data.message
              });
            }
          })
    }
  }
}
</script>

<style scoped>
.event-detail-main {
  position: relative;
  width: 100%;
}
.event-container {
  display: block;
  width: 100%;
  padding: 30px;
  z-index: 2;
}

.banner-title {
  height: fit-content;
  margin: auto;
  font-size: 48px;
  font-weight: bold;
}

.countdown-main {
  margin-top: -30px;
}

.btn-join {
  float: right;
  cursor: pointer;
  background: #D01F36;
  font-size: 16px;
  box-shadow: inset 0px 4px 4px #D01F36;
  border-radius: 60px;
  color: white;
  padding: 15px 36px;
  font-weight: 600;
  border-width: 0px;
}

.btn-join:hover {
  color: white;
  font-weight: 700;
  box-shadow: -5px 5px 10px #ffffff40, 5px -5px 10px #ffffff;
}
.btn-join svg {
  margin-bottom: -5px;
}
</style>
