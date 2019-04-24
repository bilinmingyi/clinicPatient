<template>
  <div ref="scrollContent" @scroll="scrollEvent" style="height: 100vh;overflow-y: scroll">
    <Header titleText="诊所商城"></Header>
    <div class="mt-88px pb-128px">
      <Search placeholder="请输入药品/产品名称" :hasBtn="false"></Search>
      <div class="white-back">
        <SmallTitle>
          <div class="flexOne recommend-title">
            <img src="../../../assets/img/tj@2x.png">
            <span class="recommend-title-text">诊所推荐</span>
          </div>
        </SmallTitle>
      </div>
      <div class="good-list">
        <GoodItem class="mr-10px"></GoodItem>
        <GoodItem></GoodItem>
        <GoodItem class="mr-10px"></GoodItem>
        <GoodItem></GoodItem>
        <GoodItem class="mr-10px"></GoodItem>
        <GoodItem></GoodItem>
        <GoodItem class="mr-10px"></GoodItem>
        <GoodItem></GoodItem>
      </div>
    </div>
    <Footer navtiveIndex="3"></Footer>
  </div>
</template>

<script>
import {Footer, Header, Search, SmallTitle, GoodItem} from '@/components/common/index'

let throttle = (fn, env) => {
  let canRun = true
  return () => {
    if (canRun) {
      canRun = false
      setTimeout(() => {
        fn.apply(env, arguments)
      }, 500)
    }
  }
}

export default {
  name: 'mallPage',
  components: {
    Footer,
    Header,
    Search,
    SmallTitle,
    GoodItem
  },
  data () {
    return {}
  },
  methods: {
    scrollEvent () {
      let scrollItem = this.$refs.scrollContent
      throttle(() => {
        console.log(scrollItem.scrollTop)
        if (scrollItem.scrollTop + scrollItem.clientHeight >= scrollItem.scrollHeight - 20) {
        }
      }, this)
    }
  }
}
</script>

<style lang="scss" scoped>
  .white-back {
    background: $bgWhite;
  }

  .recommend-title {
    @extend %flexVC;

    img {
      width: 48px;
      height: 48px;
      margin-right: 8px;
    }

    &-text {
      color: $middleTextColor;
      font-size: 32px;
      font-weight: bold;
    }
  }

  .good-list {
    @extend %displayFlex;
    flex-wrap: wrap;
  }
</style>
