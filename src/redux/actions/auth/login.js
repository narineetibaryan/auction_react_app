import {SET_LOGIN_USER, SET_USER_REDIRECT} from '../../actionTypes'
import {API_HOST, API_URLS} from "../../../config";
import axios from "axios";
import {setProductsPendingStatus} from "../products/get_product_list";

export const login = payload => {
    return {
        type: SET_LOGIN_USER,
        payload
    }
}

export const logoutUser = () => async (dispatch) => {
    await axios.post(`${API_HOST}${API_URLS['logout']}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    })
    localStorage.removeItem('access_token')
}
export const shouldRedirect = payload => {
    return {
        type: SET_USER_REDIRECT
    }
}
export const loginUser = (creds) => async (dispatch) => {
    try {
        const response = await axios.post(`${API_HOST}${API_URLS['login']}`, creds)
        localStorage.setItem('access_token', response.data.access_token)
        dispatch(login({status: true, isAdmin: response.data.is_admin, user_id: response.data.user_id}))
        return true
    } catch (err) {
        dispatch(login({status: false, isAdmin: false}))
        dispatch(setProductsPendingStatus(false))
    }
}


export const getMe = () => async (dispatch) => {
    return axios.post(`${API_HOST}${API_URLS['me']}`, {}, {
        headers: {
            Authorization: `Bearer ${localStorage.access_token}`
        }
    }).then(response => {
        dispatch(login({status: true, isAdmin: response.data.is_admin, user_id: response.data.user_id}))
        return true
    }).catch(err => {
        dispatch(setProductsPendingStatus(false))
        if (err.status === 401) {
            dispatch(login({status: false, isAdmin: false}))
            return false
        }


    })
}
