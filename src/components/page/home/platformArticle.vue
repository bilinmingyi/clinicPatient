<template>
  <div>
    <Header :canReturn="true" titleText="动态详情"></Header>
    <div class="mt-88px content-block">
      <div class="content-title">{{title}}</div>
      <div class="content-type">{{type|articleType}}</div>
      <div class="content-time">{{pubdate|dateFormat}}</div>
      <div class="aritcle-content" v-html="content"></div>
    </div>
  </div>
</template>

<script>
import {Header} from '@/components/common/index'
import {platformArticleDetail} from '@/fetch/api.js'

export default {
  name: 'platformArticle',
  data () {
    return {
      content: '',
      title: '',
      type: 0,
      pubdate: 0
    }
  },
  props: ['id'],
  components: {
    Header
  },
  created () {
    this.getDetail()
  },
  methods: {
    getDetail () {
      platformArticleDetail({id: this.id}).then(res => {
        if (res.code === 1000) {
          this.content = res.data.content
          this.title = res.data.title
          this.pubdate = res.data.pubdate
          this.type = res.data.type
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .content-block {
    padding: 20px;
    background: $backColor;

    .content-title {
      font-weight: bold;
      font-size: 36px;
      color: $depthTextColor;
      padding: 40px 0 0;
    }

    .content-type {
      font-size: 28px;
      color: $lightTextColor;
      margin-top: 20px;
    }
    .content-time {
      font-size: 30px;
      color: $lightTextColor;
      margin: 20px 0;
    }
  }
</style>
