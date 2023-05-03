import axios from "axios";
import {HistoryLog} from "@/models/HistoryLog";

export default {
    state: {
        history: []
    },
    getters: {
        history: (state: any) => state.history
    },
    mutations: {
        // @ts-ignore
        setHistory(state, data) {
            state.history = data
            console.log(state)
        }
    },
    actions: {
        // @ts-ignore
        async getHistory({commit}, data) {
            try {
                let axiosResponse = await axios.get(`http://localhost:5056/History/get_history?infraId=${data.infraId}&take=${data.take}`);
                console.log(axiosResponse.data)
                commit('setHistory', axiosResponse.data);
                return axiosResponse.data;
            } catch (error) {
                console.error(error);
            }
        }
    }
}
