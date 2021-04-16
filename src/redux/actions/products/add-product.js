import {ON_ADD_NEW_PRODUCT, SET_NEW_PRODUCT} from '../../actionTypes'
import {getAllProductsList, setProductsPendingStatus} from "./get_product_list";
import {API_HOST, API_URLS} from "../../../config";
import axios from 'axios'
import {getSocketSelector} from "../../selectors/socket-selector";
import {getProductsPagination} from "../../selectors/get_product_pagination";
import {shouldRedirect} from "../auth/login";

export const setNewProduct = payload => {
    return {
        type: SET_NEW_PRODUCT,
        payload
    }
}
export const addProduct = (data) => async (dispatch, getState) => {
    try {
        const {currentPage, pageSize} = getProductsPagination(getState())
        dispatch(setProductsPendingStatus(true))
        const socket = getSocketSelector(getState())
        const response = await axios.post(`${API_HOST}${API_URLS['create_product']}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })
        socket.emit(ON_ADD_NEW_PRODUCT, response.data.data)
        dispatch(getAllProductsList({offset: currentPage * pageSize - pageSize, limit: 10}))
        dispatch(setProductsPendingStatus(false))
    } catch (err) {
        if(err.status === 401) {
            dispatch(shouldRedirect(true))
        }
        dispatch(setProductsPendingStatus(false))
    }
}