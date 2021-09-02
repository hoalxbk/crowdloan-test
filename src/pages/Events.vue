<template>
  <div class="wrapper col-flex events-container">
      <div class="hero">
      <h1 class="title">
        <img alt src="../assets/logo.png"/>
        <span>Crowdloan Events</span>
      </h1>
    </div>
    <div class="upcoming-events">
      <OngoingEvents :hiddenTitle="true" />
    </div>
    <div class="explore-events">
      <div class="events-header">
        <div class="events-title">
          <h2>Explore Events</h2>
        </div>
        <div class="events-filter">
          <div class="select-events-group">
          <select class="select-event" id="event-type" name="event-type">
            <option value="all" selected>All Event</option>
            <option value="upcoming">UpComing</option>
            <option value="tba">TBA</option>
            <option value="ended">Ended</option>
          </select>
            <svg class="down" width="16" height="11" viewBox="0 0 16 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.98486 9.74365L0.344238 3.10303C-0.114746 2.64404 -0.114746 1.90186 0.344238 1.44775L1.44775 0.344238C1.90674 -0.114746 2.64893 -0.114746 3.10303 0.344238L7.81006 5.05127L12.5171 0.344238C12.9761 -0.114746 13.7183 -0.114746 14.1724 0.344238L15.2759 1.44775C15.7349 1.90674 15.7349 2.64893 15.2759 3.10303L8.63525 9.74365C8.18604 10.2026 7.44385 10.2026 6.98486 9.74365Z" fill="white"/>
            </svg>
          </div>
          <div class="input-events-group">
            <input class="input-event" name="search-event" placeholder="Search event..."/>
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M24.2013 22.771L18.2513 16.5827C19.7811 14.7641 20.6194 12.4759 20.6194 10.0937C20.6194 4.52814 16.0912 0 10.5256 0C4.96002 0 0.431885 4.52814 0.431885 10.0937C0.431885 15.6593 4.96002 20.1875 10.5256 20.1875C12.615 20.1875 14.6061 19.5573 16.3085 18.361L22.3037 24.5963C22.5543 24.8565 22.8913 25 23.2525 25C23.5944 25 23.9187 24.8697 24.1649 24.6327C24.688 24.1293 24.7047 23.2946 24.2013 22.771ZM10.5256 2.63315C14.6395 2.63315 17.9862 5.97988 17.9862 10.0937C17.9862 14.2076 14.6395 17.5543 10.5256 17.5543C6.41177 17.5543 3.06503 14.2076 3.06503 10.0937C3.06503 5.97988 6.41177 2.63315 10.5256 2.63315Z" fill="#6398FF"/>
            </svg>
          </div>
        </div>
      </div>
      <div class="events-list">
        <div v-for="(event, i) in events" :key="i" class="events-item">
          <div class="ev-time">
            <div class="ev-time-month">
              <div style="width: 47%">{{ event.start_time.toLocaleString('default', { month: 'short' }) }}</div>
              <div v-if="event.end_time.getTime() < new Date().getTime()" style="width: 6%">-</div>
              <div v-if="event.end_time.getTime() < new Date().getTime()" style="width: 47%; text-align: right"> {{ event.end_time.toLocaleString('default', { month: 'short' }) }}</div>
            </div>
            <div class="ev-time-date">
              <div style="width: 50%">{{ event.start_time.getDate() }}</div>
              <div v-if="event.end_time.getTime() < new Date().getTime()" style="width: 50%; text-align: right"> {{ event.end_time.getDate() }}</div>
            </div>
            <div class="ev-ended" v-if="event.end_time.getTime() < new Date().getTime()">Ended</div>
            <div class="ev-time-time" v-else><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9892 0.166748C5.00925 0.166748 0.166748 5.02008 0.166748 11.0001C0.166748 16.9801 5.00925 21.8334 10.9892 21.8334C16.9801 21.8334 21.8334 16.9801 21.8334 11.0001C21.8334 5.02008 16.9801 0.166748 10.9892 0.166748ZM11.0001 19.6667C6.21175 19.6667 2.33341 15.7884 2.33341 11.0001C2.33341 6.21175 6.21175 2.33341 11.0001 2.33341C15.7884 2.33341 19.6667 6.21175 19.6667 11.0001C19.6667 15.7884 15.7884 19.6667 11.0001 19.6667ZM11.5417 5.58342H9.91675V12.0834L15.6042 15.4959L16.4167 14.1634L11.5417 11.2709V5.58342Z" fill="#696786"/>
            </svg>
              {{ event.start_time.toLocaleTimeString() }} ({{ new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1] }})</div>
          </div>
          <div class="ev-detail">
            <h2>{{ event.title }}</h2>
            <span>{{ event.detail }}</span>
            <div class="ev-raised">
              <svg width="44" height="42" viewBox="0 0 44 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C17.5228 12 22 9.76142 22 7C22 4.23858 17.5228 2 12 2C6.47715 2 2 4.23858 2 7C2 9.76142 6.47715 12 12 12Z" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 7V14C2 16.761 6.477 19 12 19C17.523 19 22 16.761 22 14V7" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 14V21C2 23.761 6.477 26 12 26C17.523 26 22 23.761 22 21V14" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 21V28C2 30.761 6.477 33 12 33C17.523 33 22 30.761 22 28V21" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M2 28V35C2 37.761 6.477 40 12 40C17.523 40 22 37.761 22 35V28" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M32 26C37.5228 26 42 23.7614 42 21C42 18.2386 37.5228 16 32 16C26.4772 16 22 18.2386 22 21C22 23.7614 26.4772 26 32 26Z" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 21V28C22 30.761 26.477 33 32 33C37.523 33 42 30.761 42 28V21" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M22 28V35C22 37.761 26.477 40 32 40C37.523 40 42 37.761 42 35V28" stroke="#7B7A95" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <span>Up to {{ event.raised.toLocaleString() }} PKS Bonus</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <subscribe />
  </div>
</template>

<script>
import OngoingEvents from "@/components/OngoingEvent";
import Subscribe from "@/section/Subscribe";
export default {
name: "Events",
  components: {Subscribe, OngoingEvents},
  data() {
  return {
    events: [{
      id: 1,
      title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
      start_time: new Date(),
      end_time: new Date(1630587690424),
      detail: 'We are also running a referral program that lets you earn bonuses on any contributions made to our crowdloan via your personalized referral link.',
      raised: 30000
    },{
      id: 1,
      title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
      start_time: new Date(),
      end_time: new Date(1630597690424),
      detail: 'We are also running a referral program that lets you earn bonuses on any contributions made to our crowdloan via your personalized referral link.',
      raised: 30000
    },{
      id: 1,
      title: 'EXCLUSIVE 10% PKS FOR EARLY BIRD',
      end_time: new Date(1630577690424),
      start_time: new Date(),
      detail: 'We are also running a referral program that lets you earn bonuses on any contributions made to our crowdloan via your personalized referral link.',
      raised: 30000
    }]
  }
  }

}
</script>

<style>
.wrapper {
  position: relative;
  padding: 160px var(--padding-section) 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.hero {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: var(--padding-section);
}

.title {
  display: flex;
  align-items: center;
}

.title img {
  width: 360px;
  margin-bottom: 10px;
  margin-right: 16px;
}

.title span {
  font-weight: 400;
  font-size: 54px;
  line-height: 60px;
}
.upcoming-events {
  width: 100%;
}
.upcoming-events .event {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.upcoming-events .event .event-main {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.explore-events {
  width: 100%;
  max-width: 1280px;
  margin-bottom: 100px;
}

.events-header {
  display: flex;
  width: 100%;
  max-height: 50px;
}
.events-title {
  text-align: left;
  display: inline;
  width: 50%;
}
.events-filter {
  display: inline-flex;
  width: 50%;
  justify-content: flex-end;
}
.select-events-group {
  display: inline-flex;
  position: relative;;
}
.select-events-group select {
  background-color: #FFFFFF16;
  color: white;
  font-size: 15px;
  border-width: 0px;
  border-radius: 10px;
  padding: 5px 40px;
  margin-right: 20px;
  appearance: none;
}
.input-events-group {
  display: inline-flex;
  position: relative;;
}
.input-events-group input {
  background-color: #FFFFFF16;
  padding: 5px 50px 5px 20px;
  border-width: 0px;
  border-radius: 30px;
  color: white;
  font-size: 15px;
}

.input-events-group svg {
  position: absolute;
  right: 15px;
  top: 13px;
}

.select-events-group svg {
  position: absolute;
  right: 40px;
  top: 20px;
}

.events-list {
  margin-top: 30px;
  border-top: 1px solid #FFFFFF32;
}
.events-item {
  padding: 20px 0;
  border-bottom: 1px solid #FFFFFF32;
  display: flex;
  text-align: left;
}
.ev-time {
  width: 25%;
  display: inline-block;
  padding: 0 30px;
  border-right: 1px solid #FFFFFF32;
}
.ev-detail {
  width: 75%;
  display: inline-block;
  padding: 0 30px;
}
.ev-time-month {
  font-size: 36px;
  display: flex;
  font-weight: lighter;
}

.ev-time-date {
  font-size: 48px;
  display: flex;
  font-weight: bold;
  padding-top: 10px;
}
.ev-time-time {
  font-size: 16px;
  padding-top: 15px;
  color: #FFFFFF90;
}

.ev-time-time svg{
  margin-bottom: -3px;
}

.ev-detail h2 {
  size: 36px;
  font-weight: 600;
  margin-top: 5px;
  padding-bottom: 10px;
}

.ev-detail .ev-raised {
  margin-top: 20px;
}
.ev-detail .ev-raised svg{
  margin-bottom: -3px;
  margin-right: 15px;
}
.ev-ended {
  width: 100%;
  text-align: center;
  padding: 5px;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #636363;
}
</style>
