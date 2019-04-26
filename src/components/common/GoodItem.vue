<template>
  <div class="good-item" @click.stop="goRoute(1)">
    <div class="item-top">
      <img :src="noImg">
    </div>
    <div class="item-bottom">
      <div class="item-title">葵花健儿消食口服液啦葵花健儿消食口服液啦</div>
      <div class="item-price">
        <div class="flexOne">￥5466</div>
        <img @click.stop="goRoute(2)" src="../../assets/img/gwc@2x.png">
      </div>
    </div>
  </div>
</template>

<script>
import noImg from '../../assets/img/nophoto.png'

export default {
  name: 'GoodItem',
  data () {
    return {
      noImg: noImg
    }
  },
  methods: {
    goRoute (type) {
      switch (type) {
        case 1:
          this.$router.push({path: `/mall/goodsDetail/1`})
          break
        case 2:
          this.$router.push({path: '/mall/shopCar'})
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .good-item {
    background: $backColor;
    margin-bottom: 16px;
    width: calc(50vw - 5px);

    .item-top {
      padding: 21px;
      @extend %flexVC;

      img {
        width: 314px;
        height: 314px;
      }
    }

    .item-bottom {
      padding: 6px 30px 20px;

      .item-title {
        color: $middleTextColor;
        font-size: 28px;
        line-height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-price {
        color: $redColor;
        line-height: 50px;
        font-size: 36px;
        margin-top: 12px;
        @extend %flexV;

        img {
          height: 48px;
          width: 48px;
          margin-left: 60px;
        }
      }
    }
  }
</style>
