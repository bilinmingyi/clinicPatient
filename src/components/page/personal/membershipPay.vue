<template>
  <div>
    <Header :canReturn="true" titleText="会员卡付款"></Header>
    <div class="mt-88px">
      <div class="white-back">
        <SmallTitle :hasBlock="true">
          <span class="ml-16px flexOne ">会员卡信息</span>
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
        <SmallTitle :hasBlock="true">
          <span class="ml-16px">订单信息</span>
        </SmallTitle>
        <div class="patient-infor">
          <div class="line-item">
            <label class="label-span mr-32px">订单编号</label>
            <span class="label-span"></span>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-96px">订单类型</label>
            <span class="label-span"></span>
          </div>
          <hr class="line-hr">
          <div class="line-item">
            <label class="label-span mr-96px">订单金额</label>
            <span class="label-span"></span>
          </div>
        </div>
      </div>
      <p class="no-enough-money">员卡金额不足，请采用其他支付方式支付</p>
    </div>
    <div class="add-block">
      <button class="sure-btn">关闭</button>
      <button class="del-btn">提交</button>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle, Loading} from '../../common'

export default {
  name: 'membershipPay',
  components: {
    Header,
    SmallTitle,
    Loading
  },
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

  .line-item {
    padding: 26px 0px;
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

  .patient-infor {
    padding: 0 30px;
  }

  .add-block {
    @include psFixed(bottom, 112px);
    @extend %displayFlex;
    background: $backColor;
    padding: 16px 30px 15px;
    width: 100%;
    border-top: 1px solid $lineColor;
  }

  .del-btn {
    @include deepButton(80px, 48%);
    margin-left: 4%;
  }

  .sure-btn {
    @include simpleButton(80px, 48%);
  }

  .no-enough-money {
    color: $redColor;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
  }
</style>
