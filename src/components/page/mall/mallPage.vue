<template>
  <div ref="scrollContent" @scroll="scrollEvent" class="scoll-block">
    <Header titleText="诊所商城"></Header>
    <div class="mt-88px pb-128px">
      <Search placeholder="请输入药品/产品名称" :hasBtn="false" @on-search="searchByName"></Search>
      <div class="white-back">
        <SmallTitle>
          <div class="flexOne recommend-title">
            <img src="../../../assets/img/tj@2x.png">
            <span class="recommend-title-text">诊所推荐</span>
          </div>
        </SmallTitle>
      </div>
      <div class="good-list">
        <GoodItem :goods="goods" v-for="(goods, index) in goodsList" :key="goods.id"
                  :class="{'mr-10px':index%2===0}" @add-car="getShopCar"></GoodItem>
      </div>
      <Add-load v-if="showLoad"></Add-load>
    </div>
    <Shop-car :num="Number(shopCar.length)"></Shop-car>
    <Footer navtiveIndex="3"></Footer>
  </div>
</template>

<script>
import {Footer, Header, Search, SmallTitle, GoodItem, AddLoad, ShopCar} from '@/components/common/index'
import {fetchGoodsList, fetchShopCar} from '@/fetch/api'
import {mapActions} from 'vuex'

var canRun = true
var throttle = (fn) => {
  return () => {
    if (canRun) {
      canRun = false
      setTimeout(() => {
        fn.apply(this, arguments)
        canRun = true
      }, 500)
    }
  }
}

export default {
  name: 'mallPage',
  components: {
    Footer,
    Header,
    Search,
    SmallTitle,
    GoodItem,
    AddLoad,
    ShopCar
  },
  data () {
    return {
      showLoad: false,
      query: '',
      page: 1,
      pageSize: 10,
      totalNum: 0,
      goodsList: [],
      shopCar: []
    }
  },
  created () {
    this.getShopCar()
    this.getGoodsList()
  },
  methods: {
    ...mapActions(['set_shop_num', 'set_shop_money']),
    scrollEvent () {
      throttle(() => {
        let scrollItem = this.$refs.scrollContent
        if (scrollItem.scrollTop + scrollItem.clientHeight >= scrollItem.scrollHeight - 120) {
          if (this.page < Math.ceil(this.totalNum / this.pageSize)) {
            this.page++
            this.showLoad = true
            this.getGoodsList()
          }
        }
      })()
    },
    searchByName (str) {
      this.query = str
      this.page = 1
      this.goodsList = []
      this.getGoodsList()
    },
    getGoodsList () {
      fetchGoodsList({
        name: this.query,
        page: this.page,
        page_size: this.pageSize,
        status: 1
      }).then(res => {
        this.showLoad = false
        if (res.code === 1000) {
          this.goodsList = this.goodsList.concat(res.data)
          this.totalNum = res.total_num
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错!')
      })
    },
    getShopCar () {
      fetchShopCar().then(res => {
        let allPrice = 0
        this.shopCar = res.data
        this.shopCar.forEach(item => {
          allPrice += Number(item.num * item.goods_info.price)
        })
        this.set_shop_money(allPrice)
        this.set_shop_num(Number(this.shopCar.length))
      }).catch(e => {
        console.log(e)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .scoll-block {
    height: 100vh;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }
  .white-back {
    background: $bgWhite;
  }

  .recommend-title {
    @extend %flexVC;

    img {
      width: 48px;
      height: 48px;
      margin-right: 8px;
    }

    &-text {
      color: $middleTextColor;
      font-size: 32px;
      font-weight: bold;
    }
  }

  .good-list {
    @extend %displayFlex;
    flex-wrap: wrap;
  }
</style>
