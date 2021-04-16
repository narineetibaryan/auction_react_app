import {createSelector} from "reselect";
import {getProductState} from "./get_all_products";

export const getSpecificProduct = createSelector(getProductState, product_state => {
    return product_state.specificProduct
})