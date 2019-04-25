<template>
    <div>
      <Header titleText="商品详情" :canReturn="true"></Header>
    </div>
</template>

<script>
import {Header} from '@/components/common/index'

export default {
  name: 'goodsDetail',
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
