<template>
  <div>
    <Header :canReturn="true" titleText="预约订单详情"></Header>
    <div class="mt-88px">
      <div class="white-back">
        <SmallTitle :hasBlock="true">
          <span class="ml-16px">挂号信息</span>
        </SmallTitle>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">预约地点：</span>
            <span class="label-two">{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">预约时间：</span>
            <span class="label-two"
              v-if="orderInfo.appoint_date">{{orderInfo.appoint_date|dateFormat('yyyy-MM-dd   W   ')}}{{orderInfo.start_time}}-{{orderInfo.end_time}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">预约{{(clinic.serviceType == 6 ? '营养师' : '医生')}}：</span>
            <span class="label-two">{{orderInfo.doctor_name}}</span>
          </div>
          <div>
            <span class="label-three">挂号费用：</span>
            <span class="label-red">{{orderInfo.amount_receivable}}元</span>
          </div>
        </div>
      </div>
      <div class="white-back">
        <SmallTitle :hasBlock="true">
          <span class="ml-16px">客户信息</span>
        </SmallTitle>
        <div class="patient-infor">
          <div class="line-item">
            <label class="label-span mr-32px">手机号码</label>
            <span class="label-span">{{orderInfo.patient_mobile}}</span>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-96px">姓名</label>
            <span class="label-span">{{orderInfo.patient_name}}</span>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-96px">性别</label>
            <span class="label-span">{{orderInfo.patient_sex|sexFormat}}</span>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-96px">年龄</label>
            <span class="label-span">{{orderInfo.patient_age}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="add-block" v-if="orderInfo.status === 'SIGN_WAITING' && orderInfo.source === 'GZH' && orderInfo.is_online === 1">
      <button class="sure-btn" @click.stop="nextDone">关闭</button>
      <button class="del-btn" @click.stop="deleteItem">取消订单</button>
    </div>
    <div class="add-block" v-else>
      <template v-if="orderInfo.status === 'SZJK_PAYING' || (orderInfo.status === 'UNPAID' && orderInfo.amount_receipts === 0)">
        <button class="weixin-pay-btn" @click.stop="nextDone">微信支付</button>
        <!--        <button class="member-pay-btn" @click.stop="memberPay">会员支付</button>-->
      </template>
      <template v-else>
        <button class="sure-btn" @click.stop="nextDone" style="width: 100%">关闭</button>
      </template>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import { Header, SmallTitle, Loading } from '../../common'
import { mapState } from 'vuex'
import { fetchAppointDetail, gotoPay, cancelAppoint } from '@/fetch/api.js'

export default {
  name: 'appointOrderDetail',
  props: ['orderSeqno', 'shouldPay', 'price'],
  components: {
    Header,
    SmallTitle,
    Loading
  },
  data () {
    return {
      orderInfo: {},
      showLoad: false
    }
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  mounted () {
    // if (Number(this.shouldPay) === 1 && this.price > 0) {
    // if (this.clinic.szjkPayEnabled === 1) {
    //   this.toPay()
    //   this.$router.replace({name: 'appointOrderDetail', query: {orderSeqno: this.orderSeqno}})
    // } else {
    //   this.$Message.infor('该诊所未开通线上支付功能！')
    //   this.getDetail()
    //   // }
    // } else {
    this.getDetail()
    // }
  },
  methods: {
    getDetail () {
      this.showLoad = true
      fetchAppointDetail({
        order_seqno: this.orderSeqno
      }).then(res => {
        this.showLoad = false
        if (res.code === 1000) {
          this.orderInfo = res.data
          let time = this.orderInfo.appoint_date
          if (time) {
            this.orderInfo.appoint_date = new Date(time.substr(0, 4) + '-' + time.substr(4, 2) + '-' + time.substr(6, 2))
          }
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        this.showLoad = false
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    nextDone () {
      if (this.orderInfo.status === 'SZJK_PAYING' || (this.orderInfo.status === 'UNPAID' && this.orderInfo.amount_receipts === 0)) {
        if (this.clinic.szjkPayEnabled === 1) {
          this.toPay()
        } else {
          this.$Message.infor('该诊所未开通线上支付功能！')
        }
      } else {
        this.$router.go(-1)
      }
    },
    memberPay () {
      if (this.orderInfo.status === 'SZJK_PAYING' || (this.orderInfo.status === 'UNPAID' && this.orderInfo.amount_receipts === 0)) {
        this.$router.push({
          name: 'membershipPay',
          query: { orderType: 1, orderSeqno: this.orderSeqno, price: this.orderInfo.price }
        })
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
    },
    deleteItem () {
      this.$Message.confirm('确定取消?', () => {
        cancelAppoint({
          'order_seqno': this.orderSeqno
        }).then(res => {
          if (res.code === 1000) {
            this.$router.back()
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(error => {
          console.log(error)
          this.$Message.infor('网络出错！')
        })
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

.del-btn {
  @include deepButton(80px, 48%);
  margin-left: 4%;
}

.sure-btn {
  @include simpleButton(80px, 48%);
}

.member-pay-btn {
  width: 48%;
  margin-left: 4%;
  height: 80px;
  background: #edab15;
  color: #ffffff;
  border-radius: 8px;
  border: 1px solid #edab15;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
}

.weixin-pay-btn {
  width: 100%;
  height: 80px;
  background: #4dbc89;
  border-radius: 8px;
  color: #ffffff;
  border: 1px solid #4dbc89;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
}

.label-red {
  color: #eb6262;
  font-size: 30px;
  line-height: 42px;
  font-weight: bold;
}

.line-item {
  padding: 26px 0px;
  @extend %displayFlex;
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

.add-btn {
  @include deepButton(80px, 100%);
}
</style>
