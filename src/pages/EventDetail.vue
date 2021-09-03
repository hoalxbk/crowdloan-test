<template>
  <div class="wrapper col-flex event-detail-main">
    <div class="event-container">
        <div class="banner-container">
          <img class="banner-img" :src="`${!event || !event.banner_url ? 'template-banner.png' : event.banner_url}`"/>
        </div>
        <div class="countdown-main">
          <div class="details-container">
            <div class="banner-title-container">
              <div class="banner-title">{{ event.title }}</div>
              <div class="event-details">
                <div class="event-details-label">TOTAL</div>
                <div class="event-details-value">{{ event.raised.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0}) }}</div>
              </div>
              <div class="event-details">
                <div class="event-details-label">DUE IN</div>
                <div class="event-details-value">{{ new Date(event.end_time).getDate() }} {{ new Date(event.end_time).toLocaleString('default', { month: 'short' }) }}</div>
              </div>
            </div>
            <Countdown :endDate="event.end_time"></Countdown>
          </div>
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
  max-width: 1000px;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-bottom: 50px;
  border-radius: 40px;
  padding: 20px;
  z-index: 2;
  border: 1px solid;
  border-image-source: linear-gradient(96.86deg, rgba(255, 255, 255, 0.17) 1.18%, rgba(255, 255, 255, 0.08) 103.85%);
  position: relative;
}
.banner-img {
  width: 100%;
  height: auto;
  border-radius: 40px;
}
.banner-container {
  display: inline;
  width: 55%;
  position: relative;
}
.banner-title-container {
  padding: 10px 0;
}
.banner-title {
  margin: auto;
  font-size: 24px;
  padding-bottom: 10px;
  text-align: center;
  font-weight: 500;
}
.event-details {
  display: flex;
  width: 100%;
  padding: 10px 0;
}
.event-details-label {
  font-size: 14px;
  display: inline;
  text-align: left;
  width: 50%;
}
.event-details-value {
  font-size: 16px;
  display: inline;
  font-weight: bold;
  width: 50%;
  text-align: right;
}
.countdown-main {
  display: inline;
  margin: auto;
  width: 45%;
}
.details-container {
  width: fit-content;
  margin: 0 auto;
  padding: 0 20px;
  text-align: center;
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
@media screen and (max-width: 680px) {
  .dot {
    display: none;
  }
  .event-main {
    padding: 20px;
  }
  .banner-container {
    min-height: 180px;
    width: 100%;
  }
  .banner-title {
    font-size: 20px;
  }
  .banner-time {
    font-size: 14px;
  }
  .btn-join {
    width: 100%;
  }
  .countdown-main {
    width: 100%;
  }
  .details-container {
    margin-top: 10px;
    padding: 10px 0 ;
  }
  .introCounting {
    margin-bottom: 10px;
  }
}
</style>
