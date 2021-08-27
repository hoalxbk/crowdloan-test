<template>
  <div id="app">
    <Header/>
    <Introduction/>
    <Contribute/>
    <TopContributor/>
    <Infomation/>
    <Team/>
    <Faq/>
    <Subscribe/>
    <Footer/>
    <notifications position="top right" />
  </div>
</template>

<script>

import Footer from "@/section/Footer";
import Header from "@/section/Header";
import Contribute from "@/section/Contribute";
import TopContributor from "@/section/TopContributor";
import Introduction from "@/section/Introduction";
import Infomation from "@/section/Infomation";
import Team from "@/section/Team";
import Faq from "@/section/Faq";
import Subscribe from "@/section/Subscribe";
export default {
  name: 'App',
  components: {
    Subscribe,
    Faq,
    Team,
    Contribute,
    Infomation,
    Introduction,
    TopContributor,
    Header,
    Footer,
  },
  data() {
    return {
      scroll: 0
    }
  },
  async created() {
    document.addEventListener('scroll', () => {
      const navbar = document.querySelector('nav.navbar');
      navbar.classList.add('border');
      this.scroll++;
      setTimeout(() => {
        this.scroll --;
        setTimeout(() => {
          if(document.documentElement.scrollTop === 0) navbar.classList.remove('border');
        }, 500);
      }, 500);
    })
  }
}
</script>

<style>
@import "css/font/font.css";
@import 'css/style.css';
#app {
  font-family: 'Graphik';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #0D1143;
  color: #fff;
  overflow-x: hidden;
  min-height: 100vh;
}

nav.border {
  background: #0D0B32;
}
.vue-notification {
  padding: 10px !important;
  margin: 20px 10px 0 0  !important;
}
</style>
