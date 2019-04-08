<template>
  <div>
    <div class="doctor-item">
      <img :src="itemData.avatar != '' ? itemData.avatar: (itemData.sex == 2 ? woman_img: man_img)">
      <div class="doctor-infor">
        <div>
          <span class="infor-title">王凯歌</span>
          <div class="doctor-job color-EDAB15">医师</div>
        </div>
        <div>中山大学附属医院/皮肤科</div>
      </div>
      <div class="flexVC">
        <button class="appoint-btn">预约</button>
      </div>
    </div>
  </div>
</template>

<script>
import man from '@/assets/img/nan@2x.png'
import woman from '@/assets/img/nv@2x.png'

export default {
  name: 'doctorItem',
  props: {
    itemData: {
      type: Object,
      default () {
        return {
          id: '1', // 医生id
          name: '测试', // 医生名称
          avatar: '', // 医生头像
          title: '主治医师', // 医生职称
          hospital: '武警医院', // 所在医院
          department: '胸外科', // 所属部门
          speciality: '啥都会，你敢信？', // 擅长领域
          sex: 0 // 医生性别，0保密，1男，2女
        }
      }
    }
  },
  data () {
    return {
      man_img: man,
      woman_img: woman
    }
  }
}
</script>

<style lang="scss" scoped>
  .doctor-item {
    @extend %displayFlex;
    padding: 24px 30px;
    background: $backColor;
    border-bottom: 1px solid $lineColor;

    img {
      width: 112px;
      height: 112px;
    }

    .doctor-infor {
      flex: 1;
      margin-left: 24px;
      @extend %displayFlex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 28px;
      padding: 9px 0;
      color: #8c8c8c;
      .infor-title {
        color: #3F3F3F;
        font-weight: bold;
        font-size: 32px;
        margin-right: 16px;
      }
      .doctor-job {
        display: inline-block;
        color: #ffffff;
        font-size:20px;
        border-radius: 8px;
        padding: 6px 16px;
      }
    }

    .appoint-btn {
      @include newsButton(64px, 136px);
      font-weight: bold;
    }
  }
  .color-29BBFF {
    background: #29BBFF;
  }
  .color-4DBC89 {
    background: #4DBC89;
  }
  .color-08BAC6 {
    background: #08BAC6;
  }
  .color-EDAB15 {
    background: #EDAB15;
  }
  .flexVC {
    @extend %flexVC;
  }
</style>
