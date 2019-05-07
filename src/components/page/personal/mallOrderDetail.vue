<template>
  <div>
    <Header :canReturn="true" titleText="订单详情"></Header>
    <div class="mt-88px mb-131px">
      <div class="content-back">
        <Small-title :hasBlock="true">
          <span class="flexOne ml-16px">订单信息</span>
          <span class="label-red">{{orderDetail.status|mallOrderStatus}}</span>
        </Small-title>
        <div class="order-infor">
          <div class="flex mb-8px">
            <div class="label-text">下单时间：</div>
            <div class="input-text">{{orderDetail.create_time|dateFormat}}</div>
          </div>
          <div class="flex mb-8px">
            <div class="label-text">订单号：</div>
            <div class="input-text">{{orderDetail.order_seqno}}</div>
          </div>
          <div class="flex">
            <div class="label-text">备注：</div>
            <div class="input-text">{{orderDetail.memo}}</div>
          </div>
          <div class="flex mb-8px mt-40px">
            <div class="label-text"> 收件人：</div>
            <div class="input-text">{{orderDetail.contact}}</div>
          </div>

          <div class="flex mb-8px">
            <div class="label-text"> 电话：</div>
            <div class="input-text">{{orderDetail.phone_num}}</div>
          </div>
          <div class="flex">
            <div class="label-text">收货地址：</div>
            <div class="input-text">{{orderDetail.address}}</div>
          </div>
        </div>
      </div>
      <div class="content-back">
        <Small-title :hasBlock="true">
          <span class="flexOne ml-16px">诊所药房</span>
        </Small-title>
        <div v-for="(item, index) in orderDetail.goods_order_items" :key="item.id">
          <div class="goods-item">
            <div class="goods-item-middle">
              <img src="../../../assets/img/nophoto.png">
            </div>
            <div class="goods-item-right">
              <div class="goods-info">
                <span>{{item.name}}</span><span>{{item.spec}}</span>
              </div>
              <div class="goods-num">
              <span class="flexOne">
                ￥{{item.price}}
              </span>
                <div class="num-change">数量：{{item.num}}</div>
              </div>
            </div>
          </div>
          <hr class="full-screen-hr" v-show="index !== orderDetail.goods_order_items.length - 1">
        </div>
      </div>
      <div class="content-back">
        <div class="line-item">
          <label class="label-span mr-32px flexOne">订单总价</label>
          <span class="label-red">￥{{orderDetail.price}}</span>
        </div>
        <section v-if="orderDetail.status === 'DELIVER' || orderDetail.status === 'WAIT_INSTOCK' || orderDetail.status === 'DONE'">
          <hr class="full-screen-hr">
          <div class="line-item">
            <label class="label-span mr-32px flexOne">支付方式</label>
            <span class="label-span">{{orderDetail.pay_type|payTypeFormat}}</span>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '../../common'
import {fetchGoodList} from '@/fetch/api'

export default {
  name: 'mallOrderDetail',
  props: ['orderSeqno'],
  components: {
    Header,
    SmallTitle
  },
  data () {
    return {
      orderDetail: {}
    }
  },
  created () {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      fetchGoodList({
        order_seqno: this.orderSeqno,
        need_detail: 1
      }).then(res => {
        console.log(res)
        if (res.code === 1000) {
          this.orderDetail = res.data[0]
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-back {
    background: $backColor;
    margin-bottom: 20px;
  }

  .label-red {
    color: #EB6262;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
  }

  .goods-item {
    @extend %flexV;
    padding: 32px 30px;

    .goods-item-middle {
      margin-right: 24px;
      padding: 7px;
      border: 1px solid $lineColor;
      border-radius: 8px;

      img {
        width: 146px;
        height: 146px;
      }
    }

    .goods-item-right {
      flex: 1;

      .goods-info {
        font-size: 28px;
        color: $depthTextColor;
        line-height: 40px;
        margin-bottom: 35px;
      }

      .goods-num {
        @extend %displayFlex;

        span {
          color: $redColor;
          font-size: 32px;
          line-height: 45px;
          font-weight: 500;
        }

        .num-change {
          color: #494949;
          font-size: 32px;
          line-height: 45px;
        }
      }
    }
  }

  .line-item {
    padding: 26px 30px;
    @extend %displayFlex
  }

  .label-span {
    color: $depthTextColor;
    line-height: 45px;
    font-size: 32px;
  }

  .order-infor {
    padding: 20px 30px;
    line-height: 42px;

    .label-text {
      color: $lightTextColor;
      font-size: 30px;
      width: 150px;
      text-align: right;
    }

    .input-text {
      color: $depthTextColor;
      font-size: 30px;
      flex: 1;
    }
  }

  .label-red {
    color: #EB6262;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
  }
</style>
