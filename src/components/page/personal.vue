<template>
    <div>
      个人
      <router-view></router-view>
      <Footer navtiveIndex="4"></Footer>
    </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue'

export default {
  name: 'personal',
  components: {
    Footer
  }
}
</script>

<style scoped>

</style>
