<template>
  <div class="intro" :class="isIntro === false ? 'fade' : ''">
    <img src="/Logo.svg" />
  </div>
</template>

<script>
export default {
  props: {
    isIntro: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
