// 文章模块的接口
import http from '@/utils/request'
// 不感兴趣接口
export const reqDisLikeArticle = (target) => {
  return http({
    method: 'post',
    url: '/v1_0/article/dislikes',
    // post携带参数使用data
    data: {
      target // 不喜欢的文章id
    }
  })
}

// 举报文章
export const reqReportArticle = (target, type) => {
  return http({
    method: 'post',
    url: '/v1_0/article/reports',
    data: {
      target, // 不喜欢的文章id
      type, // 举报类型： 0-其他问题，1-标题夸张，2-低俗色情，3-错别字多，4-旧闻重复，5-广告软文，6-内容不实，7-涉嫌违法犯罪，8-侵权'
      remark: '' // 举报的反馈内容
    }
  })
}

// 新闻详情
export const reqGetArticleInfo = (id) => {
  return http({
    method: 'get',
    url: `/v1_0/articles/${id}`
  })
}
// 文章评论列表
export const reqGetArticleComments = (type, source, offset) => {
  return http({
    method: 'get',
    url: '/v1_0/comments',
    params: {
      type, // a表示获取文章评论列表 c表示获取评论的回复列表
      source, // 文章的id或者评论的id
      offset, // 获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
      limit: 10 // 返回的每页条数
    }
  })
}
// 新增评论
export const reqAddComment = (target, content, art_id = null) => {
  return http({
    method: 'post',
    url: '/v1_0/comments',
    data: {
      target, // 评论的目标id（评论文章即为文章id，对评论进行回复则为评论id）
      content, // 评论内容
      art_id // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
    }
  })
}

// 移动端分页
// 时间戳  第一次传最新的时间戳, 下一次传指定的时间戳
// pagenum  page++自增  per_page
// offset 第一次传递null, 只要请求回来数据,会返回一个last_id, 下一次请求传递这个last_id即可 limit 每页的条数
