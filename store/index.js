import { fetchMusicItems } from '~/api'

export const state = () => ({
  musicItems: [],
  musicFlag: [],
  playList: [],
})

export const mutations = {
  addMusicToPlayList(state, item) {
    state.playList.push(item)
  },
  setMusics(state, musicItems) {
    state.musicItems = musicItems
  },
  setMusicFlag(state, musicFlag) {
    state.musicFlag = musicFlag
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
    const musicFlag = items.map((v) => {
      variable = { isPause: (v.isPause = false) }
      return variable
    })
    console.log('data', musicFlag)

    storeContext.commit('setMusics', items)
    storeContext.commit('setMusicFlag', musicFlag)
  },
}
