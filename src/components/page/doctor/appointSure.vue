<template>
  <div>
    <Header titleText="预约确认" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <section class='appoint-info'>
        <Small-title :hasBlock="true">
          <span class="ml-16px">预约确认</span>
        </Small-title>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">预约地点：</span>
            <span
              class="label-two">{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">预约时间：</span>
            <span
              class="label-two">{{treatDate|dateFormat('yyyy-MM-dd  W')}}&nbsp;&nbsp;{{startTime}}-{{endTime}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">预约医生：</span>
            <span
              class="label-two">{{doctorName}}</span>
          </div>
          <div>
            <span class="label-three">挂号费用：</span>
            <span class="label-red">{{price}}元</span>
          </div>
        </div>
      </section>
      <section class='appoint-info'>
        <Small-title :hasBlock="true">
          <span class="ml-16px">就诊人信息</span>
        </Small-title>
        <div class="appoint-text">
          <div class="line-item">
            <label class="label-span mr-32px">手机号码</label>
            <input type="text" class="input-item flexOne" placeholder="请输入手机号码" v-model="patient.mobile">
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">患者姓名</label>
            <select class="input-item flexOne" v-model="patient.user_id" @change="selectPatient">
              <option v-for="item in patientList" :key="item.id" :value="item.id">{{item.name}}</option>
            </select>
          </div>
          <hr class="line-hr">
          <div class=" line-item">
            <span class="label-span mr-32px">性别</span>
            <radioGroup :data="sexList" :value="patient.user_sex" :name="'sex'" @input="changeSex"></radioGroup>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">年龄</label>
            <input type="number" class="input-item input-width" v-model="patient.user_age">
            <span class="label-span">岁</span>
          </div>
        </div>
      </section>
    </div>
    <div class="add-block">
      <button class="add-btn" @click.stop="saveData">提交订单</button>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle, radioGroup} from '@/components/common'
import {mapState} from 'vuex'
import {fetchPatientList, saveAppointData} from '@/fetch/api.js'
import filters from '../../../assets/js/fliters'

export default {
  name: 'appointSure',
  components: {
    Header,
    SmallTitle,
    radioGroup
  },
  data () {
    return {
      sexList: [{id: 'sex-man', label: '男', value: 1}, {id: 'sex-woman', label: '女', value: 2}],
      patient: {
        mobile: '',
        user_age: '',
        user_sex: 0,
        user_name: '',
        user_id: 0
      },
      patientList: []
    }
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  props: ['treatDate', 'price', 'startTime', 'endTime', 'doctorName', 'treatTime', 'doctorId'],
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchPatientList({}).then(res => {
        if (res.code === 1000) {
          res.data.forEach(item => {
            this.patientList.push({
              name: item.name,
              sex: item.sex,
              mobile: item.mobile,
              id: item.id,
              age: Number(new Date().getFullYear()) - Number(new Date(item.birthday).getFullYear())
            })
          })
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    selectPatient () {
      let patients = this.patientList.filter((item) => {
        if (item.id === this.patient.user_id) {
          return true
        } else {
          return false
        }
      })
      this.patient.user_name = patients[0].name
      this.patient.user_sex = patients[0].sex
      this.patient.user_age = patients[0].age
      this.patient.mobile = patients[0].mobile
    },
    changeSex (val) {
      this.patient.user_sex = Number(val)
    },
    saveData () {
      if (!this.patient.user_name) {
        this.$Message.infor('请先填写患者姓名！')
        return
      } else if (!this.patient.mobile) {
        this.$Message.infor('请先填写患者手机！')
        return
      } else if (!this.patient.user_sex) {
        this.$Message.infor('请先填写患者性别！')
        return
      } else if (!this.patient.user_age) {
        this.$Message.infor('请先填写患者年龄！')
        return
      }
      saveAppointData({
        doctor_id: this.doctorId,
        start_time: this.startTime,
        end_time: this.endTime,
        appoint_period: this.treatTime,
        appoint_date: filters.dateFormat(this.treatDate, 'yyyyMMdd'),
        patient_sex: this.patient.user_sex,
        patient_age: this.patient.user_age,
        patient_name: this.patient.user_name
      }).then(res => {
        if (res.code === 1000) {
          this.$router.push({name: 'appointListPage'})
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .appoint-info {
    background: $backColor;
    margin-bottom: 20px;
  }

  .register-item {
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

  .label-red {
    color: #EB6262;
    font-size: 30px;
    line-height: 42px;
    font-weight: bold;
  }

  .appoint-text {
    padding: 0 30px;
  }

  .line-item {
    padding: 26px 30px;
    @extend %displayFlex
  }

  .line-hr {
    @extend %lineHr;
  }

  .label-span {
    color: $depthTextColor;
    line-height: 45px;
    font-size: 32px;
  }

  .input-item {
    border: none;
    outline: none;
    line-height: 45px;
    font-size: 32px;
    color: $depthTextColor;
  }

  .input-width {
    width: 55px;
    text-align: center;
  }

  .add-block {
    @include psFixed(bottom, 112px);
    @extend %displayFlex;
    background: $backColor;
    padding: 16px 30px 15px;
    width: 100%;
    border-top: 1px solid $lineColor;
  }

  .add-btn {
    @include deepButton(80px, 100%)
  }
</style>
