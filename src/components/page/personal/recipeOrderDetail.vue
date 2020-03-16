<template>
  <div>
    <Header :canReturn="true" titleText="订单详情"></Header>
    <div class="mt-88px mb-131px">
      <div class="content-back">
        <Small-title :hasBlock="true">
          <span class="ml-16px flexOne">订单信息</span>
          <span class="label-red">{{orderDetail.status|treatOrderStatus}}</span>
        </Small-title>
        <div class="register-item">
          <div class="mb-8px">
            <span class="label-three">下单时间：</span>
            <span class="label-two" v-if="orderDetail.create_time">{{orderDetail.create_time|dateFormat('yyyy-MM-dd hh:mm')}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">客户信息：</span>
            <span class="label-two"
              v-if="orderDetail.patient_name">{{orderDetail.patient_name}}/{{orderDetail.patient_sex|sexFormat}}/{{orderDetail.patient_age}}岁</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">客户主诉：</span>
            <span class="label-two">{{orderDetail.chief_complaint}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">{{(clinic.serviceType == 6 ? '营养师' : '专家')}}姓名：</span>
            <span class="label-two">{{orderDetail.doctor_name}}</span>
          </div>
          <div class="mb-8px">
            <span class="label-three">{{(clinic.serviceType == 6 ? '营养师' : '专家')}}备注：</span>
            <span class="label-two">{{orderDetail.memo}}</span>
          </div>
        </div>
      </div>
      <div class="content-back">
        <Small-title :hasBlock="true">
          <span class="ml-16px flexOne">处方信息</span>
        </Small-title>
        <div class="register-item">
          <table class="d-table" data-type='1'>
            <thead>
              <tr>
                <th>
                  <div>序号</div>
                </th>
                <th>
                  <div>处方类型</div>
                </th>
                <th>
                  <div>金额</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) in orderDetail.recipe_list" :key="item.recipe_id">
                <td>{{index+1}}</td>
                <td>{{item.recipe_type|recipeType(item.category)}}</td>
                <td class="label-red" style="color: #eb6262">{{item.price|priceFormat}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="content-back">
        <div class="line-item">
          <label class="label-span mr-32px flexOne">订单总价</label>
          <span class="label-red">￥{{orderDetail.amount_receivable}}</span>
        </div>
        <hr class="line-hr">
        <div class="line-item">
          <label class="label-span mr-32px flexOne">支付方式</label>
          <span class="label-span">{{orderDetail.pay_type|payTypeFormat}}</span>
        </div>
      </div>
    </div>
    <div class="add-block" v-if="orderDetail.status === 'UNPAID'  && orderDetail.amount_receipts === 0">
      <button class="weixin-pay-btn" @click.stop="nextDone">微信支付</button>
      <!--      <button class="del-btn" @click.stop="memberPay">会员卡支付</button>-->
    </div>
    <div class="add-block" v-else>
      <button class="add-btn" @click.stop="nextDone">关闭</button>
    </div>
    <Loading v-if="showLoad"></Loading>
  </div>
</template>

<script>
import { Header, SmallTitle, Loading } from '../../common'
import { fecthRecipeDetail, gotoPay } from '@/fetch/api.js'
import { mapState } from 'vuex'

export default {
  name: 'recipeOrderDetail',
  props: ['orderSeqno'],
  data () {
    return {
      orderDetail: {},
      showLoad: false
    }
  },
  components: {
    Header,
    SmallTitle,
    Loading
  },
  computed: {
    ...mapState({
      clinic: state => state.clinic
    })
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      this.showLoad = true
      fecthRecipeDetail({
        order_seqno: this.orderSeqno,
        need_recipes: 1
      }).then(res => {
        this.showLoad = false
        if (res.code === 1000) {
          this.orderDetail = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        this.showLoad = false
        this.$Message.infor('网络出错！')
        console.log(error)
      })
    },
    nextDone () {
      if (this.orderDetail.status === 'UNPAID' && this.orderDetail.amount_receipts === 0) {
        if (this.clinic.szjkPayEnabled === 1) {
          gotoPay({
            'order_type': 2,
            'order_seqno': this.orderSeqno
          }).then(res => {
            if (res.code === 1000) {
              try {
                window.location.href = res.data
              } catch (error) {
                console.log(error)
                this.$Message.infor('支付跳转失败')
              }
            } else {
              this.$Message.infor(res.msg)
            }
          }).catch(error => {
            console.log(error)
            this.$Message.infor('网络出错！')
          })
        } else {
          this.$Message.infor('该机构未开通线上支付功能！')
        }
      } else {
        this.$router.go(-1)
      }
    },
    memberPay () {
      this.$router.push({ name: 'membershipPay', query: { orderType: 2, orderSeqno: this.orderSeqno, price: this.orderDetail.amount_receivable } })
    }
  }
}
</script>

<style lang="scss" scoped>
.content-back {
  background: $backColor;
  margin-bottom: 20px;
}

.register-item {
  padding: 20px 30px;
}

.label-one {
  font-size: 28px;
  color: $lightTextColor;
  line-height: 45px;
}

.label-two {
  font-size: 30px;
  color: $depthTextColor;
  line-height: 42px;
}

.label-three {
  font-size: 30px;
  color: $lightTextColor;
  line-height: 42px;
}

.label-red {
  color: #eb6262;
  font-size: 30px;
  line-height: 42px;
  font-weight: bold;
}

.line-item {
  padding: 26px 30px;
  @extend %displayFlex;
}

.line-hr {
  @extend %lineHr;
}

.label-span {
  color: $depthTextColor;
  line-height: 45px;
  font-size: 32px;
}

.patient-infor {
  padding: 0 30px;
}

.add-block {
  @include psFixed(bottom, 112px);
  @extend %displayFlex;
  background: $backColor;
  padding: 16px 30px 15px;
  width: 100%;
  border-top: 1px solid $lineColor;
}

.add-btn {
  @include deepButton(80px, 100%);
}

.del-btn {
  @include deepButton(80px, 48%);
  margin-left: 4%;
}

.sure-btn {
  @include simpleButton(80px, 48%);
}

.weixin-pay-btn {
  width: 100%;
  height: 80px;
  background: #4dbc89;
  border-radius: 8px;
  color: #ffffff;
  border: 1px solid #4dbc89;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
}
</style>
