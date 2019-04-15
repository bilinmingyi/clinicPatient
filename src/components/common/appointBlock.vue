<template>
  <div class="appoint-block">
    <div class="appoint-alert">
      <div class="alert-title">预约信息</div>
      <div class="pl-30px pr-30px">
        <div class="alert-infor">
          <p>预约日期：</p>
          <p>预约费用：</p>
        </div>
      </div>
      <div class="small-title">
        <div class="line-block"></div>
        <span class="">上午</span>
      </div>
      <div class="appoint-time">
        <div class="time-item">1</div>
        <div class="time-item">1</div>
        <div class="time-item">1</div>
        <div class="time-item">1</div>
      </div>
      <hr class="line-hr">
      <div class="appoint-btn-block">
        <button class="appoint-delete mr-30px">取消</button>
        <button class="appoint-save">确定</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'appointBlock'
}
</script>

<style lang="scss" scoped>
  .appoint-block {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.3);

    .appoint-alert {
      position: absolute;
      bottom: 0;
      background: $backColor;
      width: 100%;
      border-radius: 16px 16px 0 0;

      .alert-title {
        font-size: 32px;
        font-weight: bold;
        line-height: 45px;
        text-align: center;
        margin: 32px 0 16px 0;
      }

      .alert-infor {
        background: #FAFAFA;
        border-radius: 8px;
        padding: 16px 18px;
        color: $depthTextColor;
        font-size: 32px;
        line-height: 48px;
        margin-bottom: 28px;
      }

      .small-title {
        @extend %displayFlex;
        color: $depthTextColor;
        font-size: 28px;
        font-weight: bold;
        line-height: 40px;
        margin-bottom: 16px;

        .line-block {
          margin: 0 16px 0 24px;
          width: 8px;
          height: 40px;
          background: $greenColor;
        }
      }

      .appoint-time {
        padding: 0px 36px;
        @extend %displayFlex;
        flex-wrap: wrap;
        width: 100%;
        margin-bottom: 24px;

        .time-item {
          width: calc((100vw - 144px) / 3);
          height: 72px;
          background: rgba(235, 248, 249, 1);
          border-radius: 8px;
          border: 2px solid rgba(8, 186, 198, 1);
          color: $depthTextColor;
          font-size: 30px;
          line-height: 42px;
          margin: 0 12px 24px;
          @extend %flexVC;
        }
      }

      .appoint-btn-block {
        @extend %flexVC;
        height: 144px;
        .appoint-delete {
          @include simpleButton(80px, 264px, 28px);
        }
        .appoint-save {
          @include deepButton(80px, 264px, 28px);
        }
      }
    }
  }

  .line-hr {
    @extend %lineHr;
  }
</style>
