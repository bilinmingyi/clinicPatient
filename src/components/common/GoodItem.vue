<template>
  <div class="good-item" @click.stop="goRoute(1)">
    <div class="item-top">
      <img :src="goods.img==''?noImg:goods.img" @error="imgError($event)">
    </div>
    <div class="item-bottom">
      <div class="item-title">{{goods.name}}</div>
      <div class="item-price">
        <div class="flexOne">￥{{goods.price}}</div>
        <img @click.stop="goRoute(2)" src="../../assets/img/gwc@2x.png">
      </div>
    </div>
  </div>
</template>

<script>
import noImg from '../../assets/img/nophoto.png'
import {addShopCar} from '@/fetch/api'

export default {
  name: 'GoodItem',
  props: {
    goods: {
      type: Object,
      default () {
        return {
          form: '',
          id: -1,
          img: '',
          name: '',
          price: 0,
          spec: ''
        }
      }
    }
  },
  data () {
    return {
      noImg: noImg
    }
  },
  methods: {
    goRoute (type) {
      switch (type) {
        case 1:
          this.$router.push({path: `/mall/goodsDetail/${this.goods.id}`})
          break
        case 2:
          this.addShopCar()
          break
      }
    },
    addShopCar () {
      addShopCar({
        goods_id: this.goods.id
      }).then(res => {
        if (res.code === 1000) {
          this.$emit('add-car')
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
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
  .good-item {
    background: $backColor;
    margin-bottom: 16px;
    width: calc(50vw - 5px);

    .item-top {
      padding: 21px;
      @extend %flexVC;

      img {
        width: 314px;
        height: 314px;
      }
    }

    .item-bottom {
      padding: 6px 30px 20px;

      .item-title {
        color: $middleTextColor;
        font-size: 28px;
        line-height: 40px;
        height: 40px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .item-price {
        color: $redColor;
        line-height: 50px;
        font-size: 36px;
        margin-top: 12px;
        @extend %flexV;

        img {
          height: 48px;
          width: 48px;
          margin-left: 60px;
        }
      }
    }
  }
</style>
