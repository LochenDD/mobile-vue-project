import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Vue from 'vue'
import cn from 'dayjs/locale/zh-cn'

dayjs.extend(relativeTime)
dayjs.locale(cn)

Vue.filter('relativeTime', (val) => {
  return dayjs(val).fromNow()
})
