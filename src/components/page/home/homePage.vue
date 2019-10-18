<template>
  <div>
    <!--    <Header titleText="首页"></Header>-->
    <div class="pb-128px">
      <section class="clinic-infor">
        <img class="clinic-img" :src="clinic.logo == ''?no_img:clinic.logo"/>
        <div class="clinic-NP" style="display: flex;flex-direction: column;justify-content: space-around;">
          <p class="clinic-name">{{clinic.name}}</p>
          <div class="clinic-position">
            <img src="../../../assets/img/dingwei@2x.png">
            <span>{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}</span>
          </div>
        </div>
        <div class="flexV">
          <button class="del-btn" @click.stop="goRoute(3)">更多机构</button>
        </div>
      </section>
      <section class="clinic-contact mb-20px">
        <a class="contact-item right-line" :href="'tel:'+clinic.customerPhone">
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
      </section>

      <section class="clinic-dynamic">
        <Small-title>平台动态</Small-title>
        <Dynamic v-for="article in articleList" :dyItem="article" :key="article.id"
                 @click.native="goRoute(2, article.id)"></Dynamic>
        <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
      </section>
    </div>
    <Footer navtiveIndex="1"></Footer>
  </div>
</template>

<script>
import {Footer, Header, SmallTitle, orderItem, Dynamic, LoadMore} from '@/components/common/index'
import {getArticleList, unread} from '@/fetch/api.js'
import clinicImg from '../../../assets/img/menzhen@2x.png'
import {mapState} from 'vuex'

export default {
  name: 'homePage',
  components: {
    Footer,
    Header,
    SmallTitle,
    Dynamic,
    LoadMore,
    orderItem
  },
  data () {
    return {
      page: 1,
      pageSize: 5,
      articleList: [],
      canShowAdd: false,
      no_img: clinicImg,
      unReadCount: 0,
      dataInterval: '',
      orderList: []
    }
  },
  created () {
    this.getList()
    // this.getUnread()
    // this.dataInterval = setInterval(() => {
    //   this.getUnread()
    // }, 5000)
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
    async getList () {
      try {
        let res = await getArticleList({
          page: this.page,
          page_size: this.pageSize
        })

        if (res.code === 1000) {
          this.articleList = this.articleList.concat(res.data)
          if (res.data.length >= this.pageSize) {
            this.canShowAdd = true
          } else {
            this.canShowAdd = false
          }
        } else {
          this.$Message.infor(res.msg)
        }
      } catch (e) {
        this.$Message.infor('网络出错！')
      }
    },
    addMore () {
      this.page++
      this.getList()
    },
    goRoute (type, params) {
      switch (type) {
        case 1:
          this.$router.push({name: 'chatRoom'})
          break
        case 2:
          this.$router.push({name: 'articleDetail', params: {id: params}})
          break
        case 3:
          this.$router.push({name: 'clinicSelect', query: {type: 1}})
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
    }
  }
}
</script>

<style lang="scss" scoped>
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
    @extend %displayFlex;

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
    }
  }

  .clinic-contact {
    @extend %displayFlex;
    background: $backColor;
    font-size: 32px;
    line-height: 45px;

    .right-line {
      border-right: 1px solid $lineColor;
    }

    .contact-item {
      flex: 1;
      height: 148px;
      @extend %displayFlex;
      justify-content: center;
      align-items: center;
      color: $depthTextColor;

      img {
        width: 64px;
        height: 64px;
        margin-right: 20px;
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
    @include simpleButton(64px, 148px);
  }

</style>
