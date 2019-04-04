<template>
  <div>
    <Header titleText="个人中心"></Header>
    这是个人中心
    <Footer navtiveIndex="4"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue'
import Header from '@/components/common/Header.vue'

export default {
  name: 'personalPage',
  components: {
    Footer,
    Header
  }
}
</script>

<style scoped>

</style>
