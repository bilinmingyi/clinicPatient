<template>
  <div>
    <Header titleText="诊所医生"></Header>
    <div class="mt-88px pb-128px">
      <Search placeholder="请输医生名称"></Search>
      <doctor-item v-for="item in doctorList" :key="item.id" :itemData="item"></doctor-item>
    </div>
    <Footer navtiveIndex="2"></Footer>
  </div>
</template>

<script>
import {Footer, Header, Search, doctorItem} from '@/components/common/index'
import {getDoctorList} from '@/fetch/api.js'

export default {
  name: 'doctorPage',
  components: {
    Footer,
    Header,
    Search,
    doctorItem
  },
  data () {
    return {
      status: 1,
      queryName: '',
      page: 1,
      pageSize: 10,
      doctorList: []
    }
  },
  created () {
    this.getList(1)
  },
  methods: {
    getList (page) {
      this.page = page
      getDoctorList({
        'status': this.status,
        'query': this.queryName,
        'page': this.page,
        'page_size': this.pageSize
      }).then(res => {
        this.doctorList = this.doctorList.concat(res.data)
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style scoped>

</style>
