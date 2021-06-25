<template>
  <div class="dot-wrapper" :style="wrapperStyles">
    <div v-for="i in (row*column)" :key="i" class="dot" :style="dotStyles"></div>
  </div>
</template>

<script>
export default {
  name: "Dot",
  props: {
    color: {
      type: String,
      default: '#FFFFFF'
    },
    row: {
      type: [Number, String],
      default: 3
    },
    column: {
      type: [Number, String],
      default: 4
    },
    position: {
      type: Object,
      default: () => ({top: 0, left: 0})
    },
    gap: {
      type: [Number, String],
      default: 36
    }
  },
  computed: {
    wrapperStyles() {
      const style = {
        gridTemplateRows: `repeat(${this.row}, 5px)`,
        gridTemplateColumns: `repeat(${this.column}, 5px)`,
        gridGap: `${this.gap}px`
      }
      Object.assign(style, this.position)
      return style
    },
    dotStyles() {
      return {
        background: this.color
      }
    }
  }
}
</script>

<style scoped>
.dot-wrapper {
  position: absolute;
  display: grid;
}

.dot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
}

@media screen and (max-width: 600px) {
  .dot-wrapper {
    display: none;
  }
}
</style>