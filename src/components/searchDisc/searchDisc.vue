<template>
   <transition name="slide">
    <musicList :songs='songs' :title="title" :bgImage="bgImg"></musicList>
  </transition>
</template>
<script type="text/ecmascript-6">
import musicList from 'components/music-list/music-list.vue'
import {mapGetters} from 'vuex'
import {createSong} from 'common/js/song.js'
import axios from 'axios'
const ERR_OK = 200
export default {
  computed: {
    title() {
      return this.desc.name
    },
    bgImg() {
      return this.desc.picUrl
    },
    ...mapGetters([
      'desc'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getDesc()
  },
  methods: {
    _getDesc() {
      if (!this.desc.id) {
        this.$router.push('/recommend')
      }
      axios.get(`api/playlist/detail?id=${this.desc.id}`).then(res => {
        if (res.data.code === ERR_OK) {
          let musicData = res.data.playlist.tracks
          this.songs = this._normalize(musicData)
          console.log(this.songs)
        }
      })
    },
    _normalize(list) {
      let ret = []
      list.forEach(item => {
        if (item.id && item.al.id) {
          ret.push(createSong(item))
        }
      })
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>


