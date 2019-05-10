<template>
  <div class="appoint-block">
    <div class="appoint-alert">
      <div class="alert-title">预约信息</div>
      <div class="pl-30px pr-30px">
        <div class="alert-infor">
          <p>预约日期：{{treatDate|dateFormat('yyyy-MM-dd W')}}</p>
          <p>预约费用：<span class="alert-price">{{itemData.price}}元</span></p>
        </div>
      </div>
      <div class="small-title">
        <div class="line-block"></div>
        <span>{{itemData.treat_time|timeFormat}}</span>
      </div>
      <div class="appoint-time">
        <div :class="['time-item', {'select-time': currTime.start == item.start_time && currTime.end ==item.end_time}]"
             v-for="item in itemData.period_infos" :key="item.start_time+item.end_time"
             @click="select(item.start_time, item.end_time)">
          {{item.start_time}}~{{item.end_time}}
        </div>
      </div>
      <hr class="line-hr">
      <div class="appoint-btn-block">
        <button class="appoint-delete mr-30px" @click.stop="cancelAppoint">取消</button>
        <button class="appoint-save" @click="sureAppoint">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appointBlock',
  props: {
    itemData: {
      type: Object,
      default () {
        return {
          end_time: '',
          period_infos: [],
          price: 0,
          quota_total: 0,
          quota_used: 0,
          start_time: '',
          treat_time: 1
        }
      }
    },
    treatDate: {
      type: Number,
      default: 0
    },
    doctorName: {
      type: String,
      default: ''
    },
    doctorId: {
      default: 0,
      type: Number
    }
  },
  data () {
    return {
      currTime: {
        start: '',
        end: ''
      },
      resource: this.$route.query.resource
    }
  },
  filters: {
    timeFormat (val) {
      let list = ['上午', '下午', '晚上']
      return list[Number(val) - 1]
    }
  },
  created () {
  },
  methods: {
    cancelAppoint () {
      this.$emit('canel-appoint')
    },
    select (startTime, endTime) {
      if (this.currTime.start === startTime && this.currTime.end === endTime) {
        this.currTime.start = ''
        this.currTime.end = ''
      } else {
        this.currTime.start = startTime
        this.currTime.end = endTime
      }
    },
    sureAppoint () {
      if (this.currTime.start === '' || this.currTime.end === '') {
        this.$Message.infor('请先选择时间段！')
        return
      }
      this.$router.push({name: 'appointSure',
        query: {
          treatDate: this.treatDate,
          price: this.itemData.price,
          startTime: this.itemData.start_time,
          endTime: this.itemData.end_time,
          doctorName: this.doctorName,
          treatTime: this.itemData.treat_time,
          doctorId: this.doctorId,
          resource: this.resource
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .appoint-block {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);

    .appoint-alert {
      position: absolute;
      bottom: 0;
      background: $backColor;
      width: 100%;
      border-radius: 16px 16px 0 0;

      .alert-title {
        font-size: 32px;
        font-weight: bold;
        line-height: 45px;
        text-align: center;
        margin: 32px 0 16px 0;
      }

      .alert-infor {
        background: #FAFAFA;
        border-radius: 8px;
        padding: 16px 18px;
        color: $depthTextColor;
        font-size: 32px;
        line-height: 48px;
        margin-bottom: 28px;
      }

      .alert-price {
        color: $redColor;
      }

      .small-title {
        @extend %displayFlex;
        color: $depthTextColor;
        font-size: 28px;
        font-weight: bold;
        line-height: 40px;
        margin-bottom: 16px;

        .line-block {
          margin: 0 16px 0 24px;
          width: 8px;
          height: 40px;
          background: $greenColor;
        }
      }

      .appoint-time {
        padding: 0px 36px;
        @extend %displayFlex;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 24px;

        .time-item {
          width: calc((100vw - 144px) / 3);
          height: 72px;
          background: rgba(235, 248, 249, 1);
          border-radius: 8px;
          border: 2px solid rgba(8, 186, 198, 1);
          color: $depthTextColor;
          font-size: 30px;
          line-height: 42px;
          margin: 0 12px 24px;
          @extend %flexVC;
        }

        .select-time {
          color: #ffffff;
          background: $greenColor;
        }
      }

      .appoint-btn-block {
        @extend %flexVC;
        height: 144px;

        .appoint-delete {
          @include simpleButton(80px, 264px, 28px);
        }

        .appoint-save {
          @include deepButton(80px, 264px, 28px);
        }
      }
    }
  }

  .line-hr {
    @extend %lineHr;
  }
</style>
