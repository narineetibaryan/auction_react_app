import React, {useEffect, useState} from 'react'
import {Alert, Button, DatePicker, Form, Input, InputNumber, Modal, Upload} from "antd";
import moment from 'moment'
import {useDispatch, useSelector} from "react-redux";
import {getSpecificProduct} from "../redux/selectors/get_specific_product";
import {updateProduct} from "../redux/actions/products/update_product";
import _ from 'lodash'
export const EditProduct = ({onClose}) => {
    const dateFormat = 'YYYY-MM-DD';
    const specificProduct = useSelector(getSpecificProduct)
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const [product, setProduct] = useState({
        close_date: moment().add(1, 'day'),
        min_price: 50,
        description: '',
        name: '',
        image: '',
        image_preview: [],
        error_message: '',
        ...specificProduct
    })

    const disabledDate = (current) => {
        return current < moment().endOf('day');
    }
    const uploadProps = {
        accept: 'image/*',
        listType: 'picture-card',
        name: 'file',
        fileList: product.image_preview,
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        showUploadList: true,
        customRequest: ({file}) => {
            const file_size = file.size / 1024
            setProduct({
                ...product,
                image: file,
                image_preview: [
                    {
                        ...file,
                        url: URL.createObjectURL(file),
                        status: file_size >= 2048 ? 'error' : file.status,
                    }],
                error_message: file_size >= 2048 ? 'The image may not be greater than 2048 kilobytes' : ''
            })
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        const data = {...product}
        const formData = new FormData()
        for (const key in data) {
            if (key === 'image_preview' || specificProduct[key] === data[key] || key === 'error_message') {
                continue
            }
            if(key === 'close_date') {
                formData.append(key, moment(product[key]).format(dateFormat))
                continue
            }
            formData.append(key, product[key])
        }
        dispatch(updateProduct(formData, specificProduct.id))
        onClose()
    }
    const isDisabled = () => {
        let res = false
        for(const key in product){
            if(key === 'image' || key === 'image_preview' || key === 'error_message' || key === 'bid') {
                continue
            }
            if(!product[key] || product.error_message.trim()) {
                res = true
                break
            }
        }
        return res
    }
    useEffect(() => {
        if(!_.isEmpty(specificProduct)) {
           setProduct({...product, ...specificProduct})
        }
        //eslint-disable-next-line
    }, [specificProduct])
    useEffect(() => {
        if (product.error_message.trim()) {
            setTimeout(() => {
                setProduct({...product, error_message: '', image_preview: []})
            }, 4000)
        }
    }, [product])
    return (
        <Modal visible onCancel={onClose} footer={null} title={'Add New Product'}>
            <Form
                form={form}
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                layout="horizontal"
                initialValues={{specificProduct}}
                size={'default'}
            >
                <Form.Item
                    shouldUpdate
                    rules={[{ required: true, message: 'Please input product name!' }]}
                    label="Name"
                    name='name'>
                    <Input
                        defaultValue={specificProduct.name}
                        value={product.name} onChange={(e) => {
                        setProduct({...product, name: e.target.value})
                    }}/>
                </Form.Item>
                <Form.Item
                    shouldUpdate
                    rules={[{ required: true, message: 'Please input product description!' }]}
                    label="Description"
                    name='description'>
                    <Input
                        defaultValue={specificProduct.description}
                        value={product.description} onChange={(e) => {
                        setProduct({...product, description: e.target.value})
                    }}/>
                </Form.Item>
                <Form.Item
                    shouldUpdate
                    rules={[{ required: true, message: 'Please input product close date!' }]}
                    label="Close Date">
                    <DatePicker
                        disabledDate={disabledDate}
                        format={dateFormat}
                        value={moment(product.close_date)}
                        defaultValue={product.close_date}
                        onChanage={(val) => {
                            setProduct({...product, close_date: val})
                        }}/>
                </Form.Item>
                <Form.Item
                    shouldUpdate
                    rules={[{ required: true, message: 'Please input product minimum price!' }]}
                    label="Price" name='min_price'>
                    <InputNumber
                        defaultValue={specificProduct.min_price}
                        min={50}
                        value={product.min_price} onChange={value => {
                        setProduct({...product, min_price: value})
                    }}/>
                </Form.Item>
                <Form.Item label="Image">
                    <Upload {...uploadProps}>
                        <Button type='primary'>Upload</Button>
                    </Upload>
                </Form.Item>
                <Form.Item>
                    {product.error_message
                    && <Alert
                        style={{
                            marginBottom: '1rem'
                        }}
                        message={product.error_message} type={"error"}/>}
                    <Button
                        disabled={isDisabled()}
                        type={'primary'}
                        onClick={handleSubmit}>
                        Edit Product
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )

}