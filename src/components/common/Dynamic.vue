<template>
  <div class="dynamic-item">
    <img :src="noImg">
    <div class="dynamic-item-right">
      <div class="title">{{dyItem.title}}</div>
      <div class="title-bottom">
        <div class="title-time" v-if="dyItem.type">{{dyItem.type}}</div>
        <div class="title-type" v-else>资讯类别</div>
        <div class="title-time">{{(dyItem.pubdate? dyItem.pubdate : dyItem.start_time)|dateFormat('yyyy-MM-dd')}}</div>
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
  },
  mounted () {
    if (this.dyItem.img_url !== '') {
      setTimeout(() => {
        this.noImg = this.dyItem.img_url
      })
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
      height: 28px;
    }
  }
</style>
