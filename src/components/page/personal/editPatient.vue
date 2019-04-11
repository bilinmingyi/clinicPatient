<template>
  <div>
    <Header :canReturn="true" titleText="编辑信息"></Header>
    <div class="mt-88px mb-131px list-content">

    </div>
    <div class="add-block" >
      <button class="del-btn">删除</button>
      <button class="sure-btn">确定</button>
    </div>
  </div>
</template>

<script>
import {Header} from '@/components/common/index'

export default {
  name: 'editPatient',
  components: {
    Header
  },
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
  .list-content {
    background: $backColor;
  }
  .add-block{
    @include psFixed(bottom, 112px);
    @extend %displayFlex;
    background: $backColor;
    padding: 16px 30px 15px;
    width: 100%;
  }
  .sure-btn {
    @include deepButton(80px, 48%);
    margin-left: 4%;
  }
  .del-btn {
    @include simpleButton(80px, 48%);
  }
</style>
