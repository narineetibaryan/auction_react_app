import React from 'react'
import {Button, Form, Input, Typography} from "antd";
import {useDispatch} from "react-redux";
import {loginUser} from "../redux/actions/auth/login";
import {useHistory} from "react-router-dom";


export const Auth = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const layout = {
        labelCol: {span: 8},
        wrapperCol: {span: 16},
    };
    const tailLayout = {
        wrapperCol: {offset: 8, span: 16},
    };
    const onFinish = (creds) => {
         dispatch(loginUser(creds)).then(res => {
             history.push('/home')
         })
    }
    const onFinishFailed = () => {

    }
    return (
        <>
            <Typography.Title>
                Login
            </Typography.Title>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                margin: '120px auto'
            }}>

                <Form
                    {...layout}
                    name="basic"
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[{required: true, message: 'Please input your email!',  type: 'email'}]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}