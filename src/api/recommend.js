import jsonp from 'common/js/jsonp'
import {
  options
} from './config'
export function getRecommend() {
  const url = 'http://192.168.8.21:3000/personalized/newsong'
  const data = Object.assign({}, {
  })
  return jsonp(url, data, options)
}
export function getDescList() {
  const url = 'http://192.168.8.21:3000/personalized'
  const data = Object.assign({}, {
  })
  return jsonp(url, data, options)
}
