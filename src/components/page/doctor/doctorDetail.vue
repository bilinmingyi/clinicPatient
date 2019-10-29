<template>
  <div>
    <Header :titleText="doctor.name+(clinic.serviceType == 6 ? '营养师' : '医生')" :canReturn="true"></Header>
    <div class="mt-88px">
      <doctor-item :itemData="doctor" :canAppoint="false"></doctor-item>
      <div class="doctor-spec">
        <div class="spec-content">{{doctor.speciality ? doctor.speciality : '暂未填写'}}</div>
      </div>
      <div class="doctor-schedule">
        <Small-title :hasBlock="true">
          <span class="ml-16px">排班信息</span>
        </Small-title>
        <div class="schedule-content">
          <table class="d-table" data-type='2'>
            <thead>
              <tr>
                <th>
                  <div>日期</div>
                </th>
                <th>
                  <div>上午</div>
                </th>
                <th>
                  <div>下午</div>
                </th>
                <th>
                  <div>晚上</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in scheduleList" :key="item.treat_date">
                <td>{{item.treat_date|dateFormat('MM/dd W')}}</td>
                <td v-for="(schedule, index) in item.sched_list" :key="String(index)+schedule.treat_time"
                  :class="{'back-EBF8F9':schedule.quota_used != schedule.quota_total}">
                  <div v-if="schedule.quota_used == 0 && schedule.quota_total == 0"></div>
                  <div v-else-if="schedule.quota_used >= schedule.quota_total" class="td-content">挂满</div>
                  <div v-else @click.stop="selectTime(schedule, item.treat_date)">{{schedule.quota_used}}/{{schedule.quota_total}}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <appoint-block :itemData="currBlock" :doctorName="doctor.name" :doctorId="Number(id)" :treatDate="treatDate" v-if="appointBlockShow"
      @canel-appoint="appointBlockShow=false"></appoint-block>
  </div>
</template>

<script>
import { Header, doctorItem, SmallTitle, appointBlock } from '@/components/common'
import { fetchDOctorDetail, fetchDoctorSchedule } from '@/fetch/api.js'
import {mapState} from 'vuex'

export default {
  name: 'doctorDetail',
  props: ['id'],
  components: {
    Header,
    doctorItem,
    SmallTitle,
    appointBlock
  },
  data () {
    return {
      doctor: {
        name: '',
        speciality: '',
        department: '',
        hospital: '',
        title: -1,
        avatar: ''
      },
      scheduleList: [],
      appointBlockShow: false,
      currBlock: null,
      treatDate: ''
    }
  },
  computed: {
    ...mapState({
      'clinic': state => state.clinic
    })
  },
  created () {
    this.getDetail()
    this.getSchedule()
  },
  methods: {
    getDetail () {
      fetchDOctorDetail({ id: this.id }).then(res => {
        if (res.code === 1000) {
          this.doctor.name = res.data.name
          this.doctor.speciality = res.data.speciality
          this.doctor.department = res.data.department
          this.doctor.hospital = res.data.hospital
          this.doctor.title = res.data.title
          this.doctor.avatar = res.data.avatar
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    getSchedule () {
      fetchDoctorSchedule({ id: this.id }).then(res => {
        if (res.code === 1000) {
          this.scheduleList = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    selectTime (block, time) {
      this.appointBlockShow = true
      this.currBlock = block
      this.treatDate = Number(time)
    }
  }
}
</script>

<style lang="scss" scoped>
.doctor-spec {
  padding: 0 30px 24px 30px;
  margin-bottom: 20px;
  background: $backColor;

  .spec-content {
    background: #fafafa;
    padding: 20px;
    font-size: 28px;
    color: #232323;
    line-height: 40px;
  }
}

.doctor-schedule {
  background: $backColor;
  .back-EBF8F9 {
    background: #ebf8f9;
  }
  .schedule-content {
    padding: 28px 16px 48px;
  }
  .td-content {
    color: #eb6262;
  }
}
</style>
