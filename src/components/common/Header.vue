<template>
  <div class="title-block">
    <button class="title-btn" v-if="canReturn" @click.stop="goBack"></button>
    <div class="title-text">
      {{titleText}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    titleText: {
      default: '首页',
      type: String
    },
    canReturn: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-block {
    background: #fafafa;
    text-align: center;
    @include psFixed(top);

    .title-btn {
      position: absolute;
      display: block;
      height: 88px;
      width: 100px;
      background: url("../../assets/img/fanghui@3x.png") no-repeat center center;
      background-size: 55px 55px;
      border: none;
    }

    .title-text {
      line-height: 88px;
      color: $depthTextColor;
      font-size: 32px;
      font-weight: 500;
    }
  }
</style>
