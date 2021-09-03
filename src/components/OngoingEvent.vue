<template>
  <div class="col-flex event">
  <div class="event-main">
    <div class="event-title" v-if="!hiddenTitle">Ongoing Events</div>
    <div v-for="(event, i) in events" :key="i" class="event-container">
      <div class="dot" style="top: -12px;"></div>
      <div class="dot" style="bottom: -12px;"></div>
      <div class="banner-container">
        <img class="banner-img" :src="`${!event || !event.banner_url ? 'template-banner.png' : event.banner_url}`"/>
      </div>
      <div class="countdown-main">
        <div class="details-container">
          <div class="banner-title-container">
            <div class="banner-title">{{ event.title }}</div>
            <div class="event-details">
              <div class="event-details-label">TOTAL</div>
              <div class="event-details-value">${{ !event || !event.raised ? 0 : event.raised }}</div>
            </div>
            <div class="event-details">
              <div class="event-details-label">DUE IN</div>
              <div class="event-details-value">{{ new Date(event.end_time).getDate() }} {{ new Date(event.end_time).toLocaleString('default', { month: 'short' }) }}</div>
            </div>
          </div>
          <Countdown :endDate="event.end_time"></Countdown>
          <a class="btn-join" :href="`/#/event/${event.id}`" >Join Now</a>
        </div>
      </div>
    </div>
    <div class="explore-events" v-if="!hiddenTitle"><a class="btn" href="/#/events">View all events</a></div>
  </div>
  </div>
</template>
<script>
import Countdown from "@/components/Countdown";
export default {
  name: 'OngoingEvents',
  props: [ 'hiddenTitle' ],
  components: {Countdown},
  data() {
    return {
      events: [],
      events_mock: [{
        title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
        id: 1,
        end_time: new Date(1630593203511),
      },{
        title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
        id: 1,
        end_time: new Date(1630593203511),
      }]
    }
  },
  mounted() {
    this.getEvents()
  },
  methods: {
    getEvents() {
      fetch(`https://polkasmith.polkafoundry.com/api/v1/events`)
          .then(response => response.json())
          .then(data => {
            if (!data || !data.data) {
              return
            }
            console.log(data)
            if (data.code === 200) {
              this.events = data.data
              if (data.data.length > 3) {
                this.events = data.data.slice(0, 3)
              }
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
.dot {
  position: absolute;
  width: 24px;
  height: 24px;
  right: 22.5%;
  border-radius: 24px;
  background-color: #0d1143;
}
  .event {
    position: relative;
    width: 100%;
  }
  .event-main {
    display: block;
    max-width: 1280px;
    margin: 0 auto;
    margin-bottom: 0;
    padding: 60px;
    width: 100%;
    z-index: 2;
  }
  .event-title {
    width: 100%;
    text-align: center;
    font-size: 36px;
    font-weight: bold;
  }
  .event-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: 50px;
    width: 100%;
    background-color: #FFFFFF16;
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
    margin-top: 10px;
    float: right;
    cursor: pointer;
    width: 100%;
    background: transparent;
    font-size: 16px;
    border-radius: 60px;
    border: 2px solid #2CC5F4;
    color: #2CC5F4;
    padding: 15px 36px;
    font-weight: 600;
  }

  .btn-join:hover {
    color: white;
    background: #2CC5F4;
  }
  .btn-join svg {
    margin-bottom: -5px;
  }

  .background-1 {
    position: absolute;
    width: 45%;
    height: 100%;
    background-image: url("../assets/vector_2.png");
    background-size: 100%;
    background-repeat: no-repeat;
    right: 0;
    top: 0;
    z-index: 1;
  }
  .background-2 {
    position: absolute;
    left: 0;
    transform: translateY(50%);
    width: 45%;
    height: 100%;
    background-image: url("../assets/vector_1.png");
    background-size: 100%;
    background-repeat: no-repeat;
    z-index: 3;
  }
  .explore-events {
    text-align: center;
    margin-top: 30px;
  }
  .btn {
    background: #2CC5F4;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 60px;
    color: #050940;
    padding: 16px 36px;
    font-weight: 600;
    cursor: pointer;
    border-width: 0px;
  }

  .btn:hover {
    color: white;
    font-weight: 700;
    box-shadow: -5px 5px 10px #ffffff40, 5px -5px 10px #ffffff;
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
