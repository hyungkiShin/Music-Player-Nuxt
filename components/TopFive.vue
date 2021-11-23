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
      musics: "",
      playPromise: null,
      pauseMode: false,
    };
  },
  watch: {
  },
  created() {
    this.$axios.get("/musics").then((res) => {
      this.items = res.data;
    });
  },
  methods: {
    handlerPlayMusic(payload) {
      const { source, title } = payload;
      if (!this.audio) { // audio 재생이 처음일 경우
        this.audio = new Audio();
      }
      this.audio.src = require(`@/assets${source}`).default;
      if (!this.playPromise) { // 최초 audio Promise 실행 여부
        this.playPromise = this.audio.play();
      }
      this.audioDuplicate(title);
      this.audioPlay();
    },
    audioDuplicate(title) {
      if (!this.musics) {
        this.musics = title;
      } else if (this.musics === title) {
        this.pauseMode = !this.pauseMode;
      } else {
        this.pauseMode = !this.pauseMode;
      }
    },
    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted 이슈
    audioPlay() {
      // audio.play() => 비동기로 호출하기 떄문에 Promise 처리를 해줘야 함.
      if (this.playPromise !== undefined) {
        this.playPromise
          .then((_) => {
            this.playControll();
          })
          .catch((_error) => {
            // Auto-play was prevented
            console.log(_error);
          });
      }
    },
    playControll() {
      this.audio.pause();
      if (this.pauseMode) {
        return this.audio.pause();
      }
      this.audio.play();
    },
    handlerAddMusic(item) {
      console.log(item);
    },
  },
};
</script>
