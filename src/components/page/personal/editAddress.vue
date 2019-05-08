<template>
  <div>
    <Header :canReturn="true" titleText="编辑信息"></Header>
    <div class="mt-88px mb-131px list-content">
      <div class="line-item">
        <label class="label-span mr-32px">姓名</label>
        <input type="text" class="input-item" placeholder="请填写" v-model="contact">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">手机</label>
        <input type="text" class="input-item" placeholder="请填写" v-model="mobile">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">地址</label>
        <select type="text" class="input-item select-width" @change="provinceChange" v-model="adrData.province_code">
          <option value="">省</option>
          <option v-for="province in adsListData.provinceList" :value="province.province_code"
                  v-text="province.province_name"
                  :key="province.province_code"
          ></option>
        </select>
        <select type="text" class="input-item select-width" @change="cityChange" v-model="adrData.city_code">
          <option value="">市</option>
          <option v-for="city in adsListData.cityList" :value="city.city_code"
                  v-text="city.city_name"
                  :key="city.city_code"
          ></option>
        </select>
        <select type="text" class="input-item select-width" @change="countyChange" v-model="adrData.county_code">
          <option value="">区</option>
          <option v-for="county in adsListData.countyList" :value="county.county_code"
                  v-text="county.county_name"
                  :key="county.county_code"
          ></option>
        </select>
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">详细地址</label>
        <input type="text" class="input-item" placeholder="请填写" v-model="adrData.address">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">默认地址</label>
        <radioGroup :data="defaultList" :value="adrData.is_default" :name="'defaultAddress'"
                    @input="changeDefault"></radioGroup>
      </div>
    </div>
    <div class="add-block">
      <button class="sure-btn" @click.stop="saveChange">确定</button>
    </div>
  </div>
</template>

<script>
import {Header, radioGroup} from '@/components/common/index'
import {provinceDate} from '@/assets/js/addr_dict'

export default {
  name: 'editAddress',
  components: {
    Header,
    radioGroup
  },
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
    this.adsListData.provinceList = provinceDate
  },
  methods: {
    changeDefault (val) {
      this.adrData.is_default = Number(val)
    },
    provinceChange () {
      console.log('修改省份')
    },
    cityChange () {
      console.log('修改城市')
    },

    countyChange () {
      console.log('修改区域')
    },
    saveChange () {

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

  .add-block {
    @include psFixed(bottom, 112px);
    @extend %displayFlex;
    background: $backColor;
    padding: 16px 30px 15px;
    width: 100%;
    border-top: 1px solid $lineColor;
  }

  .sure-btn {
    @include deepButton(80px, 100%);
  }
</style>
