<template>
  <div>
    <Header titleText="预约确认" :canReturn="true"></Header>
    <div class="mt-88px">
      <section class='appoint-info'>
        <Small-title :hasBlock="true">
          <span class="ml-16px">预约确认</span>
        </Small-title>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">预约地点：</span>
            <span
              class="label-two">{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">预约时间：</span>
            <span class="label-two">{{treatDate|dateFormat('yyyy-MM-dd  W')}}&nbsp;&nbsp;{{startTime}}-{{endTime}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">预约医生：</span>
            <span
              class="label-two">{{doctorName}}</span>
          </div>
          <div>
            <span class="label-three">挂号费用：</span>
            <span class="label-red">{{price}}元</span>
          </div>
        </div>
      </section>
      <section class='appoint-info'>
        <Small-title :hasBlock="true">
          <span class="ml-16px">就诊人信息</span>
        </Small-title>
      </section>
    </div>
  </div>
</template>

<script>
import {Header, SmallTitle} from '@/components/common'
import {mapState} from 'vuex'

export default {
  name: 'appointSure',
  components: {
    Header,
    SmallTitle
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  props: ['treatDate', 'price', 'startTime', 'endTime', 'doctorName']
}
</script>

<style lang="scss" scoped>
  .appoint-info {
    background: $backColor;
    margin-bottom: 20px;
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
</style>
