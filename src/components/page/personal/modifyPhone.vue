<template>
  <div>
    <Header :canReturn="true" titleText="绑定手机"></Header>
    <div class="mt-88px mb-131px list-content">
      <div class="line-items">
        <input type="text" placeholder="请输入手机号码" class="input-item flexOne" v-model="mobile" @blur="scrollToTop">
        <button :class="['get-code-btn', {'ban-code': currNum!==0}]" @click.stop="getCode">{{currNum===0?'获取验证码':currNum+'s'}}</button>
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <input type="text" placeholder="请输入短信验证码" class="input-item all-input-width" v-model="code" @blur="scrollToTop">
      </div>
    </div>
    <div class="add-block">
      <button class="sure-btn" @click="saveModify">确定</button>
    </div>
  </div>
</template>

<script>
import {Header} from '@/components/common/index'
import {fetchCode, savePhone} from '@/fetch/api.js'
import {mapActions} from 'vuex'
import inputBlur from '@/assets/js/inputBlur'

export default {
  mixins: [inputBlur],
  name: 'modifyPhone',
  props: ['returnType'],
  data () {
    return {
      mobile: '',
      code: '',
      currNum: 0,
      timer: ''
    }
  },
  components: {
    Header
  },
  methods: {
    ...mapActions(['set_user_info']),
    getCode () {
      if (this.currNum !== 0) {
        return
      }
      if (!/^\d{11}$/.test(this.mobile)) {
        this.$Message.infor('请填写正确的手机号码!')
        // this.$refs.phoneNum.focus()
        return
      }
      fetchCode({
        mobile: this.mobile
      }).then(res => {
        if (res.code === 1000) {
          this.currNum = 60
          this.timer = setInterval(() => {
            if (this.currNum > 0) {
              this.currNum--
            } else {
              clearInterval(this.timer)
            }
          }, 1000)
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        this.$Message.infor('网络出错！' + error.message())
      })
    },
    saveModify () {
      if (!/^\d{11}$/.test(this.mobile)) {
        this.$Message.infor('请填写正确的手机号码!')
        return
      } else if (!this.code) {
        this.$Message.infor('请填写验证码!')
        return
      }
      savePhone({
        mobile: this.mobile,
        code: this.code
      }).then(res => {
        if (res.code === 1000) {
          this.set_user_info({
            mobile: this.mobile
          })
          if (Number(this.returnType) === 1) {
            this.$router.push({path: '/personal'})
          } else if (Number(this.returnType) === 2) {
            this.$router.go(-1)
          }
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        this.$Message.infor('网络出错！' + error.message)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-content {
    background: $backColor;
  }

  .add-block {
    @include psFixed(bottom, 112px);
    @extend %displayFlex;
    background: $backColor;
    padding: 16px 30px 15px;
    width: 100%;
    border-top: 1px solid $lineColor;
  }

  .sure-btn {
    @include deepButton(80px, 100%);
  }

  .line-item {
    padding: 26px 30px;
    @extend %displayFlex
  }

  .line-items {
    padding: 18px 30px;
    @extend %displayFlex
  }

  .line-hr {
    @extend %lineHr;
  }

  .all-input-width {
    width: 100%;
  }

  .input-item {
    background: transparent;
    border: none;
    outline: none;
    line-height: 45px;
    font-size: 32px;
    color: $depthTextColor;

    &::-webkit-input-placeholder {
      font-size: 32px;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      line-height: 45px;
    }
  }

  .get-code-btn {
    background: #EEAE1D;
    color: #ffffff;
    border: none;
    border-radius: 8px;
    font-size: 28px;
    padding: 10px 12px;
    line-height: 40px;
    width: 164px;
  }
  .ban-code {
    background: #cccccc;
  }
</style>
