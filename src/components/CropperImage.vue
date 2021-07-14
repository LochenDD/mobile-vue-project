<template>
  <div class="cropper-content">
    <div class="cropper-box">
      <div class="cropper">
        <vue-cropper
          ref="cropper"
          :img="option.img"
          :output-size="option.outputSize"
          :output-type="option.outputType"
          :info="option.info"
          :can-scale="option.canScale"
          :auto-crop="option.autoCrop"
          :auto-crop-width="option.autoCropWidth"
          :auto-crop-height="option.autoCropHeight"
          :fixed="option.fixed"
          :fixed-number="option.fixedNumber"
          :full="option.full"
          :fixed-box="option.fixedBox"
          :can-move="option.canMove"
          :can-move-box="option.canMoveBox"
          :original="option.original"
          :center-box="option.centerBox"
          :height="option.height"
          :info-true="option.infoTrue"
          :max-img-size="option.maxImgSize"
          :enlarge="option.enlarge"
          :mode="option.mode"
          @imgLoad="imgLoad"
        />
      </div>
      <!--底部操作工具按钮-->
      <div class="footer-btn">
        <van-button type="info" @click="$emit('cancel')">取消</van-button>
        <van-button type="primary" @click="uploadImg('blob')">上传</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { reqUpdateUserPhoto } from '@/api/user'
import { VueCropper } from 'vue-cropper'
export default {
  name: 'CropperImage',
  components: {
    VueCropper
  },
  data () {
    return {
      option: {
        img: '', // 裁剪图片的地址
        outputSize: 1, // 裁剪生成图片的质量(可选0.1 - 1)
        outputType: 'jpeg', // 裁剪生成图片的格式（jpeg || png || webp）
        info: true, // 图片大小信息
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        autoCropWidth: 150, // 默认生成截图框宽度
        autoCropHeight: 150, // 默认生成截图框高度
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: false, // false按原比例裁切图片，不失真
        fixedBox: true, // 固定截图框大小，不允许改变
        canMove: true, // 上传图片是否可以移动
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: true, // 截图框是否被限制在图片里面
        height: true, // 是否按照设备的dpr 输出等比例图片
        infoTrue: false, // true为展示真实输出图片宽高，false展示看到的截图框宽高
        maxImgSize: 3000, // 限制图片最大宽度和高度
        enlarge: 1, // 图片根据截图框输出比例倍数
        mode: '300px 300px' // 图片默认渲染方式
      }
    }
  },
  methods: {
    // 初始化函数
    imgLoad (msg) {
      console.log('工具初始化函数=====' + msg)
    },
    // 选择图片
    selectImg (e) {
      const file = e.target.files[0]
      if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)) {
        this.$message({
          message: '图片类型要求：jpeg、jpg、png',
          type: 'error'
        })
        return false
      }
      // 转化为blob
      const reader = new FileReader()
      reader.onload = (e) => {
        let data
        if (typeof e.target.result === 'object') {
          data = window.URL.createObjectURL(new Blob([e.target.result]))
        } else {
          data = e.target.result
        }
        this.option.img = data
      }
      // 转化为base64
      reader.readAsDataURL(file)
    },
    // 上传图片
    async uploadImg (type) {
      this.$toast.loading('上传中')
      if (type === 'blob') {
        // 获取截图的blob数据
        this.$refs.cropper.getCropBlob(async (data) => {
          const formData = new FormData()
          const apiKey = 'photo' // 根据接口参数修改
          formData.append(apiKey, data)

          try {
            // 发请求  上传图片 ------------------
            const { data: { photo } } = await reqUpdateUserPhoto(formData)
            this.$emit('passPhotoUrl', photo)
            this.$toast.success('上传成功')
          } catch (e) {
            this.$toast.fail('上传失败')
          }
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.cropper-content{
  display: flex;
  display: -webkit-flex;
  justify-content: flex-end;
  height: 100%;

  .cropper-drag-box {
    width: 100%;
    height: 100%;
  }

  .cropper-box{
    flex: 1;
    width: 100%;
    height: 100%;
    .cropper{
      width: 100%;
      height: 100%;

    }
  }

  .show-preview{
    flex: 1;
    -webkit-flex: 1;
    display: flex;
    display: -webkit-flex;
    justify-content: center;
    .preview{
      overflow: hidden;
      border:1px solid #67c23a;
      background: #cccccc;
    }
  }
}
.footer-btn{
  z-index: 11;
  width: 100%;
  position: absolute;
  bottom: 0;
  margin-top: 30px;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
}
</style>
