<template>
  <div :class="['item-content',{'no-border-bottom':noLine}]">
    <div class="mb-8px item-line">
      <span class="flexOne" v-if="isShowName">{{(clinic.serviceType == 6 ? '营养师' : '医生')}}：{{itemData.doctor_name}}</span>
      <span>{{itemData.create_time|dateFormat('yyyy/MM/dd hh:mm')}}</span>
    </div>
    <div class="item-line">
      <span class="flexOne">金额：￥{{itemData.amount_receivable == undefined ? itemData.price : itemData.amount_receivable}}</span>
      <span v-if="isMall" :class="itemData.status == 'UNPAID4CLIENT'?'color-red':'order-status'">{{itemData.status|mallOrderStatus}}</span>
      <span v-else :class="itemData.status == 'UNPAID'?'color-red':'order-status'">{{itemData.status|treatOrderStatus}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

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
    isShowName: {
      type: Boolean,
      default: true
    },
    noLine: {
      type: Boolean,
      default: true
    },
    isMall: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      'clinic': state => state.clinic
    })
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
