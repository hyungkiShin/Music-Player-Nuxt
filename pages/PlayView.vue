<template>
  <article class="play-view">
    <div class="play-view-container">
      <h2 class="invisible-text">Play View</h2>
      <button class="back-button" @click="goHome">
        <i class="icon-controller-back"></i>
      </button>
      <div v-if="item">
        <div class="cover-wrapper">
          <img :src="(`${item.cover}`)" />
        </div>
        <div class="music-information">
          <h3 class="music-title">{{ item.title }}</h3>
          <span class="music-artist-name">{{ item.artists[0] }}</span>
        </div>
        <div class="play-view-controller">
          <div class="controller-container">
            <button class="control-button control-repeat">
              <i class="icon-controller-repeat"></i>
            </button>
            <button class="control-button control-backward">
              <i class="icon-controller-backward"></i>
            </button>
            <button
              class="control-button control-play"
              @click="handlerPlayMusic(item)"
            >
              <i class="icon-controller-play"></i>
            </button>
            <button class="control-button control-pause hide">
              <i class="icon-controller-pause"></i>
            </button>
            <button class="control-button control-forward">
              <i class="icon-controller-forward"></i>
            </button>
            <button class="control-button control-rotate">
              <i class="icon-controller-rotate"></i>
            </button>
          </div>
          <div class="progress-container">
            <input class="progress" type="range" min="0" max="1000" value="0" />
            <div class="progress-time">
              <div class="current-time">1:43</div>
              <div class="end-time">3:16</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
import playMusic from '~/mixins/playMusic'
export default {
  mixins: [playMusic],
  asyncData({ store, query }) {
    const { state } = store
    if (query) {
      const item = state.playList[query.index]
      return { item }
    }
  },
  methods: {
    goHome() {
      this.$router.push('/')
    },
    playMusic() {},
  },
}
</script>

<style></style>
