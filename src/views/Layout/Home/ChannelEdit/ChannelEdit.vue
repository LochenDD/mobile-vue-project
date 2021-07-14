<template>
  <div class="channel-edit">
    <!-- 当前登陆用户已经订阅的频道 -->
    <div class="channel">
      <van-cell title="我的频道" :border="false">
        <van-button plain size="mini" type="danger" @click="showRemove = !showRemove">{{ showRemove? '取消': '编辑' }}</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item v-for="(userChannel, index) in userChannels" :key="userChannel.id">
          <span :class="{'active': index === active}" @click="clickUserChannel(index)">{{ userChannel.name }}</span>
          <van-icon name="cross" class="btn" v-if="showRemove && index !== 0"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 当前登陆用户没有订阅的频道 -->
    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="otherChannel in otherChannels" :key="otherChannel.id">
          <span @click="addChannel(otherChannel)">{{ otherChannel.name }}</span>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import bus from '@/EventBus/bus'
import { mapGetters, mapState, mapMutations } from 'vuex'
import { reqUpdateChannels } from '@/api/channel'

export default {
  created () {
    bus.$on('initChannelsEditRemove', () => {
      this.showRemove = false
    })
  },
  name: 'ChannelEdit',
  props: {
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    ...mapMutations('channels', ['removeUserChannel', 'addUserChannel']),
    async addChannel (obj) {
      this.addUserChannel(obj)
      await reqUpdateChannels(this.updateChannelsData)
    },
    async clickUserChannel (index) {
      if (this.showRemove) {
        this.removeUserChannel(index)
        if (index < this.active) {
          this.$emit('update:active', this.active - 1)
        }
        await reqUpdateChannels(this.updateChannelsData)
      } else {
        this.$emit('update:active', index)
        this.$emit('update:showChannelEdit', false)
      }
    }
  },
  data () {
    return {
      showRemove: false
    }
  },
  computed: {
    ...mapGetters('channels', ['otherChannels']),
    ...mapState('channels', ['userChannels']),
    updateChannelsData () {
      return this.userChannels.slice(1).map((item, index) => {
        if (item.id !== 0) {
          return { id: item.id, seq: index }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.channel {
  padding: 15px;
  font-size: 14px;

  .active {
    color: red;
    font-weight: bolder;
  }

  ::v-deep .van-button--mini {
    height: 22px;
    min-width: 50px;
  }

  .btn {
    position: absolute;
    top: 5px;
    right: 5px;
    font-size: 14px;
  }
}
</style>
