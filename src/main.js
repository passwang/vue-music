// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import store from './store'
import 'common/stylus/index.styl'
import vueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false
fastclick.attach(document.body)
/* eslint-disable no-new */
Vue.use(vueLazyLoad, {
  loading: require('common/image/default.png')
})
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
