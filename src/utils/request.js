import axios from 'axios'
import JSONB from 'json-bigint'
import store from '@/store/store'
import router from '@/router/router'
import { reqGetNewToken } from '@/api/user'

const http = axios.create({
  baseURL: 'http://toutiao-app.itheima.net',
  timeout: 5000,
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 大数字处理
      return JSONB.parse(data)
    } catch {
      // 返回的不是json就直接return
      return data
    }
  }]
})

// 添加请求拦截器
http.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.tokenInfo.token
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
http.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, async function (error) {
  // 对响应错误做点什么
  // eslint-disable-next-line camelcase
  const refresh_token = store.state.user.tokenInfo.refresh_token
  const { response: { status } } = error
  // token过期了
  if (status === 401) {
    // eslint-disable-next-line camelcase
    if (refresh_token) {
      const { data: { token } } = await reqGetNewToken()
      store.commit('user/setToken', token)
      error.config.headers.Authorization = ''
      return http(error.config)
    } else {
      router.push({
        name: 'login',
        query: {
          backTo: router.currentRoute.fullPath
        }
      })

      return
    }
  }
  // refresh_token过期了
  if (status === 403) {
    store.commit('user/emptyToken')
    router.push({
      name: 'login',
      query: {
        backTo: router.currentRoute.fullPath
      }
    })
  }
  return Promise.reject(error)
})

export default http
