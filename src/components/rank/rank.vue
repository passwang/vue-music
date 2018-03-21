<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" ref="toplist" :data="topList">
      <ul>
        <li  class="item" v-for="item in topList" @click="selectItem(item)">
          <div class="icon">
            <img width="100" height="100" v-lazy="item.coverImgUrl"/>
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song,index) in item.tracks">
              <span>{{index + 1}}</span>
              <span>{{song.name}}-{{song.artists[0].name}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
import axios from 'axios'
import scroll from 'base/scroll/scroll.vue'
import loading from 'base/loading/loading.vue'
import {mapMutations} from 'vuex'
const ERR_OK = 200
export default {
  data() {
    return {
      topList: Array,
      default: []
    }
  },
  created() {
    this._getTopList()
  },
  methods: {
    _getTopList() {
      let list = []
      for (let i = 0; i < 8; i++) {
        axios.get(`api/top/list?idx=${i}`).then(res => {
          if (res.data.code === ERR_OK) {
            list.push(res.data.result)
          }
        })
      }
      this.topList = list
      console.log(this.topList)
    },
    selectItem(item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    ...mapMutations({
      setTopList: 'SET_TOP_LIST'
    })
  },
  components: {
    scroll,
    loading
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      .item
        display: flex
        margin: 0 20px
        padding-top: 20px
        height: 100px
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-d
          font-size: $font-size-small
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>

