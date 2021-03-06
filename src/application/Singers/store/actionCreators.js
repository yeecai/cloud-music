import {
    getTopSingerListRequest,
    getSingerListRequest
} from '../../../api/request'

import * as actionTypes from './constants'
import { fromJS } from 'immutable'

const changeSingerList = (data) => ({
    type: actionTypes.CHANGE_SINGER_LIST,
    data: fromJS(data)
})

export const changePageCount = data => ({
    type: actionTypes.CHANGE_PAGE_COUNT,
    data
})

export const changeEnterLoading = data => ({
    type: actionTypes.CHANGE_ENTER_LOADING,
    data
})

export const changePullUpLoading = data => ({
    type: actionTypes.CHANGE_PULLUP_LOADING,
    data
})

export const changePullDownLoading = data => ({
    type: actionTypes.CHANGE_PULLDOWN_LOADING,
    data
})

export const getTopSingerList = () => {
    return (dispatch) => {
        getTopSingerListRequest(0).then(res => {
            // const data = res.artists
            const data = res.code === 200? res.artists : []
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(() => {
            console.log('failed at getTopSingerList');
        })
    }
}

export const refreshMoreTopSingerList = () => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount'])
        const singerList = getState().getIn(['singers', 'singerList']).toJS()
        getTopSingerListRequest(pageCount).then(res => {
            const data = [...singerList, ...res.artists]
            dispatch(changeSingerList(data))
            dispatch(changePullUpLoading(false))
        }).catch(() => console.log('failed at refreshMoreTopSingerList '))
    }
}


export const getSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        getSingerListRequest(category, alpha, 0).then(res => {
            const data = res.code === 200 ? res.artists : []
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(() => console.log('failed at getSingerList'))
    }
}

export const refreshMoreSingerList = (category, alpha) => {
    return (dispatch, getState) => {
        const pageCount = getState().getIn(['singers', 'pageCount'])
        const singerList = getState().getIn(['singers', 'singerList']).toJS() // if list is empty there will be a undefined error
        getSingerListRequest(category, alpha, pageCount).then(res => {
            const data = [...singerList, ...res.artists]
            dispatch(changeSingerList(data))
            dispatch(changeEnterLoading(false))
            dispatch(changePullDownLoading(false))
        }).catch(() => console.log('failed at refreshMoreSingerList'))
    }
}