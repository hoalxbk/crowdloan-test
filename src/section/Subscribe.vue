<template>
  <div class="wrapper col-flex">
    <div class="subscribe">
      <div class="form">
        <h3 class="title">Subscribe to the newsletter to hear<br/>about Polkasmith updates and events.</h3>
        <div class="input-wrapper">
          <input type="email" v-model="email"/>
          <div class="btn" @click.stop="sendEmail">
            <span>Subscribe</span>
            <img style="margin-left: 4px" alt src="../assets/arrow_right.svg"/>
          </div>
        </div>
        <div class="message">{{ message }}</div>
      </div>
      <img alt src="../assets/message.png"/>
    </div>
    <img alt style="width: 220px; margin-top: 60px" src="../assets/logo.png"/>
    <a href="mailto:info@polkafoundry.com" class="email">info@polkasmith.com</a>
    <div class="address">68 Circular Road, #02-01, Singapore 049422</div>
    <div class="social">
      <a href="https://t.me/polkafoundry" target="_blank">
        <img alt src="../assets/telegram.svg"/>
      </a>
      <a href="/" target="_blank">
        <img alt src="../assets/twitter.svg"/>
      </a>
      <a href="/" target="_blank">
        <img alt src="../assets/linkedin.svg"/>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subscribe",
  data() {
    return {
      email: '',
      message: ''
    }
  },
  methods: {
    sendEmail() {
      this.message = 'Thank you for subscribing!';
      setTimeout(() => {
        this.message = ''
      }, 3000)
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: var(--padding-section);
}

.subscribe {
  background: #0D114350;
  box-shadow: 0px 8px 16px rgba(27, 27, 27, 0.16), -2px -2px 0 rgba(255, 255, 255, 0.24);
  border-radius: 32px;
  padding: var(--padding-article);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 980px;
}

.subscribe > img {
  margin-left: 60px;
}

.input-wrapper {
  display: flex;
  align-items: center;
  margin-top: 28px;
  border-radius: 60px;
  background: #ffffff;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
}

input {
  flex: 1;
  border-radius: 60px 0 0 60px;
  background: white;
  font-size: 16px;
  line-height: 26px;
  padding: 12px 0 12px 32px;
  color: #0D1126;
  border: none;
  outline: none;
}

.btn {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #050940;
  font-family: Konnect;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  padding: 16px 20px;
  background: #2CC5F4;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 60px;
  cursor: pointer;
}

.message {
  margin-top: 12px;
  color: limegreen;
  font-style: italic;
}

.email {
  margin-top: 40px;
  font-family: Konnect;
  font-size: 20px;
  line-height: 26px;
  text-decoration-line: underline;
}

.address {
  margin-top: 8px;
  font-size: 14px;
  line-height: 22px;
  color: #D9DAF2;
}

.social {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.social a {
  margin: 8px;
}

@media screen and (max-width: 600px) {
  .subscribe {
    flex-direction: column-reverse;
    width: 100%;
  }

  .subscribe > img {
    margin-left: 0;
    margin-bottom: 12px;
    width: 120px;
  }

  .input-wrapper {
    flex-direction: column;
    background: transparent;
    align-items: stretch;
    box-shadow: none;
  }

  input {
    border-radius: 60px;
    margin-bottom: 12px;
    box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  }

}
</style>