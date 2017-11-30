<template>
  <div class="listview" v-if="data">
    <div class="singer-title">热门歌手</div>
    <scroll ref="scroll" class="listview" :data="data" :listenScroll="listenScroll" @scroll="scroll" :probeType="probeType">
        <ul>
            <li class="list-group" @click="selectItem(item)" v-for="(item,index) in data" ref="listGroup" :class="{'current':currentIndex === index}">
                <div class="list-group-item">
                    <img class="avatar" v-lazy="item.picUrl" @load="loadImage"/>
                    <span class="name">{{item.name}}</span>
                </div>
            </li>
        </ul>
    </scroll>
  </div>
</template>
<script type="text/ecmascript-6">
import scroll from 'base/scroll/scroll.vue'
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      listenScroll: true,
      listHeight: []
    }
  },
  created() {
    this.probeType = 3
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    scroll(pos) {
      this.scrollY = pos.y
    },
    _calculateHeight() {
      this.listHeight = []
      let height = 0
      let listHeight = this.listHeight
      listHeight.push(height)
      const array = this.$refs.listGroup
      for (let i = 0; i < array.length; i++) {
        let item = array[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    loadImage() {
      if (!this.checkLoading) {
        this.$refs.scroll.refresh()
        this.checkLoading = true
      }
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      // 处于顶部
      if (newY > 0) {
        this.currentIndex = 0
      }
      // 处于中间
      for (let i = 0; i < listHeight.length; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (!height2 || ((-newY) >= height1 && (-newY) < height2)) {
          this.currentIndex = i
          return
        }
      }
      // 处于底部
      this.currentIndex = listHeight.length - 2
    }
  },
  components: {
    scroll
  }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/variable"
  .singer-title
    height: 30px
    line-height: 30px
    padding-left: 20px
    font-size: $font-size-small
    color: $color-text-l
    background: $color-highlight-background
  .listview
    position: relative
    width: 100%
    height: 100%
    overflow: hidden
    background: $color-background
    .list-group
      padding-bottom: 30px
      .list-group-item
        display: flex
        align-items: center
        padding: 20px 0 0 30px
        .avatar
          display: inline-block
          width: 50px
          height: 50px
          border-radius: 50%
        .name
          margin-left: 20px
          color: $color-text-l
          font-size: $font-size-medium
    .list-shortcut
      position: absolute
      z-index: 30
      right: 0
      top: 50%
      transform: translateY(-50%)
      width: 20px
      padding: 20px 0
      border-radius: 10px
      text-align: center
      background: $color-background-d
      font-family: Helvetica
      .item
        padding: 3px
        line-height: 1
        color: $color-text-l
        font-size: $font-size-small
        &.current
          color: $color-theme
    .list-fixed
      position: absolute
      top: 0
      left: 0
      width: 100%
      .fixed-title
        height: 30px
        line-height: 30px
        padding-left: 20px
        font-size: $font-size-small
        color: $color-text-l
        background: $color-highlight-background
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>

