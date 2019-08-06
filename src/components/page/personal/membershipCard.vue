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
            <span class="label-two">54151451451414</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">会员姓名：</span>
            <span class="label-two">铁蛋</span>
          </div>
          <div>
            <span class="label-three">当前金额：</span>
            <span class="label-red">200元</span>
          </div>
        </div>
      </div>
      <div class="white-back">
        <div class="content-title">
          <div class="title-item title-item-active">充值记录</div>
          <div class="title-item">消费记录</div>
        </div>
        <section>
          <div class="item-content">
            <div class="mb-8px item-line">
              <span class="flexOne font-bold">现金</span>
              <span>{{new Date()|dateFormat('yyyy/MM/dd hh:mm')}}</span>
            </div>
            <div class="item-line">
              <span class="flexOne">本金金额：￥1000</span>
              <span>赠送金额：￥200</span>
            </div>
          </div>
        </section>
        <section>
          <div>

          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle, Loading} from '../../common'

export default {
  name: 'membershipCard',
  components: {
    Header,
    SmallTitle,
    Loading
  },
  methods: {
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
