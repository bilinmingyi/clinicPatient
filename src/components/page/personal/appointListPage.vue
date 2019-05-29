<template>
  <div>
    <Header :canReturn="true" titleText="预约订单" backUrl="/personal"></Header>
    <div class="mt-88px">
      <div class="list-block" v-for="item in dataList" :key="item.order_seqno"
           @click.stop="goRoute(item.order_seqno)">
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
      <div class="no-address-back" v-if="dataList.length === 0 && !isFirst">
        <div>
          暂无预约订单
        </div>
      </div>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
      <Loading v-if="showLoad"></Loading>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle, LoadMore, Loading} from '../../common'
import {getAppointList} from '@/fetch/api.js'
import {mapState} from 'vuex'

export default {
  name: 'appointListPage',
  components: {
    Header,
    SmallTitle,
    LoadMore,
    Loading
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic,
      userInfoState: state => state.userInfoState
    })
  },
  data () {
    return {
      page: 1,
      pageSize: 10,
      status: ['UNPAID', 'SIGN_WAITING', 'TREAT_WAITING', 'DONE', 'CANCEL'],
      dataList: [],
      canShowAdd: false,
      showLoad: true,
      isFirst: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.getData()
    }, 500)
  },
  methods: {
    getData () {
      if (this.userInfoState.mobile) {
        this.getList()
      } else {
        this.showLoad = false
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({name: 'editPerson'})
        })
      }
    },
    async getList () {
      try {
        let res = await getAppointList({
          'page': this.page,
          'page_size': this.pageSize,
          'status': this.status
        })
        this.showLoad = false
        this.isFirst = false
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
    goRoute (orderSeqno) {
      this.$router.push({name: 'appointOrderDetail', query: {orderSeqno: orderSeqno}})
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
  .no-address-back {
    height: calc(100vh - 419px);
    background: url("../../../assets/img/noGood.png") no-repeat center center;
    background-size: 60%;
    color: $lightTextColor;
    font-size: 32px;
    @extend %flexVC;

    div {
      -webkit-transform: translateY(13vh);
      -moz-transform: translateY(13vh);
      -ms-transform: translateY(13vh);
      -o-transform: translateY(13vh);
      transform: translateY(13vh);
    }
  }
</style>
