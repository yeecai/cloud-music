import { axiosInstance } from "./config";

export const getBannerRequest = () => {
    return axiosInstance.get('/banner')
}

export const getRecommendList = () => {
    return axiosInstance.get('/recommend')
}