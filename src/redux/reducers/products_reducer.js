import {
    GET_PRODUCT_LIST,
    SET_PRODUCTS_PENDING_STATUS,
    SET_SPECIFIC_PRODUCT,
    EDIT_PRODUCT,
    ON_CHANGE_PAGINATION,
    SET_NEW_PRODUCT,
    REMOVE_PRODUCT
} from '../actionTypes';
import _ from 'lodash'

const initState = {
    products: [],
    isPending: false,
    specificProduct: {},
    pagination: {
        total: 0,
        currentPage: 1,
        pageSize: 10
    }
}

export const productsReducer = (state = initState, action) => {
    switch (action.type) {
        case REMOVE_PRODUCT: {
            return {
                ...state,
                products: _.uniqBy(state.products.filter(item => {
                    return item.id !== action.payload
                }), 'id')
            }
        }
        case SET_NEW_PRODUCT: {
            return {
                ...state,
                products: _.uniqBy([action.payload].concat(state.products), 'id')
            }
        }
        case ON_CHANGE_PAGINATION: {
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    currentPage: action.payload
                }
            }
        }
        case EDIT_PRODUCT: {
            return {
                ...state,
                products: state.products.map(product => {
                    return product.id === action.payload.id
                        ? action.payload
                        : product
                }),
                specificProduct: action.payload
            }
        }
        case SET_SPECIFIC_PRODUCT: {
            return {
                ...state,
                specificProduct: action.payload
            }
        }
        case SET_PRODUCTS_PENDING_STATUS: {
            return {
                ...state,
                isPending: action.payload
            }
        }
        case GET_PRODUCT_LIST: {
            return {
                ...state,
                products: action.payload.products,
                pagination: {
                    ...state.pagination,
                    total: action.payload.totalCount
                }
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}