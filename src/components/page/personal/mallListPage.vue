<template>
  <div>
    <Header titleText="商城订单" :canReturn="true" backUrl="/personal"></Header>
    <div class="mt-88px">
      <div class="orderList">
        <order-item v-for="(item, index) in dataList" :itemData="item" :isMall="true" :noLine="index === dataList.length - 1" :key="item.id" @click.native="goRoute(item.order_seqno)" :isShowName="false"></order-item>
      </div>
      <div class="no-address-back" v-if="dataList.length === 0 && !isFirst">
        <div>
          暂无商场订单
        </div>
      </div>
      <Load-more @click.stop.native="addMore" v-if="page < Math.ceil(totalNum/pageSize)"></Load-more>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {Header, orderItem, LoadMore, Loading} from '../../common'
import {fetchGoodList} from '@/fetch/api'
import {mapState} from 'vuex'

export default {
  name: 'mallListPage',
  components: {
    Header,
    orderItem,
    LoadMore,
    Loading
  },
  data () {
    return {
      canShowAdd: false,
      page: 1,
      pageSize: 10,
      dataList: [],
      totalNum: 0,
      showLoad: true,
      isFirst: true
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  mounted () {
    setTimeout(() => {
      this.getData()
    }, 500)
  },
  methods: {
    getData () {
      if (this.userInfoState.mobile) {
        this.getGoodList()
      } else {
        this.showLoad = false
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({name: 'editPerson'})
        })
      }
    },
    goRoute (orderSeqno) {
      this.$router.push({name: 'mallOrderDetail', query: {orderSeqno: orderSeqno}})
    },
    getGoodList () {
      fetchGoodList({
        page: this.page,
        page_size: this.pageSize
      }).then(res => {
        this.showLoad = false
        this.isFirst = false
        if (res.code === 1000) {
          this.dataList = this.dataList.concat(res.data)
          this.totalNum = res.total_num
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    addMore () {
      this.page++
      this.getGoodList()
    }
  }
}
</script>

<style lang="scss" scoped>
  .orderList {
    background: $backColor;
  }
  .no-address-back {
    height: calc(100vh - 419px);
    background: url("../../../assets/img/noGood.png") no-repeat center center;
    background-size: 60%;
    color: $lightTextColor;
    font-size: 32px;
    @extend %flexVC;

    div {
      -webkit-transform: translateY(13vh);
      -moz-transform: translateY(13vh);
      -ms-transform: translateY(13vh);
      -o-transform: translateY(13vh);
      transform: translateY(13vh);
    }
  }
</style>
