import { fetchMusicItems } from '~/api'

export const state = () => ({
  musicItems: [],
  musicPlayIns: [],
  playList: [],
})

export const mutations = {
  setMusics(state, musicItems) {
    state.musicItems = musicItems
  },
  musicPlayIns(state, musicPlayIns) {
    state.musicPlayIns = musicPlayIns
  },
  mutMusicIsPause(state, isPauseIndex) {
    state.musicItems[isPauseIndex].isPause = !state.musicItems[isPauseIndex].isPause
    state.musicPlayIns[isPauseIndex].isPause = !state.musicPlayIns[isPauseIndex].isPause
  },
  addMusicToLoadStorage(state, payload) {
    state.playList.push(payload)
    const musicList = state.playList.map(
      ({ artists, cover, source, title }) => ({ artists, cover, source, title })
    )
    try {
      // JSON.stringify 를 통해 문자열로 저장해줍니다.
      localStorage.setItem('playlist', JSON.stringify(musicList))
      console.log(localStorage)
    } catch (e) {
      // 스토리지는 모바일에서 용량 문제 등으로 에러가 발생할 수 있기 때문에 try - catch 처리를 잘해줍니다.
      console.error(e)
    }
  },
  removeMusicToPlayList(state, index) {
    state.playList.splice(index, 1)
  },
}

export const actions = {
  async nuxtServerInit(storeContext, _nuxtContext) {
    const { data } = await fetchMusicItems()
    const items = data.map((item) => ({
      ...item,
      isPause: false,
    }))
    let variable
    const musicPlayIns = items.map((v) => {
      variable = { isPause: (v.isPause = false) }
      return variable
    })
    storeContext.commit('setMusics', items)
    storeContext.commit('musicPlayIns', musicPlayIns)
  },
  // 저장소에서 임시저장한 음악 리스트 호출
  loadStorage() {
    console.log('여기')
    // 플레이 리스트 키를 가지고 임시저장한 음악 리스트를 호출합니다.
    const stringifiedPlaylist = localStorage.getItem('playlist')
    try {
      // 호출된 값은 문자열로 되어있기 때문에 JSON.parse를 해줍니다.
      const playList = JSON.parse(stringifiedPlaylist)
      // 만약 값이 없다면 null 일수 있기 때문에 확인을 한 후 그대로 담아주거나 빈배열로 처리해줍니다.
      return playList instanceof Array ? playList : []
    } catch (e) {
      // 스토리지는 모바일에서 용량 문제 등으로 에러가 발생할 수 있기 때문에 try - catch 처리를 잘해줍니다.
      console.error(e)
    }
  },
}
