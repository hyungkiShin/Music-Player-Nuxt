import { fetchMusicItems } from '~/api'

export const state = () => ({
  isIntro: true,
  musicItems: [],
  musicPlayIns: [],
  playListItems: [],
  playListItem: [],
  tabType: 'Top5'
})

export const mutations = {
  setMusics(state, musicItems) {
    state.musicItems = musicItems
  },
  setIsIntro(state, isIntro) {
    state.isIntro = isIntro
  },
  setTabType(state, payload) {
    state.tabType =  payload
  },
  musicPlayIns(state, musicPlayIns) {
    state.musicPlayIns = musicPlayIns
  },
  mutMusicIsPause(state, isPauseIndex) {
    state.musicItems[isPauseIndex].isPause =
    !state.musicItems[isPauseIndex].isPause
    state.musicPlayIns[isPauseIndex].isPause =
    !state.musicPlayIns[isPauseIndex].isPause
  },
  mutSingleMusicIsPause(state) {
    state.playListItem.isPause = !state.playListItem.isPause
  },
  addMusicToLoadStorage(state, payload) {
    state.playListItems.push(payload)
    const musicList = state.playListItems.map(
      ({ artists, artist, cover, source, title, isPause }) => ({ artists, artist, cover, source, title, isPause })
    )
    try {
      // JSON.stringify 를 통해 문자열로 저장해줍니다.
      localStorage.setItem('playlist', JSON.stringify(musicList))
    } catch (e) {
      // 스토리지는 모바일에서 용량 문제 등으로 에러가 발생할 수 있기 때문에 try - catch 처리를 잘해줍니다.
      console.error(e)
    }
  },
  removeMusicToPlayList(state, index) {
    const musicList = state.playListItems.splice(index, 1)
    localStorage.setItem('playlist', JSON.stringify(musicList))
  },
  setPlayListItems(state, payload) {
    state.playListItems = payload
  },
  setPlayListItem(state, payload) {
    state.playListItem = payload
  },
}

export const actions = {
  async nuxtServerInit(storeContext, _nuxtContext) {
    const { data } = await fetchMusicItems()
    const items = data.map((item) => ({
      ...item,
      isPause: false,
      artist: item.artists[0],
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
  getPlayListItems(state) {
    // 플레이 리스트 키를 가지고 임시저장한 음악 리스트를 호출합니다.
    try {
      const stringifiedPlaylist = localStorage.getItem('playlist')
      // 호출된 값은 문자열로 되어있기 때문에 JSON.parse를 해줍니다.
      const playListItems = JSON.parse(stringifiedPlaylist)
      state.commit('setPlayListItems', playListItems)
    } catch (e) {
      // 스토리지는 모바일에서 용량 문제 등으로 에러가 발생할 수 있기 때문에 try - catch 처리를 잘해줍니다.
      console.error(e)
    }
  },
  getPlayListItem(state, payload) {
    state.commit('setPlayListItem', payload)
  },
}
