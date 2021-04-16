import {createSelector} from "reselect";

export const getSocketState = state => state.socket

export const getSocketSelector = createSelector(getSocketState, socket_state => {
    return socket_state.socket
})

export const getSocketPendingStatus = createSelector(getSocketState, socket_state => {
    return socket_state.isPending
})