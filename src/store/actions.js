import {
  fetchUser,
  fetchTopic,
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

  SET_USER: ({commit}, user = {}) => {
    commit('SET_USER', user)
  },

  FETCH_USER: ({ commit, state }, { loginname }) => {
    return state.user
      ? Promise.resolve(state.user)
      : fetchUser(loginname).then(user => commit('SET_USER', { user }))
  }
}
