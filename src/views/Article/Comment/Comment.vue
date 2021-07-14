<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636;">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px;">{{ item.pubdate | relativeTime }}</span>
            <van-button size="mini" type="default" @click="showCommentReplyComponent(item)">回复 {{ item.reply_count }} </van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model="commentText"
      >
        <van-button slot="button" size="mini" type="info" @click="postAComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { reqAddComment, reqGetArticleComments } from '@/api/article'

export default {
  name: 'Comment',
  props: {
    id: {
      type: [Number, String]
    }
  },
  data () {
    return {
      list: [], // 评论列表
      // aut_id:Object
      // aut_name:"阿虎阿"
      // aut_photo:"http://toutiao-img.itheima.net/FsLQtwVpaHxAg3FtXqT64Rutr1CT"
      // com_id:Object
      // content:"343"
      // is_liking:false
      // is_top:0
      // like_count:0
      // pubdate:"2021-07-12T16:06:31"
      // reply_count:0
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      commentText: ''
    }
  },

  methods: {
    showCommentReplyComponent (item) {
      // 通知Article(父组件)显示回复评论的弹出层组件
      this.$emit('showCommentReplyComponent', item)
      // 将评论的id传给评论回复组件
    },
    async postAComment () {
      if (this.commentText.trim().length === 0) {
        this.$toast.fail('评论内容不能为空')
        this.commentText = ''
      }
      // eslint-disable-next-line camelcase
      const { data: { new_obj } } = await reqAddComment(this.id, this.commentText.trim())
      this.list.unshift(new_obj)
      this.commentText = ''
    },
    async onLoad () {
      // eslint-disable-next-line camelcase
      const { data: { last_id, results } } = await reqGetArticleComments('a', this.id, this.offset)
      // eslint-disable-next-line camelcase
      this.offset = last_id
      this.list.push(...results)
      this.loading = false

      if (!results.length) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='scss'>
// 发表评论的区域是固定在下端的
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}
// 给发表评论区空出地方
.van-list {
  margin-bottom: 45px;
}
</style>
