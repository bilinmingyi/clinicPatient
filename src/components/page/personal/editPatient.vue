<template>
  <div>
    <Header :canReturn="true" :titleText="isEdit?'编辑信息':'添加亲属'"></Header>
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
import { Header, radioGroup } from '@/components/common/index'
import { upPatientDetail, fetchUserInfo } from '@/fetch/api.js'
import inputBlur from '@/assets/js/inputBlur'
import { mapState, mapActions } from 'vuex'
export default {
  mixins: [inputBlur],
  name: 'editPatient',
  components: {
    Header,
    radioGroup
  },
  data () {
    return {
      sexList: [{ id: 'sex-man', label: '男', value: 1 }, { id: 'sex-woman', label: '女', value: 2 }],
      sex: 0,
      name: '',
      id: '',
      age: '',
      isEdit: true,
      copyName: ''
    }
  },
  computed: {
    ...mapState({
      userInfoState: state => state.userInfoState
    })
  },
  created () {
    this.sex = Number(this.$route.query.sex)
    this.id = this.$route.query.id
    this.name = this.$route.query.name
    this.copyName = this.$route.query.name
    this.age = this.$route.query.age
    // let birthday = this.$route.query.birthday
    // this.age = new Date().getFullYear() - new Date(Number(birthday)).getFullYear()
    this.isEdit = !!this.$route.query.name
  },
  methods: {
    ...mapActions(['set_user_info']),
    changeSex (val) {
      this.sex = Number(val)
    },
    saveChange () {
      if (!this.name) {
        this.$Message.infor('请先填写亲属姓名！')
        return
      } else if (this.age <= 0) {
        this.$Message.infor('请先正确填写亲属年龄！')
        return
      } else if (!this.sex) {
        this.$Message.infor('请先填写亲属性别！')
        return
      }
      this.toggleData('add')
    },
    toggleData (type) {
      let patientList = this.userInfoState.relative_info ? JSON.parse(this.userInfoState.relative_info) : []
      let obj = {
        sex: Number(this.sex),
        name: this.name,
        age: Number(this.age)
      }
      if (type === 'save') {
        for (let i = 0; i < patientList.length; i++) {
          if (obj.name === patientList[i].name) {
            this.$Message.infor('该亲属已经存在！')
            return
          }
        }
        patientList.push(obj)
      } else if (type === 'delte') {
        for (let i = 0; i < patientList.length; i++) {
          if (this.copyName === patientList[i].name) {
            patientList.splice(i, 1)
            break
          }
        }
      } else if (type === 'add') {
        for (let i = 0; i < patientList.length; i++) {
          if (this.copyName === patientList[i].name) {
            patientList[i] = obj

            break
          }
        }
      }
      upPatientDetail({
        relative_info: JSON.stringify(patientList)
      }).then(res => {
        if (res.code === 1000) {
          this.getUserInfo()
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    deleteItem () {
      this.$Message.confirm('确定删除该亲属？', () => {
        let patientList = this.userInfoState.relative_info ? JSON.parse(this.userInfoState.relative_info) : []
        let obj = {
          sex: Number(this.sex),
          name: this.name,
          age: Number(this.age)
        }
        for (let i = 0; i < patientList.length; i++) {
          if (this.copyName === patientList[i].name) {
            patientList[i] = obj
          }
        }
        this.toggleData('delte')
        // deletePatient({
        //   id: this.id
        // }).then(res => {
        //   if (res.code === 1000) {
        //     this.$router.go(-1)
        //   } else {
        //     this.$Message.infor(res.msg)
        //   }
        // }).catch(error => {
        //   console.log(error)
        //   this.$Message.infor('网络出错！')
        // })
      })
    },
    getUserInfo () {
      fetchUserInfo({}).then(res => {
        if (res.code === 1000) {
          this.set_user_info(res.data)
          this.$router.go(-1)
        } else {
          this.$Message.infor(res.msg)
        }
      }).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    },
    addItem () {
      if (!this.name) {
        this.$Message.infor('请先填写亲属姓名！')
        return
      } else if (this.age <= 0 || isNaN(this.age)) {
        this.$Message.infor('请先正确填写亲属年龄！')
        return
      } else if (!this.sex) {
        this.$Message.infor('请先填写亲属性别！')
        return
      }
      this.toggleData('save')
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
  @include deepButton(80px, 100%);
}

.del-btn {
  @include simpleButton(80px, 48%);
}

.line-item {
  padding: 26px 30px;
  @extend %displayFlex;
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
