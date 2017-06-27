export default {
  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activeTopics (state, getters) {
    const { activeType, lists } = state
    return lists[activeType]
  },
  getUser (state, getters) {
    const inBrowser = typeof window !== 'undefined'
    let user = {}
    if (state.user && state.user.token) {
      user = state.user
    } else if (inBrowser && window.sessionStorage && window.sessionStorage.user) {
      user = JSON.parse(window.sessionStorage.user)
    } else if (!inBrowser && state.cookies && state.cookies.user) {
      user = JSON.parse(state.cookies.user)
    }
    return user
  }
}
