<template>
  <div class="dynamic-item">
    <img :src="dyItem.img_url == ''?noImg:dyItem.img_url">
    <div class="dynamic-item-right">
      <div class="title">最安全的药输液，也出了大事！</div>
      <div class="title-bottom">
        <div class="title-type">资讯类别</div>
        <div class="title-time">2018-10-011</div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultPhoto from '@/assets/img/nophoto.png'

export default {
  name: 'dynamic',
  data () {
    return {
      noImg: defaultPhoto
    }
  },
  props: {
    dyItem: {
      type: Object,
      default () {
        return {
          title: '暂无标题',
          pubdate: new Date().getTime(),
          img_url: ''
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .dynamic-item {
    padding: 28px 30px;
    border-bottom: 1px solid $lineColor;
    @extend %displayFlex;

    img {
      width: 160px;
      height: 128px;
      border-radius: 8px;
    }
  }

  .dynamic-item-right {
    margin-left: 24px;
    @extend %displayFlex;
    flex-direction: column;
    flex: 1;
    justify-content: space-between;

    .title {
      color: $depthTextColor;
      font-size: 28px;
      line-height: 40px;
    }

    .title-bottom {
      color: $lightTextColor;
      @extend %displayFlex;
      justify-content: space-between;
    }

    .title-type {
      border: 1px solid $greenColor;
      border-radius: 4px;
      padding: 2px 4px;
      color: $greenColor;
      border-radius: 4px;
      line-height: 28px;
      text-align: center;
    }
    .title-time {
      padding-top: 5px;
      height: 28px;
      line-height: 32px;
    }
  }
</style>
