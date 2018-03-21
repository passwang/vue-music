import * as types from './mutation-type.js'
const matutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DESC](state, desc) {
    state.desc = desc
  },
  [types.SET_TOP_LIST](state, toplist) {
    state.toplist = toplist
  },
  [types.SET_HISTORY](state, history) {
    state.searchHistory = history
  }
}
export default matutations