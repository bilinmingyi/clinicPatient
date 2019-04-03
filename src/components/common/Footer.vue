<template>

  <div class="footer common-footer">
    <div :class="['footer-item',{'cur':navtiveIndex==1}] " @click.stop="goRoute(1)">
      <span class="iconfont">{{navtiveIndex==1? '&#xe60d;':'&#xe60e; '}}</span>
      <span class="footer-text">消息</span>
    </div>
    <div :class="['footer-item',{'cur':navtiveIndex==2}] " @click.stop="goRoute(2)">
      <span class="yunicon">{{navtiveIndex==2? '&#xe60f;':'&#xe610;'}}</span>
      <span class="footer-text">医生</span>
    </div>
    <div :class="['footer-item',{'cur':navtiveIndex==3}] " @click.stop="goRoute(3)">
      <span class="yunicon">{{navtiveIndex==3? '&#xe60a;':'&#xe60c;'}}</span>
      <span class="footer-text">商城</span>
    </div>
    <div :class="['footer-item',{'cur':navtiveIndex==4}] " @click.stop="goRoute(4)">
      <span class="yunicon">{{navtiveIndex==4? '&#xe60d;':'&#xe609;'}}</span>
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
</style>
