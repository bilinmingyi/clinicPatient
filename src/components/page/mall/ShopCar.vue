<template>
    <div>
      <Header titleText="购物车" :canReturn="true"></Header>
      <div class="mt-88px mb-131px">

      </div>

    </div>
</template>

<script>
import {Header} from '../../common'

export default {
  name: 'ShopCar',
  components: {
    Header
  }
}
</script>

<style scoped>

</style>
