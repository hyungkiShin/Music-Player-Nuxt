<template>
  <div id="#app">
    <div class="top5-roof">
      <img src="~/assets/images/Logo.png" />
    </div>
    <article class="contents-top5">
      <ol class="top5-list">
        <li v-for="(item, index) in items" :key="item.id">
          <div class="music-rank">{{ `${index + 1}` }}</div>
          <div class="music-content">
            <div class="music-data">
              <div class="music-cover">
                <img :src="require(`~/assets${item.cover}`)" />
              </div>
              <div class="music-info">
                <strong class="music-title">{{ item.title }}</strong>
                <em class="music-artist">{{ item.artists[0] }}</em>
              </div>
            </div>
            <div class="music-simple-controller" data-index="${index}">
              <button class="icon icon-play">
                <span class="invisible-text">재생</span>
              </button>
              <button class="icon icon-plus">
                <span class="invisible-text">추가</span>
              </button>
            </div>
          </div>
        </li>
      </ol>
    </article>
    <ul class="app-controller">
      <li v-for="tab in tabs" :key="tab.id">
        <button class="button-app-controller">
          <i :class="`tab-icon ${tab.iconName}`"></i>
          {{ tab.title }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      tabs: [
        { title: "Top5", iconName: "icon-top5" },
        { title: "PlayList", iconName: "icon-playlist" },
        { title: "Search", iconName: "icon-search" },
      ],
    };
  },
  created() {
    this.$axios.get("/musics").then((res) => {
      this.items = res.data;
    });
  },
};
</script>

<style></style>
