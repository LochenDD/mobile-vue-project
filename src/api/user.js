// 用户接口的封装
import http from '@/utils/request'
import store from '@/store/store'
// req + 功能
// 加了{ } { } 内一定要return
export const reqLogin = data =>
  http({
    method: 'post',
    url: '/v1_0/authorizations',
    data
  })
// 获取用户信息
export const reqGetUserInfo = () =>
  http({
    url: '/v1_0/user/profile',
    method: 'get'
    // headers 可以自定义请求头信息
    // headers: {
    //   // Bearer + 空格 + token信息
    //   Authorization: `Bearer ${store.state.user.tokenInfo.token}`
    // }
  })

// 获取用户粉丝列表
export const reqGetUserFans = () => http({
  method: 'get',
  url: '/v1_0/user/followers'
  // headers 可以自定义请求头信息
  // headers: {
  //   // Bearer + 空格 + token信息
  //   Authorization: `Bearer ${store.state.user.tokenInfo.token}`
  // }
})
// 关注
export const reqFollowUser = (target) => {
  return http({
    method: 'post',
    url: '/v1_0/user/followings',
    data: {
      target // 关注用户的id
    }
  })
}
// 取关
export const reqUnFollowUser = (target) => {
  return http({
    method: 'delete',
    url: `/v1_0/user/followings/${target}` // 取关的作者id
  })
}

// 刷新token
export const reqGetNewToken = () => {
  return http({
    method: 'put',
    url: '/v1_0/authorizations',
    // 单独配置headers, 挂载refresh_token
    headers: {
      Authorization: `Bearer ${store.state.user.tokenInfo.refresh_token}`
    }
  })
}

// 获取用户自己信息
export const reqGetUserProfile = () => {
  return http({
    method: 'get',
    url: '/v1_0/user'
  })
}

// 更新用户资料
export const reqUpdateUserProfile = (obj) => {
  return http({
    method: 'patch',
    url: '/v1_0/user/profile',
    data: obj
  })
}

// 更新头像
export const reqUpdateUserPhoto = formData =>
  http({
    method: 'PATCH',
    url: '/v1_0/user/photo',
    data: formData
  })
