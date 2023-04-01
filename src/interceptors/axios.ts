import axios from "axios";

let refresh = false

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true

        const {status, data} = await axios.get('refresh', {
            withCredentials: true
        })

        if (status === 200) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`

            return axios(error.config)
        }
    }
    refresh = false
    return error
})
