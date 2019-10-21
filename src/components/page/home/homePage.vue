<template>
  <div>

    <div class="pb-128px">
      <section class="clinic-infor">
        <img class="clinic-img" :src="clinic.logo == ''?no_img:clinic.logo"/>
        <div class="clinic-NP" @click="goRoute(2)"
             style="display: flex;flex-direction: column;justify-content: space-around;flex: 1;">
          <p class="clinic-name">{{clinic.name}}</p>
          <div class="clinic-position">
            <img src="../../../assets/img/dingwei@2x.png">
            <span>{{clinic.provinceName}}省{{clinic.cityName}}市{{clinic.countyName}}区{{clinic.address}}</span>
          </div>
        </div>
        <div class="flexV">
          <button class="del-btn" @click.stop="goRoute(3)">切换机构</button>
        </div>
      </section>
      <section class="clinic-contact mb-20px">
        <a class="contact-item" :href="'tel:'+clinic.customerPhone">
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
        <!--        <a class="contact-item">-->
        <!--          <img src="../../../assets/img/xx@2x.png">-->
        <!--          &lt;!&ndash;          <img src="../../../assets/img/yxx@2x.png">&ndash;&gt;-->
        <!--          <span>设为默认机构</span>-->
        <!--        </a>-->
      </section>
      <section class="clinic-dynamic">
        <SmallTitle>
          <div>
            <img class="xiaoxi-icon" src="../../../assets/img/xiaoxi@2x.png">
          </div>
          <div class="flexOne">
            <div class="xiaoxi-title" v-if="articleList.length != 0">{{articleList[0].title}}</div>
          </div>
          <div class="next-icon" @click.stop="goRoute(5)"></div>
        </SmallTitle>
        <SmallTitle :hasLink="false">
          <span class="flexOne">医生推荐</span>
          <div class="next-icon" @click.stop="goRoute(4)"></div>
        </SmallTitle>
        <div></div>
      </section>
    </div>
    <Footer navtiveIndex="1"></Footer>
  </div>
</template>

<script>
import {Footer, SmallTitle, orderItem, Dynamic, LoadMore} from '@/components/common/index'
import {unread, getArticleList} from '@/fetch/api.js'
import clinicImg from '../../../assets/img/menzhen@2x.png'
import {mapState} from 'vuex'

export default {
  name: 'homePage',
  components: {
    Footer,
    SmallTitle,
    Dynamic,
    LoadMore,
    orderItem
  },
  data () {
    return {
      no_img: clinicImg,
      unReadCount: 0,
      dataInterval: '',
      articleList: []
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
  }
}
</script>

<style lang="scss" scoped>
  .clinic-infor {
    @extend %displayFlex;
    background: $backColor;
    padding: 36px 40px;
    border-bottom: 1px solid $lineColor;

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
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: calc(100vw - 435px);
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
    background: url('../../../assets/img/xiayibu@2x.png') no-repeat;
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

</style>
