<template>
  <div class="singer">
     <listview @select="selectSinger" :data="singers" v-if="singers"></listview>
     <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios'
import listview from 'base/listview/listview.vue'
import {mapMutations} from 'vuex'
const ERR_OK = 200
export default {
  data() {
    return {
      singers: []
    }
  },
  created() {
    this._getSinger()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSinger() {
      axios.get('api/top/artists?offset=0&limit=10').then(res => {
        // console.log(res)
        if (res.data.code === ERR_OK) {
          this.singers = res.data.artists
        }
      })
    }
  },
  components: {
    listview
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
    overflow: hidden
</style>

