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
      <a href="/#/events" class="event-btn"><svg width="20" height="20" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.90845 3.07893H5.32951C5.39492 3.07893 5.44792 3.02589 5.44792 2.96052V0.11841C5.44792 0.0529944 5.39492 0 5.32951 0H3.90845C3.84303 0 3.79004 0.0530397 3.79004 0.11841V2.96052C3.79004 3.02594 3.84303 3.07893 3.90845 3.07893Z" fill="white"/>
        <path d="M16.6742 2.13159H14.9216V2.88947C14.9216 3.33949 14.59 3.78947 14.14 3.78947H12.7426C12.2604 3.75529 11.8768 3.37168 11.8426 2.88947V2.13159H6.1584V2.88947C6.12421 3.37168 5.74061 3.75529 5.2584 3.78947H3.861C3.41098 3.78947 3.07942 3.33945 3.07942 2.88947V2.13159H1.32679C0.721281 2.14451 0.237169 2.63914 0.237305 3.24479V6.15794H17.7636V3.24479C17.7638 2.63914 17.2797 2.14451 16.6742 2.13159Z" fill="white"/>
        <path d="M12.6721 3.07893H14.0932C14.1586 3.07893 14.2116 3.02589 14.2116 2.96052V0.11841C14.2116 0.0529944 14.1585 0 14.0932 0H12.6721C12.6067 0 12.5537 0.0530397 12.5537 0.11841V2.96052C12.5537 3.02594 12.6067 3.07893 12.6721 3.07893Z" fill="white"/>
        <path d="M7.22447 13.216L6.8929 15.1344L8.59815 14.2344L8.76394 14.187L8.92972 14.2344L10.635 15.1344L10.3034 13.216C10.2908 13.1047 10.3251 12.9931 10.3981 12.9081L11.7955 11.5818L9.87713 11.2976C9.76498 11.2797 9.66819 11.2093 9.61661 11.1081L8.76398 9.37915L7.91136 11.1081C7.85977 11.2093 7.76298 11.2797 7.65083 11.2976L5.73242 11.5818L7.12981 12.9081C7.2028 12.9931 7.23712 13.1046 7.22447 13.216Z" fill="white"/>
        <path d="M0.237305 16.9342C0.250179 17.5266 0.734201 18.0001 1.32679 18H16.6742C17.2667 18.0001 17.7507 17.5266 17.7637 16.9342V6.86841H0.237305V16.9342ZM4.64259 11.2263C4.6804 11.0969 4.79274 11.0033 4.92679 10.9895L7.36625 10.6106L8.45574 8.40792C8.55361 8.23788 8.77085 8.1794 8.94089 8.27727C8.9952 8.30855 9.04026 8.35361 9.07154 8.40792L10.161 10.6106L12.6005 10.9895C12.7345 11.0033 12.8469 11.097 12.8847 11.2263C12.9277 11.353 12.8903 11.4931 12.7899 11.5816L11.0373 13.2869L11.4636 15.7263C11.4801 15.8545 11.4256 15.9815 11.3215 16.0579C11.2593 16.1026 11.185 16.1273 11.1084 16.1289C11.0491 16.1346 10.9899 16.1176 10.9426 16.0816L8.76364 14.9447L6.58471 16.0816C6.46593 16.1539 6.31461 16.1445 6.20577 16.0579C6.10164 15.9814 6.04724 15.8544 6.06365 15.7263L6.48996 13.2869L4.73734 11.5816C4.63697 11.4931 4.59962 11.353 4.64259 11.2263Z" fill="white"/>
      </svg>
        Event List</a>
      <a class="navbar-btn" href="https://t.me/polkafoundry" target="_blank">Let's chat now</a>
      <div class="navbar-social">
        <a href="https://t.me/polkafoundry" target="_blank">
          <img alt src="../assets/telegram.svg"/>
        </a>
        <a href="https://twitter.com/PolkaFoundry" target="_blank">
          <img alt src="../assets/twitter.svg"/>
        </a>
        <a href="https://www.linkedin.com/company/polkafoundry/" target="_blank">
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
  .event-btn {
    font-weight: 600;
    margin-right: 20px;
  }
  .event-btn svg {
    margin-bottom: -3px;
    margin-right: 5px;
  }
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
    .event-btn {
      margin-bottom: 20px;
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
