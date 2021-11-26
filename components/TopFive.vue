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
      musics: [], // mocking 할 Item 변수
      audio: null, // audio 객체를 담기 위한 variable
      playPromise: null, // audio 객체 Promise Controll
      playListIndex: null, // Playlist index Controll
    }
  },
  watch: {
    playListIndex(cur, before) {
      if (before !== null && cur !== before) {
        if (!this.musics[before].isPause) {
          return
        }
        this.items[before].isPause = !this.items[before].isPause
        this.musics[before].isPause = !this.musics[before].isPause
      }
    },
  },
  async created() {
    let variable = null
    await this.$axios.get('/musics')
      .then((res) => {
        this.items = res.data
        this.items.forEach((v) => (v.isPause = false))
        this.musics = this.items.map((v) => {
          variable = { isPause: (v.isPause = false) }
          return variable
        })
      })
      .catch((e) => {
        console.log(e)
      })
  },
  methods: {
    isClass(index) {
      return !this.musics[index].isPause ? 'icon icon-play' : 'icon icon-pause'
    },
    handlerPlayMusic(payload, i) {
      const { source, isPause } = payload
      if (!this.audio) { // audio 재생이 처음일 경우
        this.audio = new Audio()
      }
      this.audio.src = require(`@/assets${source}`).default
      if (!this.playPromise) { // 최초 audio Promise 실행 여부
        this.playPromise = this.audio.play()
      }
      this.audioDuplicate(i, isPause)
      this.audioPlay()
    },
    audioDuplicate(i, isPause) {
      this.items[i].isPause = !isPause // item
      this.musics[i].isPause = !isPause // musics
      this.playListIndex = i
    },
    audioPlay() {
      // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted 이슈 대응
      if (this.playPromise !== undefined) {
        this.playPromise
          .then((_) => {
            this.playControll()
          })
          .catch((_error) => {
            // Auto-play was prevented
            console.log(_error)
          })
      }
    },
    playControll() {
      this.audio.pause()
      !this.items[this.playListIndex].isPause
        ? this.audio.pause()
        : this.audio.play()
    },
    handlerAddMusic(item) {
      console.log(item)
    },
  },
}
</script>
