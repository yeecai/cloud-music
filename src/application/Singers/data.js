// let's make a redux-hooks

import React, { createContext, useReducer } from 'react'
import { fromJS } from 'immutable'

export const CategoryDataContext = createContext({})
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_CATEGORY:
            return state.set('category', action.data)
        case CHANGE_ALPHA:
            return state.set('alpha', action.data)
        default:
            return state
    }
}

//Provider
export const Data = props => {
    const [data, dispatch] = useReducer(reducer, fromJS({
        category: '',
        alpha: ''
    }))

    return (
        <CategoryDataContext.Provider value={{ data, dispatch }}>
            {props.children} 
            {/* why props.children in provider */}
            {/* {"well, if no props.children, the child nodes won't show up."} */}
        </CategoryDataContext.Provider>
    )
}