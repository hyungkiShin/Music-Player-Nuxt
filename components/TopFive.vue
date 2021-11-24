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
          <div class="music-simple-controller">
            <button
              :class="isClass(index)"
              @click="handlerPlayMusic(item, index)"
            >
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
      musics2: [{ isPause: false },{ isPause: false },{ isPause: false },{ isPause: false },{ isPause: false },],
      playPromise: null,
      pauseMode: false,
    };
  },
  computed: {},
  watch: {
  },
  created() {
    this.$axios.get("/musics").then((res) => {
      this.items = res.data;
      this.musics2 = res.data
      res.data.forEach((v) => (v.isPause = false));
    });
  },
  methods: {
    isClass(index) {
      return this.musics2[index].isPause ? "icon icon-pause" : "icon icon-play";
    },
    handlerPlayMusic(payload, i) {
      const { source, title } = payload;
      if (!this.audio) {
        // audio 재생이 처음일 경우
        this.audio = new Audio();
      }
      this.audio.src = require(`@/assets${source}`).default;
      if (!this.playPromise) {
        // 최초 audio Promise 실행 여부
        this.playPromise = this.audio.play();
      }
      this.audioDuplicate(title, i);
      this.audioPlay();
    },
    audioDuplicate(title, i) { // TOBE : 리펙토링
      if (!this.musics) {
        this.musics = title;
        this.musics2[i].isPause = !this.pauseMode;
      } else if (this.musics === title) {
        this.pauseMode = !this.pauseMode;
        this.musics2[i].isPause = !this.pauseMode;
      } else {
        this.musics2[i].isPause = false;
        this.pauseMode = false;
      }
      this.musics = title;
    },
    audioPlay() {
      // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted 이슈
      if (this.playPromise !== undefined) {
        // audio.play() => 비동기로 호출하기 떄문에 Promise 처리를 해줘야 함.
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
      this.pauseMode ? this.audio.pause() : this.audio.play();
    },
    handlerAddMusic(item) {
      console.log(item);
    },
  },
};
</script>
