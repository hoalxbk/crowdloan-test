<template>
  <div class="dialog-wrapper">
    <div v-show="value" class="overlay" @click="close"></div>
    <transition name="fade">
      <div v-show="value" class="main" ref="main">
        <img class="image" alt :src="image"/>
        <div class="content">
          <div class="header">
            <div class="info">
              <h4 class="title">{{name}}</h4>
              <div class="subtitle">{{title}}</div>
            </div>
            <div class="link">
              <a v-for="(link, i) in links" target="_blank" :key="i" :href="link.href">
                <img alt :src="link.img"/>
              </a>
            </div>
          </div>
          <div class="detail">
            <p v-for="(desc, i) in descriptions" :key="i">{{desc}}</p>
          </div>
          <img class="close" alt src="../assets/close2.svg" @click="close"/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>


export default {
  name: "Dialog",
  props: {
    value: Boolean,
    data: Object
  },
  computed: {
    image() {
      return 'members/' + this.data?.image || 'thi.png'
    },
    name() {
      return this.data?.name || ''
    },
    title() {
      return this.data?.title || ''
    },
    links() {
      return this.data?.links || []
    },
    descriptions() {
      return this.data?.descriptions || []
    }
  },
  watch: {
    value(v) {
      document.querySelector('body').style.overflow =  (v ? 'hidden' : '')
      if(!v && this.$refs && this.$refs.main) {
        this.$refs.main.scrollTop = 0
      }
    }
  },
  methods: {
    close() {
      this.$emit('input', false)
    },
  }
}
</script>

<style scoped>
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.42);
    z-index: 18;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .main {
    position: fixed;
    z-index: 20;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #272B5D;
    box-shadow: 0px 8px 16px rgba(27, 27, 27, 0.16),-1px -1px 0 rgba(255, 255, 255, 0.24);
    padding: 32px;
    border-radius: 20px;
    display: flex;
    align-items: flex-start;
    width: 800px;
  }

  .close {
    position: absolute;
    bottom: -40px;
    left: calc(50% - 16px);
    cursor: pointer;
  }

  .image {
    margin-right: 40px;
    max-width: 280px;
  }

  .content {
    font-weight: 300;
    font-size: 16px;
    line-height: 26px;
  }

  .header {
    display: flex;
    justify-content: space-between;
  }

  .subtitle {
    margin: 4px 0;
  }

  .link {
    display: flex;
    align-items: center;
  }

  .link a {
    margin-right: 8px;
  }

  .detail p{
    margin: 12px 0;
    color: #D9DAF2;
  }

  @media screen and (max-width: 600px) {
    .main {
      flex-direction: column;
      width: calc(100% - 24px);
      align-items: center;
      max-height: calc(100% - 24px);
      overflow: scroll;
    }

    .close {
      position: relative;
      bottom: 0;
    }

    .image {
      margin-right: 0;
      margin-bottom: 20px;
    }

    h4.title {
      text-align: left;
    }
  }
</style>