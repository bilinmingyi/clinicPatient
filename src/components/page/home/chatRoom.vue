<template>
  <div>
    <Header titleText="我的咨询" :canReturn="true"></Header>
    <div class="mt-88px">
      内容
    </div>
  </div>
</template>

<script>
import {Header} from '@/components/common'

export default {
  name: 'chatRoom',
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
