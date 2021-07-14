import http from '@/utils/request'
export const reqGetSuggestions = (q) => {
  return http({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q // q就是搜索的关键词
    }
  })
}

// 搜索结果
// eslint-disable-next-line camelcase
export const reqGetSearchResult = (page, per_page, q) => {
  return http({
    method: 'get',
    url: '/v1_0/search',
    params: {
      page, // 页数
      per_page, // 每页条数
      q // 搜索的关键词
    }
  })
}
