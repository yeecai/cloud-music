import * as actionTypes from './constants'
import { fromJS } from "immutable";

const defaultState = fromJS({
    bannerList: [],
    recommendList: [],
    isLoading: true
});

export default (state = defaultState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_BANNER:
            return state.set('bannerList', action.data);
        case actionTypes.CHANGE_RECOMMEND_LIST:
            return state.set('recommendList', action.data);
        case actionTypes.CHANGE_IF_LOADING:
            return state.set('isLoading', action.data)
        default:
            return state
    }
}