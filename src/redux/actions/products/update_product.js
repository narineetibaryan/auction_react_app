import {setProductsPendingStatus} from "./get_product_list";
import axios from "axios";
import {API_HOST, API_URLS} from "../../../config";
import {getSocketSelector} from "../../selectors/socket-selector";
import {setUpdatedProduct} from "./bit_product_amount";
import {BID_UPDATE} from "../../actionTypes";
import {shouldRedirect} from "../auth/login";


export const updateProduct = (data, product) => async (dispatch, getState) => {
    try {
        const socket = getSocketSelector(getState())
        dispatch(setProductsPendingStatus(true))
        const response = await axios.post(`${API_HOST}${API_URLS['product_update']}${product}`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.access_token}`
            }
        })
        dispatch(setUpdatedProduct(response.data.data))
        socket.emit(BID_UPDATE, response.data.data)
        dispatch(setProductsPendingStatus(false))
    } catch (err) {
        if(err.status === 401) {
            dispatch(shouldRedirect(true))
        }
        dispatch(setProductsPendingStatus(false))
    }
}