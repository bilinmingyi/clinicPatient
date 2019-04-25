export default {
  data () {
    return {
      maleImg: require('@/assets/img/nan@2x.png'),
      femaleImg: require('@/assets/img/nv@2x.png'),
      classifiedImg: require('@/assets/img/bm.png'),
      malePatient: require('@/assets/img/mhz@2x.png'),
      femalePatient: require('@/assets/img/whz@2x.png')
    }
  },
  methods: {
    // 图片加载错误的时候
    error (sex, e, type = 'doctor') {
      return type === 'doctor'
        ? (e.target.src = this.getNormalHead(sex))
        : (e.target.src = this.getPatientImg(sex)) // 默认图
    },
    // 医生头像的默认图
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
    // 患者的默认头像
    getPatientImg (sex) {
      let index = Number(sex)
      switch (index) {
        case 0:
          return this.classifiedImg
        case 1:
          return this.malePatient
        case 2:
          return this.femalePatient
      }
    },
    // 如果有图片传入 就用传入的图片 否则用默认图
    imgNormalToggle (url, sex) {
      return url === '' ? this.getNormalHead(sex) : url
    }
  }
}
