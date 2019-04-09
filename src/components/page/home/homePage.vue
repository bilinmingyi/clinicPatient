<template>
  <div>
    <Header titleText="首页"></Header>
    <div class="mt-88px pb-128px">
      <section class="clinic-infor">
        <img class="clinic-img" src="../../../assets/img/menzhen@2x.png"/>
        <div class="clinic-NP" style="display: flex;flex-direction: column;justify-content: space-around;">
          <p class="clinic-name">深圳淳道门诊部</p>
          <div class="clinic-position">
            <img src="../../../assets/img/dingwei@2x.png">
            <span>深圳市福田区福民路东方欣悦居楼2B</span>
          </div>
        </div>
      </section>
      <section class="clinic-contact mb-20px">
        <div class="contact-item right-line">
          <img src="../../../assets/img/lx.png">
          <span>客服电话</span>
        </div>
        <div class="contact-item">
          <img src="../../../assets/img/ly2.png">
          <span>咨询诊所</span>
        </div>
      </section>
      <section class="clinic-dynamic">
        <Small-title>平台动态</Small-title>
        <Dynamic v-for="article in articleList" :dyItem="article" :key="article.id"></Dynamic>
        <Load-more></Load-more>
      </section>
    </div>
    <Footer navtiveIndex="1"></Footer>
  </div>
</template>

<script>
import {Footer, Header, SmallTitle, Dynamic, LoadMore} from '@/components/common/index'
import {getArticleList} from '@/fetch/api.js'

export default {
  name: 'homePage',
  components: {
    Footer,
    Header,
    SmallTitle,
    Dynamic,
    LoadMore
  },
  data () {
    return {
      page: 1,
      pageSize: 5,
      articleList: []
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
        } else {
          this.$Message.infor(res.msg)
        }
      } catch (e) {
        this.$Message.infor('网络出错！')
      }
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
    color: $depthTextColor;
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

      img {
        width: 64px;
        height: 64px;
        margin-right: 20px;
      }
    }
  }

  .clinic-dynamic {
    background: $backColor;
  }
</style>
