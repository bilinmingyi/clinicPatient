<template>
  <div>
    <Header titleText="诊所医生"></Header>
    <div class="mt-88px pb-128px">
      <Search placeholder="请输医生名称" @on-search="query"></Search>
      <doctor-item v-for="item in doctorList" :key="item.id" :itemData="item"></doctor-item>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
    </div>
    <Footer navtiveIndex="2"></Footer>
  </div>
</template>

<script>
import {Footer, Header, Search, doctorItem, LoadMore} from '@/components/common/index'
import {getDoctorList} from '@/fetch/api.js'

export default {
  name: 'doctorPage',
  components: {
    Footer,
    Header,
    Search,
    doctorItem,
    LoadMore
  },
  data () {
    return {
      status: 1,
      queryName: '',
      page: 1,
      pageSize: 10,
      doctorList: [],
      canShowAdd: false
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
        console.log(res)
        res.data.length >= this.pageSize ? this.canShowAdd = true : this.canShowAdd = false
        this.doctorList = this.doctorList.concat(res.data)
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    query (name) {
      this.queryName = name
      this.canShowAdd = false
      this.doctorList = []
      this.getList(1)
    },
    addMore () {
      this.getList(++this.page)
    }
  }
}
</script>

<style scoped>

</style>
