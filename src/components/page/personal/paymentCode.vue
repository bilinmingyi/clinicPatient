<template>
  <div>
    <Header :canReturn="true" titleText="我的付款码"></Header>
    <div class="mt-88px">
      <div class="white-back mb-20px">
        <SmallTitle :hasBlock="true">
          <span class="ml-16px flexOne">会员卡信息</span>
          <div class="pay-code" @click.stop="getCode">
            刷新
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
            <span class="label-red">{{Number(memberInfo.presentAmount) + Number(memberInfo.amount)|toFix2}}元</span>
          </div>
        </div>
      </div>
      <div class="white-back">
        <SmallTitle :hasBlock="true" :hasLink="false">
          <span class="ml-16px">付款二维码</span>
        </SmallTitle>
        <div class="code-block">
          <img :src="img_url">
          <p>会员支付时出示二维码</p>
        </div>
      </div>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {Header, SmallTitle, Loading} from '../../common'
import {fetchMemberInfo, fetchMemberCode} from '@/fetch/api'

export default {
  name: 'paymentCode',
  components: {
    Header,
    SmallTitle,
    Loading
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
      img_url: '',
      timer: null
    }
  },
  created () {
    this.getCode()
    this.getMemberData()
    this.timer = setInterval(() => {
      this.getCode()
    }, 50000)
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.timer)
    next()
  },
  methods: {
    getMemberData () {
      fetchMemberInfo().then(res => {
        this.showLoad = false
        if (res.code === 1000) {
          this.memberInfo.name = res.data.name
          this.memberInfo.cardNo = res.data.cardNo
          this.memberInfo.amount = res.data.amount
          this.memberInfo.presentAmount = res.data.presentAmount
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.showLoad = false
        this.$Message.infor('网络出错！')
      })
    },
    getCode () {
      fetchMemberCode().then(res => {
        if (res.code === 1000) {
          this.img_url = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        this.$Message.infor('获取二维码失败！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .white-back {
    background: $backColor;
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

  .code-block {
    padding: 43px 0;
    @extend %displayFlex;
    flex-direction: column;
    align-items: center;

    img {
      width: 430px;
      height: 430px;
    }

    p {
      color: $depthTextColor;
      font-size: 28px;
      margin-top: 15px;
      line-height: 40px;
    }
  }
</style>
