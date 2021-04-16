import {ON_REMOVE_PRODUCT, REMOVE_PRODUCT} from '../../actionTypes'
import {setProductsPendingStatus} from "./get_product_list";
import {API_HOST, API_URLS} from "../../../config";
import axios from 'axios'
import {getSocketSelector} from "../../selectors/socket-selector";
import {shouldRedirect} from "../auth/login";

export const removeProductFromList = payload => {
    return {
        type: REMOVE_PRODUCT,
        payload
    }
}
export const removeProduct = (product) => async(dispatch, getState) => {
    dispatch(setProductsPendingStatus(true))
    const socket = getSocketSelector(getState())
    axios.delete(`${API_HOST}${API_URLS["product_delete"]}${product}`, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    }).then(() => {
        dispatch(removeProductFromList(product))
        socket.emit(ON_REMOVE_PRODUCT, product)
        dispatch(setProductsPendingStatus(false))
    }).catch(err => {
        if(err.status === 401) {
            dispatch(shouldRedirect(true))
        }
        dispatch(setProductsPendingStatus(false))
    })
}