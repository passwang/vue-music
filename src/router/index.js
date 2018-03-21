import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/recommend/recommend'
import Rank from 'components/rank/rank'
import Search from 'components/search/search'
import Singer from 'components/singer/singer'
import Disc from 'components/disc/disc'
import toplist from 'components/toplist/toplist'
import singerDetail from 'components/singer-detail/singer-detail'
// import musicList from 'components/music-list/music-list'
// import searchDisc from 'components/searchDisc/searchDisc'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/rank',
      component: Rank,
      children: [
        {
          path: ':id',
          component: toplist
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      name: 'search',
      children: [
        // {
        //   path: '/search/singerDetail:id',
        //   component: singerDetail
        // },
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    }
  ]
})
