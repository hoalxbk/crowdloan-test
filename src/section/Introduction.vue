<template>
  <div class="wrapper">
    <div class="banner-landing" style="display: none">
      <img src="../assets/polkasmith/banner-landing.png"/>
      <div class="banner-content">
        <div class="left">
          <div style="margin: auto 50px">
          <h3>Contribute KSM to Earn $500 ticket of KABY IDO!</h3>
        </div>
        </div>
        <div class="right">
          <div style="margin: auto; display: flex">
            <a @click="scrollToContribute" class="btn join-btn" >Join Now <img style="width: 20px; fill: black" src="../assets/polkasmith/black-arrow.png"/></a>
            <a href="https://medium.com/polkafoundry/polkasmith-crowdloan-for-kusama-parachain-auction-batch-2-is-open-7b11d8b9e724" target="_blank" class="learn-btn">Learn more <img style="width: 20px;" src="../assets/polkasmith/learn-more.png"/></a>
          </div>
      </div>
      </div>
    </div>
    <div class="hero">
      <h1 class="title">
        <img alt src="../assets/logo.png"/>
        <span>by PolkaFoundry</span>
      </h1>
      <div class="subtitle">
        PolkaSmith is the one-stop production hub for Defi and NFT dApps on Kusama. It aims to provide all the necessary
        features, services, integrations, and tools for Defi and NFT experiments, innovations, and real-world solutions.
        PolkaSmith is no newcomer but a canary network of PolkaFoundry on Kusama.
      </div>
      <div style="display: flex">
        <a href="https://polkafoundry.com/" target="_blank" class="btn" style="display: inline">
          Learn more about PolkaFoundry
        </a>
      </div>
    </div>
    <dot color="#2CC5F4" column="3" row="5" :position="{top: '260px', right: '36px'}"/>
    <dot column="3" row="5" :position="{top: '580px', left: '36px'}"/>
  </div>
</template>

<script>
import Dot from "@/components/Dot";

export default {
  name: "Introduction",
  components: { Dot},
  methods: {
    scrollToContribute() {
      const contribute = document.getElementById("contribute");
      console.log(contribute)
      contribute.scrollIntoView({behavior: "smooth"})
    }
  }
}
</script>

<style scoped>
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

.subtitle {
  max-width: 680px;
  line-height: 26px;
  margin-top: 20px;
  margin-bottom: 40px;
}

.btn {
  background: #2CC5F4;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 60px;
  color: #050940;
  padding: 16px 36px;
  font-weight: 500;
}

.btn:hover {
  color: white;
  font-weight: 700;
  box-shadow: -5px 5px 10px #ffffff40, 5px -5px 10px #ffffff;
}

.join-btn {
  cursor: pointer;
  padding: 18px 20px 12px 20px;
  color: black;
}

.join-btn:hover {
  color: black;
  font-weight: 700;
  box-shadow: -5px 5px 10px #ffffff40, 5px -5px 10px #ffffff;
}

.learn-btn {
  padding: 16px 40px 14px 20px;
  margin-left: 20px;
  background: transparent;
  box-shadow: inset 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 60px;
  border: 1px solid #fff;
  color: #fff;
  font-weight: 500;
}
.learn-btn img {
  position: absolute;
  margin-left: 5px;
  margin-top: -2px;
}
.learn-btn:hover {
  color: white;
  font-weight: 700;
  box-shadow: -5px 5px 10px #ffffff40, 5px -5px 10px #ffffff;
}

.detail .title {
  margin-bottom: 12px;
}

.detail img {
  margin-bottom: 12px;
}

.detail p {
  font-size: 16px;
  line-height: 26px;
  margin: 12px 0 0;
  text-align: left;
  color: #D9DAF2;
}

.banner-landing {
  position: absolute;
  top: 100px;
  width: 80%;
  opacity: 1;
  transition: opacity 1s;
  max-width: 1000px;
  z-index: 9;
  left: 50%;
  transform: translateX(-50%);
  color: white;
}
.banner-landing img {
  width: 100%;
}

.banner-landing.hide {
  opacity: 0;
}
.banner-content {
  position: absolute;
  display: flex;
  width: 100%;
  top: 50%;
  margin-top: -3px;
  transform: translateY(-50%);
}
.left {
  width: 60%;
  display: block;
}
.left h3 {
  color: white;
  font-size: 20px;
  font-weight: 500;
}
.left h2 {
  color: white;
  font-size: 22px;
}
.right {
  width: 40%;
  display: contents
}

@media screen and (max-width: 600px) {
  .wrapper {
    background: none;
    padding-top: 120px;
    position: relative;
  }

  .wrapper:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100vh;
    background: url("../assets/background_mb.png");
    background-size: cover;
  }

  .hero {
    position: relative;
    z-index: 2;
  }

  .title {
    flex-direction: column;
  }

  .title img {
    max-width: 280px;
    margin: 0 0 4px;
  }

  .title span {
    font-size: 28px;
    line-height: 36px;
  }

  .subtitle {
    font-size: 14px;
    line-height: 22px;
    color: #D9DAF2;
    font-weight: 300;
  }


  .detail p {
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }

  .banner-landing {
    display: none;
  }

}
</style>
