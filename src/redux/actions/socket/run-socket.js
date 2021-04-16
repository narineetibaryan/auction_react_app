import {
    BID_UPDATE,
    ON_ADD_NEW_PRODUCT,
    ON_REMOVE_PRODUCT,
    SOCKET_HAS_BEEN_CONNECTED,
    SOCKET_HAS_BEEN_DISCONNECTED,
    SOCKET_PENDING_STATUS,
    START_LISTEN_ON_URL
} from '../../actionTypes'
import {io} from "socket.io-client";
import {setUpdatedProduct} from "../products/bit_product_amount";
import {removeProductFromList} from "../products/remove";
import {getProductsPagination} from "../../selectors/get_product_pagination";
import {getAllProductsList} from "../products/get_product_list";

export const startListenAc = (url, socket) => {
    return {
        type: START_LISTEN_ON_URL,
        payload: {
            url,
            socket
        }
    }
}
export const setSocketPendingStatus = status => {
    return {
        type: SOCKET_PENDING_STATUS,
        payload: status
    }
}
export const socketConnected = () => {
    return {
        type: SOCKET_HAS_BEEN_CONNECTED,
    }
}
export const setSocketDisconnected = () => {
    return {
        type: SOCKET_HAS_BEEN_DISCONNECTED
    }
}
export const startListen = (url) => (dispatch, getState) => {
    dispatch(setSocketPendingStatus(true))
    const {currentPage, pageSize} = getProductsPagination(getState())
    const socket = io(url, { transports : ['websocket']})
    socket.on(BID_UPDATE, (data) => {
        dispatch(setUpdatedProduct(data))
    })
    socket.on(ON_ADD_NEW_PRODUCT, data => {
        dispatch(getAllProductsList({offset: currentPage * pageSize - pageSize, limit: 10}))
    })
    socket.on(ON_REMOVE_PRODUCT, (data) => {
        dispatch(removeProductFromList(data))
    })
    if(socket.connected) {
        dispatch(socketConnected())
        dispatch(setSocketPendingStatus(false))
    }
    socket.on(SOCKET_HAS_BEEN_DISCONNECTED, () => {
        dispatch(setSocketDisconnected())
    })
    dispatch(startListenAc(url, socket))

}