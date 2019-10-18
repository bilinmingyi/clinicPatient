<template>
  <div>
    <div class="pb-128px">
      <div class="clinic-dynamic">
        <div class="type-block">
          <div class="type-item active-type">最新</div>
          <div class="type-item">风湿科</div>
          <div class="type-item">中医</div>
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
import {getArticleList} from '@/fetch/api.js'

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
      canShowAdd: false
    }
  },
  created () {
    this.getList()
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
    goRoute (params) {
      this.$router.push({name: 'articleDetail', params: {id: params}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-dynamic {
    background: $backColor;
  }

  .type-block {
    padding: 24px 30px;
    background: $backColor;
    border-bottom: 1px solid $lineColor;
    @extend %displayFlex;

    .type-item {
      border-radius:8px;
      font-size: 32px;
      padding: 12px 24px;
      background: #F5F5F5;
      color: #7C7C7C;
      margin-right: 32px;
    }

    .active-type {
      background: $greenColor;
      color: #ffffff;
    }
  }
</style>
