<template>
  <div>
    <Header titleText="个人中心"></Header>
    <div class="pb-128px mt-88px">
      <div class="patient-block">
        <div class="patient">
          <img class="avatar" :src="userInfoState.avatar === '' ? (userInfoState.sex === 2 ? woman_img : man_img) : userInfoState.avatar">
          <div class="information">
            <p>{{userInfoState.name}}/{{userInfoState.sex|sexFormat}}/{{userInfoState.age}}</p>
            <p>帐号ID：{{userInfoState.id}}</p>
          </div>
          <div class="return-block" @click.stop="goRouter(5)">
            <img src="../../../assets/img/xiayibu@2x.png">
          </div>
        </div>
      </div>
      <ul class="person-function">
        <li @click.stop="goRouter(6)">
          <img src="../../../assets/img/dz.png">
          <span>地址管理</span>
        </li>
        <li @click.stop="goRouter(1)">
          <img src="../../../assets/img/qt@2x.png">
          <span>其他就诊人</span>
        </li>
        <li @click.stop="goRouter(2)">
          <img src="../../../assets/img/yy@2x.png">
          <span>预约订单</span>
        </li>
        <li @click.stop="goRouter(3)">
          <img src="../../../assets/img/cf@2x.png">
          <span>处方订单</span>
        </li>
        <li @click.stop="goRouter(4)">
          <img src="../../../assets/img/dd@2x.png">
          <span>商城订单</span>
        </li>
      </ul>

    </div>
    <Footer navtiveIndex="4"></Footer>
  </div>
</template>

<script>
import man from '@/assets/img/mhz@2x.png'
import woman from '@/assets/img/whz@2x.png'
import {Footer, Header} from '@/components/common/index'
import {mapState} from 'vuex'

export default {
  name: 'personalPage',
  components: {
    Footer,
    Header
  },
  data () {
    return {
      man_img: man,
      woman_img: woman
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  created () {
    console.log(this.userInfoState)
  },
  methods: {
    goRouter (type) {
      switch (type) {
        case 1:
          this.$router.push({name: 'patientListPage'})
          break
        case 2:
          this.$router.push({name: 'appointListPage'})
          break
        case 3:
          this.$router.push({name: 'recipeListPage'})
          break
        case 4:
          this.$router.push({name: 'mallListPage'})
          break
        case 5:
          this.$router.push({
            name: 'editPerson'
          })
          break
        case 6:
          this.$router.push({name: 'addressListPage'})
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .patient-block {
    background: $backColor;
    padding: 0 30px;
    margin-bottom: 21px;
  }

  .patient {
    border-bottom: 1px solid $lineColor;
    padding: 44px 0;
    @extend %displayFlex;

    .information {
      flex: 1;
      margin-left: 30px;
      @extend %displayFlex;
      color: $lightTextColor;
      flex-direction: column;
      justify-content: space-between;
      padding: 3px 0;
      font-size: 32px;

      p:nth-child(1) {
        color: $depthTextColor;
        font-weight: bold;
      }
    }

    .avatar {
      width: 112px;
      height: 112px;
      border-radius: 50%;
    }

    .return-block {
      @extend %flexV;
      padding-right: 26px;

      img {
        width: 40px;
        height: 40px;
      }
    }
  }

  .person-function {
    background: $backColor;

    li {
      @extend %flexV;
      font-weight: 400;
      font-size: 32px;
      padding: 26px 30px;
      border-bottom: 1px solid $lineColor;

      &:last-child {
        border-bottom: none;
      }

      img {
        width: 40px;
        height: 40px;
        margin-right: 16px;
      }
    }
  }
</style>
