<template>
  <div>
    <Header :canReturn="true" titleText="绑定手机"></Header>
    <div class="mt-88px mb-131px list-content">
      <div class="line-items">
        <input type="text" placeholder="请输入手机号码" class="input-item flexOne" v-model="mobile">
        <button class="get-code-btn" @click.stop="getCode">获取验证码</button>
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <input type="text" placeholder="请输入短信验证码" class="input-item" v-model="code">
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

export default {
  name: 'modifyPhone',
  props: ['returnType'],
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  components: {
    Header
  },
  methods: {
    getCode () {
      if (!/^\d{11}$/.test(this.mobile)) {
        this.$Message.infor('请填写正确的手机号码!')
        // this.$refs.phoneNum.focus()
        return
      }
      fetchCode({
        mobile: this.mobile
      }).then(res => {
        if (res.code === 1000) {
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
          if (Number(this.returnType) === 1) {
            this.$router.push({name: 'personal'})
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
  }
</style>
