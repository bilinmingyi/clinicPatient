<template>
    <div>
      商城
      <router-view></router-view>
      <Footer navtiveIndex="3"></Footer>
    </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue'

export default {
  name: 'mall',
  components: {
    Footer
  }
}
</script>

<style scoped>

</style>
