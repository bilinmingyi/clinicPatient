<template>
  <div class="shop-footer" :style="{'bottom':bottom}">
    <div class="flexOne all-info">
      <div class="car-block" @click.stop="goRouter" v-if="hasCar">
        <img src="../../assets/img/gwcn@2x.png">
        <div class="car-num" v-if="carNum>0">{{carNum}}</div>
      </div>
      <div class="amount-block">
        <span>合计：</span>
        <span class="red-text">￥{{allPrice.toFixed(2)}}</span>
      </div>
    </div>
    <div :class="['add-car-btn',{'ccc-back': isNoCan}]" @click.stop="btnClick">
      {{btnText}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopFooter',
  props: {
    btnText: {
      type: String,
      default: '按钮文本'
    },
    allPrice: {
      type: Number,
      default: 0
    },
    hasCar: {
      type: Boolean,
      default: false
    },
    carNum: {
      type: Number,
      default: 0
    },
    isNoCan: {
      type: Boolean,
      default: false
    },
    bottom: {
      type: String,
      default: '0'
    }
  },
  data () {
    return {}
  },
  methods: {
    goRouter () {
      this.$router.push({path: '/mall/shopCar'})
    },
    btnClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .shop-footer {
    @include psFixed(bottom, 96px);
    background: $backColor;
    @extend %displayFlex;

    .all-info {
      padding: 22px 0 24px 40px;
      @extend %displayFlex;

      .car-block {
        margin-right: 24px;
        position: relative;

        .car-num {
          border: 4px solid #ffffff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          background: $redColor;
          color: #ffffff;
          line-height: 30px;
          font-size: 20px;
          text-align: center;
          position: absolute;
          right: -15px;
          top: -15px;
        }

        img {
          width: 48px;
          height: 48px;
        }
      }

      .amount-block {
        color: $depthTextColor;
        font-size: 32px;
        line-height: 52px;
        font-weight: bold;
      }
    }

    .add-car-btn {
      background: $redColor;
      color: #ffffff;
      @extend %flexVC;
      font-size: 32px;
      width: 248px;
      text-align: center;
    }

    .ccc-back {
      background: #cccccc;
    }

    .red-text {
      color: $redColor;
    }
  }
</style>
