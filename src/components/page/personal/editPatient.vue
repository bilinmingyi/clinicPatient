<template>
  <div>
    <Header :canReturn="true" :titleText="isEdit?'编辑信息':'添加就诊人'"></Header>
    <div class="mt-88px mb-131px list-content">
      <div class="line-item">
        <label class="label-span mr-32px">姓名</label>
        <input type="text" class="input-item" v-model="name" @blur="scrollToTop">
      </div>
      <hr class="line-hr">
      <div class="line-item">
        <label class="label-span mr-32px">年龄</label>
        <input type="number" class="input-item input-width" v-model="age" @blur="scrollToTop">
        <span class="label-span">岁</span>
      </div>
      <hr class="line-hr">
      <div class=" line-item">
        <span class="label-span mr-32px">性别</span>
        <radioGroup :data="sexList" :value="sex" :name="'sex'" @input="changeSex"></radioGroup>
      </div>
    </div>
    <div class="add-block" v-if="isEdit">
      <button class="del-btn" @click.stop="deleteItem">删除</button>
      <button class="sure-btn" @click.stop="saveChange">确定</button>
    </div>
    <div class="add-block" v-else>
      <button class="add-btn" @click.stop="addItem">保存</button>
    </div>
  </div>
</template>

<script>
import {Header, radioGroup} from '@/components/common/index'
import {changePatientInfo, deletePatient, addPatient} from '@/fetch/api.js'
import inputBlur from '@/assets/js/inputBlur'

export default {
  mixins: [inputBlur],
  name: 'editPatient',
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
      isEdit: true
    }
  },
  created () {
    this.sex = Number(this.$route.query.sex)
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    let birthday = this.$route.query.birthday
    this.age = new Date().getFullYear() - new Date(Number(birthday)).getFullYear()
    this.isEdit = Boolean(this.id)
  },
  methods: {
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
      changePatientInfo({
        id: this.id,
        sex: Number(this.sex),
        name: this.name,
        age: Number(this.age)
      }).then(res => {
        if (res.code === 1000) {
          this.$router.go(-1)
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    deleteItem () {
      this.$Message.confirm('确定删除该就诊人？', () => {
        deletePatient({
          id: this.id
        }).then(res => {
          if (res.code === 1000) {
            this.$router.go(-1)
          } else {
            this.$Message.infor(res.msg)
          }
        }).catch(error => {
          console.log(error)
          this.$Message.infor('网络出错！')
        })
      })
    },
    addItem () {
      if (!this.name) {
        this.$Message.infor('请先填写就诊人姓名！')
        return
      } else if (this.age <= 0 || isNaN(this.age)) {
        this.$Message.infor('请先正确填写就诊人年龄！')
        return
      } else if (!this.sex) {
        this.$Message.infor('请先填写就诊人性别！')
        return
      }
      addPatient({
        name: this.name,
        sex: Number(this.sex),
        age: Number(this.age)
      }).then(res => {
        if (res.code === 1000) {
          this.$router.go(-1)
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
    @include deepButton(80px, 48%);
    margin-left: 4%;
  }

  .add-btn {
    @include deepButton(80px, 100%)
  }

  .del-btn {
      @include simpleButton(80px, 48%);
    }

  .line-item {
    padding: 26px 30px;
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

  .input-item {
    border: none;
    outline: none;
    line-height: 45px;
    font-size: 32px;
    color: $depthTextColor;
  }

  .input-width {
    width: 55px;
    text-align: center;
  }
</style>
