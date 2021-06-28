<template>
  <div class="item-wrapper">
    <div class="q" @click="open = !open">
      {{ q }}
      <img alt :class="open && 'rotate'" src="../assets/arrow_down.svg"/>
    </div>
    <accordion-transition name="accordion">
      <pre v-show="open" class="a" v-html="a">
      </pre>
    </accordion-transition>
  </div>
</template>

<script>
import AccordionTransition from "@/components/accordionTransition";

export default {
  name: "QaItem",
  components: {AccordionTransition},
  props: ['q', 'a', 'note'],
  data() {
    return {
      open: false
    }
  },
}
</script>

<style scoped>
.item-wrapper {
  padding: 20px 32px;
  background: rgba(255, 255, 255, 0.024);
  box-shadow: 0px 8px 16px rgba(27, 27, 27, 0.16), -1px -1px 0 rgba(255, 255, 255, 0.16);
  border-radius: 12px;
  max-width: 780px;
  margin: 12px auto;
}

.q {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Konnect;
  font-weight: 500;
  font-size: 16px;
  line-height: 26px;
  cursor: pointer;
  color: white;
}

.q img {
  margin-right: 12px;
  transition: all 0.5s;
}

.q img.rotate {
  transform: rotate(180deg);
}

.a {
  margin: 8px 0 0;
  font-size: 16px;
  line-height: 24px;
  transition: all 0.15s;
  white-space: normal;
  font-family: Graphik;
}

.a::v-deep li {
  color: #D9DAF2;
}

.a::v-deep .note {
  font-size: 12px;
  font-style: italic;
  color: #D9DAF290
}

@media screen and (max-width: 600px) {
  .item-wrapper {
    padding: 20px
  }

  .q, .a {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>