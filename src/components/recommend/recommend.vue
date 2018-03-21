<template>
  <div class="recommend" ref="recommend">
     <scroll ref='scroll' class="recommend-content" :data="descList">
       <div>
        <div v-if="recommends.length" class="slider-wrapper" ref='sliderWrapper'>
          <slider>
            <div v-for="item in recommends">
              <a :href="item.url">
                <img :src="item.pic" class="needsclick" @load="loadImage">
              </a>
            </div>
          </slider>
        </div>
        <!-- 歌单推荐列表 -->
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li class="item" v-for="item in descList" @click="selectItem(item)">
              <div class="icon">
                <img  width="60" height="60" v-lazy="item.picUrl">
              </div>
              <div class="text">
                <p class="name">{{item.name}}</p>
                <p class="desc">{{item.copywriter}}</p>
              </div>
            </li>
          </ul>
        </div>
      <!-- loading 组件 -->
      <div class="loading-container" v-show="!this. descList.length">
        <loading></loading>
      </div>
      </div>
      </scroll>
      <router-view></router-view>
    </div>
</template>
<script type="text/ecmascript-6">
import slider from 'base/slider/slider.vue'
import scroll from 'base/scroll/scroll.vue'
import loading from 'base/loading/loading.vue'
import {mapMutations} from 'vuex'
import axios from 'axios'
const ERR_OK = 200
export default {
  data() {
    return {
      recommends: [],
      descList: []
    }
  },
  created() {
    this._getRecommend()
    this._getDescList()
  },
  methods: {
    _getRecommend() {
      axios.get('/api/banner').then(res => {
        if (res.data.code === ERR_OK) {
          this.recommends = res.data.banners
        }
      })
    },
    _getDescList() {
      axios.get('/api/personalized').then(res => {
        if (res.data.code === ERR_OK) {
          this.descList = res.data.result
          console.log(this.descList)
        }
      })
    },
    loadImage() {
      if (!this.checkLoading) {
        this.$refs.scroll.refresh()
        this.checkLoading = true
      }
    },
    selectItem(item) {
      this.$router.push({
        path: `/recommend/${item.id}`
      })
      this.setDesc(item)
    },
    ...mapMutations({
      setDesc: 'SET_DESC'
    })
  },
  components: {
    slider,
    scroll,
    loading
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      position: relative
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        height: 100%
        overflow: hidden
        .slider
          width: 100%
          height: 200px
      .recommend-list
        position: relative
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        transform: translateY(-50%)
</style>

