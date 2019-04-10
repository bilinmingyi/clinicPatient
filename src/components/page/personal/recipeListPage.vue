<template>
  <div>
    <Header :canReturn="true" titleText="处方订单"></Header>
    <div class="mt-88px orderList">
      <order-item v-for="item in dataList" :itemData="item" :key="item.id"></order-item>
    </div>
  </div>
</template>

<script>
import {Header, orderItem} from '../../common'
import {fetchRecipeList} from '@/fetch/api.js'

export default {
  name: 'recipeListPage',
  components: {
    Header,
    orderItem
  },
  data () {
    return {
      status: ['UNPAID', 'DISPENSING', 'DONE', 'CANCEL'],
      page: 1,
      pageSize: 10,
      dataList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchRecipeList({
        'page': this.page,
        'page_size': this.pageSize,
        'status': this.status
      }).then(res => {
        if (res.code === 1000) {
          this.dataList = this.dataList.concat(res.data)
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderList {
    background: $backColor;
  }
</style>
