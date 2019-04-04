<template>
    <div>
      <Header titleText="诊所医生"></Header>
      这是医生列表页
      <Footer navtiveIndex="2"></Footer>
    </div>
</template>

<script>
import Footer from '@/components/common/Footer.vue'
import Header from '@/components/common/Header.vue'

export default {
  name: 'doctorPage',
  components: {
    Footer,
    Header
  }
}
</script>

<style scoped>

</style>
