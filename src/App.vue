<template>
  <div v-cloak>
    <router-view/>
  </div>
</template>

<script>
import {mapActions} from 'vuex'
import {getClinicData, fetchUserInfo} from '@/fetch/api.js'

export default {
  name: 'App',
  data () {
    return {}
  },
  created () {
    this.getClinic()
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
            customerPhone: res.data.customerPhone,
            provinceName: res.data.provinceName,
            provinceCode: res.data.provinceCode,
            cityName: res.data.cityName,
            cityCode: res.data.cityCode,
            countyName: res.data.countyName,
            countyCode: res.data.countyCode,
            address: res.data.address,
            logo: res.data.logo
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
