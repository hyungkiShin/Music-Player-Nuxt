import { fetchMusicItems } from '~/api'

export const state = () => ({
  musicItems: [],
  musicPlayIns: [],
  playList: [],
})

export const mutations = {
  addMusicToPlayList(state, item) {
    state.playList.push(item)
  },
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
    console.log('data', musicPlayIns)

    storeContext.commit('setMusics', items)
    storeContext.commit('musicPlayIns', musicPlayIns)
  },
}
