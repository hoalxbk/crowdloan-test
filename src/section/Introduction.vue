<template>
  <div class="wrapper">
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
      <a href="https://polkafoundry.com/" target="_blank" class="btn">
        Learn more about PolkaFoundry
      </a>
    </div>
    <div class="information">
      <img class="desktop" alt src="../assets/introduction.png"/>
      <img class="mobile" alt src="../assets/introduction_mb.png"/>
      <div class="detail">
        <img alt src="../assets/bird.svg">
        <h2 class="title">Why built on Kusama?</h2>
        <p>Kusama and Polkadot are independent, standalone networks built on very similar codebases, but Kusama has
          faster governance parameters and lower barriers to entry.</p>
        <p>Kusama offers an early, adventurous version of Polkadot to allow teams and developers to build parachains and
          deploy applications in an environment with economic incentives that will mirror those on Polkadot. In
          addition, Kusama will organize its parachain auction in advance starting from 15 June 2021.</p>
      </div>
    </div>
    <dot color="#2CC5F4" column="3" row="5" :position="{top: '260px', right: '36px'}"/>
    <dot column="3" row="5" :position="{top: '580px', left: '36px'}"/>
    <dot color="#FFFFFF66" column="7" row="5" :position="{bottom: 0, right: '12px'}"/>
  </div>
</template>

<script>
import Dot from "@/components/Dot";

export default {
  name: "Introduction",
  components: {Dot}
}
</script>

<style scoped>
.wrapper {
  position: relative;
  background: url("../assets/background.png") no-repeat 50%;
  background-size: cover;
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
  box-shadow: -5px 5px 10px #1c7c9a, 5px -5px 10px #3cffff;
}

.information {
  margin-top: 160px;
  position: relative;
  z-index: 2;
}

.detail {
  position: absolute;
  top: 90px;
  left: 100px;
  width: 515px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.detail .title {
  margin-bottom: 12px;
}

.detail img {
  margin-bottom: 12px;
}

.detail p {
  margin: 12px 0 0;
  text-align: left;
  color: #D9DAF2;
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

  .information {
    margin-top: 100px;
  }

  .detail {
    top: 0;
    left: 0;
    right: 0;
    width: auto;
    align-items: center;
    padding: 28px;
  }

  .detail p {
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }
}
</style>