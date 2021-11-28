export default {
  data() {
    return {
      audio: null, // audio 객체를 담기 위한 variable
      playPromise: null, // audio 객체 Promise Controll
      playListIndex: null, // 현재 재생중인 Playlist 인덱스 Controll
    }
  },
  computed: {
    items() {
      return this.$store.state.musicItems
    },
    musics() {
      return this.$store.state.musicPlayIns
    },
  },
  watch: {
    playListIndex(cur, before) {
      if (before !== null && cur !== before) {
        if (!this.musics[before].isPause) {
          return
        }
        this.$store.commit('mutMusicIsPause', before)
      }
    },
  },
  methods: {
    isClass(index) {
      return !this.musics[index].isPause ? 'icon icon-play' : 'icon icon-pause'
    },
    handlerPlayMusic(payload, i) {
      const { source, isPause } = payload
      if (!this.audio) {  // audio 재생이 처음일 경우 Audio 객체 생성
        this.audio = new Audio()
      }
      this.audio.src = require(`@/assets${source}`).default
      if (!this.playPromise) { // 최초 audio Promise 실행 여부
        this.playPromise = this.audio.play()
      }
      this.audioDuplicate(i, isPause) // 플레이 리스트 재생목록 버튼 UI 컨트롤 Function
      this.audioPlay() // 플레이 리스트 재생 Function
    },
    audioDuplicate(i) {
      this.playListIndex = i
      this.$store.commit('mutMusicIsPause', i)
    },
    audioPlay() { // https://developers.google.com/web/updates/2017/06/play-request-was-interrupted 이슈 대응
      if (this.playPromise !== undefined) {
        this.playPromise
          .then((_) => {
            this.playControll()
          })
          .catch((_error) => {  // Auto-play was prevented
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
    handlerAddMusic(payload) {
      this.$store.commit('addMusicToPlayList', payload)
      alert('PlayList 에 추가 되었습니다.')
    },
  }
};
