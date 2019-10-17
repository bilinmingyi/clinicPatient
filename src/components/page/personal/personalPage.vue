<template>
  <div>
    <!--    <Header titleText="个人中心"></Header>-->
    <div class="pb-128px">
      <div class="patient-block">
        <div class="patient">
          <img class="avatar"
               :src="userInfoState.avatar === '' ? (userInfoState.sex === 2 ? woman_img : man_img) : userInfoState.avatar">
          <div class="information">
            <p>{{userInfoState.name}}/{{userInfoState.sex|sexFormat}}/{{userInfoState.age}}</p>
            <p>帐号ID：{{userInfoState.id}}</p>
          </div>
          <div class="return-block" @click.stop="goRouter(5)">
            <img src="../../../assets/img/xiayibu@2x.png">
          </div>
        </div>
      </div>
      <section class="white-back" v-if="orderList.length!=0">
        <div class="white-content">
          <div :class="['item-content', {'no-border-bottom': index == (orderList.length - 1)}]" v-for="(item, index) in orderList" :key="item.order_seqno" @click="gotoDetail(item)">
            <div class="mb-14px item-line">
              <span class="flexOne font-bold">{{item.week_idx ? '预约代缴费' : '就诊代缴费'}}</span>
              <span>{{item.create_time|dateFormat('yyyy/MM/dd hh:mm')}}</span>
            </div>
            <div class="item-line">
              <span class="flexOne">订单金额：￥{{item.amount_receivable}}</span>
              <span class="go-to-a">去支付</span>
            </div>
          </div>
        </div>
      </section>
      <ul class="person-function">
        <li @click.stop="goRouter(6)">
          <img src="../../../assets/img/dz.png">
          <span>地址管理</span>
        </li>
        <li @click.stop="goRouter(1)">
          <img src="../../../assets/img/qt@2x.png">
          <span>就诊人管理</span>
        </li>
        <li @click.stop="goRouter(7)">
          <img src="../../../assets/img/hy@2x.png">
          <span>我的会员卡</span>
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
import {getAppointList, fetchRecipeList} from '@/fetch/api.js'

export default {
  name: 'personalPage',
  components: {
    Footer,
    Header
  },
  data () {
    return {
      man_img: man,
      woman_img: woman,
      orderList: []
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  created () {
    setTimeout(() => {
      if (this.userInfoState.mobile) {
        this.getOrderData()
      }
    }, 500)
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
        case 7:
          this.$router.push({name: 'membershipCard'})
          break
      }
    },
    getOrderData () {
      let today = new Date()
      today.setHours(0)
      today.setMinutes(0)
      today.setSeconds(0)
      Promise.all([
        getAppointList({
          'page': 1,
          'page_size': 2,
          'status': ['UNPAID', 'SZJK_PAYING']
        }),
        fetchRecipeList({
          'page': 1,
          'start_time': Number(today.getTime()),
          'end_time': Number(today.getTime()) + 86399999,
          'page_size': 2,
          'status': ['UNPAID']
        })
      ]).then(res => {
        if (res[0].code === 1000 && res[1].code === 1000) {
          var listOne = res[0].data.filter(item => {
            return item.amount_receipts <= 0
          })
          var listTwo = res[1].data.filter(item => {
            return item.amount_receipts <= 0
          })
          if (listOne.length !== 0 && listTwo.length !== 0) {
            this.orderList.push(listOne[0])
            this.orderList.push(listTwo[0])
          } else if (listOne.length !== 0 && listTwo.length === 0) {
            this.orderList = listOne.slice(0, 2)
          } else if (listOne.length === 0 && listTwo.length !== 0) {
            this.orderList = listTwo.slice(0, 2)
          }
        }
      })
    },
    gotoDetail (item) {
      if (item.week_idx) {
        this.$router.push({name: 'appointOrderDetail', query: {orderSeqno: item.order_seqno}})
      } else {
        this.$router.push({name: 'recipeOrderDetail', query: {orderSeqno: item.order_seqno}})
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .patient-block {
    background: $backColor;
    /*padding-bottom: 38px;*/
  }

  .patient {
    padding: 44px 30px;
    border-bottom: 1px solid $lineColor;
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
      padding: 32px 30px;
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

  .item-content {
    padding: 20px 0;
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

  .font-bold {
    font-weight: bold;
  }

  .white-back {
    background: $backColor;
    padding: 38px 30px 40px;

    .white-content {
      background:rgba(255,255,255,1);
      box-shadow:0px 4px 20px 0px rgba(221,221,221,1);
      border-radius:16px;
      padding: 20px 30px;
    }

    .go-to-a {
      color: #47BA6E;
      font-size: 30px;
      font-weight: bold;
      text-decoration: underline;
    }
  }

</style>
