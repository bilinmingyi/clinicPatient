<template>
  <div>
    <Header titleText="机构动态" :canReturn="true"></Header>
    <div class="clinic-dynamic mt-88px">
      <Dynamic v-for="article in articleList" :dyItem="article" :key="article.id"
               @click.native="goRoute(article.id)"></Dynamic>
      <Load-more v-if="canShowAdd" @click.stop.native="addMore"></Load-more>

    </div>
  </div>
</template>

<script>
import {Header, Dynamic, LoadMore} from '@/components/common/index'
import {getArticleList} from '@/fetch/api.js'

export default {
  name: 'dynamicPage',
  components: {Header, Dynamic, LoadMore},
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
      this.$router.push({name: 'articleDetail', params: {id: params}, query: {noReturn: 0}})
    }
  }
}
</script>

<style lang="scss" scoped>
  .clinic-dynamic {
    background: $backColor;
  }
</style>
