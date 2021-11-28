<template>
  <top-five v-if="tabType === 'Top5'" />
  <search v-else-if="tabType === 'Search'" />
  <play-list v-else />
</template>

<script>
import TopFive from '~/components/TopFive.vue'
import Search from '~/components/Search.vue'
import PlayList from '~/components/PlayList.vue'
export default {
  components: {
    TopFive, Search, PlayList
  },
  props: {
    tabType: {
      type: String,
      default: 'Top5',
    },
  },
}
</script>

<style></style>
