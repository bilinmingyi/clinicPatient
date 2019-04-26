<template>
  <div>
    <Header titleText="商品详情" :canReturn="true"></Header>
    <div class="mt-88px mb-131px detail-content">
      <div class="img-content">
        <img :src="noImg">
      </div>
      <hr class="full-screen-hr">
      <div class="goods-info">
        <div class="price mb-8px">
          ￥13232
        </div>
        <div class="good-title">
          <span>葵花牌</span>
          <span>葵花健儿消食口服液</span>
          <span>10ml*6支/盒</span>
          <span>10盒</span>
          <span>黑龙江葵花药业股份有限公司</span>
        </div>
      </div>
      <hr class="full-screen-hr">
      <Small-title :hasBlock="true">
        <span class="ml-16px">商品简介</span>
      </Small-title>
      <div class="intro-content">
        这是说明这是说明这是说明这是说明这是说明这是说明
        这是说明这是说明这是说明这是说明这是说明这是说明
        这是说明这是说明这是说明这是说明这是说明这是说明
        这是说明这是说明这是说明这是说明这是说明这是说明
        这是说明这是说明这是说明这是说明这是说明这是。
      </div>
    </div>
    <Shop-footer></Shop-footer>
  </div>
</template>

<script>
import {Header, SmallTitle, ShopFooter} from '@/components/common/index'
import noImg from '@/assets/img/nophoto.png'

export default {
  name: 'goodsDetail',
  components: {
    Header,
    SmallTitle,
    ShopFooter
  },
  data () {
    return {
      noImg: noImg
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
  .detail-content {
    background: $backColor;

    .img-content {
      @extend %flexVC;
      padding: 8px 0;
      img {
        width: 543px;
        height: 543px;
      }
    }

    .goods-info {
      padding: 24px 30px;
      .price {
        color: $redColor;
        font-size: 40px;
        line-height: 56px;
        font-weight: 500;
      }
      .good-title {
        color: $depthTextColor;
        font-size:32px;
        line-height:45px;
      }
    }
    .intro-content {
      padding: 24px 30px;
    }
  }
</style>
