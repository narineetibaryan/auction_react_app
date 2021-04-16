import {createSelector} from "reselect";
import {getProductState} from "./get_all_products";


export const getProductsPagination = createSelector(getProductState, product_state => {
    return product_state.pagination
})