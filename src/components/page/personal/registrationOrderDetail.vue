<template>
    <div>
      <Header :titleText="titleName" :canReturn="true"></Header>
      <div class="mt-88px"></div>
    </div>
</template>

<script>
import {Header} from '../../common'
export default {
  name: 'registrationOrderDetail',
  components: {
    Header
  },
  data () {
    return {
      titleName: '测试文章名称'
    }
  }
}
</script>

<style scoped>

</style>
