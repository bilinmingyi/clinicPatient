<template>
  <div>
    <Header titleText="培训报名" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <section class='appoint-info'>
        <Small-title :hasBlock="true" :hasLink="false">
          <span class="ml-16px label-five">{{itemData.title}}</span>
        </Small-title>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">讲师名称：</span>
            <span class="label-two">{{itemData.author}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">培训时间：</span>
            <span class="label-two">{{itemData.pubdate|dateFormat('yyyy-MM-dd hh:mm')}}</span>
          </div>
          <div>
            <span class="label-three">培训地点：</span>
            <span class="label-two">{{itemData.addr}}</span>
          </div>
        </div>
      </section>
      <section class='appoint-info'>
        <div class="appoint-text">
          <div class="line-item">
            <label class="label-span mr-32px">报名人员</label>
            <input type="text" class="input-item flexOne" placeholder="请输入报名人员" v-model="name" @blur="scrollToTop">
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">联系电话</label>
            <input type="number" class="input-item flexOne" placeholder="请输入联系电话" v-model="mobile" @blur="scrollToTop">
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">缴费金额</label>
            <span class="label-span" style="font-weight: bold;color: #eb6262;">{{itemData.price|priceFormat}}</span>
          </div>
        </div>
      </section>
    </div>
    <div class="add-block">
      <button class="sure-btn" onclick="window.history.back()">取消</button>
      <button class="del-btn" @click="gotoPay">去支付</button>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '@/components/common'
import {platformArticleDetail, createTrainOrder} from '@/fetch/api.js'
import inputBlur from '@/assets/js/inputBlur'

export default {
  name: 'registrationSure',
  mixins: [inputBlur],
  props: ['id'],
  components: {
    Header,
    SmallTitle
  },
  data () {
    return {
      itemData: {},
      name: '',
      mobile: ''
    }
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      platformArticleDetail({id: this.id}).then(res => {
        if (res.code === 1000) {
          this.itemData = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    gotoPay () {
      if (!this.name) {
        this.$Message.infor('请填写报名人员')
        return
      }
      if (!/^\d{11}$/.test(this.mobile)) {
        this.$Message.infor('请输入正确的联系电话')
        return
      }
      createTrainOrder({
        'article_id': this.id,
        'register_name': this.name,
        'register_mobile': this.mobile
      }).then(
        res => {
          if (res.code === 1000) {
            if (this.itemData.price > 0) {
              this.$router.replace({
                name: 'registrationOrderDetail', query: {shouldPay: 1, order: res.data, article: this.id}
              })
            } else {
              this.$Message.confirm('报名成功！', () => {
                this.$router.replace({
                  name: 'registrationOrderDetail', query: {shouldPay: 1, order: res.data, article: this.id}
                })
              }, true)
            }
          } else {
            this.$Message.infor(res.msg)
          }
        }
      ).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .appoint-info {
    background: $backColor;
    margin-bottom: 20px;
  }

  .register-item {
    padding: 0px 30px 20px;
  }

  .label-one {
    font-size: 28px;
    color: $lightTextColor;
    line-height: 45px;
  }

  .label-two {
    font-size: 30px;
    color: $depthTextColor;
    line-height: 42px;
  }

  .label-three {
    font-size: 30px;
    color: $lightTextColor;
    line-height: 42px;
  }

  .label-four {
    color: $depthTextColor;
    line-height: 64px;
    font-size: 32px;
    text-align: left;
    width: 160px !important;
  }

  .label-five {
    color: $depthTextColor;
    line-height: 45px;
    font-size: 32px;
    font-weight: bold;
  }

  .label-red {
    color: #eb6262;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
  }

  .appoint-text {
    padding: 0 30px;
  }

  .line-items {
    padding: 16px 0px;
    position: relative;
    @extend %displayFlex;
    align-items: center;
    // justify-content: space-between;
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

  .input-width {
    width: 55px;
    text-align: center;
  }

  .add-block {
    @include psFixed(bottom, 112px);
    @extend %displayFlex;
    background: $backColor;
    padding: 16px 30px 15px;
    width: 100%;
    border-top: 1px solid $lineColor;
  }

  .del-btn {
    @include deepButton(80px, 48%);
    margin-left: 4%;
  }

  .sure-btn {
    @include simpleButton(80px, 48%);
  }

  .phone-btn {
    @include deepButton(64px, 148px);
  }
</style>
