<template>
  <div class="chat-bottom">
    <div class="reply">
      <!-- <div @click="showReply"><span class="leftIcon iconfont">&#xe612;</span></div> -->
      <input class="serach-input" type="textarea" @focus="hideFunc($event)" v-model="sendContent" @blur="inputBlur($event)" ref="inputText">
      <div class="ml24 pr16">
        <img src="@/assets/img/tianjia@2x.png" alt @click="addFunc" :class="{'translateImg':showFuc}" v-show="showIcon">
        <div class="send " v-show="!showIcon" @click="sendMessage">发送</div>
      </div>

    </div>
    <transition name="swtichBT">
      <div class="function" v-show="showFuc">
        <div class="function-content mr64" @click.stop="fileClick('get')">
          <img src="@/assets/img/zhaopian@2x.png" alt>
          <p>照片</p>
          <input accept="image/*" style="display: none;" name="img-get" type="file" id="img-get" @change="fileChange($event)" />
        </div>
        <!-- <div class="function-content mr64">
        <img src="@/assets/images/huifu@2x.png" alt>
        <p>快捷回复</p>
      </div> -->
        <div class="function-content mr64" @click.stop="fileClick('set')">
          <img src="@/assets/img/paizhao@2x.png" alt>
          <p>拍照</p>
          <input accept="image/*" style="display: none;" name="img-set" capture="camera" type="file" id="img-set" @change="fileChange($event)" />
        </div>
        <!-- <div class="function-content">
        <img src="@/assets/images/tuijiang@2x.png" alt>
        <p>商品推荐</p>
      </div> -->
      </div>
    </transition>
    <img-preview :imgUrl="imgUrl" v-if="imgUrl!=''" @send="sendImgMessage" @cancel="cancelSendImg"></img-preview>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>
<script>
import { imgPreview, Loading } from '@/components/common'

export default {
  props: ['showFuc'],
  data () {
    return {
      sendContent: '',
      imgUrl: '',
      showLoad: false
    }
  },
  components: {
    imgPreview,
    Loading
  },
  computed: {
    showIcon () {
      return this.sendContent === ''
    }
  },
  methods: {
    addFunc () {
      this.$emit('addFunc')
    },
    inputBlur () {
      let self = this
      clearInterval(self.bottomTimer)
      setTimeout(() => {
        window.scrollTo(0, 0)
        self.$emit('inputBlur')
      }, 64)
    },
    hideFunc (e) {
      setTimeout(function () {
        e.target.scrollIntoView(true)
      }, 500)
      let self = this
      self.bottomTimer = setInterval(function () {
        document.body.scrollTop = document.body.clientHeight
      }, 200)
      this.$emit('hideFunc', e)
    },
    showReply () {
      this.$emit('showReply')
    },
    sendMessage () {
      this.$emit('sendMessage', this.sendContent)
      this.sendContent = ''
    },
    sendImgMessage (url) {
      this.imgUrl = url
      this.$emit('sendImg', this.imgUrl)
      this.imgUrl = ''
    },
    cancelSendImg () {
      this.imgUrl = ''
      document.querySelector('#img-get').value = null
      document.querySelector('#img-set').value = null
    },
    fileClick (id) {
      document.querySelector('#img-' + id).click()
    },
    fileChange (el) {
      this.showLoad = true
      if (!el.target.files[0].size) {
        this.showLoad = false
        return
      }
      let self = this
      self.compress(el)
      // this.compress(el).then(data => {
      // let resultData = this.dataURLtoFile(data[0], el.target.files[0].name)
      // let formData = new FormData()
      // formData.append('file', resultData)
      // imgUpLoad(formData).then(res => {
      //   document.querySelector('#img-' + id).value = null
      //   if (res.code === 1000) {
      //     self.imgUrl = res.data
      //   } else {
      //     self.$Message.infor(res.msg)
      //   }
      //   this.showLoad = false
      // }).catch(error => {
      //   console.log(error)
      //   this.showLoad = false
      //   self.$Message.infor('网络出错！')
      // })
      // }).catch(error => {
      //   this.$Message.infor(error.message)
      // })
    },
    compress (event) {
      let file = event.target.files
      let reader = new FileReader()
      let imgFile = file[0]
      if (imgFile.type.indexOf('image') === 0) {
        reader.readAsDataURL(imgFile)
      } else {
        this.showLoad = false
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject('文件类型仅为图片')
      }
      // let img = new Image()
      reader.onload = (e) => {
        // img.src = e.target.result
        // console.log(e.target.result)
        this.imgUrl = e.target.result
        this.showLoad = false
        document.querySelector('#img-get').value = null
        document.querySelector('#img-set').value = null
      }
      // let imgP = new Promise((resolve, reject) => {
      //   img.onload = () => {
      //     let canvas = document.createElement('canvas')
      //     let ctx = canvas.getContext('2d')
      //     let width = img.width
      //     let height = img.height
      //
      //     // 图片像素大于400万像素，计算压缩到400万以下
      //     let ratio
      //
      //     if ((ratio = width * height / 4000000) > 1) {
      //       ratio = Math.sqrt(ratio)
      //       width /= ratio
      //       height /= ratio
      //     } else {
      //       ratio = 1
      //     }
      //
      //     // canvas.width = height
      //     // canvas.height = width
      //     // ctx.save()
      //     // ctx.clearRect(0, 0, canvas.width, canvas.height)
      //     // ctx.translate(canvas.width / 2, canvas.height / 2)
      //     // ctx.rotate(Math.PI / 2)
      //     // ctx.translate(-canvas.height / 2, -canvas.width / 2)
      //     //
      //     // ctx.fillStyle = '#000'
      //     // ctx.fillRect(0, 0, canvas.height, canvas.width)
      //     canvas.width = width
      //     canvas.height = height
      //     ctx.save()
      //     ctx.clearRect(0, 0, canvas.width, canvas.height)
      //     ctx.fillStyle = '#000'
      //     ctx.fillRect(0, 0, canvas.width, canvas.height)
      //     ctx.drawImage(img, 0, 0, width, height)
      //     ctx.restore()
      //     // 进行最小压缩
      //     let ndata = canvas.toDataURL('image/jpeg', 0.3)
      //     canvas.width = canvas.height = 0
      //     resolve(ndata)
      //   }
      // })
      // return Promise.all([imgP])
    },
    dataURLtoFile (dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      return new File([u8arr], filename, { type: mime })
    }
  }
}
</script>
<style lang="scss" scoped>
input {
  -webkit-user-select: text !important;
  -webkit-appearance: none; /*去除input默认样式*/
}

.chat-bottom {
  width: 100%;
  z-index: 99;
  position: absolute;
  min-height: 112px;
  overflow: hidden;
  left: 0;
  right: 0;
  bottom: 0;
  background: $bgwhite2;

  .reply {
    padding: 16px 0 16px 16px;
    @extend %flexV;

    input {
      // width: 540px;
      padding: 20px;
      outline: medium;
      width: 584px;
      margin-left: 20px;
      height: 80px;
      @extend %normalTitle;
      background: rgba(249, 249, 249, 1);
      border-radius: 16px;
      border: 1px solid rgba(151, 151, 151, 1);
    }

    img {
      width: 68px;
      height: 68px;
    }

    .translateImg {
      transform: rotate(45deg);
    }
  }

  .function {
    width: 100%;
    @include commonBorder(top);
    height: 224px;
    background: $bgwhite2;
    @extend %flexV;
    padding: 28px 56px;

    &-content {
      p {
        padding-top: 16px;
        text-align: center;
        font-size: 28px;
        color: $simpleGray;
      }

      img {
        @extend %mediumIcon;
      }
    }
  }
}

.send {
  @include deepButton(68px, 88px);
  border-radius: 16px;
  font-size: 24px;
}

.leftIcon {
  font-size: 64px;
  color: $gray3;
  padding-right: 20px;
}
.swtichBT-enter-active {
  animation: swtichBT-in 0.1s;
}
.swtichBT-leave-active {
  animation: swtichBT-in 0.1s reverse;
}
@keyframes swtichBT-in {
  0% {
    height: 0px;
  }
  100% {
    height: 224px;
  }
}
</style>
