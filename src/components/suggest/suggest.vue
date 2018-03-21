<template>
  <scroll ref="suggest"
          class="suggest"
          :data="result"
          :pullup="pullup"
           :beforeScroll="true"
          @scrollToEnd="searchMore"
          @beforescroll="listScroll"
          >
    <ul class="suggest-list">
      <li  class="suggest-item" v-for="item in result" @click="selectItem(item)">
        <div class="icon">
          <i :class="getCls(item)"></i>
        </div>
        <div class="name">
          <p class="text">{{item.name}}</p>
        </div>
      </li>
      <!-- <loading title=""></loading> -->
    </ul>
    <!-- <div class="no-result-wrapper" v-show="false">
      <no-result title="抱歉，暂无搜索结果"></no-result>
    </div> -->
  </scroll>
</template>

<script type="text/ecmascript-6">
  import scroll from 'base/scroll/scroll'
  import loading from 'base/loading/loading'
  import NoResult from 'base/no-result/no-result'
  import {mapMutations, mapActions} from 'vuex'
//   import Singer from 'common/js/singer'
  // import axios from 'axios'
//   const TYPE_SINGER = 'singer'
//   const perpage = 20
// const ERR_OK = 200

  export default {
    props: {
      query: {
        type: String,
        default: ''
      },
      result: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        list: [],
        pullup: true,
        hasMore: true
      }
    },
    created () {
    },
    methods: {
      ...mapMutations({
        setSinger: 'SET_SINGER'
      }),
      ...mapActions([
        'insertSong'
      ]),
      listScroll() {
        this.$emit('listScroll')
      },
      refresh() {
        this.$refs.suggest.refresh()
      },
      selectItem(item) {
        if (item.type === 'singer') {
          this.$router.push({
            path: `search/${item.id}`
          })
          this.setSinger(item)
        } else if (item.type === 'song') {
          console.log(item)
          this.insertSong(item)
        } else {
          this.$router.push({
            name: 'search',
            params: {
              id: item.id
            }
          })
        }
        this.$emit('select')
      },
      searchMore() {
        // if (!this.hasMore) {
        //   return
        // }
      },
      getCls(item) {
        if (item.type === 'singer') {
          return 'icon-mine'
        } else {
          return 'icon-music'
        }
      }
    },
    watch: {
      query() {
        this.search()
      }
    },
    components: {
      scroll,
      loading,
      NoResult
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 0 30px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 20px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-text-d
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-d
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>