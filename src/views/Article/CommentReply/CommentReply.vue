<template>
  <div class="article-comments">
    <!-- 导航栏 -->
    <van-nav-bar :title="commentItem.reply_count + '条回复'">
      <van-icon slot="left" name="cross"  @click="closePopup"/>
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论 -->
    <van-cell title="当前评论">
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="commentItem.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{ commentItem.aut_name }}</span>
      <div slot="label">
        <p style="color: #363636;">{{ commentItem.content }}</p>
        <p>
          <span style="margin-right: 10px;">{{ commentItem.pubdate | relativeTime }}</span>
          <van-button
            size="mini"
            type="default"
          >回复</van-button>
        </p>
      </div>
      <van-icon slot="right-icon" />
    </van-cell>
    <!-- /当前评论 -->
    <van-divider>全部回复</van-divider>

    <!-- 对当前评论 回复列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="(item) in list"
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
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复列表 -->

    <!-- 发布回复 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入回复内容"
        v-model="replyContent"
      >
        <van-button
          slot="button"
          size="mini"
          type="info"
          @click="PostAReply"
        >发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布回复 -->
  </div>

</template>
<script>
import { reqGetArticleComments, reqAddComment } from '@/api/article'
export default {
  name: 'CommentReply',
  props: {
    commentItem: {
      type: Object
    },
    article: {
      type: Object
    }
  },
  data () {
    return {
      list: [], // 评论列表
      // aut_id:Object
      // aut_name:"勇敢牛牛_1"
      // aut_photo:"http://toutiao-img.itheima.net/FqqVGsQXC7lOJn5UxsvXLiKJLHZw"
      // com_id:Object
      // content:"你好"
      // is_liking:false
      // is_top:0
      // like_count:0
      // pubdate:"2021-07-13T10:51:06"
      // reply_count:0
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      replyContent: ''
    }
  },
  created () {
  },
  methods: {
    closePopup () {
      this.$emit('closePopup')
    },
    async PostAReply () {
      if (!this.replyContent.trim()) {
        this.$toast('评论内容不能为空')
        this.replyContent = ''
        return
      }
      // eslint-disable-next-line camelcase
      const { data: { new_obj } } = await reqAddComment(this.commentItem.com_id.toString(), this.replyContent.trim(), this.article.art_id.toString())
      this.list.unshift(new_obj)
    },
    async onLoad () {
      // eslint-disable-next-line camelcase
      const { data: { last_id, results } } = await reqGetArticleComments('c', this.commentItem.com_id.toString(), this.offset)
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
<style lang="scss" scoped>
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
