<template>
  <transition name="open"
              @before-enter="beforeEnter"
              @enter="enter"
              @enter-cancelled="enterCancelled"
              @leave="leave"
              @after-leave="afterLeave"
              @leave-cancelled="leaveCancelled">
    <slot></slot>
  </transition>
</template>

<script>

function resetStyles (el) {
  const size = el._initialStyle['height'];
  el.style.overflow = el._initialStyle.overflow;
  if (size != null) el.style['height'] = size;
  delete el._initialStyle;
}

function afterLeave (el) {
  if (el._parent) {
    el._parent.classList.remove('accordion');
  }
  resetStyles(el)
}

export default {
  name: "accordionTransition",
  methods: {
    beforeEnter (el) {
      el._parent = el.parentNode;
      el._initialStyle = {
        transition: el.style.transition,
        visibility: el.style.visibility,
        overflow: el.style.overflow,
        ['height']: el.style['height'],
      };
    },
    enter (el) {
      const initialStyle = el._initialStyle;
      const offset = `${el['offsetHeight']}px`;

      el.style.setProperty('transition', 'none', 'important');
      el.style.visibility = 'hidden';
      el.style.visibility = initialStyle.visibility;
      el.style.overflow = 'hidden';
      el.style['height'] = '0';

      void el.offsetHeight; // force reflow

      el.style.transition = initialStyle.transition;

      if (el._parent) {
        el._parent.classList.add('accordion');
      }

      requestAnimationFrame(() => {
        el.style['height'] = offset
      });
    },

    afterEnter: resetStyles,
    enterCancelled: resetStyles,

    leave (el) {
      el._initialStyle = {
        transition: '',
        visibility: '',
        overflow: el.style.overflow,
        ['height']: el.style['height'],
      };

      el.style.overflow = 'hidden';
      el.style['height'] = `${el['offsetHeight']}px`;
      void el.offsetHeight // force reflow

      requestAnimationFrame(() => (el.style['height'] = '0'));
    },

    afterLeave,
    leaveCancelled: afterLeave,
  }
}
</script>

<style scoped>

</style>