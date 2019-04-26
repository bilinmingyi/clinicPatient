<template>
  <div class="shop-footer">
    <div class="flexOne all-info">
      <div class="car-block">
        <img src="../../assets/img/gwcn@2x.png">
      </div>
      <div class="amount-block">
        <span>合计：</span>
        <span class="red-text">￥354545</span>
      </div>
    </div>
    <div class="add-car-btn">
      加入购物车
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShopFooter',
  data () {
    return {}
  },
  methods: {}
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

        img {
          width: 48px;
          height: 48px;
        }
      }

      .amount-block {
        color: $depthTextColor;
        font-size: 32px;
        line-height: 52px;
        font-weight: 400;
      }
    }

    .add-car-btn {
      background: $redColor;
      color: #ffffff;
      @extend %flexVC;
      font-size: 32px;
      padding: 0 44px;
    }

    .red-text {
      color: $redColor;
    }
  }
</style>
