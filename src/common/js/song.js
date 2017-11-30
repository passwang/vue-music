export default class Song {
  constructor({
    id,
    singer,
    name,
    album,
    image,
    duration
  }) {
    this.id = id
    this.singer = singer
    this.name = name
    this.image = image
    this.album = album
    this.duration = duration
  }
}
export function createSong(musicData) {
  return new Song({
    id: musicData.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    album: musicData.al.name,
    image: musicData.al.picUrl,
    duration: musicData.dt
  })
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
