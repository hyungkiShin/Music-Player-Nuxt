<template>
  <article class="contents-search">
    <div class="search-controller">
      <input
        v-model="searchInput"
        class="search-input"
        type="text"
        placeholder="검색"
      />
      <button class="search-button">
        <i class="icon-search-controller"></i>
      </button>
    </div>
    <ul v-if="searchData.length" class="music-list">
      <li v-for="(item, index) in searchData" :key="item.id">
        <div class="music-content">
          <div class="music-data">
            <div class="music-cover">
              <img :src="`${item.cover}`" />
            </div>
            <div class="music-info">
              <strong class="music-title">{{ item.title }}</strong>
              <em class="music-artist">{{ item.artists[0] }}</em>
            </div>
          </div>
          <div class="music-simple-controller" data-index="0">
            <button
              :class="isClass(index)"
              @click="handlerPlayMusic(item, index)"
            >
              <span class="invisible-text">재생</span>
            </button>
            <button class="icon icon-plus">
              <span class="invisible-text">추가</span>
            </button>
          </div>
        </div>
      </li>
    </ul>
    <ul v-else class="music-list empty-list">
      No results were found for your search. please search again
    </ul>
  </article>
</template>

<script>
import playMusic from '~/mixins/playMusic'
export default {
  mixins: [playMusic],
  data() {
    return {
      searchInput: '',
      searchData: [],
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
    searchInput(query) {
      if (!query) {
        return (this.searchData = [])
      }
      this.searchData = this.items.filter((music) => {
        const { artists, title } = music
        const upperCaseQuery = query.toUpperCase()
        // 아티스트를 찾습니다.
        const filteringName = artists.some((artist) =>
          artist.toUpperCase().includes(upperCaseQuery)
        )
        // 제목을 찾습니다.
        const filteringTitle = title.toUpperCase().includes(upperCaseQuery)

        return filteringName || filteringTitle
      })
    },
  },
}
</script>

<style>
.empty-list {
  display: flex;
  justify-content: center;
  color: darkgray;
  padding: 10%;
}
</style>
