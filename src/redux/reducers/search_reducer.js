import {SET_QUERY, SET_SEARCH_RESULTS} from '../actionTypes'



const initState = {
    isPending: false,
    results: [],
    query: ''
}

export const searchReducer = (state = initState, action) => {
    switch(action.type) {
        case SET_QUERY:{
          return {
              ...state,
              query: action.payload
          }
        }
        case SET_SEARCH_RESULTS: {
            return {
                ...state,
                results: action.payload
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}