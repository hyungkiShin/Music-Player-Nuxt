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

export default Vue.extend({
  components: { Tab, Intro },
  data() {
    return {
      isIntro: true, // 인트로 Fade Out 활성화 변수
      delIntroDom: true, // Intro Dom 삭제
      INTRO_TIME: 750,
      REMOVE_INTRO_DOM: 2000,
      tabType: 'Top5',
    }
  },
  watch: {
    isIntro(val) {
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
      setTimeout(() => {
        this.isIntro = !this.isIntro
      }, this.INTRO_TIME)
    },
    onTabClick(title: string): void {
      this.tabType = title
      console.log('하하하', title)
    },
  },
})
</script>
