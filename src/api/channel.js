// 频道模块
import http from '@/utils/request'
export const reqGetUserChannels = () => {
  return http({
    method: 'get',
    url: '/v1_0/user/channels'
  })
}

// 获取新闻列表
// eslint-disable-next-line camelcase
export const reqGetArticleList = (channel_id, timestamp) => {
  return http({
    method: 'get',
    url: '/v1_1/articles',
    // 传参 params
    params: {
      channel_id, // 频道的id
      timestamp, // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
      // 指定时间戳会在上一次请求回来后,返回的数据中有这个指定时间戳字段
      with_top: 1 // 是否有置顶类的文章
    }
  })
}

// 如果服务器炸啦群里@我一下备用的请求新闻列表接口
// export const reqGetArticleList = (channel_id, timestamp) => {
//   return http({
//     method: 'get',
//     url: '/v1_0/articles',
//     // 传参 params
//     params: {
//       channel_id, // 频道的id
//       timestamp, // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
//       // 指定时间戳会在上一次请求回来后,返回的数据中有这个指定时间戳字段
//     }
//   })
// }

// 获取所有频道列表
export const reqGetAllChannels = () => {
  return http({
    method: 'get',
    url: '/v1_0/channels'
  })
}
// 频道重置式接口
export const reqUpdateChannels = (channels) => {
  return http({
    // 请求方式 get delete post  put patch
    // get和delete传参 params
    // put(更新) pacth(打补丁更新) post 携带参数 data
    method: 'put',
    url: '/v1_0/user/channels',
    data: {
      channels // channels要求格式 数组包对象 [{id:xxx, seq:xxx},{id:xxx, seq:xxx}] id频道id seq频道的索引
    }
  })
}
