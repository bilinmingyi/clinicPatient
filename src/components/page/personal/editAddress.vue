<template>
  <div>
    <Header :canReturn="true" titleText="编辑地址"></Header>
    <div class="mt-88px mb-131px list-content">
      <div class="line-item">
        <label class="label-span mr-32px">姓名</label>
        <input type="text" class="input-item" placeholder="请填写" v-model="contact" @blur="scrollToTop">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">手机</label>
        <input type="text" class="input-item" placeholder="请填写" v-model="mobile" @blur="scrollToTop">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px label-width">地址</label>
        <select type="text" class="input-item select-width" @change="provinceChange" @blur="scrollToTop"
                v-model="adrData.province_code">
          <option value="">请选择</option>
          <option v-for="province in adsListData.provinceList" :value="province.province_code"
                  v-text="province.province_name"
                  :key="province.province_code"
          ></option>
        </select>
        <select type="text" class="input-item select-width" @change.stop="cityChange" @blur="scrollToTop"
                v-model="adrData.city_code">
          <option value="">请选择</option>
          <option v-for="city in adsListData.cityList" :value="city.city_code"
                  v-text="city.city_name"
                  :key="city.city_code"
          ></option>
        </select>
        <select type="text" class="input-item select-width" @change="countyChange" @blur="scrollToTop"
                v-model="adrData.county_code">
          <option value="">请选择</option>
          <option v-for="county in adsListData.countyList" :value="county.county_code"
                  v-text="county.county_name"
                  :key="county.county_code"
          ></option>
        </select>
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">详细地址</label>
        <input type="text" class="input-item" placeholder="请填写" v-model="adrData.address" @blur="scrollToTop">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">默认地址</label>
        <radioGroup :data="defaultList" :value="adrData.is_default" :name="'defaultAddress'"
                    @input="changeDefault"></radioGroup>
      </div>
    </div>
    <div class="add-block" v-if="index !== undefined">
      <button class="del-btn" @click.stop="deleteItem">删除</button>
      <button class="sure-btn" @click.stop="saveChange">确定</button>
    </div>
    <div class="add-block" v-else>
      <button class="add-btn" @click.stop="saveChange">确定</button>
    </div>
  </div>
</template>

<script>
import {Header, radioGroup} from '@/components/common/index'
import {provinceDate} from '@/assets/js/addr_dict'
import {mapState, mapActions} from 'vuex'
import {updateAddress} from '@/fetch/api'
import inputBlur from '@/assets/js/inputBlur'

export default {
  mixins: [inputBlur],
  name: 'editAddress',
  components: {
    Header,
    radioGroup
  },
  props: ['index'],
  data () {
    return {
      defaultList: [{id: 'yes', label: '是', value: 1}, {id: 'no', label: '否', value: 0}],
      contact: '',
      mobile: '',
      adrData: {
        province_code: '',
        province_name: '',
        city_code: '',
        city_name: '',
        county_code: '',
        county_name: '',
        address: '',
        is_default: 0
      },
      adsListData: {
        provinceList: [],
        cityList: [],
        countyList: []
      }
    }
  },
  created () {
    console.log(this.index)
    console.log('测试')
    this.adsListData.provinceList = provinceDate
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  watch: {
    userInfoState: {
      deep: true,
      immediate: true,
      handler: function (newVal, oldVal) {
        try {
          if (this.index !== undefined) {
            let addressList = newVal.addr_info === '' ? [] : JSON.parse(newVal.addr_info)
            if (addressList.length === 0) {
              return
            }
            let curAddress = addressList[this.index]
            this.contact = curAddress.contact
            this.mobile = curAddress.mobile
            this.adrData.province_code = curAddress.provinceCode
            this.adrData.province_name = curAddress.provinceName
            this.provinceChange()
            this.adrData.city_code = curAddress.cityCode
            this.adrData.city_name = curAddress.cityName
            this.cityChange()
            this.adrData.county_code = curAddress.countyCode
            this.adrData.county_name = curAddress.countyName
            this.countyChange()
            this.adrData.address = curAddress.address
            this.adrData.is_default = curAddress.isDefault
          }
        } catch (e) {
          console.log(e)
        }
      }
    }
  },
  mounted () {

  },
  methods: {
    ...mapActions(['set_user_info']),
    changeDefault (val) {
      this.adrData.is_default = Number(val)
    },
    provinceChange () {
      for (let i = 0, len = provinceDate.length; i < len; i++) {
        if (this.adrData.province_code === provinceDate[i].province_code) {
          this.adrData.province_name = provinceDate[i].province_name
          this.adsListData.cityList = provinceDate[i].city
          break
        }
      }
      this.adrData.city_code = ''
      this.adrData.city_name = ''
      this.adrData.county_code = ''
      this.adrData.county_name = ''
    },
    cityChange () {
      let cityList = this.adsListData.cityList
      for (let i = 0, len = cityList.length; i < len; i++) {
        if (this.adrData.city_code === cityList[i].city_code) {
          this.adrData.city_name = cityList[i].city_name
          this.adsListData.countyList = cityList[i].county
        }
      }
      this.adrData.county_code = ''
      this.adrData.county_name = ''
    },

    countyChange () {
      let countyList = this.adsListData.countyList
      for (let i = 0, len = countyList.length; i < len; i++) {
        if (this.adrData.county_code === countyList[i].county_code) {
          this.adrData.county_name = countyList[i].county_name
        }
      }
    },
    deleteItem () {
      this.$Message.confirm('确定删除？', () => {
        let addrInfoList = this.userInfoState.addr_info === '' ? [] : JSON.parse(this.userInfoState.addr_info)
        addrInfoList.splice(this.index, 1)
        updateAddress({
          addr_info: JSON.stringify(addrInfoList)
        }).then(res => {
          if (res.code === 1000) {
            this.set_user_info({
              addr_info: JSON.stringify(addrInfoList)
            })
            this.$router.back()
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(error => {
          console.log(error)
          this.$Message.infor('网络出错！')
        })
      })
    },
    saveChange () {
      if (!this.contact) {
        this.$Message.infor('请先填写姓名！')
        return
      }
      if (!this.mobile) {
        this.$Message.infor('请先填写手机！')
        return
      }
      if (!this.adrData.province_code || !this.adrData.city_code || !this.adrData.county_code || !this.adrData.address) {
        this.$Message.infor('请先填写地址信息！')
        return
      }
      let addrInfoList = this.userInfoState.addr_info === '' ? [] : JSON.parse(this.userInfoState.addr_info)
      if (this.adrData.is_default === 1) {
        addrInfoList.forEach(item => {
          item.isDefault = 0
        })
      }
      if (this.index !== undefined) {
        addrInfoList[this.index] = {
          contact: this.contact,
          mobile: this.mobile,
          isDefault: this.adrData.is_default,
          provinceName: this.adrData.province_name,
          provinceCode: this.adrData.province_code,
          cityName: this.adrData.city_name,
          cityCode: this.adrData.city_code,
          countyName: this.adrData.county_name,
          countyCode: this.adrData.county_code,
          address: this.adrData.address
        }
      } else {
        addrInfoList.push({
          contact: this.contact,
          mobile: this.mobile,
          isDefault: this.adrData.is_default,
          provinceName: this.adrData.province_name,
          provinceCode: this.adrData.province_code,
          cityName: this.adrData.city_name,
          cityCode: this.adrData.city_code,
          countyName: this.adrData.county_name,
          countyCode: this.adrData.county_code,
          address: this.adrData.address
        })
      }

      updateAddress({
        addr_info: JSON.stringify(addrInfoList)
      }).then(res => {
        if (res.code === 1000) {
          this.set_user_info({
            addr_info: JSON.stringify(addrInfoList)
          })
          this.$router.back()
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
  .list-content {
    background: $backColor;
  }

  .line-item {
    padding: 26px 30px;
    @extend %displayFlex
  }

  .input-item {
    background: transparent;
    border: none;
    outline: none;
    line-height: 45px;
    font-size: 32px;
    color: $depthTextColor;

    &::-webkit-input-placeholder {
      line-height: 45px;
      font-size: 32px;
    }
  }

  .select-width {
    width: calc((100vw - 156px) / 3);
  }

  .line-hr {
    @extend %lineHr;
  }

  .label-span {
    color: $depthTextColor;
    line-height: 45px;
    font-size: 32px;
  }

  .label-width {
    width: 66px;
    display: inline-block;
  }

  .add-block {
    @include psFixed(bottom, 112px);
    @extend %displayFlex;
    background: $backColor;
    padding: 16px 30px 15px;
    width: 100%;
    border-top: 1px solid $lineColor;
  }

  .sure-btn {
    @include deepButton(80px, 48%);
    margin-left: 4%;
  }

  .add-btn {
    @include deepButton(80px, 100%);
  }

  .del-btn {
    @include simpleButton(80px, 48%);
  }
</style>
