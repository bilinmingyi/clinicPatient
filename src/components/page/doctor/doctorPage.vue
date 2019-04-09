<template>
  <div>
    <Header titleText="诊所医生"></Header>
    <div class="mt-88px pb-128px">
      <Search placeholder="请输医生名称"></Search>
      <doctor-item></doctor-item>
    </div>
    <Footer navtiveIndex="2"></Footer>
  </div>
</template>

<script>
import {Footer, Header, Search, doctorItem} from '@/components/common/index'
import DoctorItem from '../../common/doctorItem'

export default {
  name: 'doctorPage',
  components: {
    DoctorItem,
    Footer,
    Header,
    Search,
    doctorItem
  }
}
</script>

<style scoped>

</style>
