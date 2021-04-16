import {createSelector} from "reselect";

export const getProductState = state => state.products

export const getAllProducts = createSelector(getProductState, product_state => {
    return product_state.products
})