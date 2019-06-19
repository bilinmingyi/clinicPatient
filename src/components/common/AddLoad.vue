<template>
  <div class="loaderBlock">
    <div class="loader-animation">
      <div class="loader2"></div>
    </div>
    <div class="loader-title">加载中...</div>
  </div>
</template>

<script>
export default {
  name: 'AddLoad'
}
</script>

<style scoped>
  .loaderBlock{
    position: relative;
    height: 50px;
    display: flex;
    justify-content: center;
    transform: translateZ(0);
  }
  .loader-animation {
    position: relative;
    width: 60px;
  }
  .loader-title {
    color: #7c7c7c;
    width: 120px;
    line-height: 50px;
  }
  .loader2{
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
  }
  .loader2,
  .loader2:before,
  .loader2:after
  {
    background: rgb(204, 204, 204);
    -webkit-animation: loaders2 1s infinite ease-in-out;
    animation: loaders2 1s infinite ease-in-out;
    width: 12px;
    height: 24px;
  }
  .loader2:before,
  .loader2:after {
    position: absolute;
    top:50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    content: '';
  }
  .loader2:before{
    left: -18px;
  }
  .loader2{
    text-indent: 0;
    -webkit-animation-delay: 0.16s;
    animation-delay: 0.16s;

  }
  .loader2:after{
    left: 18px;
    -webkit-animation-delay: 0.32s;
    animation-delay: 0.32s;
  }
  @-webkit-keyframes loaders2 {
    0%,80%, 100% {
      height: 24px;
    }
    40% {
      height: 36px;
    }
  }
  @keyframes loaders2 {
    0%,80%, 100% {
      height: 24px;
    }
    40% {
      height: 36px;
    }
  }
</style>
