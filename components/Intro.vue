<template>
  <div class="intro" :style="onIntro()">
    <img src="/assets/images/Logo.png" />
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
  methods: {
    onIntro (){
      return this.isIntro === false ? 'opacity: 0' : ''
    }
  }
};
</script>
