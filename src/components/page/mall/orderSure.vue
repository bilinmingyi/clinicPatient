<template>
  <div>
    <Header titleText="订单确认" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <div class="clinic-content">
        <Small-title>
          <span>诊所药房</span>
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
      <div class="clinic-content">
        <div class="address">
          <div class="displayFlex mb-8px">
            <div class="flexOne">
              <p class="name mb-8px">收件人：王尼玛</p>
              <P>电话：15888654678</P>
            </div>
            <div>
              <button class="edit-btn">编辑</button>
            </div>
          </div>
          <div class="flex">
            <span>收货地址：</span>
            <span class="flexOne">广州市天河区珠江新城花城汇XXX街道幸福小区幸福的 幸福小区小区6栋601</span>
          </div>
        </div>
        <hr class="full-screen-hr">
        <div class="remark">
          <label>患者姓名</label>
          <input placeholder="暂无">
        </div>
      </div>
    </div>
    <Shop-footer btnText="去支付" :allPrice="100" @click="toPay"></Shop-footer>
  </div>
</template>

<script>
import {Header, ShopFooter, SmallTitle} from '../../common'

export default {
  name: 'orderSure',
  data () {
    return {}
  },
  components: {
    Header,
    ShopFooter,
    SmallTitle
  },
  methods: {
    toPay () {
      console.log('去支付')
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-content {
    background: $backColor;
    margin-bottom: 20px;
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
  .address{
    padding: 24px 30px;
    .displayFlex {
      @extend %flexV;
      font-size: 28px;
      line-height: 40px;
      color: $depthTextColor;
      .name {
        line-height: 45px;
        font-size: 32px;
        font-weight: bold;
      }
      .edit-btn {
        @include simpleButton(64px, 128px)
      }
    }
  }
  .remark {
    padding: 24px 30px;
    label {
      color: $lightTextColor;
      font-size: 32px;
    }
    input {
      padding-left: 24px;
      border: none;
      outline: none;
    }
  }
</style>
