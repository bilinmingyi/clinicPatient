<template>
  <div>
    <Header :canReturn="true" titleText="就诊人管理"></Header>
    <div class="mt-88px mb-131px list-content">
      <Small-title :hasBlock="true">
        <span class="title-span">就诊人列表</span>
      </Small-title>
      <div class="patient-item" v-for="patient in patientList" :key="patient.id">
        <img :src="patient.sex == 2 ? woman_img : man_img" class="avatar-img">
        <div class="flexOne ml-24px">{{patient.name}}/{{patient.sex|sexFormat}}/{{patient.birthday|ageFormat}}</div>
        <img class="return-icon" src="../../../assets/img/xiayibu@2x.png">
      </div>
    </div>
    <div class="add_block">
      <button class="add_btn">添加就诊人</button>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '@/components/common/index'
import man from '@/assets/img/mhz@2x.png'
import woman from '@/assets/img/whz@2x.png'
import {fetchPatientList} from '@/fetch/api.js'

export default {
  name: 'patientListPage',
  components: {
    Header,
    SmallTitle
  },
  data () {
    return {
      man_img: man,
      woman_img: woman,
      patientList: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      fetchPatientList({}).then(res => {
        if (res.code === 1000) {
          this.patientList = res.data
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
  .title-span {
    @extend %fontBlod;
    color: $depthTextColor;
    margin-left: 16px;
  }

  .list-content {
    background: $backColor;
  }

  .patient-item {
    @extend %flexV;
    @extend %fontBlod;
    border-bottom: 1px solid $lineColor;
    padding: 20px 30px;
    font-size: 32px;

    .return-icon {
      width: 40px;
      height: 40px;
    }

    .avatar-img {
      width: 88px;
      height: 88px;
      border-radius: 50%;
    }
  }
  .add_block {
    @include psFixed(bottom,111px);
    background: $backColor;
    padding: 16px 30px 15px;
  }
  .add_btn {
    @include deepButton(80px, 100%)
  }
</style>
