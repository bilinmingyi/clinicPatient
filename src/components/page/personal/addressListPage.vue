<template>
  <div>
    <Header titleText="地址管理" :canReturn="true"></Header>
    <div class="mt-88px mb-131px">
      <div class="address-item">
        <div>
          <p class="first-p">
            <span>王尼玛</span>
            <span class="ml16">13678958975</span>
            <span class="default-address ml16">默认</span>
          </p>
          <p class="second-p">
            广州市天河区珠江新城花城汇XXX街道幸福小区幸福的 幸福小区小区6栋601
          </p>
        </div>
        <div class="edit-btn" @click.stop="editAddress"></div>
      </div>
    </div>
    <div class="add_block">
      <button class="add_btn">添加收货地址</button>
    </div>
  </div>
</template>

<script>
import {Header} from '../../common'
import {fetchUserInfo} from '@/fetch/api'

export default {
  name: 'addressListPage',
  data () {
    return {
      person: {
        mobile: '',
        id: '',
        name: '',
        sex: 0,
        birthday: ''
      },
      addressList: []
    }
  },
  components: {
    Header
  },
  created () {
    this.getAddress()
  },
  methods: {
    editAddress () {
      if (!this.person.mobile) {
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({
            name: 'editPerson',
            query: {
              id: this.person.id,
              name: this.person.name,
              sex: this.person.sex,
              birthday: this.person.birthday,
              mobile: this.person.mobile
            }
          })
        })
      }
    },
    addAddress () {
      if (!this.person.mobile) {
        this.$Message.confirm('请先绑定手机号码！', () => {
          this.$router.push({
            name: 'editPerson',
            query: {
              id: this.person.id,
              name: this.person.name,
              sex: this.person.sex,
              birthday: this.person.birthday,
              mobile: this.person.mobile
            }
          })
        })
      }
    },
    getAddress () {
      fetchUserInfo().then(
        res => {
          console.log(res)
          if (res.code === 1000) {
            this.person.mobile = res.data.mobile
            this.person.id = res.data.id
            this.person.name = res.data.name
            this.person.sex = res.data.sex
            this.person.birthday = res.data.birthday

            if (res.data.mobile) {
              this.addressList = res.data.addr_info === '' ? [] : JSON.parse(res.data.addr_info)
            } else {
              this.$Message.confirm('请先绑定手机号码！', () => {
                this.$router.push({
                  name: 'editPerson',
                  query: {
                    id: res.data.id,
                    name: res.data.name,
                    sex: res.data.sex,
                    birthday: res.data.birthday,
                    mobile: res.data.mobile
                  }
                })
              })
            }
          } else {
            this.$Message.infor(res.msg)
          }
        }
      ).catch(error => {
        console.log(error)
        this.$Message.infor('网络出错！')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .address-item {
    background: $backColor;
    color: $depthTextColor;
    padding: 32px 30px;
    margin-bottom: 20px;
    @extend %displayFlex;

    .first-p {
      line-height: 45px;
      font-weight: bold;
      font-size: 32px;
      margin-bottom: 8px;
      @extend %flexV;
    }

    .default-address {
      color: #ffffff;
      display: inline-block;
      line-height: 28px;
      font-size: 20px;
      background: $redColor;
      border-radius: 8px;
      padding: 4px 14px;
      font-weight: normal;
    }

    .second-p {
      font-size: 24px;
    }

    .edit-btn {
      background: url("../../../assets/img/bj@2x.png") no-repeat center center;
      background-size: 100%;
      width: 64px;
      height: 64px;
      margin-left: 48px;
    }
  }

  .no-address-back {
    height: calc(100vh - 219px);
    background: url("../../../assets/img/ps.png") no-repeat center center;
    background-size: 100%;
  }

  .add_block {
    @include psFixed(bottom, 111px);
    background: $backColor;
    padding: 16px 30px 15px;
  }

  .add_btn {
    @include deepButton(80px, 100%)
  }
</style>
