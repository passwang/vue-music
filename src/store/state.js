import {playMode} from 'common/js/config.js'
import {loadSearch} from 'common/js/cache.js'
const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  desc: {},
  toplist: {},
  searchHistory: loadSearch()
}
export default state