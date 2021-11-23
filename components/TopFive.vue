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
      musics: [],
      playPromise: null,
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
      if (this.musics.length <= 0) { // audio 재생이 처음일 경우
        this.musics.push(payload);
        this.audio = new Audio();
        this.audio.src = this.audioSrcAdapter(source);
        this.playPromise = this.audio.play();
        this.audioPlay();
        return;
      }
      // [TODO] Refactoring
      this.audio.src = this.audioSrcAdapter(source);
      this.audioPlay();
    },
    audioSrcAdapter(source) {
      // // default 를 붙여 src="[object:module]" 이슈 해결
      return require(`@/assets${source}`).default;
    },
    // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted 이슈
    audioPlay() {
      // audio.play() => 비동기로 호출하기 떄문에 Promise 처리를 해줘야 함.
      if (this.playPromise !== undefined) {
        this.playPromise
          .then((_) => {
            this.pause();
            this.play();
          })
          .catch((_error) => {
            // Auto-play was prevented
            console.log(_error);
          });
      }
    },
    pause() {
      this.audio.pause();
    },
    play() {
      this.audio.play();
    },
    handlerAddMusic(item) {
      console.log(item);
    },
  },
};
</script>
