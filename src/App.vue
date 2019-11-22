<template>
  <div v-cloak>
    <router-view/>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import {getClinicData, fetchUserInfo} from '@/fetch/api.js'
import {clinicId} from '@/assets/js/mapTypes.js'

export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    this.getUserInfo()
    if (clinicId > 0) {
      this.checkHref()
      this.getClinic()
    } else {
      this.$router.replace({name: 'clinicSelect'})
    }
  },
  methods: {
    ...mapActions(['set_clinic_info', 'set_user_info']),
    getClinic () {
      getClinicData().then(res => {
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
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    getUserInfo () {
      fetchUserInfo({}).then(res => {
        if (res.code === 1000) {
          this.set_user_info(res.data)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    getQueryString (name) {
      var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      var r = window.location.search.substr(1).match(reg)
      if (r != null) return decodeURIComponent(r[2])
      return null
    },
    checkHref () {
      const path = this.getQueryString('path')
      if (path) {
        if (path.indexOf('noReturn=1') >= 0) {
          window.location.href = `${window.location.origin}${window.location.pathname}#${path}`
        } else if (path.indexOf('noReturn=0') >= 0) {
          window.location.href = `${window.location.origin}${window.location.pathname}#${path.replace(/noReturn=0/, 'noReturn=1')}`
        }
      }
    }
  }
}
</script>

<style>
</style>
