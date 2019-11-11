<template>
  <div>
    <Header titleText="我的报名" :canReturn="true"></Header>
    <div class="mt-88px">
      <div class="dynamic-item">
        <img :src="noImg">
        <div class="dynamic-item-right">
          <div class="title">宝宝辅食全攻略</div>
          <div class="title-middle">时间：2019-05-12 下午2点-4点</div>
          <div class="title-bottom">
            <div class="title-time">讲师：王大明</div>
            <div class="title-time">报名费：
              <span class="color-red">免费</span>
            </div>
          </div>
        </div>
      </div>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
    </div>
  </div>
</template>

<script>
import {Header, Loading, LoadMore} from '../../common'
import defaultPhoto from '@/assets/img/nophoto.png'

export default {
  name: 'registrationListPage',
  components: {
    Header,
    Loading,
    LoadMore
  },
  data () {
    return {
      noImg: defaultPhoto,
      canShowAdd: false
    }
  },
  methods: {
    addMore () {
    }
  }
}
</script>

<style scoped lang="scss">
  .dynamic-item {
    padding: 28px 30px;
    background: #ffffff;
    @extend %displayFlex;

    img {
      width: 240px;
      height: 164px;
      border-radius: 4px;
    }
  }

  .dynamic-item-right {
    margin-left: 24px;
    font-size: 28px;
    line-height: 40px;
    color: $lightTextColor;

    .title {
      color: $depthTextColor;
      font-weight: bold;
      font-size: 30px;
      line-height: 42px;
      margin-bottom: 10px;
    }

    .title-middle {
      margin-bottom: 10px;
    }

    .title-bottom {
      @extend %displayFlex;
      justify-content: space-between;
    }
  }
</style>
