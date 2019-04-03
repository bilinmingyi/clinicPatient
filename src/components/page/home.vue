<template>
  <div>
    首页
    <router-view></router-view>
    <Footer navtiveIndex="1"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue'

export default {
  name: 'home',
  components: {
    Footer
  }
}
</script>

<style scoped>

</style>
