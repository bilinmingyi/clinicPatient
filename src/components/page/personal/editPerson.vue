<template>
  <div>
    <Header :canReturn="true" titleText="编辑信息"></Header>
    <div class="mt-88px mb-131px list-content">
      <div class="line-item">
        <label class="label-span mr-32px">姓名</label>
        <input type="text" class="input-item" v-model="name">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">年龄</label>
        <input type="number" class="input-item input-width" v-model="age">
        <span class="label-span">岁</span>
      </div>
      <hr class="line-hr">
      <div class=" line-item">
        <span class="label-span mr-32px">性别</span>
        <radioGroup :data="sexList" :value="sex" :name="'sex'" @input="changeSex"></radioGroup>
      </div>
      <hr class="line-hr">
      <div class="line-items">
        <label class="label-four mr-32px">手机</label>
        <input type="number" class="input-item flexOne" v-model="mobile" disabled>
        <button class="phone-btn" @click.stop="goRoute">绑定号码</button>
      </div>
    </div>
    <div class="add-block">
      <button class="sure-btn" @click.stop="saveChange">确定</button>
    </div>
  </div>
</template>

<script>
import {Header, radioGroup} from '@/components/common/index'
import {changeUser} from '@/fetch/api.js'
import {mapState, mapActions} from 'vuex'

export default {
  name: 'editPerson',
  components: {
    Header,
    radioGroup
  },
  data () {
    return {
      sexList: [{id: 'sex-man', label: '男', value: 1}, {id: 'sex-woman', label: '女', value: 2}],
      sex: 0,
      name: '',
      id: '',
      age: '',
      mobile: ''
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  watch: {
    userInfoState: {
      deep: true,
      handler: function (newVal, oldVal) {
        this.sex = Number(this.userInfoState.sex)
        this.id = this.userInfoState.id
        this.name = this.userInfoState.name
        this.mobile = this.userInfoState.mobile
        let birthday = this.userInfoState.birthday
        this.age = new Date().getFullYear() - new Date(Number(birthday)).getFullYear()
      }
    }
  },
  mounted () {
    this.sex = Number(this.userInfoState.sex)
    this.id = this.userInfoState.id
    this.name = this.userInfoState.name
    this.mobile = this.userInfoState.mobile
    let birthday = this.userInfoState.birthday
    this.age = new Date().getFullYear() - new Date(Number(birthday)).getFullYear()
  },
  methods: {
    ...mapActions(['set_user_info']),
    changeSex (val) {
      this.sex = Number(val)
    },
    saveChange () {
      if (!this.name) {
        this.$Message.infor('请先填写就诊人姓名！')
        return
      } else if (this.age <= 0) {
        this.$Message.infor('请先正确填写就诊人年龄！')
        return
      } else if (!this.sex) {
        this.$Message.infor('请先填写就诊人性别！')
        return
      }
      let birthday = new Date()
      birthday.setFullYear(birthday.getFullYear() - Number(this.age))
      changeUser({
        sex: Number(this.sex),
        name: this.name,
        birthday: birthday.getTime()
      }).then(res => {
        if (res.code === 1000) {
          this.set_user_info({
            age: Number(this.age),
            sex: Number(this.sex),
            name: this.name,
            birthday: birthday.getTime()
          })
          this.$router.go(-1)
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    goRoute () {
      this.$router.push({name: 'editPhone', query: {returnType: 1}})
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
    padding: 16px 30px;
    @extend %displayFlex
  }

  .line-hr {
    @extend %lineHr;
  }

  .label-span {
    color: $depthTextColor;
    line-height: 45px;
    font-size: 32px;
  }

  .label-four {
    color: $depthTextColor;
    line-height: 64px;
    font-size: 32px;
  }

  .input-item {
    background: transparent;
    border: none;
    outline: none;
    line-height: 45px;
    font-size: 32px;
    color: $depthTextColor;
  }

  .phone-btn {
    @include deepButton(64px, 148px)
  }

  .input-width {
    width: 18%;
    text-align: center;
  }
</style>
