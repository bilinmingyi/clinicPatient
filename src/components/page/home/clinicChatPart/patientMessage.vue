<template>
  <div>
    <div class="right-chat mb24">
      <p class="chat-time mb24" v-show="chatDetail.showTime">{{chatDetail.msgts|dateFormat('MM月dd日 hh:mm')}}</p>
      <div class="chat-content">
        <!-- messagetype  text-->
        <div class="cancelButton" v-if="chatDetail.msgdata.msg_type !== 'withdraw_msg'&&chatDetail.msgdata.msg_type!=='link'" @click="cancelThis"><span>撤回</span></div>
        <div class="reply-content" v-if="chatDetail.msgdata.msg_type=='text'">
          <p class="reply-text">{{chatDetail.msgdata.text}}</p>
        </div>
        <div class="reply-content" v-if="chatDetail.msgdata && chatDetail.msgdata.msg_type=='link'">
          <div class="recommond" v-if="chatDetail.msgdata.link_type == 'treatment_order_Submission'">
            <div class="recommond-content" @click="goRoute(chatDetail.msgdata.link_url)">
              <p class="recommond-subTitle">已提交预约订单，点击查看</p>
            </div>
          </div>
        </div>
        <div class="reply-content" v-if="chatDetail.msgdata&&chatDetail.msgdata.msg_type=='image'">
          <div class="imgMessage" @click="showImg">
            <img :src="chatDetail.msgdata.img_url" alt :class="[{'img-loadH':chatDetail.imgLoadH},{'img-loadW':chatDetail.imgLoadW}]">
          </div>
        </div>
        <div class="cancel" v-if="chatDetail.msgdata&&chatDetail.msgdata.msg_type=='withdraw_msg'">
          <p>你撤回了一条消息</p>
        </div>
        <!-- <div
              class="reply-content"
        >医生，我想要咨询鼻炎之类的问题呢，最近不舒服医<a href="www.baidu.com">打开</a></div>-->
        <img :src="imgNormalToggle(userInfoState.avatar, userInfoState)" alt class="ml20 iconImg" @error="error(userInfoState,$event)">
      </div>
    </div>
  </div>
</template>
<script>
// 添加公共的混入 里面有图片的默认图和错误处理
import imgMixins from '@/assets/js/imgMixins'
import { mapState } from 'vuex'

export default {
  mixins: [imgMixins],
  props: ['chatDetail'],
  data () {
    return {
      color_list: [
        'color-4DBC89',
        'color-EDAB15',
        'color-08BAC6',
        'color-29BBFF'
      ],
      timeOutEvent: '',
      imgDetail: ''
    }
  },
  computed: {
    ...mapState(['userInfoState'])
  },
  methods: {
    cancelThis () {
      this.$Message.confirm('确认撤销消息么？', () => {
        this.$emit('cancelMessage', this.chatDetail)
      })
    },
    // 路由跳转
    goRoute (url) {
      this.$router.push({ path: `${url}` })
    },
    // 调用微信接口展示图片
    showImg () {
      try {
        // eslint-disable-next-line no-undef
        WeixinJSBridge.invoke('imagePreview', {
          'current': this.chatDetail.msgdata.img_url,
          'urls': [this.chatDetail.msgdata.img_url]
        })
      } catch (e) {
        console.log(e)
      }
    },
    sucLoad () {
      // 下面的方法放在created里面 速度会比加载完的执行快 因为我只是想控制其类就可
      let self = this
      let loadImg = new Image()
      loadImg.src = self.chatDetail.msgdata.img_url
      loadImg.onload = function () {
        let width = loadImg.width
        let height = loadImg.height
        if (width > height) {
          self.chatDetail.imgLoadW = true
        } else {
          self.chatDetail.imgLoadH = true
        }
      }
    }
  },
  created () {
    if (this.chatDetail.msgdata.msg_type === 'link') {
      this.imgDetail = this.chatDetail.msgdata.link_desc ? JSON.parse(this.chatDetail.msgdata.link_desc) : {}
    } else if (this.chatDetail.msgdata.msg_type === 'image') {
      this.$set(this.chatDetail, 'imgLoadW', null)
      this.$set(this.chatDetail, 'imgLoadH', null)
      this.sucLoad()
    }
  }
}
</script>
<style lang="scss" scoped>
p {
  text-align: center;
  font-size: 26px;
  font-weight: 400;
  color: $simpleGray;
}

.reply-text {
  @extend %normalTitle;
}

.cancelButton {
  // background: yellow;
  width: 88px;
  line-height: 50px;
  text-align: center;
  height: 50px;
  color: $gray3;
  font-size: 26px;

  span {
    border-bottom: 1px solid $gray3;
  }
}

.chat-content {
  @extend %flexVC;

  .reply-content {
    background: $bgwhite2;
    border: 1px solid $simpleGray;
    max-width: 480px;
    height: auto;
    border-radius: 16px;
    padding: 22px 30px;
    @extend %normalTitle;
  }

  a {
    color: $deepBlue;
    text-decoration: underline;
    padding-left: 20px;
    font-weight: 600;
  }

  display: flex;

  .iconImg {
    border-radius: 100px;
    @extend %minICon;
  }

  .recommond {
    @extend %flexV;

    img {
      @extend %mediumIcon;
    }

    &-content {
      p {
        text-align: left;
      }
    }

    &-title {
      @extend %normalTitle;
      font-weight: 600;

      span {
        width: 72px;
        height: 40px;
        background: rgba(237, 171, 21, 1);
        line-height: 40px;
        text-align: center;
        margin-left: 16px;
        color: $bgwhite2;
        font-size: 20px;
        font-weight: 400;
        display: inline-block;
      }
    }

    &-subTitle {
      font-size: 28px;
      color: $simpleGray;
      line-height: 40px;
    }
  }
}

.imgMessage {
  img {
    width: 300px;
    height: 300px;
  }
  .img-loadH {
    height: 300px;
    width: auto;
  }
  .img-loadW {
    width: 300px;
    height: auto;
  }
}

.right-chat {
  margin-right: 20px;

  .chat-content {
    justify-content: flex-end;
    display: flex;
  }
}

.cancel {
  color: $gray3;
  font-size: 28px;
  @extend %flexV;
}

.color-29BBFF {
  background: #29bbff;
}

.color-4DBC89 {
  background: #4dbc89;
}

.color-08BAC6 {
  background: #08bac6;
}

.color-EDAB15 {
  background: #edab15;
}
</style>
