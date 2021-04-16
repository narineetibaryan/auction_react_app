import React from 'react'
import {Button, Card, Col, Empty} from "antd";
import {API_HOST} from "../config";
import _ from 'lodash'

export const ProductItem = ({product, onNavigate, onBit, isAdmin, handleRemoveProduct, openEditProductDialog}) => {
    return (
        <Col span={6}>
            <Card
                onClick={() => {
                    onNavigate(product)
                }}
                hoverable
                title={product.name}
                style={{width: 240}}
                cover={
                    <>
                        {product.image
                            ? <img
                                alt="example"
                                src={`${API_HOST}${product.image}`}
                                height={240}
                            />
                        :  <Empty />}
                    </>
                    }
            >
                {isAdmin ?
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <Button danger onClick={(e) => {
                            e.stopPropagation()
                            handleRemoveProduct(product.id)
                        }}>
                            Remove
                        </Button>
                        <Button type={'primary'} onClick={(e) => {
                            e.stopPropagation()
                            openEditProductDialog(product)
                        }}>Edit</Button>
                    </div> : null}
                <Card.Meta title={product.description}/>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '1rem'
                }
                }>
                    <div>
                        {_.isEmpty(product.bid) ? product.min_price : product?.bid?.amount}
                    </div>

                    <div>
                        <Button type='primary' style={{borderRadius: '20%'}} onClick={e => {
                            e.stopPropagation()
                            onBit(product)
                        }}>
                            Bid Now
                        </Button>
                    </div>
                </div>
            </Card>
        </Col>
    )
}