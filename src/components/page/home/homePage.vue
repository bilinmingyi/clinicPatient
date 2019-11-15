<template>
  <div ref="scrollContent" @scroll="scrollEvent" class="scoll-block">
    <div class="pb-128px">
      <section class="clinic-infor" :style="{'border-bottom': channelId > 0 ? '1px solid #d9d9d9' : 'none'}">
        <img class="clinic-img" :src="clinic.logo == ''?no_img:clinic.logo"/>
        <div class="clinic-NP" @click="goRoute(2)"
             style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
          <p class="clinic-name">{{clinic.name}}</p>
          <div class="clinic-position">
            <img src="../../../assets/img/dingwei@2x.png">
            <span :class="channelId > 0 ? 'width-one' : 'width-two'">{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}</span>
          </div>
        </div>
        <div class="flexV" v-if="channelId > 0">
          <button class="del-btn" @click.stop="goRoute(3)">切换机构</button>
        </div>
      </section>
      <section class="clinic-contact mb-20px">
        <a :class="['contact-item', {'right-border': channelId <= 0}]" :href="'tel:'+clinic.customerPhone">
          <img src="../../../assets/img/lx.png">
          <span>客服电话</span>
        </a>
        <div class="contact-item" @click="goRoute(1)">
          <div class="messageIcon">
            <img src="../../../assets/img/ly2.png">
            <div class="no-read" v-if="unReadCount !== 0">{{unReadCount}}</div>
          </div>
          <span>咨询诊所</span>
        </div>
        <a class="contact-item" v-if="channelId > 0">
          <img src="../../../assets/img/yxx@2x.png" v-if="clinic.isGzhDefault === 1">
          <img src="../../../assets/img/xx@2x.png" v-else>
          <span>默认机构</span>
        </a>
      </section>
      <section class="clinic-dynamic mb-20px">
        <SmallTitle>
          <div>
            <img class="xiaoxi-icon" src="../../../assets/img/xiaoxi@2x.png">
          </div>
          <div class="flexOne">
            <div class="xiaoxi-title" v-if="articleList.length != 0" @click.stop="goRoute(5)">{{articleList[0].title}}
            </div>
          </div>
          <div class="next-icon" @click.stop="goRoute(5)"></div>
        </SmallTitle>
        <div class="doctor-title">
          <span class="flexOne">{{clinic.serviceType == 6 ? '营养师' : '医生'}}推荐</span>
          <div class="next-icon" @click.stop="goRoute(4)"></div>
        </div>
        <div class="doctor-block" v-if="doctorList.length != 0">
          <div v-for="doc in doctorList" :key="doc.id" class="doctor-item" @click.stop="goRoute(6, doc.id)">
            <img :src="doc.avatar != '' ? doc.avatar: (doc.sex == 2 ? woman_img: man_img)">
            <div>{{doc.name}}</div>
          </div>
          <div class="doctor-item" v-if="doctorList.length == 2 || doctorList.length == 1"></div>
          <div class="doctor-item" v-if="doctorList.length == 1"></div>
        </div>
      </section>
      <section class="mall-block" v-if="clinicGood.dataList.length > 0">
        <div class="mall-title">
          <div class="flexOne"></div>
          <button class="organ-btn" @click.stop="goRoute(7)" v-if="clinicGood.totalNum > clinicGood.pageSize">查看更多</button>
        </div>
        <div class="good-list">
          <GoodItem :goods="goods" v-for="(goods, index) in clinicGood.dataList" :key="goods.id"
                    :class="{'mr-10px':index%2===0}"
                    :isChannel="0"
                    :scrollTop="scrollTop" :clientHeight="clientHeight"></GoodItem>
        </div>
      </section>
      <section class="mall-block">
        <div class="mall-title-hot"></div>
        <div class="good-list">
          <GoodItem :goods="goods" v-for="(goods, index) in goodsList" :key="goods.id" :class="{'mr-10px':index%2===0}"
                    :scrollTop="scrollTop"
                    :isChannel="1"
                    :clientHeight="clientHeight"></GoodItem>
        </div>
      </section>
    </div>
    <Footer navtiveIndex="1"></Footer>
  </div>
</template>

<script>
import {Footer, SmallTitle, orderItem, Dynamic, GoodItem} from '@/components/common/index'
import {unread, getArticleList, getDoctorList, fetchGoodsList} from '@/fetch/api.js'
import {channelId} from '@/assets/js/mapTypes.js'
import clinicImg from '../../../assets/img/menzhen@2x.png'
import {mapState} from 'vuex'
import man from '@/assets/img/nan@2x.png'
import woman from '@/assets/img/nv@2x.png'

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
  name: 'homePage',
  components: {
    Footer,
    SmallTitle,
    Dynamic,
    GoodItem,
    orderItem
  },
  data () {
    return {
      channelId: channelId,
      no_img: clinicImg,
      unReadCount: 0,
      dataInterval: '',
      articleList: [],
      doctorList: [],
      man_img: man,
      woman_img: woman,
      page: 1,
      pageSize: 10,
      totalNum: 0,
      goodsList: [],
      showLoad: false,
      isFirst: true,
      scrollTop: 0,
      clientHeight: 0,
      clinicGood: {
        dataList: [],
        totalNum: 0,
        pageSize: 2
      }
    }
  },
  created () {
    this.getList()
    this.getDoctorList()
    this.getClinicGoodList()
    this.getGoodsList()
    this.getUnread()
    this.dataInterval = setInterval(() => {
      this.getUnread()
    }, 5000)
  },
  mounted () {
    let scrollItem = this.$refs.scrollContent
    this.scrollTop = scrollItem.scrollTop
    this.clientHeight = scrollItem.clientHeight
  },
  beforeRouteLeave (to, from, next) {
    clearInterval(this.dataInterval)
    next()
  },
  computed: {
    ...mapState({
      'clinic': state => state.clinic,
      'userInfoState': state => state.userInfoState
    })
  },
  methods: {
    goRoute (type, params) {
      switch (type) {
        case 1:
          this.$router.push({name: 'chatRoom'})
          break
        case 2:
          this.$router.push({name: 'clinicDetail'})
          break
        case 3:
          this.$router.push({name: 'clinicSelect', query: {type: 1}})
          break
        case 4:
          this.$router.push({name: 'doctorPage'})
          break
        case 5:
          this.$router.push({name: 'dynamicPage'})
          break
        case 6:
          this.$router.push({path: `/doctor/detail/${params}`})
          break
        case 7:
          this.$router.push({path: '/mall'})
      }
    },
    getUnread () {
      unread({
        session_type: 'CLINIC_PATIENT'
      }).then(res => {
        if (res.code === 1000) {
          res.data ? this.unReadCount = res.data.unread_count : this.unReadCount = 0
        } else {
          this.$Message.infor(res.msg)
        }
      })
    },
    async getList () {
      try {
        let res = await getArticleList({
          page: 1,
          page_size: 1
        })

        if (res.code === 1000) {
          this.articleList = res.data
        } else {
          this.$Message.infor(res.msg)
        }
      } catch (e) {
        this.$Message.infor('网络出错！')
      }
    },
    getDoctorList () {
      getDoctorList({
        'status': 1,
        'page': 1,
        'page_size': 3
      }).then(res => {
        this.doctorList = res.data
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    getGoodsList () {
      fetchGoodsList({
        page: this.page,
        is_channel: 1,
        page_size: this.pageSize,
        status: 1
      }).then(res => {
        this.showLoad = false
        this.isFirst = false
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
    getClinicGoodList () {
      fetchGoodsList({
        page: 1,
        page_size: this.clinicGood.pageSize,
        status: 1
      }).then(res => {
        this.showLoad = false
        this.isFirst = false
        if (res.code === 1000) {
          this.clinicGood.dataList = res.data
          this.clinicGood.totalNum = res.total_num
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错!')
      })
    },
    scrollEvent () {
      throttle(() => {
        let scrollItem = this.$refs.scrollContent
        this.scrollTop = scrollItem.scrollTop
        this.clientHeight = scrollItem.clientHeight
        if (scrollItem.scrollTop + scrollItem.clientHeight >= scrollItem.scrollHeight - 200) {
          if (this.page < Math.ceil(this.totalNum / this.pageSize)) {
            this.page++
            this.showLoad = true
            this.getGoodsList()
          }
        }
      })()
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

  .clinic-infor {
    @extend %displayFlex;
    background: $backColor;
    padding: 36px 40px;

    .clinic-img {
      width: 112px;
      height: 112px;
      border-radius: 50%;
    }
  }

  .right-border {
    border-right: 1px solid $lineColor;
  }

  .clinic-NP {
    margin-left: 20px;
    height: 112px;
  }

  .clinic-name {
    color: $depthTextColor;
    font-size: 32px;
    font-weight: bold;
  }

  .clinic-position {
    @extend %flexV;

    img {
      width: 32px;
      height: 32px;
      display: inline-block;
      align-self: center;
      margin-right: 8px;
    }

    span {
      font-size: 28px;
      line-height: 40px;
      font-weight: 400;
      color: $lightTextColor;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .width-one {
      width: calc(100vw - 435px);
    }

    .width-two {
      width: calc(100vw - 235px);
    }
  }

  .clinic-contact {
    @extend %displayFlex;
    background: $backColor;
    font-size: 32px;
    line-height: 45px;

    .contact-item {
      flex: 1;
      height: 160px;
      @extend %displayFlex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: $lightTextColor;
      font-size: 28px;

      img {
        width: 64px;
        height: 64px;
        margin-bottom: 4px;
      }
    }
  }

  .messageIcon {
    position: relative;

    .no-read {
      width: 50px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      background: $redColor;
      color: #ffffff;
      position: absolute;
      top: -16px;
      left: 32px;
      border-radius: 50%;
    }
  }

  .clinic-dynamic {
    background: $backColor;
  }

  .flexV {
    @extend %flexV;
  }

  .del-btn {
    margin-left: 34px;
    @include simpleButton(64px, 148px);
  }

  .flexOne {
    flex: 1;
    font-weight: bold;
    font-size: 36px;
  }

  .next-icon {
    background: url("../../../assets/img/xiayibu@2x.png") no-repeat;
    background-size: cover;
    width: 40px;
    height: 40%;
  }

  .xiaoxi-icon {
    width: 56px;
    height: 56px;
  }

  .xiaoxi-title {
    color: $depthTextColor;
    font-size: 30px;
    line-height: 42px;
    padding-left: 24px;
    text-overflow: ellipsis;
    width: 75vw;
    white-space: nowrap;
    overflow: hidden;
    font-weight: normal;
  }

  .doctor-title {
    @extend %flexV;
    height: 112px;
    padding: 0 30px;
  }

  .doctor-block {
    background: #ffffff;
    @extend %flexV;
    justify-content: space-around;

    .doctor-item {
      text-align: center;
      padding: 18px 0 48px;
      color: $depthTextColor;
      font-size: 30px;
      line-height: 42px;

      img {
        width: 148px;
        height: 148px;
        border-radius: 50%;
        margin-bottom: 20px;
      }
    }
  }

  .mall-block {
    .mall-title {
      background: url("../../../assets/img/rsc@2x.png");
      background-size: cover;
      @extend %flexVC;
      height: 96px;
      margin: 32px 24px 12px;
      width: calc(100vw - 48px);
      border-radius: 8px;

      .organ-btn {
        color: #FFFFFF;
        font-size: 24px;
        width: 136px;
        height: 56px;
        background: linear-gradient(270deg, rgba(96, 230, 244, 1) 0%, rgba(54, 204, 223, 1) 100%);
        border-radius: 28px;
        border: none;
        margin-right: 20px;
      }
    }

    .mall-title-hot {
      background: url("../../../assets/img/rm@2x.png");
      background-size: cover;
      @extend %flexVC;
      height: 96px;
      margin: 32px 24px 12px;
      width: calc(100vw - 48px);
      border-radius: 8px;
    }

    .good-list {
      @extend %displayFlex;
      flex-wrap: wrap;
    }
  }
</style>
