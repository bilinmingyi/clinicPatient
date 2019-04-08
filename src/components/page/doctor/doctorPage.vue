<template>
    <div>
      <Header titleText="诊所医生"></Header>
      <div class="mt-88px pb-128px">
        <Search placeholder="请输入药名/产品名称"></Search>
        这是医生列表页
      </div>
      <Footer navtiveIndex="2"></Footer>
    </div>
</template>

<script>
import {Footer, Header, Search} from '@/components/common/index'

export default {
  name: 'doctorPage',
  components: {
    Footer,
    Header,
    Search
  }
}
</script>

<style scoped>

</style>
