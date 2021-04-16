import React, {memo, useCallback, useEffect, useState} from 'react'
import {Button, Empty, Input, Pagination, Row, Typography} from "antd";
import {useHistory} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {getAllProducts} from "../redux/selectors/get_all_products";
import {
    getAllProductsList,
    getOneProduct,
    setCurrentPage,
    setSpecificProduct
} from "../redux/actions/products/get_product_list";
import {ProductItem} from "../components/product_item";
import {bitProduct} from "../redux/actions/products/bit_product_amount";
import {getProductsPagination} from "../redux/selectors/get_product_pagination";
import {getSearchQuery} from "../redux/selectors/get_search";
import {onSearchProduct, setQuery} from "../redux/actions/search/get_results";
import {startListen} from "../redux/actions/socket/run-socket";
import _ from 'lodash'
import {AddProduct} from "../components/add_product";
import {removeProduct as deleteProduct} from "../redux/actions/products/remove";
import {EditProduct} from "../components/edit_product";
export const Home = memo(() => {
    const dispatch = useDispatch()
    const [isAdd, setIsAdd] = useState(false)
    const [isEdit, setIsEdit] = useState(false)
    const isAdmin = useSelector(state => state.user.isAdmin)
    const query = useSelector(getSearchQuery)
    const {currentPage, total, pageSize} = useSelector(getProductsPagination)
    const history = useHistory()
    const products = useSelector(getAllProducts)
    const onNavigate = (product) => {
        dispatch(getOneProduct(product.id))
        history.push(`/product_details/${product.id}`)
    }
    const handleBitItem = useCallback((item) => {
        dispatch(bitProduct(item))
    }, [dispatch])
    const onChangeQuery = (e) => {
        dispatch(setQuery(e.target.value))
    }
    const handleSearch = () => {
        dispatch(onSearchProduct(query))
        history.push('/search')
    }
    const closeAddProductModal = () => {
        setIsAdd(false)
    }
    const handleRemoveProduct = (product) => {
        dispatch(deleteProduct(product))
    }
    const openEditProductDialog = (product) => {
        dispatch(setSpecificProduct(product))
        setIsEdit(true)
    }
    const onPaginate = (page) => {
        const offset = page * pageSize - pageSize;
        dispatch(getAllProductsList({offset, limit: 10}))
        dispatch(setCurrentPage(page))
    }
    useEffect(() => {
        dispatch(getAllProductsList())
    }, [dispatch])
    useEffect(() => {
        dispatch(startListen('http://localhost:8080'))
        return () => {
            dispatch(setQuery(''))
        }
    }, [dispatch])
    return (
        <div >
            <div style={{
                marginBottom: '1rem'
            }}>
                <Typography.Title>
                    All Products
                </Typography.Title>
            </div>
            {isAdmin && <Button type='primary' onClick={() => {
                setIsAdd(true)
            }}>
                Add New
            </Button>}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Row gutter={[32, 24]}>
                    <Input.Search value={query} onChange={onChangeQuery} onPressEnter={handleSearch}/>
                    {
                        _.isEmpty(products)
                            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                            : products.map(product => {
                            return (
                                <div key={product.id}>
                                    <ProductItem
                                        openEditProductDialog={openEditProductDialog}
                                        product={product}
                                        onNavigate={onNavigate}
                                        onBit={handleBitItem}
                                        isAdmin={isAdmin}
                                        handleRemoveProduct={handleRemoveProduct}/>
                                </div>

                            )
                        })
                    }
                </Row>
            </div>
            <div style={{
                marginTop: '1rem'
            }}>{
                total > 0 && <Pagination
                    defaultCurrent={1}
                    current={currentPage}
                    total={total}
                    pageSize={pageSize}
                    onChange={(page) => {
                        onPaginate(page)

                    }}
                />
            }
            </div>
            {isAdd && <AddProduct onClose={closeAddProductModal}/>}
            {isEdit && <EditProduct onClose={() => setIsEdit(false)}/>}
        </div>

    )
})