<template>
  <div>
    <Header titleText="商城订单" :canReturn="true"></Header>
    <div class="mt-88px orderList">
      <order-item></order-item>
      <Load-more></Load-more>
    </div>
  </div>
</template>

<script>
import {Header, orderItem, LoadMore} from '../../common'

export default {
  name: 'mallListPage',
  components: {
    Header,
    orderItem,
    LoadMore
  },
  data () {
    return {
      canShowAdd: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderList {
    background: $backColor;
  }
</style>
