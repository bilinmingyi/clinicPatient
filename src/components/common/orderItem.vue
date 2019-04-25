<template>
  <div :class="['item-content',{'no-border-bottom':noLine}]">
    <div class="mb-8px item-line">
      <span class="flexOne">医生：{{itemData.doctor_name}}</span>
      <span>{{itemData.create_time|dateFormat('yyyy/MM/dd hh:mm')}}</span>
    </div>
    <div class="item-line">
      <span class="flexOne">金额：￥{{itemData.price}}</span>
      <span :class="itemData.status == 'UNPAID'?'color-red':'order-status'">{{itemData.status|treatOrderStatus}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'orderItem',
  props: {
    itemData: {
      type: Object,
      default () {
        return {
          order_seqno: '',
          doctor_name: '测试',
          create_time: '',
          price: 0,
          status: 'UNKNOWN'
        }
      }
    },
    noLine: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
  .item-content {
    padding: 20px 30px;
    font-size: 30px;
    color: $depthTextColor;
    line-height: 42px;
    border-bottom: 1px solid $lineColor;
  }
  .no-border-bottom {
    border-bottom: none;
  }

  .item-line {
    @extend %displayFlex;
  }

  .order-status {
    color: $lightTextColor;
  }

</style>
