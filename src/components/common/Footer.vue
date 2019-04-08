<template>

  <div class="footer common-footer">
    <div :class="['footer-item',{'cur':navtiveIndex==1}] " @click.stop="goRoute(1)">
      <span class="iconfont">{{navtiveIndex==1? '&#xe60b;':'&#xe60e; '}}</span>
      <span class="footer-text">消息</span>
    </div>
    <div :class="['footer-item',{'cur':navtiveIndex==2}] " @click.stop="goRoute(2)">
      <span class="iconfont">{{navtiveIndex==2? '&#xe615;':'&#xe616;'}}</span>
      <span class="footer-text">医生</span>
    </div>
    <!--<div :class="['footer-item',{'cur':navtiveIndex==3}] " @click.stop="goRoute(3)">-->
      <!--<span class="iconfont">{{navtiveIndex==3? '&#xe60a;':'&#xe60c;'}}</span>-->
      <!--<span class="footer-text">商城</span>-->
    <!--</div>-->
    <div :class="['footer-item',{'cur':navtiveIndex==4}] " @click.stop="goRoute(4)">
      <span class="iconfont">{{navtiveIndex==4? '&#xe60d;':'&#xe609;'}}</span>
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
          this.$router.push({path: 'home'})
          break
        case 2:
          this.$router.push({path: 'doctor'})
          break
        case 3:
          this.$router.push({path: 'mall'})
          break
        case 4:
          this.$router.push({path: 'personal'})
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
  }

  .footer-item .yunicon {
    font-size: 48px;
    color: $lightTextColor;
  }

  .footer-item .iconfont {
    font-size: 48px;
    color: #7a7a7a;
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

  .footer .cur .yunicon,
  .footer .cur .iconfont {
    color: $greenColor;
  }
</style>
