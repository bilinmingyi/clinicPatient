<template>
  <div>
    <Header :canReturn="true" titleText="预约订单" backUrl="/personal"></Header>
    <div class="mt-88px">
      <div class="list-block" v-for="item in dataList" :key="item.order_seqno"
           @click.stop="goRoute(item.order_seqno, item.week_idx)">
        <Small-title>
          <div class="patient-label">就诊人</div>
          <div class="patient-name">{{item.patient_name}}</div>
          <div :class="item.status == 'TREAT_WAITING'?'patient-status':'patient-label'">{{item.status|appointStatus}}
          </div>
        </Small-title>
        <section class="appoint-infor">
          <div class="mb-6px">
            <span class="label-four">{{item.doctor_name}}</span>
            <span class="label-one">医生</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">预约地点：</span>
            <span
              class="label-two">{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}</span>
          </div>
          <div>
            <span class="label-three">预约时间：</span>
            <span class="label-two">
              <span>{{item.appoint_date}}</span>
              <span>{{item.week_idx}}</span>
              <span>{{item.start_time}}-{{item.end_time}}</span>
            </span>
          </div>
        </section>
      </div>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle, LoadMore} from '../../common'
import {getAppointList} from '@/fetch/api.js'
import {mapState} from 'vuex'

export default {
  name: 'appointListPage',
  components: {
    Header,
    SmallTitle,
    LoadMore
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  data () {
    return {
      page: 1,
      pageSize: 10,
      status: ['UNPAID', 'SIGN_WAITING', 'TREAT_WAITING', 'DONE', 'CANCEL'],
      dataList: [],
      canShowAdd: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    async getList () {
      try {
        let res = await getAppointList({
          'page': this.page,
          'page_size': this.pageSize,
          'status': this.status
        })
        if (res.code === 1000) {
          if (res.data.length < this.pageSize) {
            this.canShowAdd = false
          } else {
            this.canShowAdd = true
          }
          this.dataList = this.dataList.concat(res.data)
        } else {
          this.$Message.infor(res.msg)
        }
      } catch (e) {
        this.$Message.infor('网络出错！')
      }
    },
    addMore () {
      this.page++
      this.getList()
    },
    goRoute (orderSeqno, weekIdx) {
      this.$router.push({name: 'appointOrderDetail', query: {orderSeqno: orderSeqno, day: weekIdx}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .label-text {
    color: $lightTextColor;
  }

  .list-block {
    background: $backColor;
    border-top: 1px solid $lineColor;
    margin-bottom: 20px;
  }

  .patient-label {
    font-size: 28px;
    color: $lightTextColor;
    line-height: 96px;
  }

  .patient-name {
    @extend %fontBlod;
    font-size: 32px;
    margin-left: 24px;
    color: $depthTextColor;
    line-height: 96px;
    flex: 1;
  }

  .patient-status {
    color: #ffffff;
    font-size: 28px;
    padding: 12px 40px;
    background: #EEAE1D;
    border-radius: 8px;
  }

  .appoint-infor {
    padding: 20px 30px;
  }

  .label-one {
    font-size: 28px;
    color: $lightTextColor;
    line-height: 45px;
  }

  .label-two {
    font-size: 30px;
    color: $depthTextColor;
    line-height: 42px;
  }

  .label-three {
    font-size: 30px;
    color: $lightTextColor;
    line-height: 42px;
  }

  .label-four {
    @extend %fontBlod;
    font-size: 32px;
    color: $depthTextColor;
    line-height: 45px;
    margin-right: 22px;
  }
</style>
