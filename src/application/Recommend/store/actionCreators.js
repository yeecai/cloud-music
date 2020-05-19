import * as actionTypes from './constants'
import { fromJS } from "immutable";
import { getBannerRequest, getRecommendListRequest } from "../../../api/request";

export const changeBannerList = (data) => ({
    type: actionTypes.CHANGE_BANNER,
    data: fromJS(data)
})

export const changeRecommendList = (data) => ({
    type: actionTypes.CHANGE_RECOMMEND_LIST,
    data: fromJS(data)
})

export const getBannerList = () => {
    return (dispatch) => {
        getBannerRequest().then(data => {
            dispatch(changeBannerList(data.banners));
        }).catch(() => {
            console.log("banner list data error");
        })
    }
}
export const changeIfLoading = (data) => ({
    type: actionTypes.CHANGE_IF_LOADING,
    data: fromJS(data)
})

export const getRecommendList = () => {
    return (dispatch) => {
        getRecommendListRequest().then(data => {
            dispatch(changeRecommendList(data.result));
            dispatch(changeIfLoading(false))
        }).catch(() => { console.log("recommend list data error"); })
    }
}

