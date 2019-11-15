<template>
  <div>
    <Header titleText="我的报名" :canReturn="true"></Header>
    <div class="mt-88px">
      <div class="dynamic-item" @click="goRouter(item)" v-for="item in dataList" :key="item.id">
        <div class="dynamic-item-left">
          <img :src="item.img_url ? item.img_url : noImg">
        </div>
        <div class="dynamic-item-right">
          <div class="title">{{item.title}}</div>
          <div class="title-middle">时间：{{item.train_time|dateFormat('yyyy-MM-dd hh:mm')}}</div>
          <div class="title-bottom">
            <div class="title-time">讲师：{{item.teacher}}</div>
            <div class="title-time">
              报名费：<span class="color-red" v-if="item.price == 0">免费</span><span class="color-red" v-else>{{item.price|priceFormat}}</span>
            </div>
          </div>
        </div>
      </div>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
    </div>
  </div>
</template>

<script>
import {Header, Loading, LoadMore} from '../../common'
import defaultPhoto from '@/assets/img/nophoto.png'
import {fetchTrainOrderList} from '@/fetch/api.js'

export default {
  name: 'registrationListPage',
  components: {
    Header,
    Loading,
    LoadMore
  },
  data () {
    return {
      noImg: defaultPhoto,
      canShowAdd: false,
      page: 1,
      pageSize: 10,
      dataList: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    addMore () {
      this.page++
      this.getData()
    },
    goRouter (order) {
      this.$router.push({name: 'registrationOrderDetail', query: {order: order.order_seqno, article: order.article_id}})
    },
    getData () {
      fetchTrainOrderList({
        'page': this.page,
        'pageSize': this.pageSize
      }).then(res => {
        if (res.code === 1000) {
          res.data.forEach(item => {
            this.dataList.push(item)
          })
          if (res.data.length >= this.pageSize) {
            this.canShowAdd = true
          } else {
            this.canShowAdd = false
          }
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

<style scoped lang="scss">
  .dynamic-item {
    padding: 28px 30px;
    background: #ffffff;
    @extend %displayFlex;

    .dynamic-item-left {
      width: 240px;
      height: 164px;
      border-radius: 4px;
      @extend %flexVC;

      img {
        max-width: 240px;
        max-height: 164px;
        border-radius: 4px;
      }
    }
  }

  .dynamic-item-right {
    margin-left: 24px;
    font-size: 28px;
    line-height: 40px;
    flex: 1;
    color: $lightTextColor;

    .title {
      color: $depthTextColor;
      font-weight: bold;
      font-size: 30px;
      line-height: 42px;
      margin-bottom: 10px;
    }

    .title-middle {
      margin-bottom: 10px;
    }

    .title-bottom {
      @extend %displayFlex;
      justify-content: space-between;
    }
  }
</style>
