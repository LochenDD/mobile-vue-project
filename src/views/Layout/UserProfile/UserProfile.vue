<template>
  <div class="profile">
    <!-- 导航条 -->
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料"></van-nav-bar>

    <!-- 编辑区 -->
    <van-cell-group>
      <van-cell is-link title="头像" center @click="fileSelect">
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>

      <van-cell is-link title="名称" :value="user.name" @click="showName=true"/>
      <van-cell is-link title="性别" :value="!user.gender? '男': '女'" @click="showGender=true"/>
      <van-cell is-link title="生日" :value="user.birthday" @click="showBirthday=true"/>
    </van-cell-group>

    <!-- 修改名字 -->
    <van-dialog v-model="showName" title="修改姓名" show-cancel-button @confirm="updateName" @cancel="newName = user.name">
      <van-form>
        <van-field
          v-model.trim="newName"
          placeholder="请输入姓名"
          :rules="[{required: true, message: '请填写新用户名', trigger:'onChange' }, {pattern: /^.{1,7}$/, message: '用户名长度1-7位', trigger:'onChange'}]"
        ></van-field>
      </van-form>
    </van-dialog>

    <!-- 修改性别 -->
    <van-popup v-model="showGender" position="bottom">
      <van-nav-bar title="修改性别" left-text="取消" @click-left="showGender=false">
      </van-nav-bar>
      <van-cell title="男" @click="saveGender(0)" is-link></van-cell>
      <van-cell title="女" @click="saveGender(1)" is-link></van-cell>
    </van-popup>

    <!-- 修改日期 -->
    <van-popup v-model="showBirthday" position="bottom">
      <van-datetime-picker
        @confirm="updateBirthday"
        v-model="nowDate"
        type="date"
        title="选择生日"
        :min-date="minDate"
        :max-date="maxDate"
      />
    </van-popup>

    <van-uploader ref="vanUploader" :after-read="afterRead"/>
    <div class="cropper" v-if="showCropper">
      <cropper-image
        ref="cropper"
        @passPhotoUrl="passPhotoUrl"
        @cancel="showCropper = false"
      ></cropper-image>
    </div>
  </div>
</template>

<script>
import { reqGetUserInfo, reqUpdateUserProfile } from '@/api/user'
import dayjs from 'dayjs'
import CropperImage from '@/components/CropperImage'

export default {
  name: 'userProfile',
  components: { CropperImage },
  data () {
    return {
      // 控制弹层
      showName: false,
      showGender: false,
      showBirthday: false,
      // 当前用户的信息
      user: {},
      // birthday: ""
      // gender: 0
      // id: BigNumber {s: 1, e: 18, c: Array(2)}
      // mobile: "14769979101"
      // name: "14769979101"
      // photo: "http://toutiao-img.itheima.net/Fkj6tQi3xJwVXi1u2swCElotfdCi"
      newName: '',
      minDate: new Date(1970, 0, 1), // 最小时间
      maxDate: new Date(), // 最大时间
      nowDate: new Date(), // 修改后的新生日
      showCropper: false
    }
  },
  created () {
    this.getUserProfileData()
  },
  methods: {
    passPhotoUrl (url) {
      this.user.photo = url
      this.showCropper = false
    },
    fileSelect () {
      this.$refs.vanUploader.chooseFile()
    },
    afterRead (file) {
      this.showCropper = true
      this.$nextTick(() => {
        this.$refs.cropper.option.img = file.content
      })
    },
    async updateBirthday () {
      this.showBirthday = false
      this.$toast.loading('更新中')
      const birthday = dayjs(this.nowDate).format('YYYY-MM-DD')
      await reqUpdateUserProfile({
        birthday
      })
      this.user.birthday = birthday
      this.$toast.success('修改生日成功')
    },
    async saveGender (val) {
      await reqUpdateUserProfile({
        gender: val
      })
    },
    async updateName () {
      if (this.newName === this.username) {
        this.$toast('修改后的名字不能和原名字相同')
        return
      }
      if (this.newName.trim().length === 0) {
        this.$toast('名字不能为空')
        this.newName = ''
        return
      }
      if (!/^.{1,7}$/.test(this.newName)) {
        this.$toast('用户名长度为1-7位')
        return
      }

      await reqUpdateUserProfile({
        name: this.newName
      })
      this.user.name = this.newName
    },
    async getUserProfileData () {
      const { data } = await reqGetUserInfo()
      this.user = data
      this.newName = data.name
      this.nowDate = new Date(this.user.birthday)
    }
  }
}
</script>

<style lang="scss">
.profile {
  .van-uploader {
    opacity: 0;
  }

  .cropper {
    z-index: 10;
    /* 将遮罩层定位 */
    position: absolute;
    top: 0;
    left: 0;
    /* 遮罩层布满整个屏幕 */
    width: 100%;
    height: 100%;
  }
}
</style>
