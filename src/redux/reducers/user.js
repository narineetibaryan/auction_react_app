import {SET_LOGIN_USER, SET_USER_REDIRECT} from '../actionTypes'

const initState = {
    isAuth: false,
    isAdmin: false,
    user_id: 0,
    should_redirect: false
}

export const userReducer = (state = initState, action) => {
    switch (action.type) {
        case SET_LOGIN_USER: {
            return {
                ...state,
                should_redirect: false,
                isAuth: action.payload.status,
                isAdmin: !!action.payload.isAdmin,
                user_id: action.payload.user_id
            }
        }
        case SET_USER_REDIRECT: {
           localStorage.removeItem('access_token')
           return {
               ...state,
               isAuth: false,
               isAdmin: false,
               user_id: 0,
           }
        }
        default: {
            return {
                ...state
            }
        }
    }
}