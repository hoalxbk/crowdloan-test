<template>
  <div class="col-flex event">
  <div class="event-main">
    <div class="event-title" v-if="!hiddenTitle">Ongoing Events</div>
    <div v-for="(event, i) in events" :key="i" class="event-container">
      <div class="banner-container">
        <div class="banner-title-container">
          <div class="banner-title">{{ event.title }}</div>
          <div class="banner-time">Due in {{ event.end_time.toLocaleDateString() }}</div>
        </div>
      </div>
      <div class="countdown-main">
        <div class="countdown-container">
          <Countdown :end-date="event.end_time"></Countdown>
          <a class="btn-join" :href="`/#/event/${event.id}`" >Join Now <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.33396 1.40657L9.26675 0.33902C9.66171 -0.113007 10.3004 -0.113007 10.6911 0.33902L18.8593 9.68251C19.2543 10.1345 19.2543 10.8655 18.8593 11.3127L10.6911 20.661C10.2962 21.113 9.65751 21.113 9.26675 20.661L8.33396 19.5934C7.9348 19.1366 7.9432 18.3912 8.35077 17.944L13.4139 12.4235H1.33805C0.779223 12.4235 0.329636 11.909 0.329636 11.2694V9.73059C0.329636 9.09102 0.779223 8.57648 1.33805 8.57648H13.4139L8.35077 3.05599C7.939 2.60877 7.9306 1.86341 8.33396 1.40657Z" fill="white"/>
          </svg>
          </a>
        </div>
      </div>
    </div>
    <div class="explore-events" v-if="!hiddenTitle"><a class="btn" href="/#/events">Explore Events</a></div>
  </div>
    <div v-if="!hiddenTitle" class="background-1"></div>
    <div v-if="!hiddenTitle" class="background-2"></div>
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
      events: [{
        title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
        id: 1,
        end_time: new Date(1630593203511),
      },{
        title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
        id: 1,
        end_time: new Date(1630593203511),
      }]
    }
  }
}
</script>
<style scoped>
  .event {
    position: relative;
    width: 100%;
  }
  .event-main {
    display: block;
    max-width: 1280px;
    margin: 50px auto;
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
    margin-top: 50px;
    width: 100%;
    background-color: #FFFFFF32;
    border-radius: 40px;
    padding: 30px;
    z-index: 2;
  }
  .banner-container {
    display: inline;
    width: 50%;
    background-image:  url("../assets/polkasmith/banner-bg.png");
    background-size: 100% 100%;
    position: relative;
  }
  .banner-title-container {
    font-size: 34px;
    font-weight: bold;
    position: absolute;
    width: 95%;
    height: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-53%, -60%);
    background-image: url("../assets/polkasmith/banner-title-bg.png");
    background-size: 100% 100%;
    padding: 0 15%;
    display: flex;
    justify-content: center;
  }
  .banner-title {
    height: fit-content;
    margin: auto;
  }
  .banner-time {
    position: absolute;
    bottom: -15%;
    right: 4%;
    background-image: url("../assets/polkasmith/banner-time-bg.png");
    background-size: 100% 100%;
    padding: 5px 20px;
    font-weight: 600;
    font-size: 20px;
    color: #00051E;
  }
  .countdown-main {
    display: inline;
    width: 50%;
  }
  .countdown-container {
    width: fit-content;
    margin: 0 auto;
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

</style>
