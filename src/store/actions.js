import {
  fetchUser,
  fetchTopic,
  fetchMessage,
  fetchIdsByType
} from '../api'

export default {
  // ensure data for rendering given list type
  FETCH_LIST_DATA: ({ commit, dispatch, state }, { type, page }) => {
    commit('SET_ACTIVE_TYPE', { type })
    return fetchIdsByType(type, page)
      .then((data) => {
        commit('SET_LIST', { type, data })
      })
  },

  FETCH_TOPIC: ({ commit, state }, { id }) => {
    return state.topics[id]
      ? Promise.resolve(state.topics[id])
      : fetchTopic(id).then(topic => commit('SET_TOPIC', { id, topic }))
  },

  SET_TOPIC: ({commit}, id, topic) => {
    commit('SET_TOPIC', { id, topic })
  },

  SET_LOGINUSER: ({commit}, user = {}) => {
    // 存如缓存，防止刷新丢失
    commit('SET_LOGINUSER', user)
  },

  FETCH_USER: ({ commit, state }, { loginname }) => {
    return fetchUser(loginname).then(user => commit('SET_USER', { user }))
  },

  FETCH_MESSAGE: ({ commit, state }, { accesstoken }) => {
    if (!accesstoken && state.cookies && state.cookies.user) {
      let user = JSON.parse(state.cookies.user)
      accesstoken = user ? user.token : ''
    }
    return fetchMessage(accesstoken).then(({has_read_messages, hasnot_read_messages}) => {
      let msg = {has_read_messages, hasnot_read_messages}
      return commit('SET_MESSAGE', msg)
    })
  }
}
