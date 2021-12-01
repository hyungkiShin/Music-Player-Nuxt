export default function ({ store, route, query, redirect }) {
  return route.path === '/' ? store.commit('setIsIntro', true) : ''
}
