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
          <div class="line-items">
            <label class="label-four mr-32px">手机号码</label>
            <input type="text" class="input-item flexOne" placeholder="手机号码" disabled v-model="patient.mobile">
            <button class="phone-btn" @click.stop="goRoute">绑定手机</button>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">患者姓名</label>
            <input type="text" class="input-item flexOne" placeholder="请输入患者姓名" v-model="patient.user_name"
                   @input="filterPatient">
            <ul class="select-ul" v-show="showSelect">
              <li v-for="item in selectList" :key="item.id" @click.stop="selectPatient(item)">
                <p>{{item.name}}/{{item.sex|sexFormat}}/{{item.age}}岁</p>
                <hr class="line-hr">
              </li>
              <li v-if="selectList.length===0">
                <p>暂无该患者</p>
              </li>
            </ul>
            <!--<select class="input-item flexOne" v-model="patient.user_id" @change="selectPatient">-->
            <!--<option v-for="item in patientList" :key="item.id" :value="item.id">{{item.name}}</option>-->
            <!--</select>-->
          </div>
          <hr class="line-hr">

          <div class=" line-item">
            <span class="label-span mr-32px">性别</span>
            <radioGroup :data="sexList" :value="patient.user_sex" :name="'sex'" @input="changeSex"></radioGroup>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-32px">年龄</label>
            <input type="number" class="input-item input-width" v-model="patient.user_age" @blur="scrollToTop">
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
import {fetchPatientList, saveAppointData, fetchUserInfo} from '@/fetch/api.js'
import filters from '../../../assets/js/fliters'
import inputBlur from '@/assets/js/inputBlur'

export default {
  mixins: [inputBlur],
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
      patientList: [],
      selectList: [],
      showSelect: false
    }
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  props: ['treatDate', 'price', 'startTime', 'endTime', 'doctorName', 'treatTime', 'doctorId', 'resource'],
  created () {
    this.getList()
    this.getPerson()
  },
  methods: {
    getPerson () {
      fetchUserInfo({}).then(
        res => {
          if (res.code === 1000) {
            this.patient.mobile = res.data.mobile
          } else {
            this.$Message.infor(res.msg)
          }
        }
      ).catch(e => {
        console.log(e)
        this.$Message.infor('网络出错！')
      })
    },
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
    selectPatient (patient) {
      this.patient.user_name = patient.name
      this.patient.user_sex = patient.sex
      this.patient.user_age = patient.age

      this.showSelect = false
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

      let fullYear = new Date().getFullYear() - Number(this.patient.user_age)

      saveAppointData({
        doctor_id: this.doctorId,
        start_time: this.startTime,
        end_time: this.endTime,
        appoint_period: this.treatTime,
        appoint_date: filters.dateFormat(this.treatDate, 'yyyyMMdd'),
        patient_sex: this.patient.user_sex,
        patient_age: this.patient.user_age,
        birthday: new Date().setFullYear(fullYear),
        patient_name: this.patient.user_name
      }).then(res => {
        if (res.code === 1000) {
          if (this.resource) {
            this.$router.push({
              name: 'chatRoom',
              query: {hasAppoint: 1, orderSeqno: res.order_seqno, price: this.price}
            })
          } else {
            this.$router.replace({
              name: 'appointOrderDetail',
              query: {shouldPay: 1, orderSeqno: res.order_seqno, price: this.price}
            })
          }
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    filterPatient () {
      if (this.patient.user_name) {
        this.selectList = this.patientList.filter((item) => {
          return item.name.indexOf(this.patient.user_name) >= 0
        })
        this.showSelect = true
      } else {
        this.showSelect = false
      }
    },
    hideSelect () {
      this.scrollToTop()
      setTimeout(() => {
        this.showSelect = false
      }, 30)
    },
    goRoute () {
      this.$router.push({name: 'editPhone', query: {returnType: 2}})
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

  .label-four {
    color: $depthTextColor;
    line-height: 64px;
    font-size: 32px;
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

  .line-items {
    padding: 16px 0px;
    position: relative;
    @extend %displayFlex
  }

  .line-item {
    padding: 26px 0px;
    position: relative;
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
    background: transparent;

    &::-webkit-input-placeholder {
      font-size: 32px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 45px;
    }
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

  .phone-btn {
    @include deepButton(64px, 148px)
  }

  .select-ul {
    position: absolute;
    top: 90px;
    /*left: 160px;*/
    color: $lightTextColor;
    width: calc(100vw - 60px);
    border-radius: 8px;
    box-shadow: 0 4px 16px 4px rgba(0, 0, 0, 0.20);
    background: $backColor;
    z-index: 1000;
    max-height: 255px;
    overflow-y: scroll;

    li {
      font-size: 32px;

      p {
        padding: 20px;
      }
    }
  }
</style>
