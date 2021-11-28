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
    <ul class="music-list">
      <li v-for="item in searchData" :key="item.id">
        <div class="music-content">
          <div class="music-data">
            <div class="music-cover">
              <img :src="require(`~/assets${item.cover}`)" />
            </div>
            <div class="music-info">
              <strong class="music-title">{{ item.title }}</strong>
              <em class="music-artist">{{ item.artists[0] }}</em>
            </div>
          </div>
          <div class="music-simple-controller" data-index="0">
            <button class="icon icon-play">
              <span class="invisible-text">재생</span>
            </button>
            <button class="icon icon-plus">
              <span class="invisible-text">추가</span>
            </button>
          </div>
        </div>
      </li>
    </ul>
  </article>
</template>

<script>
export default {
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
  methods: {},
}
</script>

<style></style>
