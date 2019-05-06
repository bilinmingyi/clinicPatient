<template>
  <div>
    <Header titleText="购物车" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <div class="clinic-content">
        <Small-title @click.native="selectALL">
          <div :class="['select-radio',{'border-yuan':!resource}]">
            <img v-show="resource" src="../../../assets/img/xuanze@2x.png">
          </div>
          <span class="ml-20px">诊所药房</span>
        </Small-title>
        <div v-for="(item, index) in shopCarList" :key="item.id">
          <div :class="['goods-item',{'ban_back':!item.goods_info.id}]">
            <div>
              <div :class="['select-radio', {'border-yuan':item.is_check === 0}]" @click.stop="selectItem(index)">
                <img v-show="item.is_check === 1" src="../../../assets/img/xuanze@2x.png">
              </div>
            </div>
            <div class="goods-item-middle">
              <img :src="item.goods_info.img?item.goods_info.img:noImg" @error="imgError($event)">
            </div>
            <div class="goods-item-right">
              <div class="goods-info">
                <span>{{item.goods_info.name}}</span>
                <span>{{item.goods_info.vender}}</span>
                <span>{{item.goods_info.spec}}</span>
              </div>
              <div class="goods-num">
              <span class="flexOne">
                ￥{{item.goods_info.price}}
              </span>
                <div class="num-change">
                  <div class="num-cut" @click.stop="changeNum(1, index)"></div>
                  <input class="num-word" v-model="item.num">
                  <div class="num-add" @click.stop="changeNum(2, index)"></div>
                </div>
              </div>
            </div>
          </div>
          <hr v-if="index !== shopCarList.length-1" class="full-screen-hr">
        </div>
      </div>

    </div>
    <Shop-footer btnText="去结算" :allPrice="allPrice" @click="toCount"></Shop-footer>
  </div>
</template>

<script>
import {Header, ShopFooter, SmallTitle} from '../../common'
import {fetchShopCar, changeShopNum} from '@/fetch/api'
import noImg from '@/assets/img/nophoto.png'

export default {
  name: 'ShopCar',
  components: {
    Header,
    ShopFooter,
    SmallTitle
  },
  data () {
    return {
      resource: false,
      shopCarList: [],
      noImg: noImg
    }
  },
  created () {
    this.getShopCar()
  },
  computed: {
    allPrice () {
      if (this.shopCarList.length === 0) {
        return 0
      } else {
        let all = 0
        this.shopCarList.forEach(item => {
          if (item.goods_info.id !== undefined && item.goods_info.id !== null && item.is_check) {
            all += Number(item.num * item.goods_info.price)
          }
        })
        return all
      }
    }
  },
  // watch: {
  //   shopCarList: {
  //     deep: true,
  //     handler: (newVal, oldVal) => {
  //     }
  //   }
  // },
  methods: {
    toCount () {
      this.$router.push({path: '/mall/sureOrder'})
    },
    selectALL () {
      this.resource = !this.resource
      if (this.resource) {
        this.shopCarList.forEach(item => {
          item.goods_info.id ? item.is_check = 1 : item.is_check = 0
        })
      } else {
        this.shopCarList.forEach(item => {
          item.is_check = 0
        })
      }
    },
    getShopCar () {
      fetchShopCar({}).then(res => {
        console.log(res)
        if (res.code === 1000) {
          res.data.forEach(item => {
            let curItem = Object.assign(item, {is_check: 0})
            this.shopCarList.push(curItem)
          })
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('获取购物车列表失败!')
      })
    },
    imgError (event) {
      event.target.src = this.noImg
    },
    selectItem (index) {
      let checkItem = this.shopCarList[index]
      if (!checkItem.goods_info.id) {
        this.$Message.infor('该药品已下架，请删除！')
        return
      }
      checkItem.is_check ? checkItem.is_check = 0 : checkItem.is_check = 1
    },
    changeNum (type, index) {
      let currItem = this.shopCarList[index]
      if (!currItem.goods_info.id) {
        return
      }
      let oldNum = currItem.num
      if (type === 1) {
        currItem.num > 0 ? currItem.num-- : currItem.num = 0
      } else if (type === 2) {
        currItem.num++
      }
      if (oldNum !== currItem.num) {
        this.saveChange(index)
      }
    },
    saveChange (index) {
      let currItem = this.shopCarList[index]
      changeShopNum({
        id: currItem.id,
        num: currItem.num
      }).then(res => {
        if (res.code === 1000) {
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-content {
    background: $backColor;
  }

  .select-radio {
    width: 40px;
    height: 40px;
    border-radius: 50%;

    img {
      width: 40px;
      height: 40px;
    }
  }

  .border-yuan {
    border: 1px solid $lightTextColor;
  }

  .ban_back {
    background: #f7f7f7;
  }

  .goods-item {
    @extend %flexV;
    padding: 32px 30px;

    .goods-item-middle {
      margin-left: 20px;
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
          @extend %flexV;

          .num-cut {
            width: 44px;
            height: 44px;
            background-image: url("../../../assets/img/jianshao@2x.png");
            background-size: 100% 100%;
          }

          .num-word {
            border: none;
            outline: none;
            width: 80px;
            color: $depthTextColor;
            text-align: center;
            line-height: 45px;
            font-size: 32px;
            background: transparent;
          }

          .num-add {
            width: 44px;
            height: 44px;
            background-image: url("../../../assets/img/zengjia@2x.png");
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
