export default {
  methods: {
    scrollToTop () {
      try {
        window.scrollTo(0, 0)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
