import React, { Component } from "react";
import { Row, Col, Form, Button, Input, message } from "antd";
import "../../assets/css/login.css";
import requestMethod from "../../utils/request";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
        };
    }

    hanleLogin() {}

    render() {
        // 表单样式
        const form = {
            margin: "auto",
        };
        const layout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
        };
        const tailLayout = {
            wrapperCol: { offset: 8, span: 16 },
        };
        // 表单事件
        const onFinish = (values) => {
            this.setState({
                username: values.username,
                password: values.password,
            });

            let store = window.sessionStorage;
            store.setItem("username", this.state.username);

            let loginData = {
                username: this.state.username,
                password: this.state.password,
            };

            requestMethod({
                url: "/login",
                method: "post",
                data: loginData,
            }).then((res) => {
                if (res.data === 1) {
                    message.success("登录成功");
                    this.props.history.replace("/home");
                }
            });
        };

        const onFinishFailed = (errorInfo) => {
            console.log("Failed:", errorInfo);
        };

        return (
            <div className="body-bg">
                <Row
                    style={{
                        width: "800px",
                        margin: "120px auto",
                        boxShadow: "0 0 10px #fff",
                    }}
                >
                    <Col span={12} className="left">
                        <div className="content">
                            <h1 style={{ color: "#fff" }}>欢迎登录</h1>
                            <p style={{ fontSize: "16px" }}>
                                集中化运维监控平台
                            </p>
                        </div>
                    </Col>
                    <Col span={12} className="right">
                        <Form
                            {...layout}
                            style={form}
                            size="large"
                            initialValues={{ remember: true }}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                        >
                            <Form.Item
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your username!",
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: "Please input your password!",
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>

                            <Form.Item {...tailLayout}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{ width: "100%" }}
                                    size="large"
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Login;
