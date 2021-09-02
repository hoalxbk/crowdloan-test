<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
    <notifications position="top right" />
  </div>
</template>

<script>

import Footer from "@/section/Footer";
import Header from "@/section/Header";

export default {
  name: 'App',
  components: {
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
body {
  background: #0D1143;
}
#app {
  font-family: 'Graphik';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #fff;
  overflow-x: hidden;
  min-height: 100vh;
  background-image: url("./assets/background.png");
  background-repeat: no-repeat;
  background-size: 100% 1300px;
}

nav.border {
  background: #0D0B32;
}
.vue-notification {
  padding: 10px !important;
  margin: 20px 10px 0 0  !important;
}
</style>
