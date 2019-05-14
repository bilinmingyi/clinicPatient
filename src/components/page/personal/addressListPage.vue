<template>
  <div>
    <Header titleText="地址管理" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <div class="address-item" v-for="(item, index) in addressList" :key="index">
        <div class="flexOne" @click.stop="selectAddress(index)">
          <p class="first-p">
            <span>{{item.contact}}</span>
            <span class="ml16">{{item.mobile}}</span>
            <span class="default-address ml16" v-if="item.isDefault === 1">默认</span>
          </p>
          <p class="second-p">
            {{item.provinceName+'(省)'+item.cityName+'(市)'+item.countyName+'(区/县)'+item.address}}
          </p>
        </div>
        <div class="edit-btn" @click.stop="editAddress(index)"></div>
      </div>
      <div v-if="addressList.length === 0 && !isFirst" class="no-address-back"></div>
    </div>
    <div class="add_block">
      <button class="add_btn" @click.stop="addAddress">添加收货地址</button>
    </div>
  </div>
</template>

<script>
import {Header} from '../../common'
import {mapState} from 'vuex'

export default {
  name: 'addressListPage',
  props: ['forSelect', 'ids'],
  data () {
    return {
      addressList: [],
      isFirst: true
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  components: {
    Header
  },
  mounted () {
    setTimeout(() => {
      this.getAddress()
    }, 450)
  },
  methods: {
    selectAddress (index) {
      if (this.forSelect) {
        this.$router.replace({name: 'sureOrder', query: {ids: this.ids, index: index}})
      }
    },
    editAddress (index) {
      if (!this.userInfoState.mobile) {
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({name: 'editPerson'})
        })
      }
      this.$router.push({name: 'editAddress', query: {index: index}})
    },
    addAddress () {
      if (!this.userInfoState.mobile) {
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({name: 'editPerson'})
        })
      }
      this.$router.push({name: 'editAddress'})
    },
    getAddress () {
      if (this.userInfoState.mobile) {
        this.addressList = this.userInfoState.addr_info === '' ? [] : JSON.parse(this.userInfoState.addr_info)
        this.isFirst = false
      } else {
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({name: 'editPerson'})
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .address-item {
    background: $backColor;
    color: $depthTextColor;
    padding: 32px 30px;
    margin-bottom: 20px;
    @extend %displayFlex;

    .first-p {
      line-height: 45px;
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 8px;
      @extend %flexV;
    }

    .default-address {
      color: #ffffff;
      display: inline-block;
      line-height: 28px;
      font-size: 20px;
      background: $redColor;
      border-radius: 8px;
      padding: 4px 14px;
      font-weight: normal;
    }

    .second-p {
      font-size: 24px;
    }

    .edit-btn {
      background: url("../../../assets/img/bj@2x.png") no-repeat center center;
      background-size: 100%;
      width: 64px;
      height: 64px;
      margin-left: 48px;
    }
  }

  .no-address-back {
    height: calc(100vh - 219px);
    background: url("../../../assets/img/ps.png") no-repeat center center;
    background-size: 60%;
  }

  .add_block {
    @include psFixed(bottom, 111px);
    background: $backColor;
    padding: 16px 30px 15px;
  }

  .add_btn {
    @include deepButton(80px, 100%)
  }
</style>
