<template>
  <div>
    <Header :titleText="titleName" :canReturn="canReturn"></Header>
    <div class="mt-88px">
      <div class="doctor-item">
        <img :src="man_img">
        <div class="doctor-infor">
          <div class="infor-title">{{itemData.author}}</div>
          <div>
            <span>费用：</span><span class="color-red">{{itemData.price > 0 ? '￥' + itemData.price : '免费'}}</span>
          </div>
        </div>
      </div>
      <div class="doctor-spec">
        <div class="spec-content">
          <div class="mb-8px">
            <span>时间：</span><span class="text-block">{{itemData.pubdate|dateFormat('yyyy-MM-dd hh:mm')}}</span>
          </div>
          <div class="mb-8px">
            <span>地点：</span><span class="text-block">{{itemData.addr}}</span>
          </div>
        </div>
        <div class="register-btn">
          <button @click="goRoute">我要报名</button>
        </div>
      </div>
      <div class="doctor-intro">
        <SmallTitle :hasBlock="true" :hasLink="false">
          <span class="ml-16px">简介</span>
        </SmallTitle>
        <div class="text-content aritcle-content" v-html="itemData.content"></div>
        <div class="qrcode-block" v-if="qrcodeImg!=''">
          <img :src="qrcodeImg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '../../common'
import man from '@/assets/img/nan@2x.png'
import {platformArticleDetail, fetchUserQrcode} from '@/fetch/api.js'
import getWXSign from '@/assets/js/wx.js'
import {mapState} from 'vuex'
import menZhen from '@/assets/img/menzhen.png'

export default {
  name: 'trainingRegistration',
  props: ['id'],
  components: {
    Header,
    SmallTitle
  },
  data () {
    return {
      titleName: '',
      man_img: man,
      itemData: {},
      canReturn: true,
      qrcodeImg: ''
    }
  },
  created () {
    this.getDetail()
    if (this.$route.query.noReturn > 0) {
      this.canReturn = false
      this.getShareQrcode()
    }
  },
  computed: {
    ...mapState({
      'clinic': state => state.clinic,
      userInfoState: state => state.userInfoState
    })
  },
  methods: {
    getDetail () {
      platformArticleDetail({id: this.id}).then(res => {
        if (res.code === 1000) {
          this.itemData = res.data
          this.titleName = res.data.title
          try {
            getWXSign.apply(this).then(({wx, appId}) => {
              wx.updateAppMessageShareData({
                title: res.data.title, // 分享标题
                desc: res.data.introduction, // 分享描述
                link: window.location.origin + window.location.pathname + '?path=' + window.location.href.split('#')[1] + '&clinicId=' + this.clinic.id + '&appid=' + appId + '&userId=' + this.userInfoState.id,
                imgUrl: res.data.img_url ? res.data.img_url : (this.clinic.logo ? this.clinic.logo : menZhen), // 分享图标
                success: function () {
                  // 设置成功
                }
              })
              wx.updateTimelineShareData({
                title: res.data.title, // 分享标题
                link: window.location.origin + window.location.pathname + '?path=' + window.location.href.split('#')[1] + '&clinicId=' + this.clinic.id + '&appid=' + appId + '&userId=' + this.userInfoState.id,
                imgUrl: res.data.img_url ? res.data.img_url : (this.clinic.logo ? this.clinic.logo : menZhen), // 分享图标
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
    goRoute () {
      this.$router.push({name: 'registrationSure', params: {id: this.id}})
    },
    getShareQrcode () {
      fetchUserQrcode({
        'user_id': this.$route.query.userId ? this.$route.query.userId : this.userInfoState.id
      }).then(res => {
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
  .doctor-item {
    @extend %displayFlex;
    padding: 24px 30px;
    background: $backColor;

    img {
      width: 112px;
      height: 112px;
      border-radius: 50%;
    }

    .doctor-infor {
      flex: 1;
      margin-left: 24px;
      @extend %displayFlex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 28px;
      line-height: 40px;
      padding: 9px 0;
      color: #8c8c8c;

      .infor-title {
        color: #3f3f3f;
        font-weight: bold;
        font-size: 32px;
        line-height: 45px;
        margin-right: 16px;
      }
    }
  }

  .doctor-spec {
    padding: 0 30px 24px 30px;
    margin-bottom: 20px;
    background: $backColor;

    .spec-content {
      background: #fafafa;
      padding: 20px;
      font-size: 30px;
      color: $lightTextColor;
      line-height: 42px;

      .text-block {
        color: $depthTextColor;
      }
    }

    .register-btn {
      padding: 28px 0 16px;

      button {
        background: $yellowColor;
        border-radius: 8px;
        border: none;
        font-size: 28px;
        color: #ffffff;
        width: 100%;
        line-height: 80px;
      }
    }
  }

  .doctor-intro {
    background: $backColor;
    margin-bottom: 20px;

    .text-content {
      padding: 0 50px 35px;
      line-height: 40px;
      font-size: 28px;
      color: $depthTextColor;
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
