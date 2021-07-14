<template>
  <div class="home">
    <van-tabs v-model="active">
      <van-tab :title="item.name" v-for="item in userChannels" :key="item.id">
        <article-list :id="item.id"></article-list>
      </van-tab>
    </van-tabs>

    <!-- 频道列表开关 通过定位 -->
    <div class="bar-btn">
      <van-icon name="wap-nav" @click="showChannelEditClick"/>
    </div>

    <!-- 折叠面板 -->
    <van-action-sheet v-model="showChannelEdit" title="标题">
      <channel-edit :active.sync="active" :showChannelEdit.sync="showChannelEdit"></channel-edit>
    </van-action-sheet>
  </div>
</template>

<script>
import bus from '@/EventBus/bus'
import { mapActions, mapState } from 'vuex'
import ArticleList from '@/views/Layout/Home/ArticleList/ArticleList'
import ChannelEdit from '@/views/Layout/Home/ChannelEdit/ChannelEdit'

export default {
  name: 'Home',
  components: {
    ChannelEdit,
    ArticleList
  },
  data () {
    return {
      channels: [],
      showChannelEdit: false,
      active: 0
    }
  },
  created () {
    this.getAllChannels()
    this.getUserChannels()
  },
  // getUserChannels
  // getAllChannels
  methods: {
    ...mapActions('channels', ['getUserChannels', 'getAllChannels']),
    showChannelEditClick () {
      this.showChannelEdit = true
      bus.$emit('initChannelsEditRemove')
    }
  },
  computed: {
    ...mapState('channels', ['userChannels', 'allChannels'])
  }
}
</script>

<style lang="scss" scoped>
// 加了scoped, 样式, 只会作用于当前组件模板
// 深度作用选择器 ::v-deep (sass)  /deep/ (less)  >>> (css)
.home {
  padding-top: 46px;
  position: relative;

  .bar-btn {
    position: absolute;
    top: 10px;
    right: 5px;
    background-color: #fff;
  }

  .van-tabs {
    height: 100%;
  }

  ::v-deep {
    .van-tabs__wrap {
      //padding-right: 26px;
      position: fixed;
      top: 46px;
      left: 0;
      width: 337px;
    }

    .van-tabs__content {
      height: 100%;
      .van-tab__pane {
        height: 100%;
      }
    }

    .van-tabs__line {
      background-color: #3196fa;
    }
  }
}
</style>
