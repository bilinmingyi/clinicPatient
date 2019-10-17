<template>

  <div class="footer common-footer">
    <div :class="['footer-item',{'cur':navtiveIndex==1}] " @click.stop="goRoute(1)">
      <img src="../../assets/img/sydj@2x.png" v-if="navtiveIndex==1">
      <img src="../../assets/img/Page 1@2x.png" v-else>
      <span class="footer-text">首页</span>
    </div>
    <div :class="['footer-item',{'cur':navtiveIndex==2}] " @click.stop="goRoute(2)">
      <img src="../../assets/img/ssdj@2x.png" v-if="navtiveIndex==2">
      <img src="../../assets/img/ss@2x.png" v-else>
      <span class="footer-text">发现</span>
    </div>
    <div :class="['footer-item',{'cur':navtiveIndex==3}] " @click.stop="goRoute(3)">
      <img src="../../assets/img/gwcdj@2x.png" v-if="navtiveIndex==3">
      <img src="../../assets/img/gwc@2x.png" v-else>
      <span class="footer-text">购物车</span>
    </div>
    <div :class="['footer-item',{'cur':navtiveIndex==4}] " @click.stop="goRoute(4)">
      <img src="../../assets/img/grdj@2x.png" v-if="navtiveIndex==4">
      <img src="../../assets/img/gr@2x.png" v-else>
      <span class="footer-text">个人</span>
    </div>
  </div>

</template>

<script>
export default {
  name: 'Footer',
  props: {
    navtiveIndex: {
      default: 1
    }
  },
  data () {
    return {}
  },
  methods: {
    goRoute (index) {
      if (index === Number(this.navtiveIndex)) {
        return
      }
      switch (index) {
        case 1:
          this.$router.push({name: 'homePage'})
          break
        case 2:
          this.$router.push({name: 'doctorPage'})
          break
        case 3:
          // this.$router.push({path: 'mall'})
          this.$router.push({name: 'shopCar'})
          break
        case 4:
          this.$router.push({name: 'personal'})
          break
      }
    }
  }

}
</script>

<style lang="scss" scoped>

  .common-footer {
    @include psFixed(bottom, 98px);
  }

  .footer {
    @extend %displayFlex;
    align-items: center;
    justify-content: space-around;
    width: 100vw;
    height: 100px;
    color: $lightTextColor;
    border-top: 1px solid #D9D9D9;
    background: #fff;
  }

  .footer-item {
    @extend %displayFlex;
    align-items: center;
    -ms-flex-align: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 25vw;
    height: 100%;
    img {
      width: 48px;
      height: 48px;
    }
  }

  .footer-text {
    font-size: 22px;
    color: $lightTextColor;
    height: 28px;
    line-height: 30px;
    font-weight: 400;
  }

  .footer .cur .footer-text {
    color: $greenColor;
  }
</style>
