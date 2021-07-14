<template>
  <div class="login">
    <van-nav-bar title="登录"/>
    <!--    <van-cell-group>-->
    <van-form>
      <van-field
        v-model="mobile"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[{ required: true, message: '请填写用户名' }, { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '请填写合法的手机号', trigger: 'onChange' }]"
      />
      <van-field
        v-model="code"
        label="验证码"
        placeholder="请输入验证码(246810)"
        :rules="[{ required: true, message: '请填写验证码' }, {pattern: /^\d{6}$/, message: '验证码必须为6位', trigger: 'onChange'}]"
      />
    </van-form>
    <!--    </van-cell-group>-->
    <div class="btn-wrap">
      <van-button type="info" @click="login">登录</van-button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as userApiHttp from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '14769979101',
      code: '246810'
    }
  },
  methods: {
    async login () {
      this.$toast.loading('登陆中')
      const { data } = await userApiHttp.reqLogin({
        mobile: this.mobile,
        code: this.code
      })
      this.setTokenInfo(data)
      this.$toast.success('登陆成功')
      this.$router.back()
      // const path = this.$route.query.backTo
      // if (path) {
      //   this.$router.push({
      //     path
      //   })
      // } else {
      //   this.$router.push({
      //     name: 'home'
      //   })
      // }
    },
    ...mapMutations('user', ['setTokenInfo'])
  }
}
</script>

<style lang="scss" scoped>
.login {
  .btn-wrap {
    padding: 20px;

    .van-button {
      width: 100%;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
