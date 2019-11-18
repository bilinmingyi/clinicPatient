<template>
  <div>
    <div class="dynamic-item" v-if="dyItem.category == 0 || dyItem.category == undefined">
      <div class="dynamic-item-left">
        <img :src="noImg">
      </div>
      <div class="dynamic-item-right">
        <div class="title">{{dyItem.title}}</div>
        <div class="title-bottom">
          <div class="title-time" v-if="dyItem.type">{{dyItem.type}}</div>
          <div class="title-type" v-else>资讯类别</div>
          <div class="title-time">{{(dyItem.pubdate? dyItem.pubdate : dyItem.start_time)|dateFormat('yyyy-MM-dd')}}
          </div>
        </div>
      </div>
    </div>
    <div class="dynamic-item" v-if="dyItem.category == 1">
      <div class="dynamic-item-left">
        <img :src="noImg">
      </div>
      <div class="dynamic-item-right-two">
        <div class="title">{{dyItem.title}}</div>
        <div class="title-middle">时间：{{dyItem.pubdate|dateFormat('yyyy-MM-dd hh:mm')}}</div>
        <div class="title-bottom">
          <div>讲师：{{dyItem.author}}</div>
          <div>
            <span class="color-red">{{dyItem.price ? '￥' + dyItem.price : '免费'}}</span>
          </div>
        </div>
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
      type: Object
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

    .dynamic-item-left {
      width: 220px;
      height: 164px;
      border-radius: 4px;
      @extend %flexVC;

      img {
        max-width: 220px;
        max-height: 164px;
        border-radius: 4px;
      }
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

  .dynamic-item-right-two {
    margin-left: 24px;
    font-size: 28px;
    line-height: 40px;
    color: $lightTextColor;
    flex: 1;

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
