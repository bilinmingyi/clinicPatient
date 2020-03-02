<template>
  <div>
    <Header titleText="机构查询" :canReturn="type === 1"></Header>
    <div class="mt-88px">
      <Search placeholder="机构名称" @on-search="query" :hasLine="false"></Search>
      <div class="clinic-item" v-for="item in resultList" :key="item.id" @click="change(item.id)">
        <img :src="item.logo ? item.logo : img_clinic">
        <div class="clinic-content">
          <div class="clinic-name">{{item.name}}</div>
          <div class="clinic-type">
            <div class="back-green" v-if="item.service_type === 1">综合诊所</div>
            <div class="back-yellow" v-if="item.service_type === 2">西医诊所</div>
            <div class="back-cyan" v-if="item.service_type === 3">中医诊所</div>
            <div class="back-red" v-if="item.is_gzh_default === 1">默认机构</div>
          </div>
          <div class="clinic-adr">{{item.province_name}}省{{item.city_name}}市{{item.county_name}}区{{item.address}}</div>
        </div>
      </div>
    </div>
    <Loading v-if="loadShow"></Loading>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {Header, Search, Loading} from '@/components/common/index'
import menZhen from '@/assets/img/menzhen.png'
import {getClinicList, changeClinic, getClinicData, setDefultClinic} from '@/fetch/api.js'

export default {
  name: 'clinicPage',
  props: ['type'],
  components: {
    Header,
    Search,
    Loading
  },
  data () {
    return {
      img_clinic: menZhen,
      dataList: [],
      resultList: [],
      queryName: '',
      loadShow: false
    }
  },
  created () {
    this.getData()
  },
  methods: {
    ...mapActions(['set_clinic_info']),
    getData () {
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
    },
    change (id) {
      this.$Message.confirm('确定切换诊所？', () => {
        this.loadShow = true
        changeClinic({
          'id': id
        }).then(res => {
          if (res.code === 1000) {
            setDefultClinic({
              'id': id
            }).then(res => {
              if (res.code === 1000) {
                this.getClinic()
              } else {
                this.loadShow = false
                this.$Message.infor(res.msg)
              }
            }).catch(error => {
              this.loadShow = false
              console.log(error)
              this.$Message.infor('网络出错！')
            })
          } else {
            this.loadShow = false
            this.$Message.infor(res.msg)
          }
        }).catch(error => {
          this.loadShow = false
          console.log(error)
          this.$Message.infor('网络出错！')
        })
      })
    },
    getClinic () {
      getClinicData().then(res => {
        this.loadShow = false
        if (res.code === 1000) {
          this.set_clinic_info({
            id: res.data.id,
            name: res.data.name,
            customerPhone: res.data.customer_phone,
            provinceName: res.data.province_name,
            provinceCode: res.data.province_code,
            cityName: res.data.city_name,
            cityCode: res.data.city_code,
            countyName: res.data.county_name,
            countyCode: res.data.county_code,
            address: res.data.address,
            logo: res.data.logo,
            szjkPayEnabled: res.data.szjk_pay_enabled,
            banner: res.data.banner,
            serviceType: res.data.service_type,
            isGzhDefault: res.data.is_gzh_default
          })
          this.$router.replace({name: 'homePage'})
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    query (str) {
      if (str === '') {
        this.resultList = this.dataList
      } else {
        this.resultList = this.dataList.filter(item => {
          return item.name.indexOf(str) >= 0
        })
      }
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
