import {
    START_LISTEN_ON_URL,
    CHANGE_AMOUNT_OF_PRODUCT,
    SOCKET_HAS_BEEN_DISCONNECTED,
    SOCKET_HAS_BEEN_CONNECTED,
} from '../actionTypes'

const initState = {
    socket: {},
    listenedUrl: '',
    events: [],
    isPending: false,
    connected: false
}

export const socketReducer = (state = initState, action) => {
    switch (action.type) {
        case SOCKET_HAS_BEEN_CONNECTED: {
            return {
                ...state,
                connected: true
            }
        }
        case START_LISTEN_ON_URL: {
            const {socket, url: listenedUrl} = action.payload
            return {
                ...state,
                socket,
                listenedUrl,
            }
        }
        case CHANGE_AMOUNT_OF_PRODUCT: {
            return {
                ...state,
                events: [action.payload].concat(state.events)
            }
        }
        case SOCKET_HAS_BEEN_DISCONNECTED: {
            state.socket.removeAllListeners()
            return {
                socket: {},
                events: [],
                listenedUrl: '',
                connected: false
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}