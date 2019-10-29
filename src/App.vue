<template>
  <div v-cloak>
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getClinicData, fetchUserInfo} from '@/fetch/api.js'
import {channelId, clinicId} from '@/assets/js/mapTypes.js'

export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    if (clinicId > 0) {
      this.getClinic()
    }
    this.getUserInfo()
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
          if (channelId > 0) {
            if (res.data.default_clinic_id > 0) {
              this.$router.replace({name: 'homePage'})
            } else {
              this.$router.replace({name: 'clinicSelect'})
            }
          } else {
            this.$router.replace({name: 'homePage'})
          }
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

<style>
</style>
