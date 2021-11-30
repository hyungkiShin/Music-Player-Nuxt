<template>
  <div id="app">
    <intro v-if="delIntroDom" :is-intro="isIntro" />
    <TabRoute :tab-type="tabType" />
    <tab @onTabClick="onTabClick" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Intro from '~/components/Intro.vue'
import Tab from '~/components/Tab.vue'
import playMusic from '~/mixins/playMusic'

export default Vue.extend({
  components: { Tab, Intro },
  mixins: [playMusic],
  data() {
    return {
      delIntroDom: true, // Intro Dom 삭제
      INTRO_TIME: 750,
      REMOVE_INTRO_DOM: 1500,
    }
  },
  watch: {
    isIntro(val) {
      console.log(val);
      if (!val) {
        setTimeout(() => {
          this.delIntroDom = !this.delIntroDom
        }, this.REMOVE_INTRO_DOM)
      }
    },
  },
  created() {
    this.onIntro()
  },
  methods: {
    onIntro() {
      // const isIntroFlag = this.$store.state.isIntro === 'Top5'
      setTimeout(() => {
        this.$store.commit('setIsIntro', false)
      }, this.INTRO_TIME)
    },
    onTabClick(title: string): void {
      this.$store.commit('setTabType', title)
    },
  },
})
</script>
