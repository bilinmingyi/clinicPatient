<template>
  <div>
    <Header :titleText="titleName" :canReturn="true"></Header>
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
          <div class="mb-8px">
            <span>报名时间：</span><span class="text-block">{{orderDetail.create_time|dateFormat('yyyy-MM-dd hh:mm')}}</span>
          </div>
          <div class="mb-8px">
            <span>报名人员：</span><span
            class="text-block">{{orderDetail.register_name}}/{{orderDetail.register_mobile}}</span>
          </div>
          <div class="mb-8px">
            <span>备注信息：</span><span
            class="text-block">{{orderDetail.remark}}</span>
          </div>
          <div>
            <span>订单状态：</span>
            <span class="text-block font-bold">{{orderDetail.status|treatOrderStatus}}</span>
          </div>
        </div>
      </div>
      <div class="doctor-intro">
        <SmallTitle :hasBlock="true" :hasLink="false">
          <span class="ml-16px">简介</span>
        </SmallTitle>
        <div class="text-content aritcle-content" v-html="itemData.content"></div>
      </div>
    </div>
    <div class="add-block" v-if="orderDetail.status==='UNPAID'">
      <button class="del-btn" @click.stop="cancelOrder">取消订单</button>
      <button class="weixin-pay-btn" @click.stop="toPay">微信支付</button>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '../../common'
import {platformArticleDetail, fetchTrainOrderList, gotoPay, cancelTrainOrder} from '@/fetch/api.js'
import man from '@/assets/img/nan@2x.png'

export default {
  name: 'registrationOrderDetail',
  components: {
    Header,
    SmallTitle
  },
  data () {
    return {
      titleName: '',
      man_img: man,
      itemData: {},
      orderDetail: {}
    }
  },
  props: ['order', 'article', 'shouldPay'],
  created () {
    // if (Number(this.shouldPay) === 1) {
    //
    // }
    this.getArticleDetail()
    this.getOrderDetail()
  },
  methods: {
    getArticleDetail () {
      platformArticleDetail({id: this.article}).then(res => {
        if (res.code === 1000) {
          this.titleName = res.data.title
          this.itemData = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    getOrderDetail () {
      fetchTrainOrderList({
        'order_seqnos': [this.order]
      }).then(res => {
        if (res.code === 1000) {
          this.orderDetail = res.data.length > 0 ? res.data[0] : {}
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    toPay () {
      gotoPay({
        'order_type': 10,
        'order_seqno': this.order
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
    cancelOrder () {
      this.$Message.confirm('确定取消改订单！', () => {
        cancelTrainOrder({
          'order_seqno': this.order
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
  }

  .weixin-pay-btn {
    width: 48%;
    height: 80px;
    background: #4dbc89;
    border-radius: 8px;
    color: #ffffff;
    border: 1px solid #4dbc89;
    font-size: 24px;
    line-height: 24px;
    text-align: center;
    margin-left: 4%;
  }
</style>
