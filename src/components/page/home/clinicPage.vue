<template>
  <div>
    <Header titleText="机构查询" :canReturn="type === 1"></Header>
    <div class="mt-88px">
      <Search placeholder="机构名称" @on-search="query" :hasLine="false"></Search>
      <div class="clinic-item">
        <img :src="img_clinic">
        <div class="clinic-content">
          <div class="clinic-name">深圳淳道门诊部</div>
          <div class="clinic-type">
            <div class="back-green">综合诊所</div>
<!--            <div class="back-yellow">西医诊所</div>-->
<!--            <div class="back-cyan">中医诊所</div>-->
            <div class="back-red">默认诊所</div>
          </div>
          <div class="clinic-adr">深圳市福田区石厦地铁站C出口东方深圳市福田区石厦地铁站C出口东方欣</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, Search} from '@/components/common/index'
import menZhen from '@/assets/img/menzhen.png'

export default {
  name: 'clinicPage',
  props: ['type'],
  components: {
    Header,
    Search
  },
  data () {
    return {
      img_clinic: menZhen
    }
  },
  created () {
  },
  methods: {
    query () {
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-item {
    @extend %displayFlex;
    background: #ffffff;
    padding: 32px;
    border-bottom: 1px solid $lineColor;

    img {
      width: 148px;
      height: 148px;
      margin-right: 28px;
      border-radius:8px;
    }

    .clinic-content {
      @extend %displayFlex;
      flex-direction: column;
      justify-content: space-between;
      .clinic-name {
        font-weight: bold;
        font-size: 32px;
        color: #3F3F3F;
        line-height: 45px;
      }
      .clinic-type {
        @extend %displayFlex;
        div {
          padding: 6px 8px;
          background:rgba(8,186,198,1);
          border-radius:8px;
          font-size:20px;
          color: #ffffff;
          margin-right: 16px;
        }
        .back-cyan {
          background: $cyanColor;
        }
        .back-red {
          background: $redColor;
        }
        .back-green {
          background: $greenColor;
        }
        .back-yellow {
          background: $yellowColor;
        }
      }
      .clinic-adr {
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 28px;
        color: #7C7C7C;
        line-height:40px;
        width: calc(100vw - 240px);
      }
    }
  }
</style>
