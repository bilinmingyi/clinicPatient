<template>
  <div>
    <Header :canReturn="true" titleText="订单详情"></Header>
    <div class="mt-88px mb-131px">
      <div class="content-back">
        <Small-title :hasBlock="true">
          <span class="ml-16px flexOne">订单信息</span>
          <span class="label-red">{{orderDetail.order_info.status|treatOrderStatus}}</span>
        </Small-title>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">下单时间：</span>
            <!--<span class="label-two">{{orderDetail.order_info.createTime|dateFormat}}</span>-->
          </div>
          <div class="mb-8px">
            <span class="label-three">患者信息：</span>
            <span
              class="label-two">{{orderDetail.order_info.patientName}}/{{orderDetail.order_info.patientSex|sexFormat}}/{{orderDetail.order_info.patientAge}}岁</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">患者主诉：</span>
            <span
              class="label-two">{{orderDetail.order_info.chiefComplaint}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">医生姓名：</span>
            <span
              class="label-two">{{orderDetail.order_info.doctorName}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">医生备案：</span>
            <span
              class="label-two">{{orderDetail.order_info.memo}}</span>
          </div>
        </div>
      </div>
      <div class="content-back">
        <div class="line-item">
          <label class="label-span mr-32px flexOne">订单总价</label>
          <span class="label-red">￥{{orderDetail.order_info.price}}</span>
        </div>
        <hr class="line-hr">
        <div class="line-item">
          <label class="label-span mr-32px flexOne">支付方式</label>
          <span class="label-span">{{orderDetail.order_info.payType|payTypeFormat}}</span>
        </div>
        <hr class="line-hr">
      </div>
    </div>
    <div class="add-block">
      <button class="add-btn" @click.stop="nextDone">{{orderDetail.order_info.status === 'UNPAID'?'去支付':'关闭'}}</button>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '../../common'
import {fecthRecipeDetail, gotoPay} from '@/fetch/api.js'

export default {
  name: 'recipeOrderDetail',
  props: ['orderSeqno'],
  data () {
    return {
      orderDetail: {
        order_info: {},
        user_info: {}
      }
    }
  },
  components: {
    Header,
    SmallTitle
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      fecthRecipeDetail({
        order_seqno: this.orderSeqno,
        need_recipes: 1
      }).then(res => {
        if (res.code === 1000) {
          this.orderDetail = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        this.$Message.infor('网络出错！')
        console.log(error)
      })
    },
    nextDone () {
      if (this.orderDetail.order_info.status === 'UNPAID') {
        gotoPay({
          'order_type': 2,
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
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-back {
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

  .label-red {
    color: #EB6262;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
  }

  .line-item {
    padding: 26px 30px;
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

  .add-btn {
    @include deepButton(80px, 100%)
  }
</style>
