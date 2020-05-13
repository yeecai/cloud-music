import axios from "axios";

export const baseUrl = 'http://192.168.253.97:3000'

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