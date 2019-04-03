<template>
  <div>
    医生
    <router-view></router-view>
    <Footer navtiveIndex="2"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue'

export default {
  name: 'doctor',
  components: {
    Footer
  }
}
</script>

<style scoped>

</style>
