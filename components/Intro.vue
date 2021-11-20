<template>
  <div class="intro" :class="isIntro === false ? 'fade' : ''">
    <img src="~/assets/images/Logo.png" />
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
