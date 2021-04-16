import {createSelector} from "reselect";


const getSearchState = state => state.search


export const getSearchResultsSelector = createSelector(getSearchState, search_state => {
    return search_state.results
})

export const getSearchQuery = createSelector(getSearchState, search_state => {
    return search_state.query
})