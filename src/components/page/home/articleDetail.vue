<template>
  <div>
    <Header :canReturn="canReturn" titleText="动态详情"></Header>
    <div class="mt-88px content-block">
      <div class="content-title">{{title}}</div>
      <div class="content-type">{{type|articleType}}</div>
      <div class="content-time">{{pubdate|dateFormat}}</div>
      <div class="aritcle-content" v-html="content"></div>
      <div class="qrcode-block" v-if="qrcodeImg!=''">
        <img :src="qrcodeImg">
      </div>
    </div>
  </div>
</template>

<script>
import {Header} from '@/components/common/index'
import {fetchArticleDetail, fetchUserQrcode} from '@/fetch/api.js'
import getWXSign from '@/assets/js/wx.js'
import {mapState} from 'vuex'
import menZhen from '@/assets/img/menzhen.png'

export default {
  name: 'articleDetail',
  data () {
    return {
      content: '',
      title: '',
      type: 0,
      pubdate: 0,
      canReturn: true,
      qrcodeImg: ''
    }
  },
  props: ['id'],
  components: {
    Header
  },
  created () {
    this.getDetail()
    this.getShareQrcode()
    if (this.$route.query.noReturn > 0) {
      this.canReturn = false
    }
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  methods: {
    getDetail () {
      fetchArticleDetail({id: this.id}).then(res => {
        if (res.code === 1000) {
          this.content = res.data.content
          this.title = res.data.title
          this.pubdate = res.data.pubdate
          this.type = res.data.type
          try {
            getWXSign.apply(this).then(({wx, appId}) => {
              wx.updateAppMessageShareData({
                title: res.data.title, // 分享标题
                desc: res.data.remark, // 分享描述
                link: window.location.origin + window.location.pathname + '?path=' + encodeURIComponent(window.location.href.split('#')[1]) + '&clinicId=' + this.clinic.id + '&appid=' + appId,
                imgUrl: res.data.imgUrl ? res.data.imgUrl : (this.clinic.logo ? this.clinic.logo : menZhen), // 分享图标
                success: function () {
                  // 设置成功
                }
              })
              wx.updateTimelineShareData({
                title: res.data.title, // 分享标题
                link: window.location.origin + window.location.pathname + '?path=' + encodeURIComponent(window.location.href.split('#')[1]) + '&clinicId=' + this.clinic.id + '&appid=' + appId,
                imgUrl: res.data.imgUrl ? res.data.imgUrl : (this.clinic.logo ? this.clinic.logo : menZhen), // 分享图标
                success: function () {
                  // 设置成功
                }
              })
            })
          } catch (e) {
            console.log(e)
          }
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    getShareQrcode () {
      fetchUserQrcode().then(res => {
        if (res.code === 1000) {
          this.qrcodeImg = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        // this.$Message.infor('获取二维码失败！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-block {
    padding: 20px;
    background: $backColor;

    .content-title {
      font-weight: bold;
      font-size: 36px;
      color: $depthTextColor;
      padding: 40px 0 0;
    }

    .content-type {
      font-size: 28px;
      color: $lightTextColor;
      margin-top: 20px;
    }

    .content-time {
      font-size: 30px;
      color: $lightTextColor;
      margin: 20px 0;
    }

    .qrcode-block {
      @extend %flexVC;
      padding: 50px 0;

      img {
        width: 300px;
        height: 300px;
      }
    }
  }
</style>
