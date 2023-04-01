import { createStore } from 'vuex'
import axios from "axios";

export default createStore({
    state: {
        loggedIn: false,
        user: {
            id: -1,
            name: '',
            login: '',
            email: '',
        },
        access_token: '',
        refresh_token: '',
        environments: [],
    },
    getters: {
        loggedIn: state => state.loggedIn,
        user: state => state.user,
        environments: state => state.environments.map((env: any) => {
            return {
                title: env.name,
                value: env.infrastructure_id
            }
        }),
        environment: (state) => (id: number) => state.environments.find((env: any) => env.infrastructure_id === id),
    },
    mutations: {
        async loggedIn(state, data) {
            state.loggedIn = true;
            state.user = data.user;
            state.access_token = data.accessToken;
            state.refresh_token = data.refreshToken;

            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);
        },
        setEnvironments(state, data) {
            state.environments = data;
        },
        setToken(state, data) {
            state.refresh_token = data.refreshToken
        }
    },
    actions: {
        setLoggedIn({ commit }, data) {
            commit('loggedIn', data);
        },
        getTokensFromStorage({ commit }) {
            let refreshToken = localStorage.getItem('refreshToken')
            commit('setToken', {refreshToken: refreshToken})
        },
        async login({ commit }, { email, password }) {

            let axiosResponse = await axios.post('https://localhost:7293/account/auth', {
                "Login": email,
                "Password": password
            })

            if (axiosResponse.status === 200) {
                await commit('loggedIn', axiosResponse.data);
            }

            return axiosResponse.status === 200;
        },
        async refresh({ commit }) {
            try {
                let axiosResponse = await axios.get('https://localhost:7293/account/refresh')

                if (axiosResponse.status === 200) {
                    await commit('loggedIn', axiosResponse.data);
                }
            } catch (e) {
                console.log('refresh exception')
            }
        },
        async getUserEnvironments({ commit }) {
            try {
                let axiosResponse = await axios.get(`https://localhost:7030/Infrastructure/get_infrastructures_for_user?id=${this.state.user.id}`);
                commit('setEnvironments', axiosResponse.data);
                return axiosResponse.data;
            } catch (error) {
                console.error(error);
            }
        }
    },
    modules: {
    }
})
