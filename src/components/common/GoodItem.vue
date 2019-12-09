<template>
  <div class="good-item" @click.stop="goRoute(1)" ref="imgItem">
    <div class="item-top-all">
      <div class="item-top">
        <img :src="currImg==''?noImg:currImg" @error="imgError($event)">
      </div>
    </div>

    <div class="item-bottom">
      <div class="item-title">{{goods.name}}</div>
      <div class="item-price">
        <div class="flexOne">￥{{goods.price}}</div>
        <div class="item-car">
          <div :class="['add-success', {'change-top': addSuccess}]">+1</div>
          <img @click.stop="goRoute(2)" src="../../assets/img/gwc.png">
        </div>
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
    scrollTop: {
      type: Number,
      default: 0
    },
    clientHeight: {
      type: Number,
      default: 0
    },
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
      noImg: noImg,
      addSuccess: false,
      currImg: '',
      offsetTop: 0
    }
  },
  mounted () {
    this.offsetTop = this.$refs.imgItem.offsetTop
  },
  watch: {
    scrollTop: {
      handler: function (newVal, oldVal) {
        if (this.currImg === '' && this.goods.img !== '') {
          if (this.clientHeight + newVal >= this.offsetTop - 220) {
            this.currImg = this.goods.img
          }
        }
      }
    },
    offsetTop: {
      handler: function (newVal) {
        if (this.currImg === '' && this.goods.img !== '') {
          if (this.clientHeight + this.scrollTop >= newVal - 220) {
            this.currImg = this.goods.img
          }
        }
      }
    }
  },
  methods: {
    goRoute (type) {
      switch (type) {
        case 1:
          this.$router.push({path: `/mall/goodsDetail/${this.goods.id}?noReturn=0`})
          break
        case 2:
          this.addShopCar()
          break
      }
    },
    addShopCar () {
      addShopCar({
        goods_id: this.goods.id,
        clinic_id: this.goods.clinic_id
      }).then(res => {
        if (res.code === 1000) {
          this.addSuccess = true
          setTimeout(() => {
            this.addSuccess = false
          }, 1000)
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
    margin-bottom: 10px;
    width: calc(50vw - 5px);

    .item-top-all {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 21px;
    }

    .item-top {
      @extend %flexVC;
      justify-content: center;
      width: 314px;
      height: 314px;

      img {
        max-width: 314px;
        max-height: 314px;
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
      }

      .item-car {
        position: relative;

        img {
          height: 48px;
          width: 48px;
          position: absolute;
          top: -25px;
          right: 0;
        }

        .add-success {
          position: absolute;
          top: -25px;
          right: 0;
          opacity: 1;
        }

        .change-top {
          transition: all 1s;
          top: -100px;
          opacity: 0;
        }
      }
    }
  }
</style>
