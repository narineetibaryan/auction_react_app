import {SET_QUERY, SET_SEARCH_RESULTS} from '../../actionTypes'
import {getAllProducts} from "../../selectors/get_all_products";
import {shouldRedirect} from "../auth/login";



export const setQuery = query => {
    return {
        type: SET_QUERY,
        payload: query
    }
}
export const setSearchResults = payload => {
    return {
        type: SET_SEARCH_RESULTS,
        payload
    }
}
export const onSearchProduct = (query) => async (dispatch, getState) => {
    try {
        const products = getAllProducts(getState())
        dispatch(setSearchResults(products?.filter(item => {
            return item?.name?.toLowerCase().includes(query?.toLowerCase())
        })))
    } catch (err) {
      dispatch(shouldRedirect(true))
    }
}