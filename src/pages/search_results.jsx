import React from 'react'
import {Button, Row} from "antd";
import {ProductItem} from "../components/product_item";
import {useDispatch, useSelector} from "react-redux";
import {getSearchResultsSelector} from "../redux/selectors/get_search";
import {setSpecificProduct} from "../redux/actions/products/get_product_list";
import {bitProduct} from "../redux/actions/products/bit_product_amount";
import {Link, useHistory} from "react-router-dom";


export const SearchResults = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const products = useSelector(getSearchResultsSelector)
    const onNavigate = (product) => {
        dispatch(setSpecificProduct(product))
        history.push(`/product_details/${product.id}`)
    }
    const handleBitItem = (item) => {
        dispatch(bitProduct(item))
    }
    return (
        <div style={{
            margin: '2rem'
        }}>
            <Link to='/home'>
                <Button type='primary'>
                    Back to Home
                </Button>
            </Link>
            <Row gutter={[32, 24]}>
                {
                    products.map(product => {
                        return (
                            <div key={product.id}>
                                <ProductItem product={product} onNavigate={onNavigate} onBit={handleBitItem}/>
                            </div>

                        )
                    })
                }
            </Row>
        </div>
    )
}