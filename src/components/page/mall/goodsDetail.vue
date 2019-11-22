<template>
  <div>
    <Header titleText="商品详情" :canReturn="canReturn"></Header>
    <div class="mt-88px mb-131px detail-content">
      <div class="img-content">
        <img :src="GoodDetail.img==''?noImg:GoodDetail.img" @error="imgError($event)">
      </div>
      <hr class="full-screen-hr">
      <div class="goods-info">
        <div class="price mb-8px">
          ￥{{GoodDetail.price}}
        </div>
        <div class="good-title">
          <span>{{GoodDetail.name}}</span>
          <span>{{GoodDetail.spec}}</span>
          <span>{{GoodDetail.vender}}</span>
        </div>
      </div>
      <hr class="full-screen-hr">
      <Small-title :hasBlock="true">
        <span class="ml-16px">商品简介</span>
      </Small-title>
      <div class="intro-content aritcle-content" v-html="GoodDetail.page_content"></div>
    </div>
    <Shop-footer btnText="加入购物车" :allPrice="shopCarMoney" :hasCar="true" :carNum='shopCarNum'
                 @click="addCar"></Shop-footer>
  </div>
</template>

<script>
import {Header, SmallTitle, ShopFooter} from '@/components/common/index'
import noImg from '@/assets/img/nophoto.png'
import {fetchGoodsDetail, addShopCar, fetchShopCar} from '@/fetch/api'
import {mapState, mapActions} from 'vuex'
import getWXSign from '@/assets/js/wx.js'

export default {
  name: 'goodsDetail',
  components: {
    Header,
    SmallTitle,
    ShopFooter
  },
  props: ['id'],
  data () {
    return {
      noImg: noImg,
      GoodDetail: {},
      canReturn: true
    }
  },
  computed: {
    ...mapState({
      shopCarNum: state => state.shopCarNum,
      shopCarMoney: state => state.shopCarMoney,
      clinic: state => state.clinic
    })
  },
  created () {
    this.getGoodsDetail()
    this.getShopCar()
    if (this.$route.query.noReturn > 0) {
      this.canReturn = false
    }
  },
  methods: {
    ...mapActions(['set_shop_num', 'set_shop_money']),
    addCar () {
      addShopCar({
        goods_id: this.id,
        clinic_id: this.GoodDetail.clinic_id
      }).then(res => {
        if (res.code === 1000) {
          this.$Message.infor('加入购物车成功')
          this.getShopCar()
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    getGoodsDetail () {
      fetchGoodsDetail({
        id: this.id,
        is_channel: this.$route.query.isChannel ? Number(this.$route.query.isChannel) : 0
      }).then(res => {
        if (res.code === 1000) {
          this.GoodDetail = res.data
          try {
            getWXSign.apply(this).then(({wx, appId}) => {
              wx.updateAppMessageShareData({
                title: res.data.name, // 分享标题
                desc: res.data.spec, // 分享描述
                link: window.location.origin + window.location.pathname + '?path=' + window.location.href.split('#')[1] + '&clinicId=' + this.clinic.id + '&appid=' + appId,
                imgUrl: res.data.img, // 分享图标
                success: function () {
                  // 设置成功
                }
              })
              wx.updateTimelineShareData({
                title: res.data.name, // 分享标题
                link: window.location.origin + window.location.pathname + '?path=' + window.location.href.split('#')[1] + '&clinicId=' + this.clinic.id + '&appid=' + appId,
                imgUrl: res.data.img, // 分享图标
                success: function () {
                  // 设置成功
                }
              })
            })
          } catch (e) {
            console.log(e)
          }
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$Message.infor('网络出错！')
      })
    },
    getShopCar () {
      fetchShopCar().then(res => {
        let allPrice = 0
        res.data.forEach(item => {
          allPrice += Number(item.num * item.goods_info.price)
        })
        this.set_shop_money(allPrice.toFixed(2))
        this.set_shop_num(Number(res.data.length))
      }).catch(e => {
        console.log(e)
        this.$Message.infor('网络出错！')
      })
    },
    imgError (event) {
      event.target.src = this.noImg
    }
  }
}
</script>

<style lang="scss" scoped>
  .detail-content {
    background: $backColor;

    .img-content {
      @extend %flexVC;
      padding: 8px 0;

      img {
        width: 543px;
        height: 543px;
      }
    }

    .goods-info {
      padding: 24px 30px;

      .price {
        color: $redColor;
        font-size: 40px;
        line-height: 56px;
        font-weight: 500;
      }

      .good-title {
        color: $depthTextColor;
        font-size: 32px;
        line-height: 45px;
      }
    }

    .intro-content {
      padding: 24px 30px;
    }
  }
</style>
