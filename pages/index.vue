<template>
  <div id="#app">
    <intro :is-intro="isIntro" />
    <top-five />
    <tab />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Intro from "~/components/Intro.vue";
import Tab from "~/components/Tab.vue";
import TopFive from "~/components/TopFive.vue";

export default Vue.extend({
  components: { TopFive, Tab, Intro },
  data() {
    return {
      isIntro: true,
      TIME: 750,
    };
  },
  created() {
    this.onIntro();
  },
  methods: {
    onIntro() {
      setTimeout(() => {
        this.isIntro = !this.isIntro;
      }, this.TIME);
    },
  },
});
</script>
