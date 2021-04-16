import {createSelector} from "reselect";
import {getProductState} from './get_all_products'
import {getSocketState} from "./socket-selector";
export const getLoaderStatus = createSelector([getProductState, getSocketState], (...args) => {
    let res = false
    for(const arg of args) {
        if(arg.isPending) {
            res = true
            break
        }
    }
    return res
})