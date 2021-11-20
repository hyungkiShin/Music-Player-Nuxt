<template>
  <ul class="app-controller">
    <li v-for="tab in tabs" :key="tab.id">
      <button class="button-app-controller" @click="onTabClick(tab)">
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
    };
  },
  methods: {
    onTabClick(tab) {
      switch (tab.title) {
        case tab.title === "Top5":
          break;
        case tab.title === "PlayList":
          break;
        case tab.title === "Search":
          break;

        default:
          break;
      }
      console.log("하하하");
    },
  },
};
</script>

<style></style>
