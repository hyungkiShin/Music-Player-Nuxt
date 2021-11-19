<template>
  <div class="intro" :style="isIntro === false ? 'opacity: 0' : ''">
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
  }
};
</script>
