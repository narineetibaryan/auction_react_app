import { combineReducers } from 'redux'
import {productsReducer as products} from './products_reducer'
import {searchReducer as search} from "./search_reducer";
import {socketReducer as socket} from "./socketReducer";
import {userReducer as user} from "./user";
export default combineReducers({
    products,
    search,
    socket,
    user
})
