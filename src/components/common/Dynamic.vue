<template>
  <div class="dynamic-item">
    <img :src="dyItem.img_url == ''?noImg:dyItem.img_url">
    <div>
      <div>最安全的药输液，也出了大事！</div>
      <div>
        <div>资讯类别</div>
        <div>2018-10-01</div>
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
    @extend %displayFlex;

    img {
      width: 160px;
      height: 128px;
      border-radius: 8px;
    }
  }
</style>
