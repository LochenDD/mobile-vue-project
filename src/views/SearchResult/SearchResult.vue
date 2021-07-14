<template>
  <div class="search-result">
    <!-- 导航栏 -->
    <van-nav-bar
      :title="$route.params.keyword +  '的搜索结果'"
      left-arrow
      fixed
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 文章列表 -->
    <van-list
      class="article-list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.art_id.toString()"
        :title="item.title"
        @click="goArticle(item.art_id.toString())"
      />
    </van-list>
    <!-- /文章列表 -->
  </div>
</template>

<script>
import { reqGetSearchResult } from '@/api/search'
export default {
  name: 'SearchResult',
  data () {
    return {
      page: 1,
      pageNum: 10,
      list: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    goArticle (id) {
      this.$router.push({
        name: 'article',
        params: {
          id
        }
      })
    },
    async onLoad () {
      const keyword = this.$route.params.keyword
      const { data: { results } } = await reqGetSearchResult(this.page, this.pageNum, keyword)
      this.list.push(...results)
      this.page++

      this.loading = false

      if (!results.length) {
        this.finished = true
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.search-result {
  padding-top: 46px;
}
</style>
