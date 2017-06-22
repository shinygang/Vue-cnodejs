export default {
  // items that should be currently displayed.
  // this Array may not be fully fetched.
  activeTopics (state, getters) {
    const { activeType, lists } = state
    return lists[activeType]
  }
}
