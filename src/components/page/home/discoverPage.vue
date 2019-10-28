<template>
  <div>
    <div class="pb-128px">
      <div class="clinic-dynamic">
        <div class="type-block">
          <div class="type-item" @click.stop="changeType('最新')">
            <div :class="{'active-type': currType === '最新'}">最新</div>
            <div class="type-bottom" v-show="currType === '最新'"></div>
          </div>
          <div class="type-item" v-for="type in typeList" :key="type" @click.stop="changeType(type)">
            <div :class="{'active-type': currType === type}">{{type}}</div>
            <div class="type-bottom" v-show="currType === type"></div>
          </div>
          <div class="type-item" v-for="index in blockNum" :key="index"></div>
          <div class="type-item" @click="changeMorenMenu" v-if="typeList.length > 3">
            <div class="mr-6px">更多</div>
            <img :class="['more-icon', {'more-open-icon': openMore}]" src="../../../assets/img/sanjiaoxing@2x.png">
          </div>
        </div>
        <Dynamic v-for="article in articleList" :dyItem="article" :key="article.id"
                 @click.native="goRoute(article.id)"></Dynamic>
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
      pageSize: 5,
      articleList: [],
      typeList: [],
      blockNum: 0,
      currType: '最新',
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
          } else {
            this.blockNum = 4 - this.typeList.length
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
        console.log(e)
        this.$Message.infor('网络出错！')
      }
    },
    addMore () {
      this.page++
      this.getList()
    },
    goRoute (params) {
      this.$router.push({name: 'articleDetail', params: {id: params}})
    },
    changeType (str) {
      this.currType = str
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
      font-size: 32px;
      font-weight: bold;
    }
  }
</style>
