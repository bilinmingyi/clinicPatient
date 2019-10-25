<template>
  <div>
    <Header titleText="机构查询" :canReturn="type === 1"></Header>
    <div class="mt-88px">
      <Search placeholder="机构名称" @on-search="query" :hasLine="false"></Search>
      <div class="clinic-item" v-for="item in resultList" :key="item.id">
        <img :src="item.logo ? item.logo : img_clinic">
        <div class="clinic-content">
          <div class="clinic-name">{{item.name}}</div>
          <div class="clinic-type">
            <div class="back-green" v-if="item.service_type === 1">综合诊所</div>
            <div class="back-yellow" v-if="item.service_type === 2">西医诊所</div>
            <div class="back-cyan" v-if="item.service_type === 3">中医诊所</div>
            <div class="back-red" v-if="item.is_gzh_default === 1">默认诊所</div>
          </div>
          <div class="clinic-adr">{{item.province_name}}省{{item.city_name}}市{{item.county_name}}区{{item.address}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {Header, Search} from '@/components/common/index'
import menZhen from '@/assets/img/menzhen.png'
import {getClinicList} from '@/fetch/api.js'

export default {
  name: 'clinicPage',
  props: ['type'],
  components: {
    Header,
    Search
  },
  data () {
    return {
      img_clinic: menZhen,
      dataList: [],
      resultList: []
    }
  },
  created () {
    this.query()
  },
  methods: {
    query () {
      getClinicList({}).then(res => {
        if (res.code === 1000) {
          this.dataList = res.data
          this.resultList = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
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
      border-radius: 8px;
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
          background: rgba(8, 186, 198, 1);
          border-radius: 8px;
          font-size: 20px;
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
        line-height: 40px;
        width: calc(100vw - 240px);
      }
    }
  }
</style>
