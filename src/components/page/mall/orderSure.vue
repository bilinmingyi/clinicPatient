<template>
  <div>
    <Header titleText="订单确认" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <div class="clinic-content">
        <Small-title>
          <span>诊所药房</span>
        </Small-title>
        <div v-for="(item, index) in shopCarList" :key="item.id">
          <div class="goods-item">
            <div class="goods-item-middle">
              <img :src="item.goods_info.img?item.goods_info.img:noImg" @error="imgError($event)">
            </div>
            <div class="goods-item-right">
              <div class="goods-info">
                <span>{{item.goods_info.name}}</span><span>{{item.goods_info.spec}}</span>
              </div>
              <div class="goods-num">
              <span class="flexOne">
                ￥{{item.goods_info.price*item.num}}
              </span>
                <div class="num-change">数量：{{item.num}}</div>
              </div>
            </div>
          </div>
          <hr class="full-screen-hr" v-show="index !== shopCarList.length - 1">
        </div>
      </div>
      <div class="clinic-content">
        <div class="address">
          <section v-if="hasAddress">
            <div class="displayFlex mb-8px">
              <div class="flexOne">
                <p class="name mb-8px">收件人：{{addressee.concact}}</p>
                <P>电话：{{addressee.phoneNum}}</P>
              </div>
              <div>
                <button class="edit-btn" @click.stop=editAddress>编辑</button>
              </div>
            </div>
            <div class="flex">
              <span>收货地址：</span>
              <span class="flexOne">{{addressee.address}}</span>
            </div>
          </section>
          <section v-if="!hasAddress" class="add-address" @click.stop="editAddress">
            + 添加地址
          </section>
        </div>
        <hr class="full-screen-hr">
        <div class="remark">
          <label>患者备注</label>
          <input placeholder="暂无" v-model="memo">
        </div>
      </div>
    </div>
    <Shop-footer :btnText="textList[needCheck]" :allPrice="allPrice" @click="submitOrder"></Shop-footer>
  </div>
</template>

<script>
import {Header, ShopFooter, SmallTitle} from '../../common'
import {fetchShopCar, checkEnable, createOrder, removeShop} from '@/fetch/api'
import {mapState} from 'vuex'
import noImg from '@/assets/img/nophoto.png'

export default {
  name: 'orderSure',
  props: ['ids', 'index'],
  data () {
    return {
      shopCarList: [],
      noImg: noImg,
      memo: '',
      needCheck: 0,
      textList: ['', '提交审核', '去支付'],
      hasAddress: false,
      addressee: {
        concact: '',
        phoneNum: '',
        address: ''
      }
    }
  },
  components: {
    Header,
    ShopFooter,
    SmallTitle
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    }),
    allPrice () {
      if (this.shopCarList.length === 0) {
        return 0
      } else {
        let all = 0
        this.shopCarList.forEach(item => {
          all += Number(item.num * item.goods_info.price)
        })
        return all
      }
    }
  },
  watch: {
    userInfoState: {
      deep: true,
      immediate: true,
      handler: function () {
        this.init()
      }
    }
  },
  created () {
    this.getShopCar()
  },
  mounted () {
    // this.init()
  },
  methods: {
    init () {
      let addressList = this.userInfoState.addr_info === '' ? [] : JSON.parse(this.userInfoState.addr_info)
      if (addressList.length === 0) {
        this.hasAddress = false
      } else {
        this.hasAddress = true
        if (this.index !== undefined) {
          this.addressee.concact = addressList[this.index].contact
          this.addressee.phoneNum = addressList[this.index].mobile
          this.addressee.address = addressList[this.index].provinceName + '(省)' + addressList[this.index].cityName + '(市)' + addressList[this.index].countyName + '(区/县)' + addressList[this.index].address
          return
        }

        let defaultList = addressList.filter(item => {
          return item.isDefault === 1
        })
        if (defaultList.length !== 0) {
          this.addressee.concact = defaultList[0].contact
          this.addressee.phoneNum = defaultList[0].mobile
          this.addressee.address = defaultList[0].provinceName + '(省)' + defaultList[0].cityName + '(市)' + defaultList[0].countyName + '(区/县)' + defaultList[0].address
        } else {
          this.addressee.concact = addressList[0].contact
          this.addressee.phoneNum = addressList[0].mobile
          this.addressee.address = addressList[0].provinceName + '(省)' + addressList[0].cityName + '(市)' + addressList[0].countyName + '(区/县)' + addressList[0].address
        }
      }
    },
    imgError (event) {
      event.target.src = this.noImg
    },
    getShopCar () {
      fetchShopCar({}).then(res => {
        let idsList = JSON.parse(this.ids)
        if (res.code === 1000) {
          this.shopCarList = []
          res.data.forEach(item => {
            if (idsList.some(id => {
              return id === item.goods_id
            })) {
              this.shopCarList.push(item)
            }
          })
          this.checkEnabled()
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('获取购物车列表失败!')
      })
    },
    checkEnabled () {
      if (this.shopCarList.some((item) => {
        return item.goods_info.is_Rx === 1
      })) {
        this.needCheck = 1
      } else {
        this.needCheck = 2
      }
    },
    async submitOrder () {
      let resultList = this.shopCarList.map(item => {
        return {
          goods_id: item.goods_id,
          num: item.num
        }
      })
      let res = await createOrder({
        contact: this.addressee.concact,
        phone_num: this.addressee.phoneNum,
        address: this.addressee.address,
        memo: this.memo,
        goods_order_items: resultList
      })
      if (res.code === 1000) {
        try {
          let idsList = this.shopCarList.map(item => {
            return item.id
          })
          await removeShop({
            ids: idsList
          })
          if (this.needCheck === 1) {
            // 需要提交审核
            this.$router.replace({name: 'mallOrderDetail', query: {orderSeqno: res.data}})
          } else if (this.needCheck === 2) {
            // 不需要提交审核，直接去支付
            this.$router.replace({name: 'mallOrderDetail', query: {orderSeqno: res.data, shouldPay: 1}})
            // if (this.clinic.szjkPayEnabled === 1) {
            //   let urlRes = await gotoPay({
            //     order_type: 8,
            //     order_seqno: res.data
            //   })
            //   if (urlRes.code === 1000) {
            //     try {
            //       window.location.href = urlRes.data
            //     } catch (e) {
            //       console.log(e)
            //     }
            //   } else {
            //     this.$Message.infor(urlRes.msg)
            //   }
            // } else {
            //   this.$Message.confirm('该诊所未开通线上支付功能！', () => {
            //     this.$router.push({name: 'mallListPage'})
            //   }, true)
            // }
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$Message.infor(res.msg)
      }
    },
    editAddress () {
      this.$router.replace({name: 'addressListPage', query: {forSelect: 1, ids: this.ids}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-content {
    background: $backColor;
    margin-bottom: 20px;
  }

  .goods-item {
    @extend %flexV;
    padding: 32px 30px;

    .goods-item-middle {
      margin-right: 24px;
      padding: 7px;
      border: 1px solid $lineColor;
      border-radius: 8px;

      img {
        width: 146px;
        height: 146px;
      }
    }

    .goods-item-right {
      flex: 1;

      .goods-info {
        font-size: 28px;
        color: $depthTextColor;
        line-height: 40px;
        margin-bottom: 35px;
      }

      .goods-num {
        @extend %displayFlex;

        span {
          color: $redColor;
          font-size: 32px;
          line-height: 45px;
          font-weight: 500;
        }

        .num-change {
          color: #494949;
          font-size: 32px;
          line-height: 45px;
        }
      }
    }
  }

  .address {
    padding: 24px 30px;

    .displayFlex {
      @extend %flexV;
      font-size: 28px;
      line-height: 40px;
      color: $depthTextColor;

      .name {
        line-height: 45px;
        font-size: 32px;
        font-weight: bold;
      }

      .edit-btn {
        @include simpleButton(64px, 128px)
      }
    }

    .add-address {
      text-align: center;
      color: $depthTextColor;
      font-size: 32px;
    }
  }

  .remark {
    padding: 24px 30px;

    label {
      color: $lightTextColor;
      font-size: 32px;
    }

    input {
      padding-left: 24px;
      border: none;
      outline: none;
      color: $depthTextColor;
      font-size: 32px;

      &::-webkit-input-placeholder {
        color: $lightTextColor;
        font-size: 32px;
      }
    }
  }
</style>
