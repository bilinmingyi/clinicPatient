<template>
  <div :class="['title-text', 'pr-30px', {'pl-30px':!hasBlock}, {'pl-24px':hasBlock}, {'bottom-link': hasLink}]">
    <div v-if="hasBlock" class="greenBlock"></div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SmallTitle',
  props: {
    hasBlock: {
      type: Boolean,
      default: false
    },
    hasLink: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .title-text {
    height: 96px;
    color: $depthTextColor;
    font-size: 32px;
    @extend %flexV;
  }

  .bottom-link {
    border-bottom: 1px solid $lineColor;
  }

  .greenBlock {
    width: 8px;
    height: 40px;
    background: $greenColor;
  }
</style>
