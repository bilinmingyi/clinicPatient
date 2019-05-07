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
          <div class="displayFlex mb-8px">
            <div class="flexOne">
              <p class="name mb-8px">收件人：{{addressee.concact}}</p>
              <P>电话：{{addressee.phoneNum}}</P>
            </div>
            <div>
              <button class="edit-btn">编辑</button>
            </div>
          </div>
          <div class="flex">
            <span>收货地址：</span>
            <span class="flexOne">{{addressee.address}}</span>
          </div>
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
import {fetchShopCar, checkEnable, createOrder, removeShop, gotoPay} from '@/fetch/api'
import noImg from '@/assets/img/nophoto.png'

export default {
  name: 'orderSure',
  props: ['ids'],
  data () {
    return {
      shopCarList: [],
      noImg: noImg,
      memo: '',
      needCheck: 0,
      textList: ['', '提交审核', '去支付'],
      addressee: {
        concact: '王尼玛',
        phoneNum: '15888654678',
        address: '广东(省)广州(市)天河(区/县)珠江新城花城汇XXX街道幸福小区'
      }
    }
  },
  components: {
    Header,
    ShopFooter,
    SmallTitle
  },
  computed: {
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
  created () {
    this.getShopCar()
    this.checkEnabled()
  },
  methods: {
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
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('获取购物车列表失败!')
      })
    },
    checkEnabled () {
      checkEnable({}).then(
        res => {
          if (res.code === 1000) {
            if (res.data) {
              this.needCheck = 1
            } else {
              this.needCheck = 2
            }
          } else {
            this.$Message.infor(res.msg)
          }
        }
      ).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错!')
      })
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
            this.$router.push({name: 'mallListPage'})
          } else if (this.needCheck === 2) {
            // 不需要提交审核，直接去支付
            let urlRes = await gotoPay({
              order_type: 8,
              order_seqno: res.data
            })
            if (urlRes.code === 1000) {
              try {
                window.location.href = urlRes.data
              } catch (e) {
                console.log(e)
              }
            } else {
              this.$Message.infor(urlRes.msg)
            }
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.$Message.infor(res.msg)
      }
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
    }
  }
</style>
