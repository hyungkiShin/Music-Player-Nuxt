<template>
  <ul class="app-controller">
      <li v-for="tab in tabs" :key="tab.id">
        <button class="button-app-controller">
          <i :class="`tab-icon ${tab.iconName}`"></i>
          {{ tab.title }}
        </button>
      </li>
    </ul>
</template>

<script>
export default {
  data() {
    return {
       tabs: [
        { title: "Top5", iconName: "icon-top5" },
        { title: "PlayList", iconName: "icon-playlist" },
        { title: "Search", iconName: "icon-search" },
      ],
    }
  }
}
</script>

<style>

</style>
