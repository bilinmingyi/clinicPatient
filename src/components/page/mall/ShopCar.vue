<template>
  <div>
    <Header titleText="购物车" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <div class="clinic-content">
        <Small-title @click.native="selectALL">
          <div :class="['select-radio',{'border-yuan':!resource}]">
            <img v-show="resource" src="../../../assets/img/xuanze@2x.png">
          </div>
          <span class="ml-20px">诊所药房</span>
        </Small-title>
        <div class="goods-item">
          <div>
            <div :class="['select-radio']">
              <img src="../../../assets/img/xuanze@2x.png">
            </div>
          </div>
          <div class="goods-item-middle">
            <img src="../../../assets/img/nophoto.png">
          </div>
          <div class="goods-item-right">
            <div class="goods-info">
              <span>葵花牌 葵花健儿消食口服液口服液</span>
              <span>10ml*6支/盒 10盒</span>
            </div>
            <div class="goods-num">
              <span class="flexOne">
                ￥13232
              </span>
              <div class="num-change">
                <div class="num-cut"></div>
                <input class="num-word">
                <div class="num-add"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
    <Shop-footer btnText="去结算" :allPrice="100" @click="toCount"></Shop-footer>
  </div>
</template>

<script>
import {Header, ShopFooter, SmallTitle} from '../../common'

export default {
  name: 'ShopCar',
  components: {
    Header,
    ShopFooter,
    SmallTitle
  },
  data () {
    return {
      resource: false
    }
  },
  methods: {
    toCount () {
      this.$router.push({path: '/mall/sureOrder'})
    },
    selectALL () {
      this.resource = !this.resource
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-content {
    background: $backColor;
  }

  .select-radio {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    img {
      width: 40px;
      height: 40px;
    }
  }

  .border-yuan {
    border: 1px solid $lightTextColor;
  }

  .goods-item {
    @extend %flexV;
    padding: 32px 30px;

    .goods-item-middle {
      margin-left: 20px;
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
          @extend %flexV;
          .num-cut {
            width: 44px;
            height: 44px;
            background-image: url("../../../assets/img/jianshao@2x.png");
            background-size: 100% 100%;
          }
          .num-word {
            border: none;
            outline: none;
            width: 80px;
            color: $depthTextColor;
            text-align: center;
            line-height: 45px;
            font-size: 32px;
          }
          .num-add {
            width: 44px;
            height: 44px;
            background-image: url("../../../assets/img/zengjia@2x.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
