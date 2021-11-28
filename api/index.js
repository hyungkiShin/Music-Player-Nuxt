import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.baseURL,
})

function fetchMusicItems() {
  return instance.get(`/musics`)
}

export {
  fetchMusicItems,
}
