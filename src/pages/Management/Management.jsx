import React, { Component } from "react";

import { Form, Input, Modal, Button, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import requestMethod from "../../utils/request";
import Datatable from "./components/Datatable";

class Management extends Component {
    constructor() {
        super();
        this.state = {
            connectLoading: false,
            finishLoading: false,
            visible: false,
            linkSuccess: "",
            // 表单字段
            pcName: "",
            formpcIP: "",
            pcGroup: "",
            loginName: "",
            loginPassword: "",
            pcPort: "",
        };
    }

    // 获取表单字段的值
    handleChange = (e) => {
        const name = e.target.name;
        if (name === "pcName") {
            this.setState({
                pcName: e.target.value,
            });
        } else if (name === "formpcIP") {
            this.setState({
                formpcIP: e.target.value,
            });
        } else if (name === "pcGroup") {
            this.setState({
                pcGroup: e.target.value,
            });
        } else if (name === "loginName") {
            this.setState({
                loginName: e.target.value,
            });
        } else if (name === "loginPassword") {
            this.setState({
                loginPassword: e.target.value,
            });
        } else if (name === "pcPort") {
            this.setState({
                pcPort: e.target.value,
            });
        }
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    handleCancel = () => {
        this.setState({
            visible: false,
        });
    };

    // 连接测试
    handleLink = () => {
        this.setState({
            connectLoading: true,
        });
        let linkData = {
            ip: this.state.formpcIP,
            port: this.state.pcPort,
            user: this.state.loginName,
            pass: this.state.loginPassword,
        };

        requestMethod({
            url: "/ping",
            method: "post",
            data: linkData,
        }).then((res) => {
            if (res.data === true) {
                message.success("连接成功");
                this.setState({
                    connectLoading: false,
                    linkSuccess: "success",
                });
            } else {
                message.error("连接失败，请检查设备信息");
                this.setState({
                    connectLoading: false,
                });
            }
        });
    };

    // 提交表单
    handleAddpc = () => {
        this.setState({ finishLoading: true });
        if (this.state.linkSuccess === "success") {
            let addData = {
                pcName: this.state.pcName,
                pcIP: this.state.formpcIP,
                pcPort: this.state.pcPort,
                pcGroup: this.state.pcGroup,
                loginName: this.state.loginName,
                loginPassword: this.state.loginPassword,
            };
            requestMethod({
                url: "/addHost",
                method: "post",
                data: addData,
            }).then((res) => {
                if (res.data === 1) {
                    message.success("添加成功");

                    //  setTimeout(function(){
                    //    that.$store.dispatch('getPcData');//更新表格数据
                    //  },3000);
                } else {
                    message.error("添加失败,设备ip已存在");
                    this.setState({ finishLoading: false, visible: false });
                }
            });
        } else {
            message.info("请先进行连接测试");
            this.setState({ finishLoading: false });
        }
    };
    render() {
        const { visible, finishLoading, connectLoading } = this.state;
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        return (
            <div>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={this.showModal}
                >
                    新增
                </Button>

                <Modal
                    visible={visible}
                    title="添加设备"
                    centered="true"
                    style={{ textAlign: "center" }}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button
                            key="back"
                            loading={connectLoading}
                            onClick={this.handleLink}
                        >
                            连接测试
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={finishLoading}
                            onClick={this.handleAddpc}
                        >
                            完成
                        </Button>,
                    ]}
                >
                    <Form
                        {...layout}
                        size="large"
                        initialValues={{ remember: true }}
                    >
                        <Form.Item label="设备名称">
                            <Input
                                name="pcName"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="设备ip">
                            <Input
                                name="formpcIP"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="组">
                            <Input
                                name="pcGroup"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="登录名">
                            <Input
                                name="loginName"
                                autoComplete="off"
                                onChange={this.handleChange}
                            />
                        </Form.Item>

                        <Form.Item label="密码">
                            <Form.Item>
                                <Input.Password
                                    name="loginPassword"
                                    onChange={this.handleChange}
                                />
                            </Form.Item>

                            <span>ssh端口</span>
                            <Form.Item>
                                <Input
                                    name="pcPort"
                                    autoComplete="off"
                                    onChange={this.handleChange}
                                />
                            </Form.Item>
                        </Form.Item>
                    </Form>
                </Modal>

                <Datatable />
            </div>
        );
    }
}

export default Management;
