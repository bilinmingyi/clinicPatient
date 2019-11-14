<template>
  <div>
    <div class="title-block">
      <div class="type-block">
        <div class="type-item" @click.stop="changeType('')">
          <div :class="{'active-type': currType === ''}">最新</div>
          <div class="type-bottom" v-show="currType === ''"></div>
        </div>
        <div class="type-item" v-for="type in oneTypeList" :key="type" @click.stop="changeType(type)">
          <div :class="['type-item-text', {'active-type': currType === type}]">{{type}}</div>
          <div class="type-bottom" v-show="currType === type"></div>
        </div>
        <div class="type-item" v-for="index in blockNum" :key="index"></div>
        <div class="type-item" @click="changeMorenMenu" v-if="typeList.length > 3">
          <div class="mr-6px">更多</div>
          <img :class="['more-icon', {'more-open-icon': openMore}]" src="../../../assets/img/sanjiaoxing@2x.png">
        </div>
      </div>
      <div class="type-menu" v-show="openMore">
        <div class="type-menu-block">
          <div v-for="type in twoTypeList" :key="type" @click.stop="changeType(type)"
               :class="['type-menu-item', {'type-menu-active-item': currType === type}]">{{type}}
          </div>
        </div>
      </div>
    </div>
    <div class="pb-128px mt-96px">
      <div class="clinic-dynamic">
        <div v-for="article in articleList" :key="article.id">
          <Dynamic :dyItem="article" @click.native="goRoute(article)"></Dynamic>
        </div>
      </div>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>
    </div>
    <Footer navtiveIndex="2"></Footer>
  </div>
</template>

<script>
import {Footer, Dynamic, LoadMore} from '@/components/common/index'
import {platformArticleList, platformArticleType} from '@/fetch/api.js'

export default {
  name: 'discoverPage',
  components: {
    Footer,
    Dynamic,
    LoadMore
  },
  data () {
    return {
      page: 1,
      pageSize: 10,
      articleList: [],
      typeList: [],
      oneTypeList: [],
      twoTypeList: [],
      blockNum: 0,
      currType: '',
      canShowAdd: false,
      openMore: false
    }
  },
  created () {
    this.getTypeList()
    this.getList()
  },
  methods: {
    getTypeList () {
      platformArticleType({}).then(res => {
        if (res.code === 1000) {
          this.typeList = res.data ? JSON.parse(res.data) : []
          if (this.typeList.length > 3) {
            this.blockNum = 0
            this.oneTypeList = this.typeList.slice(0, 3)
            this.twoTypeList = this.typeList.slice(3)
          } else {
            this.blockNum = 4 - this.typeList.length
            this.oneTypeList = this.typeList
          }
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(e => {
        console.log(e)
        this.$Message.infor('网络出错！')
      })
    },
    async getList () {
      try {
        let res = await platformArticleList({
          page: this.page,
          page_size: this.pageSize,
          type: this.currType
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
        console.log(e)
        this.$Message.infor('网络出错！')
      }
    },
    addMore () {
      this.page++
      this.getList()
    },
    goRoute (params) {
      if (params.category === 0) {
        this.$router.push({name: 'platformArticle', params: {id: params.id}})
      } else if (params.category === 1) {
        this.$router.push({name: 'trainingRegistration', params: {id: params.id}})
      }
    },
    changeType (str) {
      this.currType = str
      this.page = 1
      this.articleList = []
      this.getList()
      this.openMore = false
    },
    changeMorenMenu () {
      this.openMore = !this.openMore
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-dynamic {
    background: $backColor;
  }

  .title-block {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;

    .type-block {
      background: $backColor;
      border-bottom: 1px solid $lineColor;
      @extend %displayFlex;

      .type-item {
        flex: 1;
        height: 96px;
        @extend %flexVC;
        color: $lightTextColor;
        overflow: hidden;
        font-size: 30px;
        position: relative;

        .type-item-text {
          text-align: center;
          width: 120px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .type-bottom {
          width: 64px;
          height: 6px;
          border-radius: 6px;
          background: $greenColor;
          position: absolute;
          top: 79px;
        }

        .more-icon {
          width: 24px;
          height: 24px;
          -webkit-transform: rotate(180deg);
          -moz-transform: rotate(180deg);
          -ms-transform: rotate(180deg);
          -o-transform: rotate(180deg);
          transform: rotate(180deg);
          transition: transform 0.3s;
        }

        .more-open-icon {
          -webkit-transform: rotate(0deg);
          -moz-transform: rotate(0deg);
          -ms-transform: rotate(0deg);
          -o-transform: rotate(0deg);
          transform: rotate(0deg);
        }
      }

      .active-type {
        color: $greenColor;
        font-size: 30px;
        font-weight: bold;
      }
    }

    .type-menu {
      background: rgba(63, 63, 63, .32);
      height: calc(100vh - 96px);

      .type-menu-block {
        background: $backColor;
        padding: 41px 26px 32px 49px;
        @extend %displayFlex;
        flex-wrap: wrap;

        .type-menu-item {
          height: 72px;
          min-width: calc((100vw - 144px) / 3);
          margin-right: 23px;
          margin-bottom: 24px;
          background: #F5F5F5;
          border-radius: 8px;
          color: $depthTextColor;
          font-size: 30px;
          padding: 0 20px;
          @extend %flexVC;
        }

        .type-menu-active-item {
          color: #ffffff;
          background: $greenColor;
        }
      }
    }
  }
</style>
