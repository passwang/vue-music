<template>
 <transition name="slide">
   <div class="singer-detail">
       <musicList :songs="songs" :title="title" :bgImage="bgImage"></musicList>
   </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import {createSong} from 'common/js/song.js'
import {mapGetters} from 'vuex'
import musicList from 'components/music-list/music-list.vue'
import axios from 'axios'
const ERR_OK = 200
export default {
  data() {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.picUrl
    }
  },
  created() {
    this.getSingerDeatil()
  },
  methods: {
    getSingerDeatil() {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      axios.get(`api/artists?id=${this.singer.id}`).then(res => {
        console.log(res)
        if (res.data.code === ERR_OK) {
          this.songs = this._nomalizeSinger(res.data.hotSongs)
        }
      })
    },
    _nomalizeSinger(list) {
      console.log(list)
      let ret = []
      list.forEach(e => {
        let musicData = e
        if (musicData.id && musicData.al.id) {
          ret.push(createSong(musicData))
        }
      })
      console.log(ret)
      return ret
    }
  },
  components: {
    musicList
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
 .singer-detail
    position: fixed
    top: 0
    left: 0
    bottom : 0
    right: 0
    z-index: 100
    background: $color-background
 .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>


