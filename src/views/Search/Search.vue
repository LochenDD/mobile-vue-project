<template>
  <div class="search">
    <!-- 搜索组件一级路由   $router.back()返回上一个页面-->
    <van-nav-bar
      left-arrow
      title="搜索中心"
      @click-left="$router.back()">
    </van-nav-bar>

    <!-- https://youzan.github.io/vant/#/zh-CN/search -->
    <van-search
      show-action
      placeholder="请输入搜索关键词"
      shape="round"
      v-model="keyword"
      @input="getSuggestions"
    >
      <template #action>
        <div @click="clickSearch">搜索</div>
      </template>
    </van-search>

    <!-- 联想建议 -->
    <van-cell-group v-if="keyword.length !== 0">
      <van-cell v-for="(suggestion, index) in highKeywordSuggestions" :key="suggestion" icon="search">
        <template #title>
          <div v-html="suggestion" @click="clickSuggestion(index)"></div>
        </template>
      </van-cell>
    </van-cell-group>
    <!-- /联想建议 -->

    <!-- 搜索历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
      </van-cell>
      <van-cell :title="history" v-for="(history, index) in searchHistory" :key="history" @click="goToSearchResult(history)">
        <van-icon name="close" @click="removeSearchHistory(index)" />
      </van-cell>
    </van-cell-group>
    <!-- /搜索历史记录 -->
  </div>
</template>

<script>
// reqGetSearchResult
import { reqGetSuggestions } from '@/api/search'
import { debounce } from 'lodash'
import { getSearchHistory, setSearchHistory } from '@/utils/storage'

export default {
  name: 'Search',
  data () {
    return {
      keyword: '', // 搜索关键字
      suggestions: [],
      searchHistory: getSearchHistory()
    }
  },
  methods: {
    goToSearchResult (keyword) {
      this.$router.push({
        name: 'searchResult',
        params: {
          keyword
        }
      })
    },
    removeSearchHistory (index) {
      this.searchHistory.splice(index, 1)
      setSearchHistory(this.searchHistory)
    },
    clickSearch () {
      this.handleSearchHistory(this.keyword.trim())
    },
    clickSuggestion (index) {
      this.handleSearchHistory(this.suggestions[index])
    },
    handleSearchHistory (val) {
      this.searchHistory.unshift(val)
      this.searchHistory = [...new Set(this.searchHistory)]
      setSearchHistory(this.searchHistory)
      this.goToSearchResult(this.keyword)
    },
    getSuggestions: debounce(async function () {
      if (this.keyword.trim().length === 0) {
        this.keyword = ''
        this.suggestions = []
        return
      }
      const { data: { options } } = await reqGetSuggestions(this.keyword)
      this.suggestions = options
    }, 500)
  },
  computed: {
    highKeywordSuggestions () {
      const reg = new RegExp(this.keyword, 'ig')
      return this.suggestions.map(item => {
        return item.replace(reg, (val) => {
          return `<span style="color: red">${val}</span>`
        })
      })
    }
  }

}
</script>

<style lang="scss" scoped>

</style>
