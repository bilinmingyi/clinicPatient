<template>
  <div class="bg-ff block-fix">
    <div class="search">
      <div class="search_left">
        <img src="../../assets/img/ss.png">
        <input type="text" v-bind="$attrs" v-model="searchName" :placeholder="placeholder" @input="searchInput()"
               @blur="scrollToTop"
               id="dsearch"/>
      </div>
      <div class="search_btn_block" v-if="hasBtn">
        <button class="search_btn" @click.stop="searchInput()">{{btnText}}</button>
      </div>
    </div>
    <hr class="full-screen-hr">
  </div>

</template>

<script>
export default {
  name: 'Search',
  props: {
    placeholder: {
      type: String,
      default: '请输入搜索条件'
    },
    btnText: {
      type: String,
      default: '查询'
    },
    hasBtn: {
      type: Boolean,
      default: true
    }
  },
  inheritAttrs: false,
  data: function () {
    return {
      searchName: '',
      timer: ''
    }
  },
  methods: {
    searchInput () {
      let self = this
      // 防抖
      clearTimeout(self.timer)
      self.timer = setTimeout(function () {
        self.$emit('on-search', self.searchName)
      }, 500)
    },
    scrollToTop () {
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        console.log(e)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
  .block-fix {
    width: 100%;
  }

  .search {
    background: #ffffff;
    @extend %displayFlex;
    padding: 16px 30px;
  }

  .search_left {
    flex: 1;
    background: #EDEDED;
    border-radius: 8px;
    margin-right: 26px;
    padding: 12px 24px;
    display: flex;
  }

  .search_left img {
    height: 40px;
    margin-top: 4px;
  }

  .search_left input {
    border: none;
    background: transparent;
    outline: none;
    padding-left: 12px;
    align-self: center;
    line-height: 48px;
    width: 100%;
    font-size: 28px;
    color: #3F3F3F;
  }

  .search_left input::-webkit-input-placeholder {
    font-size: 28px !important;
    color: #8C8C8C !important;
  }

  .search_btn_block {
    @extend %flexV;
  }

  .search_btn {
    @include deepButton(64px, 104px);
  }
</style>
