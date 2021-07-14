<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div v-if="loading">
      <!-- 加载中 loading -->
      <van-loading class="article-loading" />
      <!-- /加载中 loading -->
    </div>

    <!-- 文章详情 -->
    <div class="detail" v-else>
      <h3 class="title">{{ article.title }}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{ article.aut_name }}</p>
          <p class="time">{{ article.pubdata | relativeTime }}</p>
        </div>
        <van-button
          v-if="!article.is_followed"
          round
          size="small"
          type="info"
          @click="follow(1)"
        >+ 关注</van-button>
        <van-button
          v-else
          round
          size="small"
          type="danger"
          @click="follow(0)"
        >取关</van-button>
      </div>
      <div class="content">
        <div v-html="article.content"></div>
      </div>
      <van-divider>END</van-divider>
      <div class="zan">
        <van-button round size="small" hairline type="primary" plain icon="good-job-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" hairline type="danger" plain icon="delete">不喜欢</van-button>
      </div>
    </div>
    <!-- /文章详情 -->

    <comment :id="$route.params.id" @showCommentReplyComponent="showCommentReplyComponent"></comment>

    <van-popup round  v-model="showCommentReply" position="bottom" :style="{ height: '80%' }" >
      <comment-reply v-if="showCommentReply" @closePopup="closePopup" :commentItem="commentItem" :article="article"></comment-reply>
    </van-popup>
  </div>
</template>

<script>
// push时传对象, params (写name传递) 就通过 this.$route.params获取
// push时传对象, query  (写path)     就通过 this.$route.query 获取
// 动态路由传参  /article/:id        this.$route.params 获取

import { reqGetArticleInfo } from '@/api/article'
import { reqFollowUser, reqUnFollowUser } from '@/api/user'
import Comment from '@/views/Article/Comment/Comment'
import CommentReply from '@/views/Article/CommentReply/CommentReply'

export default {
  name: 'Article',
  components: { CommentReply, Comment },
  data () {
    return {
      loading: true, // 控制加载中的 loading 状态
      article: {},
      // art_id: 12057
      // attitude: null
      // aut_id: 3
      // aut_name: "皮皮虾"
      // aut_photo: "http://toutiao-img.itheima.net/FrBhc78bCnsinQnUhk8jg4h-BCd5"
      // ch_id: 15
      // content: "<h2>一个有趣的问题：</h2>\n<p><strong>在 JavaScript 中， <co
      // is_collected: false
      // is_followed: false
      // pubdate: "2018-11-29T15:12:30"
      // recomments: []
      // title: "(a ==1 && a== 2 && a==3) 有可能是 true 吗？"
      showCommentReply: false,
      // 回复评论组件显示的评论
      commentItem: {}
    }
  },
  created () {
    const id = this.$route.params.id
    this.getArticleInfo(id)
  },
  methods: {
    closePopup () {
      this.showCommentReply = false
    },
    showCommentReplyComponent (item) {
      this.showCommentReply = true
      this.commentItem = item
    },
    async follow (v) {
      if (v) {
        await reqFollowUser(this.article.aut_id)
      } else {
        await reqUnFollowUser(this.article.aut_id)
      }
      this.article.is_followed = !this.article.is_followed
    },
    async getArticleInfo (id) {
      const { data } = await reqGetArticleInfo(id)
      this.article = data
      this.loading = false
    }
  }
}
</script>

<style lang='scss' scoped>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    font-size:14px;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    ::v-deep img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
</style>
