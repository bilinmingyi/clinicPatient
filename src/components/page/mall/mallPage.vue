<template>
  <div>
    <Header titleText="诊所商城"></Header>
    这是商城
    <Footer navtiveIndex="3"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue'
import Header from '@/components/common/Header.vue'

export default {
  name: 'mallPage',
  components: {
    Footer,
    Header
  }
}
</script>

<style scoped>

</style>
