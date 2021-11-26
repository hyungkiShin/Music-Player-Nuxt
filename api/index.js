import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.baseURL,
})
function fetchMusicItems() {
  console.log('instance',instance)
  return instance.get(`/musics`)
}


export {
  fetchMusicItems,
}
