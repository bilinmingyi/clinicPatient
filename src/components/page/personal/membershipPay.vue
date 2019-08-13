<template>
  <div>
    <Header :canReturn="true" titleText="会员卡付款"></Header>
    <div class="mt-88px">
      <div class="white-back">
        <SmallTitle :hasBlock="true">
          <span class="ml-16px flexOne ">会员卡信息</span>
        </SmallTitle>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">会员卡号：</span>
            <span class="label-two">{{memberInfo.cardNo}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">会员姓名：</span>
            <span class="label-two">{{memberInfo.name}}</span>
          </div>
          <div>
            <span class="label-three">当前金额：</span>
            <span class="label-red">{{Number(memberInfo.presentAmount) + Number(memberInfo.amount)|toFix2}}元</span>
          </div>
        </div>
      </div>
      <div class="white-back">
        <SmallTitle :hasBlock="true">
          <span class="ml-16px">订单信息</span>
        </SmallTitle>
        <div class="patient-infor">
          <div class="line-item">
            <label class="label-span mr-32px">订单编号</label>
            <span class="label-span">{{orderSeqno}}</span>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">订单类型</label>
            <span class="label-span">{{orderType == 1 ? '预约订单' : '就诊订单'}}</span>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">订单金额</label>
            <span class="label-span">{{price}}</span>
          </div>
        </div>
      </div>
      <p class="no-enough-money" v-if="Number(memberInfo.presentAmount) + Number(memberInfo.amount) < price">
        员卡金额不足，请采用其他支付方式支付
      </p>
    </div>
    <div class="add-block">
      <button class="sure-btn" @click="goback">关闭</button>
      <button class="del-btn" @click="weixinPay"
              v-if="Number(memberInfo.presentAmount) + Number(memberInfo.amount) < price">微信支付
      </button>
      <button class="del-btn" v-else @click="submitPay">提交</button>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {Header, SmallTitle, Loading} from '../../common'
import {fetchMember, submitMember, gotoPay} from '@/fetch/api'
import {mapState} from 'vuex'

export default {
  name: 'membershipPay',
  props: ['orderSeqno', 'orderType', 'price'],
  components: {
    Header,
    SmallTitle,
    Loading
  },
  data () {
    return {
      showLoad: true,
      memberInfo: {
        name: '',
        cardNo: '',
        presentAmount: 0,
        amount: 0
      }
    }
  },
  created () {
    this.getMemberData()
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  methods: {
    getMemberData () {
      fetchMember().then(res => {
        this.showLoad = false
        if (res.code === 1000) {
          this.memberInfo.name = res.data.name
          this.memberInfo.cardNo = res.data.card_no
          this.memberInfo.amount = res.data.amount
          this.memberInfo.presentAmount = res.data.present_amount
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.showLoad = false
        this.$Message.infor('网络出错！')
      })
    },
    submitPay () {
      submitMember({
        'order_type': this.orderType,
        'order_seqno': this.orderSeqno
      }).then((res) => {
        this.showLoad = false
        if (res === 1000) {
          this.$router.back()
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.showLoad = false
        this.$Message.infor('网络出错！')
      })
    },
    goback () {
      this.$router.back()
    },
    weixinPay () {
      if (this.clinic.szjkPayEnabled === 1) {
        this.toPay()
      } else {
        this.$Message.infor('该诊所未开通线上支付功能！')
      }
    },
    toPay () {
      gotoPay({
        'order_type': 1,
        'order_seqno': this.orderSeqno
      }).then(res => {
        if (res.code === 1000) {
          try {
            window.location.href = res.data
          } catch (error) {
            console.log(error)
            this.$Message.infor('支付跳转失败')
          }
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .white-back {
    background: $backColor;
    margin-bottom: 20px;
  }

  .pay-code {
    @include simpleButton(64px, 128px);
    font-size: $depthTextColor;
    font-size: 24px;
  }

  .register-item {
    padding: 20px 30px;
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

  .label-red {
    color: #EB6262;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
  }

  .line-item {
    padding: 26px 0px;
    @extend %displayFlex
  }

  .line-hr {
    @extend %lineHr;
  }

  .label-span {
    color: $depthTextColor;
    line-height: 45px;
    font-size: 32px;
  }

  .patient-infor {
    padding: 0 30px;
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

  .no-enough-money {
    color: $redColor;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
  }
</style>
