<template>
  <div>
    <Header :canReturn="true" titleText="就诊人管理"></Header>
    <div class="mt-88px mb-131px">
      <div class="list-content">
        <Small-title :hasBlock="true">
          <span class="title-span">就诊人列表</span>
        </Small-title>
        <div class="patient-item" v-for="patient in patientList" :key="patient.id" @click.stop="goRoute(patient)">
          <img :src="patient.sex == 2 ? woman_img : man_img" class="avatar-img">
          <div class="flexOne ml-24px">{{patient.name}}/{{patient.sex|sexFormat}}/{{patient.birthday|ageFormat}}</div>
          <img class="return-icon" src="../../../assets/img/xiayibu@2x.png">
        </div>
      </div>
      <div class="no-address-back" v-if="patientList.length === 0 && !isFirst">
        <div>
          暂无就诊人
        </div>
      </div>
    </div>
    <div class="add_block" @click.stop="goRoute()">
      <button class="add_btn">添加就诊人</button>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {Header, SmallTitle, Loading} from '@/components/common/index'
import man from '@/assets/img/mhz@2x.png'
import woman from '@/assets/img/whz@2x.png'
import {fetchPatientList} from '@/fetch/api.js'
import {mapState} from 'vuex'

export default {
  name: 'patientListPage',
  components: {
    Header,
    SmallTitle,
    Loading
  },
  data () {
    return {
      man_img: man,
      woman_img: woman,
      patientList: [],
      showLoad: true,
      isFirst: true
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
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
    getList () {
      fetchPatientList({}).then(res => {
        this.showLoad = false
        this.isFirst = false
        if (res.code === 1000) {
          this.patientList = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    goRoute (item) {
      if (item) {
        console.log()
        this.$router.push({name: 'editPatient', query: {id: item.id, name: item.name, sex: item.sex, birthday: item.birthday}})
      } else {
        if (!this.userInfoState.mobile) {
          this.$Message.confirm('请先绑定手机号码！', () => {
            this.$router.push({name: 'editPerson'})
          })
        } else {
          this.$router.push({name: 'editPatient'})
        }
      }
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
    @include psFixed(bottom, 111px);
    background: $backColor;
    padding: 16px 30px 15px;
  }

  .add_btn {
    @include deepButton(80px, 100%)
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
