import Vue from 'vue'
import Vuex from 'vuex'
import socket from './module/socket.js'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: true,
        hasLogin: false,
        userName: "",
		s_token: '',
    },
    mutations: {
        login(state, token) {
            state.hasLogin = true;
			state.s_token = token;
        },
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
			state.s_token = '';
        }
    },
	modules: {
		socket
	}
})

export default store
