<template>
  <div class="articleList" @scroll="record" ref="articleList">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title" @click="goToArticle(item.art_id.toString())">
          <template #label>
            <van-grid :column-num="item.cover.images.length">
              <van-grid-item v-for="(img, index) in item.cover.images" :key="index">
                <van-image :src="img" lazy-load/>
              </van-grid-item>
            </van-grid>

            <!-- 文字说明 -->
            <div class="meta">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }} 评论</span>
              <span>{{ item.pubdate | relativeTime }}</span>
            </div>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticleList } from '@/api/channel'

export default {
  name: 'ArticleList',
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      refreshing: false,
      loading: false,
      finished: false,
      articleList: [],
      //     art_id: BigNumber
      //     aut_id: 1
      //     aut_name: "bfbfdbf"
      //     ch_id: 3
      //     collect_count: 4
      //     comm_count: 0
      //     cover: {type: 0, images: Array(0)}
      //     is_top: 0
      //     like_count: 5
      //     pubdate: "2020-11-10T16:08:56"
      //     title: "111999999"
      pre_timestamp: undefined,
      scrollTop: 0
    }
  },
  activated () {
    this.$refs.articleList.scrollTop = this.scrollTop
  },
  methods: {
    record (e) {
      this.scrollTop = e.target.scrollTop
    },
    goToArticle (id) {
      this.$router.push({
        name: 'article',
        params: {
          id
        }
      })
    },
    onRefresh () {
      // 清空列表数据
      this.finished = false
      this.articleList = []
      this.pre_timestamp = undefined

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
      this.onLoad()
    },
    async onLoad () {
      // 异步更新数据
      if (!this.pre_timestamp) {
        this.pre_timestamp = +new Date()
      }
      const {
        data: { results },
        // eslint-disable-next-line camelcase
        pre_timestamp
      } = await reqGetArticleList(this.id, this.pre_timestamp)

      if (this.refreshing) {
        this.refreshing = false
      }

      this.articleList.push(...results)
      // eslint-disable-next-line camelcase
      this.pre_timestamp = pre_timestamp
      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (!results.length) {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.articleList {
  height: 100%;
  overflow: auto;

  ::v-deep {
    .meta {
      span {
        margin-right: 5px;
      }
    }
  }
}
</style>
