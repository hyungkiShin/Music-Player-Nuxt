<template>
  <article class="contents-playlist">
    <h2 class="playlist-title">MY PLAYLIST</h2>
    <ul class="music-list">
      <li
        v-for="(item, index) in playListItems"
        :key="item.id"
      >
        <div class="music-content">
          <div class="music-data" @click="onViewMusic(index)">
            <div class="music-cover">
              <img :src="`${item.cover}`" />
            </div>
            <div class="music-info">
              <strong class="music-title">{{ item.title }}</strong>
              <em class="music-artist">{{ item.artists[0] }}</em>
            </div>
          </div>
          <div class="music-simple-controller">
            <button class="icon icon-minus" @click="removeMusic(index)">
              <span class="invisible-text">제거</span>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </article>
</template>

<script>
import playMusic from '~/mixins/playMusic'

export default {
  mixins: [playMusic],
  computed: {},
  created() {
    return this.$store.dispatch('getPlayListItems')
  },
  methods: {
    removeMusic(index) {
      this.$store.commit('removeMusicToPlayList', index)
    },
    onViewMusic(index) {
      this.$router.push({ name: 'PlayView', query: { index } })
    },
  },
}
</script>

<style></style>
