import Vuex from 'vuex';

const userStore = new Vuex.Store({
    state: {
        userInfo: {}
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo;
        }
    },
    mutations: {
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
        }
    },
    actions: {
        
    }
});

export default userStore;