<template>
  <article class="contents-search">
    <div class="search-controller">
      <input class="search-input" type="text" placeholder="검색" />
      <button class="search-button">
        <i class="icon-search-controller"></i>
      </button>
    </div>
    <ul v-for="(item, index) in items" key="item.id" class="music-list">
      <li>
        <div class="music-content">
          <div class="music-data">
            <div class="music-cover">
              <img :src="require(`~/assets${item.cover}`)" />
            </div>
            <div class="music-info">
              <strong class="music-title">Where We Wanna Go</strong>
              <em class="music-artist">Patrick Patrikios</em>
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

      <li>
        <div class="music-content">
          <div class="music-data">
            <div class="music-cover">
              <!-- <img src="../APIs/public/images/cover/all_the_fixings.png" /> -->
            </div>
            <div class="music-info">
              <strong class="music-title">All the Fixings</strong>
              <em class="music-artist">Zachariah Hickman</em>
            </div>
          </div>
          <div class="music-simple-controller" data-index="1">
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
      items: []
    }
  },
}
</script>

<style></style>
