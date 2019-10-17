<template>
  <div>
    <Header :canReturn="true" titleText="处方订单" backUrl="/personal"></Header>
    <div class="mt-88px">
      <div class="orderList">
        <order-item v-for="(item,index) in dataList" :itemData="item" :key="item.id"
                    :noLine="(dataList.length - 1) === index" @click.stop.native="goRoute(item)"></order-item>
      </div>
      <div class="no-address-back" v-if="dataList.length === 0 && !isFirst">
        <div>
          暂无处方订单
        </div>
      </div>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import {Header, orderItem, LoadMore, Loading} from '../../common'
import {fetchRecipeList} from '@/fetch/api.js'
import {mapState} from 'vuex'

export default {
  name: 'recipeListPage',
  components: {
    Header,
    orderItem,
    LoadMore,
    Loading
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic,
      userInfoState: state => state.userInfoState
    })
  },
  data () {
    return {
      status: ['UNPAID', 'DISPENSING', 'DONE', 'CANCEL'],
      page: 1,
      pageSize: 10,
      dataList: [],
      canShowAdd: false,
      showLoad: true,
      isFirst: true
    }
  },
  mounted () {
    setTimeout(() => {
      this.getData()
    }, 500)
  },
  methods: {
    getData () {
      if (this.userInfoState.mobile) {
        this.getList()
      } else {
        this.showLoad = false
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({name: 'editPerson'})
        })
      }
    },
    getList () {
      fetchRecipeList({
        'page': this.page,
        'page_size': this.pageSize,
        'status': this.status
      }).then(res => {
        this.showLoad = false
        this.isFirst = false
        if (res.code === 1000) {
          if (res.data.length < this.pageSize) {
            this.canShowAdd = false
          } else {
            this.canShowAdd = true
          }
          this.dataList = this.dataList.concat(res.data)
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
      this.getList()
    },
    goRoute (item) {
      this.$router.push({name: 'recipeOrderDetail', query: {orderSeqno: item.order_seqno}})
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
