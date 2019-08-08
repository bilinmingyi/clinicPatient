<template>
  <div>
    <Header :canReturn="true" titleText="我的会员卡"></Header>
    <div class="mt-88px">
      <div class="white-back">
        <SmallTitle :hasBlock="true">
          <span class="ml-16px flexOne">会员卡信息</span>
          <div class="pay-code" @click.stop="goRouter">
            付款码
          </div>
        </SmallTitle>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">会员卡号：</span>
            <span class="label-two">{{memberInfo.cardNo}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">会员姓名：</span>
            <span class="label-two">{{memberInfo.name}}</span>
          </div>
          <div>
            <span class="label-three">当前金额：</span>
            <span class="label-red">{{Number(memberInfo.presentAmount) + Number(memberInfo.amount)}}元</span>
          </div>
        </div>
      </div>
      <div class="white-back">
        <div class="content-title">
          <div :class="['title-item', {'title-item-active': listType == 1}]" @click="changeType(1)">充值记录</div>
          <div :class="['title-item', {'title-item-active': listType == 2}]" @click="changeType(2)">消费记录</div>
        </div>
        <section v-show="listType === 1">
          <div class="item-content" v-for="(item, index) in recharge.dataList" :key="item.id"
               :style="{'border-bottom': index === (recharge.dataList.length - 1) ? 'none' : ''}">
            <div class="mb-8px item-line">
              <span class="flexOne font-bold">现金</span>
              <span>{{item.create_time|dateFormat('yyyy/MM/dd hh:mm')}}</span>
            </div>
            <div class="item-line">
              <span class="flexOne">本金金额：￥{{item.amount}}</span>
              <span>赠送金额：￥{{item.present_amount}}</span>
            </div>
          </div>
          <Load-more @click="getMoreRecharge"
                     v-if="recharge.page < Math.ceil(recharge.totalNum/recharge.pageSize)"></Load-more>
        </section>
        <section v-show="listType == 2">
          <div class="item-content" v-for="(item, index) in consumer.dataList" :key="item.id"
               :style="{'border-bottom': index === (consumer.dataList.length - 1) ? 'none' : ''}">
            <div class="mb-8px item-line">
              <span class="flexOne font-bold">现金</span>
              <span>{{item.create_time|dateFormat('yyyy/MM/dd hh:mm')}}</span>
            </div>
            <div class="item-line">
              <span class="flexOne">{{item.patient_name}}</span>
              <span>缴费金额：￥{{item.total_amount}}</span>
            </div>
          </div>
          <Load-more @click="getMoreConsumer"
                     v-if="consumer.page < Math.ceil(consumer.totalNum/consumer.pageSize)"></Load-more>
        </section>
      </div>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {Header, SmallTitle, Loading, LoadMore} from '../../common'
import {fetchMember, fetchMemberList, fetchPayStream} from '@/fetch/api'
import {mapState} from 'vuex'

export default {
  name: 'membershipCard',
  components: {
    Header,
    SmallTitle,
    Loading,
    LoadMore
  },
  data () {
    return {
      showLoad: true,
      memberInfo: {
        name: '',
        cardNo: '',
        presentAmount: 0,
        amount: 0
      },
      recharge: {
        page: 1,
        pageSize: 10,
        totalNum: 0,
        dataList: []
      },
      consumer: {
        page: 1,
        pageSize: 10,
        totalNum: 0,
        dataList: []
      },
      listType: 1
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  mounted () {
    setTimeout(() => {
      this.getMemberData()
    }, 500)
  },
  methods: {
    changeType (type) {
      this.listType = type
    },
    getData () {
      if (this.userInfoState.mobile) {
        this.getMemberData()
      } else {
        this.showLoad = false
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({name: 'editPerson'})
        })
      }
    },
    getMemberData () {
      fetchMember().then(res => {
        this.showLoad = false
        if (res.code === 1000) {
          this.memberInfo.name = res.data.name
          this.memberInfo.cardNo = res.data.card_no
          this.memberInfo.amount = res.data.amount
          this.memberInfo.presentAmount = res.data.present_amount
          this.getRechargeList()
          this.getConsumerList()
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.showLoad = false
        this.$Message.infor('网络出错！')
      })
    },
    getMoreRecharge () {
      this.recharge.page++
      this.getRechargeList()
    },
    getRechargeList () {
      fetchMemberList({
        'page': this.recharge.page,
        'page_size': this.recharge.pageSize
      }).then(res => {
        if (res.code === 1000) {
          this.recharge.totalNum = res.total_num
          res.data.forEach(item => {
            this.recharge.dataList.push(item)
          })
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$Message.infor('网络出错！')
      })
    },
    getMoreConsumer () {
      this.consumer.page++
      this.getConsumerList()
    },
    getConsumerList () {
      fetchPayStream({
        'page': this.consumer.page,
        'page_size': this.consumer.pageSize
      }).then(res => {
        if (res.code === 1000) {
          this.consumer.totalNum = res.total_num
          res.data.forEach(item => {
            this.consumer.dataList.push(item)
          })
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$Message.infor('网络出错！')
      })
    },
    goRouter () {
      this.$router.push({name: 'paymentCode'})
    }
  }
}
</script>

<style lang="scss" scoped>
  .white-back {
    background: $backColor;
    margin-bottom: 20px;
  }

  .pay-code {
    @include simpleButton(64px, 128px);
    font-size: $depthTextColor;
    font-size: 24px;
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

  .content-title {
    @extend %displayFlex;

    .title-item {
      color: $lightTextColor;
      font-size: 32px;
      padding: 26px 0 25px;
      flex: 1;
      text-align: center;
      border-bottom: 1px solid $lineColor;
    }

    .title-item-active {
      color: $greenColor;
      font-weight: bold;
      border-bottom: 4px solid $greenColor;
    }
  }

  .item-content {
    padding: 20px 30px;
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
</style>
