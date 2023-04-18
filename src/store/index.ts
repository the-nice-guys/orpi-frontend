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
        loaded: false
    },
    getters: {
        loggedIn: state => state.loggedIn,
        user: state => state.user,
        environments: state => state.environments.map((env: any) => {
            return {
                title: env.name,
                value: env
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
            state.loaded = true;
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

            let axiosResponse = await axios.post('http://localhost:5050/account/auth', {
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
                let axiosResponse = await axios.get('http://localhost:5050/account/refresh')

                if (axiosResponse.status === 200) {
                    await commit('loggedIn', axiosResponse.data);
                }
            } catch (e) {
                console.log('refresh exception')
            }
        },
        async getUserEnvironments({ commit }) {
            try {
                let axiosResponse = await axios.get(`http://localhost:5175/Infrastructure/get_infrastructures_for_user?id=${this.state.user.id}`);
                commit('setEnvironments', axiosResponse.data);
                return axiosResponse.data;
            } catch (error) {
                console.error(error);
            }
        },
        async createEnvironment({commit}, data) {
            try {
                let axiosResponse = await axios.post(
                    `http://localhost:5175/Infrastructure/create_infrastructure`,
                    {
                        userId: this.state.user.id,
                        Infrastructure: data
                    });
                this.dispatch('getUserEnvironments');
            } catch (error) {
                console.error(error);
            }
        },
        async deployEnvironment({commit}, data) {
            try {
                data.Infrastructure.hosts.forEach((host: any) => {
                    host.services.forEach((service: any) => {
                        service.ip = host.ip + ':5732'
                    })
                })
                console.log(data)
                let axiosResponse = await axios.post(
                    'http://localhost:5287/Coordinator/deploy-infrastructure',
                    {
                        infrastructure: data.Infrastructure
                    }
                )
                if (axiosResponse.data == false) {
                    console.log('something wrong')
                }
                return axiosResponse.data
            } catch (error) {
                console.error(error);
            }
        },
        async startEnvironment({commit}, data) {
            try {
                data.Infrastructure.hosts.forEach((host: any) => {
                    host.services.forEach((service: any) => {
                        service.ip = host.ip + ':5732'
                    })
                })
                console.log(data)
                let axiosResponse = await axios.post(
                    'http://localhost:5287/Coordinator/start-infrastructure',
                    {
                        infrastructure: data.Infrastructure
                    }
                )
                console.log(axiosResponse.data)
                if (axiosResponse.data == false) {
                    console.log('something wrong')
                }
                return axiosResponse.data
            } catch (error) {
                console.error(error);
            }
        },
        async stopEnvironment({commit}, data) {
            try {
                data.Infrastructure.hosts.forEach((host: any) => {
                    host.services.forEach((service: any) => {
                        service.ip = host.ip + ':5732'
                    })
                })
                console.log(data)
                let axiosResponse = await axios.post(
                    'http://localhost:5287/Coordinator/stop-infrastructure',
                    {
                        infrastructure: data.Infrastructure
                    }
                )
                console.log(axiosResponse.data)
                if (axiosResponse.data == false) {
                    console.log('something wrong')
                }
                return axiosResponse.data
            } catch (error) {
                console.error(error);
            }
        }
    },
    modules: {
    }
})
