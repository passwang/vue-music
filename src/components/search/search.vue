<template>
  <div class="search">
     <div class="search-box-wrapper">
      <searchBox ref="searchBox" placeHolder=" " @query="onQueryChange"></searchBox>
    </div>
    <div ref="shortcutWrapper" class="shortcut-wrapper">
      <scroll  ref="shortcut" class="shortcut" :data="shortcut">
        <div>
          <div class="search-history" v-show="history.length">
            <h1 class="title">
              <span class="text">搜索历史</span>
              <span class="clear" @click="showConfirm">
                <i class="icon-clear"></i>
              </span>
            </h1>
            <search-list @delete="deleteOne" :searches="history"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result"  ref="searchResult">
      <suggest  ref="suggest" :query="query" :result="newResult" @listScroll="blurInput" @select="saveSearch"></suggest>
    </div>
     <confirm ref="confirm" @confirm="clearSearchHistory" text="是否清空所有搜索历史" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>
<script type="text/ecmascript-6">
  import searchBox from 'base/searchBox/searchBox.vue'
  import scroll from 'base/scroll/scroll.vue'
  import suggest from 'components/suggest/suggest.vue'
  import {filterSinger} from 'common/js/song.js'
  import {mapActions, mapGetters} from 'vuex'
  import searchList from 'base/search-list/search-list'
  import confirm from 'base/confirm/confirm'
  import axios from 'axios'
  import {playlistMixin} from 'common/js/mixin'
  const ERR_OK = 200
  export default {
    mixins: [playlistMixin],
    props: {
      query: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        newResult: []
      }
    },
    computed: {
      shortcut() {
        return this.history
      },
      ...mapGetters([
        'history'
      ])
    },
    methods: {
      handlePlaylist(playlist) {
        const bottom = playlist.length > 0 ? '60px' : '0'
        this.$refs.shortcutWrapper.style.bottom = bottom
        this.$refs.searchResult.style.bottom = bottom
        this.$refs.shortcut.refresh()
        this.$refs.suggest.refresh()
      },
      showConfirm() {
        this.$refs.confirm.show()
      },
      deleteAll() {
        this.clearSearchHistory()
      },
      deleteOne(item) {
        this.deleteSearchHistory(item)
      },
      blurInput() {
        this.$refs.searchBox.blur()
      },
      saveSearch() {
        this.saveSearchHistory(this.query)
      },
      onQueryChange(newQuery) {
        axios.get(`api/search/suggest?keywords=${newQuery}`).then(res => {
          if (res.data.code === ERR_OK) {
            console.log(res.data.result)
            this.newResult = this._nomalizeSinger(res.data.result)
            // console.log(this.newResult)
          }
        })
      },
      _nomalizeSinger(list) {
        let ret = []
        if (list.artists) {
          list.artists.forEach(e => {
            ret.push({id: e.id, name: e.name, type: 'singer', picUrl: e.picUrl})
          })
        }
        if (list.songs) {
          list.songs.forEach(e => {
            ret.push({id: e.id,
              singer: filterSinger(e.artists),
              name: e.name,
              type: 'song',
              duration: e.duration,
              image: e.artists[0].img1v1Url})
          })
        }
        if (list.albums) {
          list.albums.forEach(e => {
            ret.push({id: e.id, name: e.name, type: 'album'})
          })
        }
        if (list.mvs) {
          list.mvs.forEach(e => {
            ret.push({id: e.id, name: e.name})
          })
        }
        if (list.playlists) {
          list.playlists.forEach(e => {
            ret.push({id: e.id, name: e.name, type: 'playlist'})
          })
        }
        return ret
      },
      ...mapActions([
        'saveSearchHistory',
        'deleteSearchHistory',
        'clearSearchHistory'
      ])
    },
    watch: {
      query(newQuery) {
        if (!newQuery) {
          setTimeout(() => {
            this.$refs.shortcut.refresh()
          }, 20)
        }
      }
    },
    components: {
      searchBox,
      scroll,
      suggest,
      searchList,
      confirm
    }
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable"
  @import "../../common/stylus/mixin"
  .search
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 178px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 20px
            font-size: $font-size-medium
            color: $color-text-l
          .item
            display: inline-block
            padding: 5px 10px
            margin: 0 20px 10px 0
            border-radius: 6px
            background: $color-highlight-background
            font-size: $font-size-medium
            color: $color-text-d
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 178px
      bottom: 0
</style>

