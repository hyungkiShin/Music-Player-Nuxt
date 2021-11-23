<template>
  <article class="contents-top5">
    <div class="top5-roof">
      <img src="~/assets/images/Logo.png" />
    </div>
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
            <button class="icon icon-play" @click="handlerPlayMusic(item)">
              <span class="invisible-text">재생</span>
            </button>
            <button class="icon icon-plus">
              <span class="invisible-text" @click="handlerAddMusic(item)"
                >추가</span
              >
            </button>
          </div>
        </div>
      </li>
    </ol>
  </article>
</template>

<script>
export default {
  data() {
    return {
      items: [],
      audio: null,
    };
  },
  created() {
    this.$axios.get("/musics").then((res) => {
      this.items = res.data;
    });
  },
  methods: {
    handlerPlayMusic(payload) {
      const { source } = payload;
      this.audio = new Audio();
      this.audio.pause();

      this.audio.src = require(`@/assets${source}`).default;

      this.audio.play();
    },
    handlerAddMusic(item) {
      console.log(item);
    },
  },
};
</script>
