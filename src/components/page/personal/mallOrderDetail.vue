<template>
  <div>
    <Header :canReturn="true" titleText="订单详情"></Header>
    <div class="mt-88px">
      <div class="content-back">
        <Small-title :hasBlock="true">
          <span class="flexOne ml-16px">订单信息</span>
          <span class="label-red">待支付</span>
        </Small-title>
        <div>
          相关信息
        </div>
      </div>
      <div class="content-back">
        <Small-title :hasBlock="true">
          <span class="flexOne ml-16px">诊所药房</span>
        </Small-title>
        <div class="goods-item">
          <div class="goods-item-middle">
            <img src="../../../assets/img/nophoto.png">
          </div>
          <div class="goods-item-right">
            <div class="goods-info">
              <span>葵花牌 葵花健儿消食口服液口服液</span><span>10ml*6支/盒 10盒</span>
            </div>
            <div class="goods-num">
              <span class="flexOne">
                ￥13232
              </span>
              <div class="num-change">数量：87</div>
            </div>
          </div>
        </div>
        <hr class="full-screen-hr">
        <div class="goods-item">
          <div class="goods-item-middle">
            <img src="../../../assets/img/nophoto.png">
          </div>
          <div class="goods-item-right">
            <div class="goods-info">
              <span>葵花牌 葵花健儿消食口服液口服液</span><span>10ml*6支/盒 10盒</span>
            </div>
            <div class="goods-num">
              <span class="flexOne">
                ￥13232
              </span>
              <div class="num-change">数量：87</div>
            </div>
          </div>
        </div>
      </div>
      <div class="content-back">
        <div class="line-item">
          <label class="label-span mr-32px flexOne">订单总价</label>
          <span class="label-red">￥100</span>
        </div>
        <hr class="full-screen-hr">
        <div class="line-item">
          <label class="label-span mr-32px flexOne">支付方式</label>
          <span class="label-span">支付宝</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '../../common'

export default {
  name: 'mallOrderDetail',
  components: {
    Header,
    SmallTitle
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

  .label-red {
    color: #EB6262;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
  }
</style>
