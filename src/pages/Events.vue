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
              <div style="width: 47%">{{ new Date(event.start_time).toLocaleString('default', { month: 'short' }) }}</div>
              <div v-if="event.end_time < new Date().getTime()" style="width: 6%">-</div>
              <div v-if="event.end_time < new Date().getTime()" style="width: 47%; text-align: right"> {{ new Date(event.end_time).toLocaleString('default', { month: 'short' }) }}</div>
            </div>
            <div class="ev-time-date">
              <div style="width: 50%">{{ new Date(event.start_time).getDate() }}</div>
              <div v-if="event.end_time < new Date().getTime()" style="width: 50%; text-align: right"> {{ new Date(event.end_time).getDate() }}</div>
            </div>
            <div class="ev-ended" v-if="event.end_time < new Date().getTime()">Ended</div>
            <div class="ev-time-time" v-else><svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.9892 0.166748C5.00925 0.166748 0.166748 5.02008 0.166748 11.0001C0.166748 16.9801 5.00925 21.8334 10.9892 21.8334C16.9801 21.8334 21.8334 16.9801 21.8334 11.0001C21.8334 5.02008 16.9801 0.166748 10.9892 0.166748ZM11.0001 19.6667C6.21175 19.6667 2.33341 15.7884 2.33341 11.0001C2.33341 6.21175 6.21175 2.33341 11.0001 2.33341C15.7884 2.33341 19.6667 6.21175 19.6667 11.0001C19.6667 15.7884 15.7884 19.6667 11.0001 19.6667ZM11.5417 5.58342H9.91675V12.0834L15.6042 15.4959L16.4167 14.1634L11.5417 11.2709V5.58342Z" fill="#696786"/>
            </svg>
              {{ new Date(event.start_time).toLocaleTimeString() }} ({{ new Date().toString().match(/([A-Z]+[\+-][0-9]+)/)[1] }})</div>
          </div>
          <div class="ev-detail">
            <a :href="`/#/event/${event.id}`"><h2>{{ event.title }}</h2></a>
            <span>{{ event.detail }}</span>
            <div class="ev-raised">
              <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5.81079 10.3062C6.37284 10.3062 6.91612 10.2699 7.43021 10.2024V4.56746C6.91617 4.49993 6.37284 4.46362 5.81079 4.46362C2.60159 4.46362 0 5.64355 0 7.09912V7.67069C0 9.12621 2.60159 10.3062 5.81079 10.3062Z" fill="#2CC5F4"/>
                <path d="M5.81079 13.2486C6.37284 13.2486 6.91612 13.2123 7.43021 13.1448V11.4931C6.91602 11.5606 6.37299 11.5974 5.81079 11.5974C3.0095 11.5974 0.671413 10.6983 0.122211 9.50171C0.042231 9.67601 0 9.85649 0 10.0415V10.6131C0 12.0686 2.60159 13.2486 5.81079 13.2486Z" fill="#2CC5F4"/>
                <path d="M7.43021 14.5639V14.4355C6.91602 14.503 6.37299 14.5398 5.81079 14.5398C3.0095 14.5398 0.671413 13.6407 0.122211 12.4441C0.042231 12.6183 0 12.7988 0 12.9838V13.5554C0 15.011 2.60159 16.1909 5.81079 16.1909C6.45257 16.1909 7.06985 16.1436 7.64709 16.0565C7.50401 15.7638 7.43021 15.4551 7.43021 15.1354V14.5639Z" fill="#2CC5F4"/>
                <path d="M14.1897 0C10.9805 0 8.37891 1.17993 8.37891 2.6355V3.20706C8.37891 4.66264 10.9805 5.84257 14.1897 5.84257C17.3989 5.84257 20.0005 4.66264 20.0005 3.20706V2.6355C20.0005 1.17993 17.3989 0 14.1897 0Z" fill="#2CC5F4"/>
                <path d="M14.1897 7.1338C11.3884 7.1338 9.05032 6.23475 8.50112 5.03809C8.42114 5.21234 8.37891 5.39282 8.37891 5.57788V6.14944C8.37891 7.60501 10.9805 8.78494 14.1897 8.78494C17.3989 8.78494 20.0005 7.60501 20.0005 6.14944V5.57788C20.0005 5.39282 19.9583 5.21234 19.8783 5.03809C19.3291 6.23475 16.991 7.1338 14.1897 7.1338Z" fill="#2CC5F4"/>
                <path d="M14.1897 10.0762C11.3884 10.0762 9.05032 9.17708 8.50112 7.98047C8.42114 8.15472 8.37891 8.3352 8.37891 8.52026V9.09182C8.37891 10.5474 10.9805 11.7274 14.1897 11.7274C17.3989 11.7274 20.0005 10.5474 20.0005 9.09182V8.52026C20.0005 8.3352 19.9583 8.15472 19.8783 7.98047C19.3291 9.17713 16.991 10.0762 14.1897 10.0762Z" fill="#2CC5F4"/>
                <path d="M14.1897 13.1775C11.3884 13.1775 9.05032 12.2784 8.50112 11.0818C8.42114 11.2561 8.37891 11.4365 8.37891 11.6215V12.1931C8.37891 13.6487 10.9805 14.8286 14.1897 14.8286C17.3989 14.8286 20.0005 13.6487 20.0005 12.1931V11.6215C20.0005 11.4365 19.9583 11.256 19.8783 11.0818C19.3291 12.2783 16.991 13.1775 14.1897 13.1775Z" fill="#2CC5F4"/>
                <path d="M14.1897 16.1199C11.3884 16.1199 9.05032 15.2208 8.50112 14.0242C8.42114 14.1985 8.37891 14.379 8.37891 14.564V15.1355C8.37891 16.5911 10.9805 17.771 14.1897 17.771C17.3989 17.771 20.0005 16.5911 20.0005 15.1355V14.5639C20.0005 14.3789 19.9583 14.1984 19.8783 14.0242C19.3291 15.2208 16.991 16.1199 14.1897 16.1199Z" fill="#2CC5F4"/>
              </svg>
              <span>Total Raise {{ event.raised.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0}) }}</span>
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
    events: [],
    events_mock: [{
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
  font-weight: normal;
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
  size: 32px;
  font-weight: 600;
  margin-top: 5px;
  padding-bottom: 10px;
}

.ev-detail .ev-raised {
  margin-top: 20px;
}
.ev-raised span {
  color: #2CC5F4;
  font-weight: 600;
}
.ev-detail .ev-raised svg{
  margin-bottom: -3px;
  margin-right: 10px;
}
.ev-ended {
  width: 100%;
  max-width: 100px;
  text-align: center;
  padding: 5px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 10px;
  background-color: #D52D6F;
}
@media screen and (max-width: 680px) {
  .events-container {
    padding: 0;
  }
  .hero {
    margin-top: 100px;
    text-align: center;
  }
  .hero .title {
    flex-wrap: wrap;
  }
  .hero .title img {
    margin: 0 auto;
  }
  .events-header {
    flex-wrap: wrap;
    max-height: unset;
  }
  .events-title {
    text-align: center;
    width: 100%;
  }
  .events-filter {
    width: 100%;
    height: 50px;
  }
  .events-item {
    flex-wrap: wrap;
    border-bottom: 1px solid #FFFFFF90;
  }
  .ev-time {
    width: 100%;
    margin-bottom: 20px;
    border-right: unset;
    padding-bottom: 20px;
    border-bottom: 1px solid #FFFFFF10;
  }
  .ev-detail {
    width: 100%;
  }

  .events-list {
    margin: 20px;
  }

}
</style>
