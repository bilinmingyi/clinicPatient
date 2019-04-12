<template>
  <div class="radio-group">
    <div v-for="item in data" :key="item.id">
      <input :id="item.id" type="radio"
             :name="name"
             :value="item.value"
             :checked="value==item.value"
             @click="setChecked(item.value)">
      <label :for="item.id">{{item.label}}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'radioGrounp',
  props: ['data', 'name', 'value'],
  methods: {
    setChecked (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="scss" scoped>
  .radio-group {
    @extend %flexV;
    justify-content: flex-start;

    div {
      margin-right: 64px;
    }

    input {
      visibility: hidden;

      &:checked + label::after {
        border: none;
        background-image: url('../../assets/img/xz.png');
        background-size: 40px 40px;
        content: '';
        width: 38px;
        height: 38px;
        margin: 2px 0 0 1px;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    label {
      position: relative;
      left: 20px;
      font-size: 32px;
      color: $lightTextColor;
      letter-spacing: 0;

      &::after {
        position: absolute;
        left: -56px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        content: "";
        border: 1px solid $lineColor;
        border-radius: 50%;
        background: $backColor;
      }
    }
  }

</style>
