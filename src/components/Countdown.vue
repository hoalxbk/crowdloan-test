<template>
  <div class="introCounting">
    <div class="time-main">
      <div class="timeContainer">
        <div class="number">{{ countDays }}</div>
      </div>
      <span style="color: #aeaeae;}">Days</span>
    </div>
    <div class="time-space">:</div>
    <div class="time-main">
      <div class="timeContainer">
        <div class="number">{{ countHours }}</div>
      </div>
      <span style="color: #aeaeae;">Hours</span>
    </div>
    <div class="time-space">:</div>
    <div class="time-main">
      <div class="timeContainer">
        <div class="number">{{ countMinutes }}</div>
      </div>
      <span style="color: #aeaeae;">Minutes</span>
    </div>
    <div class="time-space">:</div>
    <div class="time-main">
      <div class="timeContainer">
        <div class="number">{{ countSeconds }}</div>
      </div>
      <span style="color: #aeaeae;">Seconds</span>
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
      countDownInterval: null,
    }
  },
  mounted() {
    if (!this.endDate || this.endDate === 0) {
      return
    }
    this.countDown(this.endDate)
  },
  watch:{
    endDate() {
      if (!this.endDate || this.endDate === 0) {
        return
      }
      if (this.countDownInterval) {
        clearInterval(this.countDownInterval)
      }
      this.countDown(this.endDate)
    }
  },
  methods: {
    countDown(time) {
      this.countDownInterval = setInterval(() => {
        let now = new Date()
        let offset = Math.floor((time - now.getTime()) / 1000)
        if (offset <= 0) {
          clearInterval(this.countDownInterval)
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
  padding-bottom: 10px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  text-align: center;
  border-top: 2px solid #FFFFFF32;
  border-bottom: 2px solid #FFFFFF32;

}

.time-space {
  font-size: 36px;
  margin: 15px 10px;
}

.introCounting .number {
  font-size: 36px;
  font-weight: 500;
}

.introCounting span {
  font-size: 14px;
}

.timeContainer {
  border-radius: 10px;
  width: 70px;
  height: 60px;
  line-height: 2;
  text-align: center;
}

@media screen and (max-width: 680px) {
  .timeContainer {
    width: 60px;
    margin-bottom: 5px;
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
