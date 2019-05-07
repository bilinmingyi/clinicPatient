<template>
  <div>
    <Header titleText="地址管理" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      1111
    </div>
    <div class="add_block">
      <button class="add_btn">添加收货地址</button>
    </div>
  </div>
</template>

<script>
import {Header} from '../../common'
import {updateAddress} from '@/fetch/api'

export default {
  name: 'addressListPage',
  data () {
    return {}
  },
  components: {
    Header
  },
  methods: {
    changeAddress () {
      updateAddress().then().catch()
    }
  }
}
</script>

<style lang="scss" scoped>
  .add_block {
    @include psFixed(bottom, 111px);
    background: $backColor;
    padding: 16px 30px 15px;
  }

  .add_btn {
    @include deepButton(80px, 100%)
  }
</style>
