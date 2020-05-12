import axios from "axios";

export const baseUrl = 'http://hmm'

const axiosInstance = axios.create ({
    baseURL: baseUrl
})

axiosInstance.interceptors.response.use(
    res => res.data,
    err => {
        console.log (err, "network err")
    }
)

export {
    axiosInstance
}