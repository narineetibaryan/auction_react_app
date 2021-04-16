import {
    GET_PRODUCT_LIST,
    ON_CHANGE_PAGINATION,
    SET_PRODUCTS_PENDING_STATUS,
    SET_SPECIFIC_PRODUCT
} from '../../actionTypes'
import axios from 'axios'
import {API_HOST, API_URLS} from "../../../config";
import {shouldRedirect} from "../auth/login";

const setProductList = payload => {
    return {
        type: GET_PRODUCT_LIST,
        payload
    }
}
export const setProductsPendingStatus = payload => {
    return {
        type: SET_PRODUCTS_PENDING_STATUS,
        payload
    }
}
export const setSpecificProduct = payload => {
    return {
        type: SET_SPECIFIC_PRODUCT,
        payload
    }
}
export const getAllProductsList = (params = {offset: 0, limit: 10}) => async (dispatch) => {
    try {
        dispatch(setProductsPendingStatus(true))
        const response = await axios.post(`${API_HOST}${API_URLS['products']}`, params, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })
        const {count: totalCount, products} = response.data.data
        dispatch(setProductList({products, totalCount}))
        dispatch(setProductsPendingStatus(false))
    } catch (err) {
        if(err.status === 401) {
            dispatch(shouldRedirect(true))
            dispatch(setProductsPendingStatus(false))
        }
    }
}
export const getOneProduct = (id) => async (dispatch) => {
    try {
        const response = await axios.get(`${API_HOST}${API_URLS['products']}/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })
        dispatch(setSpecificProduct(response.data))
    } catch(err){
        if(err.status === 401) {
            dispatch(shouldRedirect(true))
        }
        dispatch(setProductsPendingStatus(false))
    }
}
export const setCurrentPage = page => {
    return {
        type: ON_CHANGE_PAGINATION,
        payload: page
    }
}
