export default {
  data () {
    return {
      maleImg: require('@/assets/img/mhz@2x.png'),
      femaleImg: require('@/assets/img/whz@2x.png'),
      classifiedImg: require('@/assets/img/bm.png')
    }
  },
  methods: {
    // 图片加载错误的时候
    error (item, e) {
      console.log(e)
      e.target.src = this.getNormalHead(item.sex) // 默认图
    },
    // 头像的默认图
    getNormalHead (sex) {
      let index = Number(sex)
      switch (index) {
        case 0:
          return this.classifiedImg
        case 1:
          return this.maleImg
        case 2:
          return this.femaleImg
      }
    },
    // 如果有图片传入 就用传入的图片 否则用默认图
    imgNormalToggle (url, item) {
      return url === '' ? this.getNormalHead(item.sex) : url
    }
  }
}
