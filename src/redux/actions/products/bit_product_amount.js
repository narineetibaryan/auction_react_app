import {BID_UPDATE, EDIT_PRODUCT} from '../../actionTypes'
import {getSocketSelector} from "../../selectors/socket-selector";
import {API_HOST, API_URLS} from "../../../config";
import axios from 'axios'
import {getOneProduct, setProductsPendingStatus} from "./get_product_list";
import {shouldRedirect} from "../auth/login";
const config = () => {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    }
}
export const setUpdatedProduct = payload => {
    return {
        type:  EDIT_PRODUCT,
        payload
    }
}
export const bitProduct = (product) => async (dispatch, getState) => {
    try {
        const socket = getSocketSelector(getState())
        const amount = product.bid ? product.bid.amount + 1 : product.min_price + 1
        const data = {product_id: product.id, amount}
        axios.post(`${API_HOST}${API_URLS['bid_product']}`, data, config()).then(res => {
            socket.emit(BID_UPDATE, res.data.data)
            dispatch(setUpdatedProduct(res.data.data))
        })

    } catch (err) {
        if(err.status === 401) {
            dispatch(shouldRedirect(true))
            dispatch(setProductsPendingStatus(false))
        }
    }
}

export const enableAutoBid = (product, val) => async (dispatch) => {
    try {
     axios.get(`${API_HOST}${API_URLS['auto_bid_product']}/${product.id}` , config()).then(res => {
         dispatch(getOneProduct(product.id))
     })


    }catch (err) {
        if(err.status === 401) {
            dispatch(shouldRedirect(true))
        }
        dispatch(setProductsPendingStatus(false))
    }

}