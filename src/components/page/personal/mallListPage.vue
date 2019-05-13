<template>
  <div>
    <Header titleText="商城订单" :canReturn="true" backUrl="/personal"></Header>
    <div class="mt-88px orderList">
      <order-item v-for="(item, index) in dataList" :itemData="item" :isMall="true" :noLine="index === dataList.length - 1" :key="item.id" @click.native="goRoute(item.order_seqno)"></order-item>
      <Load-more @click.stop.native="addMore" v-if="page < Math.ceil(totalNum/pageSize)"></Load-more>
    </div>
  </div>
</template>

<script>
import {Header, orderItem, LoadMore} from '../../common'
import {fetchGoodList} from '@/fetch/api'

export default {
  name: 'mallListPage',
  components: {
    Header,
    orderItem,
    LoadMore
  },
  data () {
    return {
      canShowAdd: false,
      page: 1,
      pageSize: 10,
      dataList: [],
      totalNum: 0
    }
  },
  created () {
    this.getGoodList()
  },
  methods: {
    goRoute (orderSeqno) {
      this.$router.push({name: 'mallOrderDetail', query: {orderSeqno: orderSeqno}})
    },
    getGoodList () {
      fetchGoodList({
        page: this.page,
        page_size: this.pageSize
      }).then(res => {
        if (res.code === 1000) {
          this.dataList = this.dataList.concat(res.data)
          this.totalNum = res.total_num
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    addMore () {
      this.page++
      this.getGoodList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderList {
    background: $backColor;
  }
</style>
