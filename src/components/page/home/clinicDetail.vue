<template>
  <div>
    <Header titleText="机构介绍" :canReturn="true"></Header>
    <div class="mt-88px">
      <div class="clinic-info">
        <img :src="clinic.banner">
        <div class="clinic-contact">
          <div class="displayFlex mb-8px">
            <div class="label">诊所地址：</div>
            <div class="content">{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}
            </div>
          </div>
          <div class="displayFlex">
            <div class="label">联系电话：</div>
            <div class="content">{{clinic.customerPhone}}</div>
          </div>
        </div>
      </div>
      <div class="clinic-intro">
        <SmallTitle>
          <span class="intro-title">诊所简介</span>
        </SmallTitle>
        <div class="intro-content">
          深圳淳道门诊部是淳道中医健康旗下的中医品牌机构， 秉着传承中医国粹，匠心打造品质的精神，汇集省内外 中医专家，以“名医、良方、好药”为核心经营理念，为 广大患者和中医爱好者提供中医医疗服务和问道学习的 平台。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '@/components/common/index'
import {mapState} from 'vuex'

export default {
  name: 'clinicDetail',
  computed: {
    ...mapState({
      'clinic': state => state.clinic
    })
  },
  components: {
    Header,
    SmallTitle
  }
}
</script>

<style lang="scss" scoped>
  .displayFlex {
    @extend %displayFlex;
  }

  .clinic-info {
    background: #ffffff;
    padding: 24px 30px 20px;
    margin-bottom: 20px;

    img {
      border-radius: 8px;
      width: 100%;
      margin-bottom: 20px;
    }

    .clinic-contact {
      background: #FAFAFA;
      border-radius: 8px;
      padding: 20px 30px;
      font-size: 28px;
      line-height: 40px;

      .label {
        color: $lightTextColor;
      }

      .content {
        color: $depthTextColor;
      }
    }
  }

  .clinic-intro {
    background: #ffffff;

    .intro-title {
      font-weight: bold;
      font-size: 32px;
    }

    .intro-content {
      padding: 20px 30px;
      color: $lightTextColor;
      font-size: 28px;
      line-height:40px;
      letter-spacing: 2px;
    }
  }
</style>
