<template>
  <div>
    <Header titleText="个人中心"></Header>
    <div class="pb-128px mt-88px">
      <div class="patient-block">
        <div class="patient">
          <img class="avatar" :src="user_avatar === '' ? (user_sex === 2 ? woman_img : man_img) : user_avatar">
          <div class="information">
            <p>{{user_name}}/{{user_sex|sexFormat}}/{{user_age}}</p>
            <p>帐号ID：{{user_id}}</p>
          </div>
          <div class="return-block">
            <img src="../../../assets/img/xiayibu@2x.png">
          </div>
        </div>
      </div>
      <ul class="person-function">
        <li>
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
        <!--<li>-->
        <!--<img src="../../../assets/img/dd@2x.png">-->
        <!--<span>商城订单</span>-->
        <!--</li>-->
      </ul>

    </div>
    <Footer navtiveIndex="4"></Footer>
  </div>
</template>

<script>
import man from '@/assets/img/mhz@2x.png'
import woman from '@/assets/img/whz@2x.png'

import {Footer, Header} from '@/components/common/index'
import {fetchUserInfo} from '@/fetch/api.js'

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
      user_name: '',
      user_sex: '',
      user_id: '',
      user_age: '',
      user_avatar: '',
      mobile: ''
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    goRouter (type) {
      switch (type) {
        case 1:
          break
        case 2:
          this.$router.push({path: '/appointListPage'})
          break
        case 3:
          this.$router.push({path: '/recipeListPage'})
          break
      }
    },
    getUser () {
      fetchUserInfo({}).then(res => {
        this.user_id = res.data.id
        this.user_name = res.data.name
        this.user_sex = res.data.sex

        this.user_age = res.data.age
        this.user_avatar = res.data.avatar
        this.mobile = res.data.mobile
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
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
