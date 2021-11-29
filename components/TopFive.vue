<template>
  <article class="contents-top5">
    <div class="top5-roof">
      <img src="/Logo.png" />
    </div>
    <ol class="top5-list">
      <li v-for="(item, index) in items" :key="item.id">
        <div class="music-rank">{{ `${index + 1}` }}</div>
        <div class="music-content">
          <div class="music-data">
            <div class="music-cover">
              <img :src="(`${item.cover}`)" />
            </div>
            <div class="music-info">
              <strong class="music-title">{{ item.title }}</strong>
              <em class="music-artist">{{ item.artists[0] }}</em>
            </div>
          </div>
          <div class="music-simple-controller">
            <button
              :class="isClass(index)"
              @click="handlerPlayMusic(item, index, 'M')"
            >
              <span class="invisible-text">재생</span>
            </button>
            <button class="icon icon-plus" @click="handlerAddMusic(item)">
              <span class="invisible-text">추가</span>
            </button>
          </div>
        </div>
      </li>
    </ol>
  </article>
</template>

<script>
import playMusic from '~/mixins/playMusic'
export default {
  mixins: [playMusic],
}
</script>
