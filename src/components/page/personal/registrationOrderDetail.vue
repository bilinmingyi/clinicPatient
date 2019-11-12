<template>
  <div>
    <Header :titleText="titleName" :canReturn="true"></Header>
    <div class="mt-88px">
      <div class="doctor-item">
        <img :src="itemData.avatar != '' ? itemData.avatar: (itemData.sex == 2 ? woman_img: man_img)">
        <div class="doctor-infor">
          <div class="infor-title">王大明医生</div>
          <div>
            <span>费用：</span><span class="color-red">￥100</span>
          </div>
        </div>
      </div>
      <div class="doctor-spec">
        <div class="spec-content">
          <div class="mb-8px">
            <span>时间：</span><span class="text-block">深圳2019-05-12 下午2点-4点</span>
          </div>
          <div class="mb-8px">
            <span>地点：</span><span class="text-block">深圳市福田区福民路东方欣悦居楼2B</span>
          </div>
          <div class="mb-8px">
            <span>报名时间：</span><span class="text-block">2019-05-11</span>
          </div>
          <div>
            <span>报名人员：</span><span class="text-block">刘静/165656465454</span>
          </div>
        </div>
      </div>
      <div class="doctor-intro">
        <SmallTitle :hasBlock="true" :hasLink="false">
          <span class="ml-16px">课程简介</span>
        </SmallTitle>
        <div class="text-content">
          各种耳鼻喉科急慢性疾病的诊断及中医、中西医结合
          治疗，工作40多年，尤其对耳科疾病：如耳鸣、神经
          性耳聋、鼻炎、小儿鼻窦炎、过敏性鼻炎、过敏性咽
          炎等疾病有较深的研究。
        </div>
      </div>
      <div class="doctor-intro">
        <SmallTitle :hasBlock="true" :hasLink="false">
          <span class="ml-16px">讲师简介</span>
        </SmallTitle>
        <div class="text-content">
          各种耳鼻喉科急慢性疾病的诊断及中医、中西医结合
          治疗，工作40多年，尤其对耳科疾病：如耳鸣、神经
          性耳聋、鼻炎、小儿鼻窦炎、过敏性鼻炎、过敏性咽
          炎等疾病有较深的研究。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '../../common'
import man from '@/assets/img/nan@2x.png'
import woman from '@/assets/img/nv@2x.png'

export default {
  name: 'registrationOrderDetail',
  components: {
    Header,
    SmallTitle
  },
  data () {
    return {
      titleName: '测试文章名称',
      man_img: man,
      woman_img: woman,
      itemData: {
        avatar: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .doctor-item {
    @extend %displayFlex;
    padding: 24px 30px;
    background: $backColor;

    img {
      width: 112px;
      height: 112px;
      border-radius: 50%;
    }

    .doctor-infor {
      flex: 1;
      margin-left: 24px;
      @extend %displayFlex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 28px;
      line-height: 40px;
      padding: 9px 0;
      color: #8c8c8c;

      .infor-title {
        color: #3f3f3f;
        font-weight: bold;
        font-size: 32px;
        line-height: 45px;
        margin-right: 16px;
      }
    }
  }

  .doctor-spec {
    padding: 0 30px 24px 30px;
    margin-bottom: 20px;
    background: $backColor;

    .spec-content {
      background: #fafafa;
      padding: 20px;
      font-size: 30px;
      color: $lightTextColor;
      line-height: 42px;

      .text-block {
        color: $depthTextColor;
      }
    }
  }

  .doctor-intro {
    background: $backColor;
    margin-bottom: 20px;
    .text-content {
      padding: 0 50px 35px;
      line-height: 40px;
      font-size: 28px;
      color: $depthTextColor;
    }
  }
</style>
