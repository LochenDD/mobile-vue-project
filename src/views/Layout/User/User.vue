<template>
  <div class="user">
    <!-- 用户个人资料 -->
    <div class="user-profile">
      <div class="info">
        <van-image round :src="userData.photo" />
        <h3 class="name">
          {{ userData.name }}
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <van-row>
        <van-col span="8">
          <p>0</p>
          <p>动态</p>
        </van-col>
        <van-col span="8">
          <p>{{ userData.like_count }}</p>
          <p>关注</p>
        </van-col>
        <van-col span="8">
          <p>{{userData.fans_count}}</p>
          <p>粉丝</p>
        </van-col>
      </van-row>
    </div>

    <!-- 操作链接 -->
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />阅读历史
      </van-col>
    </van-row>

    <!-- 编辑入口 -->
    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" to="/userProfile" is-link />
      <van-cell icon="chat-o" title="小智同学" to="/chat" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-cell icon="warning-o" title="退出登录" is-link @click="confirmDialog"/>
    </van-cell-group>

  </div>
</template>

<script>
import { reqGetUserProfile } from '@/api/user'

export default {
  name: 'User',
  data () {
    return {
      userData: {},
      // art_count: 0
      // certi: ""
      // fans_count: 0
      // follow_count: 1
      // id: BigNumber {s: 1, e: 18, c: Array(2)}
      // intro: ""
      // is_media: false
      // like_count: 0
      // name: "14769979101"
      // photo: "http://toutiao-img.itheima.net/Fkj6tQi3xJwVXi1u2swCElotfdCi"
      show: false
    }
  },
  created () {
    this.getUserData()
  },
  methods: {
    confirmDialog () {
      this.$dialog.confirm({
        title: '提示',
        message: '确认退出吗?'
      })
        .then(() => {
          // on confirm
          this.exitLogin()
        })
        .catch(() => {
          // on cancel
        })
    },
    exitLogin () {
      this.$store.commit('user/emptyToken')
      this.$router.push('/')
    },
    async getUserData () {
      const { data } = await reqGetUserProfile()
      this.userData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.user {
  padding-bottom: 50px;
  .user-profile {
    width: 100%;
    height: 200px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 20px;
      align-items: center;
      .van-image{
        width: 64px;
        height: 64px;
      }
      .name {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p{
      margin: 0;
      text-align: center;
    }
  }
  .user-group {
    margin-bottom: 15px;
  }
  .user-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      padding-bottom: 5px;
    }
  }
}
</style>
