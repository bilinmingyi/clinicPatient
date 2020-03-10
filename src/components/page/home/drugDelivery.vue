<template>
  <div>
    <Header titleText="送药上门申请" :canReturn="true"></Header>
    <div class="mt-88px">
      <section class='appoint-info'>
        <Small-title :hasBlock="true">
          <span class="ml-16px">客户信息</span>
        </Small-title>
        <div class="appoint-text">
          <div class="line-item">
            <label class="label-span mr-32px">客户姓名</label>
            <input type="text" class="input-item flexOne" placeholder="请输入客户姓名" v-model="patientName"
                   @blur="scrollToTop">
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">联系电话</label>
            <input type="number" class="input-item flexOne" placeholder="请输入联系电话" v-model="patientMobile"
                   @blur="scrollToTop">
          </div>
        </div>
      </section>
      <section class='appoint-info'>
        <Small-title :hasBlock="true">
          <span class="ml-16px">处方照片</span>
        </Small-title>
        <div class="photo-block">
          <div class="photo-back" v-if="imgUrlResult==''" @click="fileClick">
            <img src="../../../assets/img/zhaopian@2x.png">
          </div>
          <div class="photo-img" v-else>
            <img :src="imgUrlResult">
            <div class="close-block" @click="deleteImg">+</div>
          </div>
          <input accept="image/*" style="display: none;" name="img-get" type="file" id="img-get"
                 @change="fileChange($event)"/>
        </div>
      </section>
      <section class='appoint-info'>
        <Small-title :hasBlock="true">
          <span class="ml-16px">备注信息</span>
        </Small-title>
        <textarea class="input-item memo-textarea" rows="3" placeholder="选填" v-model="memo"
                  @blur="scrollToTop"></textarea>
      </section>
    </div>
    <div class="add_block">
      <button class="add_btn" @click="sureOrder">提交申请</button>
    </div>
    <img-preview :imgUrl="imgUrl" btnText="确定" :fixed="true" v-if="imgUrl!=''" @send="sureSelectImg"
                 @cancel="cancelSelectImg"></img-preview>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {Header, SmallTitle, imgPreview, Loading} from '@/components/common/index'
import inputBlur from '@/assets/js/inputBlur'

export default {
  name: 'drugDelivery',
  mixins: [inputBlur],
  components: {
    Header,
    SmallTitle,
    imgPreview,
    Loading
  },
  data () {
    return {
      showLoad: false,
      patientName: '',
      patientMobile: '',
      imgUrl: '',
      imgFile: null,
      imgUrlResult: '',
      memo: ''
    }
  },
  created () {
  },
  methods: {
    sureOrder () {
      if (!this.patientName) {
        this.$Message.infor('请先填写客户姓名！')
        return
      }
      if (!this.patientMobile) {
        this.$Message.infor('请先填写联系电话！')
        return
      }
      if (!this.imgUrlResult) {
        this.$Message.infor('请先点击上传处方照片！')
        return
      }
      window.localStorage.removeItem('clinicgzhDrugName')
      window.localStorage.removeItem('clinicgzhDrugMobile')
      window.localStorage.removeItem('clinicgzhDrugImg')
      window.localStorage.removeItem('clinicgzhDrugMemo')
      window.localStorage.setItem('clinicgzhDrugName', this.patientName)
      window.localStorage.setItem('clinicgzhDrugMobile', this.patientMobile)
      window.localStorage.setItem('clinicgzhDrugImg', this.imgUrlResult)
      window.localStorage.setItem('clinicgzhDrugMemo', this.memo)
      this.$router.replace({name: 'chatRoom', query: {}})
    },
    fileChange (el) {
      this.showLoad = true
      if (!el.target.files[0].size) {
        this.showLoad = false
        return
      }
      let self = this
      self.compress(el)
    },
    compress (event) {
      let file = event.target.files
      let reader = new FileReader()
      let imgFile = file[0]
      this.imgFile = imgFile
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
      }
    },
    fileClick () {
      document.querySelector('#img-get').click()
    },
    deleteImg () {
      this.imgUrl = ''
      this.imgUrlResult = ''
      this.imgFile = null
    },
    cancelSelectImg () {
      this.imgUrl = ''
    },
    sureSelectImg (val) {
      this.imgUrlResult = val
      this.imgUrl = ''
    }
  }
}
</script>

<style lang="scss" scoped>
  .appoint-info {
    background: $backColor;
    margin-bottom: 20px;
  }

  .appoint-text {
    padding: 0 30px;
  }

  .line-item {
    padding: 26px 0px;
    position: relative;
    @extend %displayFlex;
  }

  .line-hr {
    @extend %lineHr;
  }

  .label-span {
    color: $depthTextColor;
    line-height: 45px;
    font-size: 32px;
    white-space: nowrap;
  }

  .input-item {
    border: none;
    outline: none;
    font-size: 32px;
    color: $depthTextColor;
    background: transparent;

    &::-webkit-input-placeholder {
      font-size: 32px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 45px;
    }
  }

  .memo-textarea {
    padding: 20px 30px;
    width: 100%;
  }

  .photo-block {
    padding: 20px 30px;

    .photo-back {
      background: #f5f5f5;
      width: 200px;
      height: 200px;
      border-radius: 8px;
      @extend %flexVC;

      img {
        width: 80px;
        height: 80px;
      }
    }

    .photo-img {
      background: #f5f5f5;
      width: 200px;
      height: 200px;
      border-radius: 8px;
      position: relative;

      img {
        width: 200px;
        height: 200px;
        border-radius: 8px;
      }

      .close-block {
        width: 40px;
        height: 40px;
        background: rgba(0, 0, 0, 0.7);
        border-radius: 50%;
        position: absolute;
        top: 0px;
        right: -10px;
        top: -10px;
        color: #ffffff;
        font-weight: bold;
        font-size: 30px;
        @extend %flexVC;
        line-height: 26px;
        -webkit-transform: rotate(45deg);
        -moz-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        -o-transform: rotate(45deg);
        transform: rotate(45deg);
      }
    }
  }

  .add_block {
    @include psFixed(bottom, 111px);
    background: $backColor;
    padding: 16px 30px 15px;
  }

  .add_btn {
    @include deepButton(80px, 100%)
  }
</style>
