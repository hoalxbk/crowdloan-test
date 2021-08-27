<template>
  <div style="padding-top: 50px">
    <img src="../assets/polkasmith/banner.png" width="100%"/>
    <div class="introCounting">
      <div class="time-main" >
        <div class="timeContainer">
          <h1>{{ countDays }}</h1>
        </div>
        <span style="color: #aeaeae; font-size: 16px}">Days</span>
      </div>
      <h1 style="margin-right: 10px; margin-left: 10px">:</h1>
      <div class="time-main" >
        <div class="timeContainer">
          <h1>{{ countHours }}</h1>
        </div>
        <span style="color: #aeaeae; font-size: 16px">Hours</span>
      </div>
      <h1 style="margin-right: 10px; margin-left: 10px">:</h1>
      <div class="time-main" >
        <div class="timeContainer">
          <h1 >{{ countMinutes }}</h1>
        </div>
        <span style="color: #aeaeae; font-size: 16px">Minutes</span>
      </div>
      <h1 style="margin-right: 10px; margin-left: 10px">:</h1>
      <div class="time-main" >
        <div class="timeContainer">
          <h1>{{ countSeconds }}</h1>
        </div>
        <span style="color: #aeaeae; font-size: 16px">Seconds</span>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Countdown',
  props: ['endDate'],
  data() {
    return {
      countDays: '00',
      countHours: '00',
      countMinutes: '00',
      countSeconds: '00',
    }
  },
  mounted() {
    this.countDown(this.endDate)
  },
  methods: {
    countDown(time) {
      const countDownInterval = setInterval(() => {
        let now = new Date()
        let offset = Math.floor((time.getTime() - now.getTime()) / 1000)
        if (offset <= 0) {
          clearInterval(countDownInterval)
          return
        }
        let minutesCal = Math.floor(offset / 60) % 60
        let hoursCal = Math.floor(offset / (60 * 60)) % 24
        let daysCal = Math.floor(offset / (60 * 60 * 24))
        this.countDays = daysCal >= 10 ? String(daysCal) : "0" + daysCal
        this.countHours = hoursCal >= 10 ? String(hoursCal) : "0" + hoursCal
        this.countMinutes = minutesCal >= 10 ? String(minutesCal) : "0" + minutesCal
        this.countSeconds = offset % 60 >= 10 ? String(offset % 60) : "0" + offset % 60
      }, 1000)
    }
  }
}
</script>
<style scoped>
.introCounting {
  margin-top: 50px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
}

.introCounting h1 {
   font-size: 36px;
 }

.introCounting span {
   font-size: 16px;
 }
.introBlock {
  display: inline-block;
  width: 50%;
  align-content: center;
  text-align: center;
  line-height: 2;
}
.timeContainer {
  border-radius: 10px;
  width: 70px;
  height: 70px;
  line-height: 2;
  background-color: #ffffff16;
  text-align: center;
}

@media screen and (max-width: 680px) {
  .timeContainer {
    width: 60px;
    height: 60px;
  }
  .introCounting h1 {
    font-size: 28px;
  }
  .timeContainer h1 {
    line-height: 2.5;
    font-size: 24px;
  }
}
</style>
