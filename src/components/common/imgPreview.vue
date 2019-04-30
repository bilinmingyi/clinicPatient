<template>
  <div class="preview">
    <div class="title-block bottom-link">
      <button class="title-btn" @click.stop="cancelSend"></button>
      <div class="title-text">
      </div>
      <div class="send-block">
        <button v-show="!waitCut" class="send-btn" @click.stop="sendImg">发送</button>
      </div>
    </div>
    <div class="img-block">
      <div class="img-content">
        <img :src="imgUrls" id="img-canvas" @load="loadImg($event)">
        <div v-show="waitCut" id="zxxCropBox">
          <div id="zxxDragBg"></div>
          <div id="dragLeftTop"></div>
          <div id="dragLeftBot"></div>
          <div id="dragRightTop"></div>
          <div id="dragRightBot"></div>
          <div id="dragTopCenter"></div>
          <div id="dragBotCenter"></div>
          <div id="dragRightCenter"></div>
          <div id="dragLeftCenter"></div>
        </div>
      </div>
    </div>
    <div class="bottom-block">
      <div class="cut-btn" v-show="!waitCut" @click.stop="cutPhoto">裁剪</div>
      <div class="cut-btn" v-show="!waitCut && canRestore" @click.stop="restorePhoto">还原</div>
      <div class="cut-btn" v-show="waitCut" @click.stop="cancelCut">取消</div>
      <div class="cut-btn" v-show="waitCut" @click.stop="completeCut">完成</div>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {imgUpLoad} from '@/fetch/api.js'
import Loading from '@/components/common/Loading'

export default {
  name: 'imgPreview',
  props: ['imgUrl'],
  components: {
    Loading
  },
  data () {
    return {
      waitCut: false,
      params: {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        currentX: 0,
        currentY: 0,
        flag: false,
        kind: 'drag'
      },
      imgData: {
        width: '',
        height: '',
        naturalWidth: '',
        naturalHeight: '',
        scaleX: 0,
        scaleY: 0
      },
      result: {
        posX: 0,
        posY: 0,
        cropW: 0,
        cropH: 0
      },
      imgUrls: '',
      canRestore: false,
      showLoad: false
    }
  },
  created () {
    this.imgUrls = this.imgUrl
  },
  mounted () {
    let zxxCropBox = document.getElementById('zxxCropBox')
    this.startDrag(document.getElementById('dragLeftTop'), zxxCropBox, 'nw')
    this.startDrag(document.getElementById('dragLeftBot'), zxxCropBox, 'sw')
    this.startDrag(document.getElementById('dragRightTop'), zxxCropBox, 'ne')
    this.startDrag(document.getElementById('dragRightBot'), zxxCropBox, 'se')
    this.startDrag(document.getElementById('dragTopCenter'), zxxCropBox, 'n')
    this.startDrag(document.getElementById('dragBotCenter'), zxxCropBox, 's')
    this.startDrag(document.getElementById('dragRightCenter'), zxxCropBox, 'e')
    this.startDrag(document.getElementById('dragLeftCenter'), zxxCropBox, 'w')
    this.startDrag(document.getElementById('zxxDragBg'), zxxCropBox, 'drag')
  },
  methods: {
    loadImg (e) {
      let boxObj = document.getElementById('zxxCropBox')
      this.imgData.width = e.target.width
      this.imgData.height = e.target.height
      this.result.cropW = e.target.width
      this.result.cropH = e.target.height
      this.imgData.naturalWidth = e.target.naturalWidth
      this.imgData.naturalHeight = e.target.naturalHeight
      this.imgData.scaleX = this.imgData.width / this.imgData.naturalWidth
      this.imgData.scaleY = this.imgData.height / this.imgData.naturalHeight
      boxObj.style.width = parseInt(this.imgData.width) + 'px'
      boxObj.style.height = parseInt(this.imgData.height) + 'px'
    },
    sendImg () {
      this.showLoad = true
      this.compress().then(data => {
        let resultData = this.dataURLtoFile(data, new Date().getTime().toString())
        let formData = new FormData()
        formData.append('file', resultData)
        imgUpLoad(formData).then(res => {
          if (res.code === 1000) {
            this.$emit('send', res.data)
          } else {
            self.$Message.infor(res.msg)
          }
          this.showLoad = false
        }).catch(error => {
          console.log(error)
          this.showLoad = false
          self.$Message.infor('网络出错！')
        })
      }).catch(error => {
        this.$Message.infor(error.message)
      })
    },
    compress () {
      let imgP = new Promise((resolve, reject) => {
        let img = document.getElementById('img-canvas')
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        let width = img.width
        let height = img.height

        // 图片像素大于400万像素，计算压缩到400万以下
        let ratio

        if ((ratio = width * height / 4000000) > 1) {
          ratio = Math.sqrt(ratio)
          width /= ratio
          height /= ratio
        } else {
          ratio = 1
        }
        canvas.width = width
        canvas.height = height
        ctx.save()
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.fillStyle = '#000'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, width, height)
        ctx.restore()
        // 进行最小压缩
        let ndata = canvas.toDataURL('image/jpeg', 0.3)
        canvas.width = canvas.height = 0
        canvas = null
        resolve(ndata)
      })
      return imgP
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
      return new File([u8arr], filename, {type: mime})
    },
    cancelSend () {
      this.$emit('cancel')
    },
    restorePhoto () {
      this.imgUrls = this.imgUrl
      this.canRestore = false
    },
    cutPhoto () {
      this.waitCut = true
      let boxObj = document.getElementById('zxxCropBox')
      boxObj.style.top = '0'
      boxObj.style.left = '0'
      boxObj.style.width = parseInt(this.imgData.width) + 'px'
      boxObj.style.height = parseInt(this.imgData.height) + 'px'
    },
    completeCut () {
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let self = this
      let img = document.getElementById('img-canvas')
      canvas.width = self.result.cropW / self.imgData.scaleX
      canvas.height = self.result.cropH / self.imgData.scaleY
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, self.result.posX / self.imgData.scaleX, self.result.posY / self.imgData.scaleY, self.result.cropW / self.imgData.scaleX, self.result.cropH / self.imgData.scaleY, 0, 0, canvas.width, canvas.height)
      this.imgUrls = canvas.toDataURL('image/png')
      canvas = null
      this.waitCut = false
      this.canRestore = true
    },
    cancelCut () {
      this.waitCut = false
      this.params = {
        left: 0,
        top: 0,
        width: 0,
        height: 0,
        currentX: 0,
        currentY: 0,
        flag: false,
        kind: 'drag'
      }
    },
    getCss (o, key) {
      return o.currentStyle ? o.currentStyle[key] : document.defaultView.getComputedStyle(o, false).getPropertyValue(key)
    },
    startDrag (point, target, kind) {
      // point 为操作直接目标，即拉拽的点
      // target 为操作起效目标，即框
      // kind 为操作的类型
      let self = this
      // 初始化宽高
      self.params.width = self.getCss(target, 'width')
      self.params.height = self.getCss(target, 'height')
      // 初始化坐标
      if (self.getCss(target, 'left') !== 'auto') {
        self.params.left = self.getCss(target, 'left')
      }
      if (self.getCss(target, 'top') !== 'auto') {
        self.params.top = self.getCss(target, 'top')
      }
      // target是移动对象
      point.ontouchstart = function (event) {
        self.params.kind = kind
        self.params.flag = true
        if (!event) {
          event = window.event
        }
        let e = event
        self.params.currentX = e.changedTouches[0].clientX
        self.params.currentY = e.changedTouches[0].clientY

        document.ontouchmove = function (event) {
          let e = event || window.event
          if (self.params.flag) {
            let nowX = e.changedTouches[0].clientX
            let nowY = e.changedTouches[0].clientY
            let disX = nowX - self.params.currentX
            let disY = nowY - self.params.currentY
            switch (self.params.kind) {
              case 'n':
                // 上拉伸
                target.style.top = parseInt(self.params.top) + disY + 'px'
                target.style.height = parseInt(self.params.height) - disY + 'px'
                break
              case 'w':
                // 左拉伸
                target.style.left = parseInt(self.params.left) + disX + 'px'
                target.style.width = parseInt(self.params.width) - disX + 'px'
                break
              case 'e':
                // 右拉伸
                target.style.width = parseInt(self.params.width) + disX + 'px'
                break
              case 's':
                // 下拉伸
                target.style.height = parseInt(self.params.height) + disY + 'px'
                break
              case 'nw':
                // 左上拉伸
                target.style.left = parseInt(self.params.left) + disX + 'px'
                target.style.width = parseInt(self.params.width) - disX + 'px'
                target.style.top = parseInt(self.params.top) + disY + 'px'
                target.style.height = parseInt(self.params.height) - disY + 'px'
                break
              case 'ne':
                // 右上拉伸
                target.style.top = parseInt(self.params.top) + disY + 'px'
                target.style.height = parseInt(self.params.height) - disY + 'px'
                target.style.width = parseInt(self.params.width) + disX + 'px'
                break
              case 'sw':
                // 左下拉伸
                target.style.left = parseInt(self.params.left) + disX + 'px'
                target.style.width = parseInt(self.params.width) - disX + 'px'
                target.style.height = parseInt(self.params.height) + disY + 'px'
                break
              case 'se':
                // 右下拉伸
                target.style.width = parseInt(self.params.width) + disX + 'px'
                target.style.height = parseInt(self.params.height) + disY + 'px'
                break
              case 'drag':
                // 移动
                target.style.left = parseInt(self.params.left) + disX + 'px'
                target.style.top = parseInt(self.params.top) + disY + 'px'
                break
            }
          }
        }
        document.ontouchend = () => {
          let imgCurWidth = self.imgData.width
          let imgCurHeight = self.imgData.height
          self.params.flag = false
          if (self.getCss(target, 'left') !== 'auto') {
            self.params.left = self.getCss(target, 'left')
          }
          if (self.getCss(target, 'top') !== 'auto') {
            self.params.top = self.getCss(target, 'top')
          }
          self.params.width = self.getCss(target, 'width')
          self.params.height = self.getCss(target, 'height')
          self.result.posX = parseInt(target.style.left) > 0 ? parseInt(target.style.left) : 0
          self.result.posY = parseInt(target.style.top) > 0 ? parseInt(target.style.top) : 0
          if (parseInt(target.style.left) + parseInt(target.style.width) > imgCurWidth) {
            self.result.cropW = imgCurWidth - parseInt(target.style.left)
          } else {
            self.result.cropW = parseInt(target.style.width)
          }

          if (parseInt(target.style.top) + parseInt(target.style.height) > imgCurHeight) {
            self.result.cropH = imgCurHeight - parseInt(target.style.top)
          } else {
            self.result.cropH = parseInt(target.style.height)
          }

          document.ontouchmove = null
          document.ontouchend = null
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .preview {
    // position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 999;
    width: 100vw;
    height: 100vh;
    background: #232323;

    .img-block {
      width: 100%;
      padding-top: 88px;
      height: calc(100% - 88px);
      @extend %flexVC;

      .img-content {
        position: relative;
        width: 95%;

        img {
          margin: 0 auto;
          width: 100%;
        }
      }
    }
  }

  .bottom-link {
    border-bottom: 1px solid $lineColor;
  }

  .title-block {
    background: #fafafa;
    text-align: center;
    position: relative;
    @include psFixed(top, 100px);
    z-index: 999;
    @extend %displayFlex;

    .title-btn {
      display: block;
      height: 88px;
      width: 100px;
      background: url("../../assets/img/fanghui@3x.png") no-repeat center center;
      background-size: 55px 55px;
      border: none;
    }

    .title-text {
      flex: 1;
      line-height: 88px;
      color: $depthTextColor;
      font-size: 32px;
      font-weight: 500;
    }

    .send-block {
      @extend %flexVC;

      .send-btn {
        background: $greenColor;
        border: none;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 8px;
        margin: 0 20px;
      }
    }
  }

  .bottom-block {
    @include psFixed(bottom, 100px);
    z-index: 999;
    @extend %flexV;
    justify-content: space-between;
    border-top: 1px solid $lineColor;

    .cut-btn {
      font-size: 32px;
      color: #ffffff;
      padding: 0 24px;
    }
  }

  %cut-block {
    position: absolute;
    width: 40px;
    height: 40px;
    background: transparent;
    overflow: hidden;
  }

  #dragLeftTop {
    @extend %cut-block;
    border-left: 10px solid #ffffff;
    border-top: 10px solid #fff;
    left: -6px;
    top: -6px;
    cursor: nw-resize;
  }

  #dragLeftBot {
    @extend %cut-block;
    border-bottom: 10px solid #fff;
    border-left: 10px solid #fff;
    left: -6px;
    bottom: -6px;
    cursor: sw-resize;
  }

  #dragRightTop {
    @extend %cut-block;
    border-top: 10px solid #fff;
    border-right: 10px solid #fff;
    right: -6px;
    top: -6px;
    cursor: ne-resize;
  }

  #dragRightBot {
    @extend %cut-block;
    border-right: 10px solid #fff;
    border-bottom: 10px solid #fff;
    right: -6px;
    bottom: -6px;
    cursor: se-resize;
  }

  #dragTopCenter {
    @extend %cut-block;
    border-top: 10px solid #fff;
    top: -6px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    cursor: n-resize;
  }

  #dragBotCenter {
    @extend %cut-block;
    border-bottom: 10px solid #fff;
    bottom: -6px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    -moz-transform: translateX(-50%);
    -ms-transform: translateX(-50%);
    -o-transform: translateX(-50%);
    transform: translateX(-50%);
    cursor: s-resize;
  }

  #dragRightCenter {
    @extend %cut-block;
    border-right: 10px solid #fff;
    right: -6px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: e-resize;
  }

  #dragLeftCenter {
    @extend %cut-block;
    border-left: 10px solid #fff;
    left: -6px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    -moz-transform: translateY(-50%);
    -ms-transform: translateY(-50%);
    -o-transform: translateY(-50%);
    transform: translateY(-50%);
    cursor: w-resize;
  }

  #zxxDragBg {
    height: 100%;
    background: white;
    opacity: 0.3;
    cursor: move
  }

  #zxxCropBox {
    position: absolute;
    top: 0;
    left: 0;
    border: 1px solid #ffffff;
    transform: translateZ(1px);
  }
</style>
