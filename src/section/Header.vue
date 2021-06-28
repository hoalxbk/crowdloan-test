<template>
  <nav class="navbar">
    <a class="navbar-logo" href="/">
      <img src="../assets/logo.png" alt="logo"/>
    </a>
    <img class="navbar-toggler" @click="toggleMenu" alt src="../assets/menu.svg"/>
    <div :class="`navbar-detail ${!showMenu && 'collapse'}`" id="collapsibleNavbar">
      <div class="navbar_mobile">
        <a class="navbar-logo" href="/">
          <img src="../assets/logo.png" alt="logo"/>
        </a>
        <img class="navbar-toggler" @click="toggleMenu" alt src="../assets/close.svg"/>
      </div>
      <div style="flex: 1"></div>
<!--      <ul class="navbar-list">-->
<!--        <li class="navbar-list_item">-->
<!--          <a href="/">Developer Hub</a>-->
<!--        </li>-->
<!--        <li class="navbar-list_item">-->
<!--          <a href="https://docs.polkafoundry.com/" target="_blank">Documentation</a>-->
<!--        </li>-->
<!--        <li class="navbar-list_item">-->
<!--          <a href="/" target="_blank">One pagers</a>-->
<!--        </li>-->
<!--        <li class="navbar-list_item">-->
<!--          <a href="/" target="_blank">Token metrics</a>-->
<!--        </li>-->
<!--      </ul>-->
      <a class="navbar-btn" href="https://t.me/polkafoundry" target="_blank">Let's chat now</a>
      <div class="navbar-social">
        <a href="https://t.me/polkafoundry" target="_blank">
          <img alt src="../assets/telegram.svg"/>
        </a>
        <a href="https://www.linkedin.com/company/polkafoundry/" target="_blank">
          <img alt src="../assets/twitter.svg"/>
        </a>
        <a href="https://twitter.com/PolkaFoundry" target="_blank">
          <img alt src="../assets/linkedin.svg"/>
        </a>
      </div>
      <div class="navbar-footer">
        © Icetea Foundation, Singapore, 2021
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMenu() {
      this.showMenu = !this.showMenu
    }
  }
}
</script>

<style scoped>
  .navbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px var(--padding-section);
    position: fixed;
    top: -1px;
    left: 0;
    right: 0;
    z-index: 10;
  }

  .navbar-logo img {
    width: 160px;
  }

  .navbar-toggler {
    display: none;
  }

  .navbar-detail {
    flex: 1;
    display: flex;
    align-items: center;
  }

  .navbar-list {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navbar-list_item {
    margin: 0 16px;
    line-height: 26px;
  }

  .navbar-btn {
    border: 2px solid #0DDDFB;
    border-radius: 60px;
    color: #00C7F4;
    font-weight: 500;
    line-height: 24px;
    padding: 6px 18px;
    width: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navbar-btn:hover {
    background: #00C7F4;
    color: #050801;
    box-shadow: 0 0 5px #0DDDFB,
                0 0 25px #0DDDFB,
                0 0 50px #0DDDFB,
                0 0 200px #0DDDFB;
  }

  .navbar_mobile,
  .navbar-social,
  .navbar-footer {
    display: none;
  }

  @media screen and (max-width: 600px) {
    .navbar-toggler {
      display: block;
    }

    .collapse {
      display: none;
    }

    .navbar-detail {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 8;
      background: #0F0C3E;
      flex-direction: column;
    }

    .navbar-detail:before {
      z-index: -1;
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("../assets/background_mb.png") no-repeat;
      background-size: contain;
    }

    .navbar_mobile {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px var(--padding-section);
      width: 100%;
    }

    .navbar-list {
      flex: unset;
      flex-direction: column;
      padding: 40px 0;
    }

    .navbar-list_item {
      font-family: 'Konnect';
      font-size: 20px;
      margin: 16px 0;
    }

    .navbar-btn {
      width: 80%;
      font-family: 'Konnect';
      padding: 12px;
    }

    .navbar-social {
      display: block;
      flex: 1;
      padding: 24px;
    }

    .navbar-social a {
      margin: 8px;
    }

    .navbar-footer {
      width: 100%;
      background: #0D0B32;
      padding: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      line-height: 22px;
      color: #C2C3D8;
    }
  }
</style>