export default {
  mounted () {
    // 处理刷新vuex中user丢失的情况
    if (!this.userInfo.userId && window.sessionStorage.user) {
      this.userInfo = JSON.parse(window.sessionStorage.user)
    }
  }
}
