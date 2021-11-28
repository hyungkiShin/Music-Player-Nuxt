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
  addMusicToPlayList(state, item) {
    state.playList.push(item)
  },
  removeMusicToPlayList(state, index) {
    state.playList.splice(index, 1)
  }
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
}
