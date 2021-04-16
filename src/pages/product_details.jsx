import React, {useCallback, useEffect} from 'react'
import {Avatar, Button, Card, Checkbox, Statistic, Typography} from "antd";
import {useDispatch, useSelector} from "react-redux";
import {getSpecificProduct} from "../redux/selectors/get_specific_product";
import {getOneProduct, setSpecificProduct} from "../redux/actions/products/get_product_list";
import {Link, useParams} from "react-router-dom";
import {bitProduct, enableAutoBid} from "../redux/actions/products/bit_product_amount";
import _ from "lodash";
import moment from "moment";
import {API_HOST} from "../config";


export const ProductDetails = () => {
    const {product_id} = useParams()
    const user_id = useSelector(state => state.user.user_id)
    const dispatch = useDispatch()
    const product = useSelector(getSpecificProduct)
    const handleBitItem = (item) => {
        dispatch(bitProduct(item))
    }
    useEffect(() => {
        if(_.isEmpty(product))  {
            dispatch(getOneProduct(product_id))
        }
        return () => {
            dispatch(setSpecificProduct({}))
        }
        //eslint-disable-next-line
    }, [dispatch])
    const checked = useCallback(() => {
        return product?.autobid?.some(item => item.user_id === user_id)
    }, [product, user_id])
    return (
        <div>
            <Typography.Title style={{
                marginBottom: '1rem'
            }}>
                Product Detail
            </Typography.Title>
            <Statistic.Countdown title="Countdown" value={moment(product.close_date)}/>

            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                margin: '2rem'
            }}>

                <div>
                    <Card
                        style={{width: 300}}
                        cover={
                            <img
                                alt="product"
                                src={`${API_HOST}${product.image}`}
                            />
                        }
                        actions={[
                            <div style={{display: 'flex', justifyContent: 'space-between', padding: '1rem'}}>
                                <div>
                                    <Checkbox
                                        disabled={checked()}
                                        checked={checked()} onChange={(val) => {
                                        dispatch(enableAutoBid(product, val))
                                    }}/>
                                    Enable Autobid
                                </div>
                                <div>
                                    <span style={{
                                        marginRight: '1rem'
                                    }}>{_.isEmpty(product.bid) ? product.min_price : product?.bid?.amount}</span>

                                    <Button
                                        type='primary'
                                        style={{borderRadius: '20%'}}
                                        onClick={(e) => {
                                        e.stopPropagation()
                                        handleBitItem(product)
                                    }}>
                                        Bid Now
                                    </Button>
                                </div>
                            </div>
                        ]}
                    >
                        <Card.Meta
                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
                            title={product.title}
                        />
                    </Card>
                </div>
                <div>
                    <Link to={'/home'}>
                        <Button>
                            Back to all products
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}