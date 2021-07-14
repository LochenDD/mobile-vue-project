<template>
  <div class="container">
    <!-- 固定导航 -->
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>

    <!-- 聊天主体区域 -->
    <div class="chat-list" ref="chatList">
      <!-- 左侧是机器人小智 -->
      <div class="chat-item" v-for="(item, index) in list" :key="index" :class="item.name === 'me' ? 'right': 'left'">
        <template v-if="item.name !== 'me'">
          <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg"/>
          <div class="chat-pao">{{ item.msg }}</div>
        </template>
        <template v-else>
          <div class="chat-pao">{{ item.msg }}</div>
          <van-image  fit="cover" round :src="userData.photo" />
        </template>
      </div>

      <!-- 对话区域 -->
      <div class="reply-container van-hairline--top">
        <van-field v-model.trim="word" placeholder="说点什么..." @keyup.enter="send">
          <span @click="send" slot="button" style="font-size:12px;color: #5babfb">提交</span>
        </van-field>
      </div>
    </div>
  </div>
</template>

<script>
import { reqGetUserProfile } from '@/api/user'
import io from 'socket.io-client'

export default {
  name: 'Chat',
  data () {
    return {
      word: '',
      list: [ // 对话记录
      ],
      userData: {},
      //  id
      //  name
      //  photo
      //  is_media
      //  intro
      //  certii
      //  art_count
      //  follow_count
      //  fans_count
      //  like_count
      socket: {}
    }
  },
  created () {
    this.getUserData()
    this.socket = io('http://127.0.0.1:8888')
    this.socket.on('connect', () => {
      this.$toast('小智准备完成')
    })
    this.socket.on('message', (msg) => {
      this.list.push({ name: 'xz', msg: msg.msg, timestamp: Date.now() })
      this.$nextTick(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
    })
  },
  beforeDestroy () {
    this.socket.close()
  },
  methods: {
    send () {
      if (this.word.trim().length === 0) {
        this.$toast('内容不能为空')
        this.word = ''
        return
      }
      this.socket.emit('message', {
        msg: this.word,
        timestamp: Date.now()
      })
      this.list.push({ name: 'me', msg: this.word, timestamp: Date.now() })
      this.$nextTick(() => {
        this.$refs.chatList.scrollTop = this.$refs.chatList.scrollHeight
      })
      this.word = ''
    },
    async getUserData () {
      const { data } = await reqGetUserProfile()
      this.userData = data
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background: #fafafa;
  padding: 46px 0 50px 0;

  .chat-list {
    height: 100%;
    overflow-y: scroll;

    .chat-item {
      padding: 10px;

      .van-image {
        vertical-align: top;
        width: 40px;
        height: 40px;
      }

      .chat-pao {
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;

        &::before {
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top: 0.5px solid #c2d9ea;
          border-right: 0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}

.chat-item.right {
  text-align: right;

  .chat-pao {
    margin-left: 0;
    margin-right: 15px;

    &::before {
      right: -6px;
      transform: rotate(45deg);
    }
  }
}

.chat-item.left {
  text-align: left;

  .chat-pao {
    margin-left: 15px;
    margin-right: 0;

    &::before {
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}

.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
