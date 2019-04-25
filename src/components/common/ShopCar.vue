<template>
  <div class="shop-car">
    <img src="../../assets/img/gwct@2x.png">
    <div class="red-block">2</div>
  </div>
</template>

<script>
export default {
  name: 'ShopCar'
}
</script>

<style lang="scss" scoped>
  .shop-car {
    position: fixed;
    bottom: 150px;
    right: 48px;
    width:96px;
    height:96px;
    background:rgba(255,255,255,1);
    box-shadow:0px 2px 8px 0px rgba(195,195,195,0.63);
    border-radius: 50%;
    z-index: 109;
    @extend %flexVC;
    img {
      width: 48px;
      height: 48px;
    }
    .red-block {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      color: #ffffff;
      text-align: center;
      line-height: 40px;
      font-size: 20px;
      background: $redColor;
      border: 4px solid #ffffff;
      box-sizing: content-box;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
