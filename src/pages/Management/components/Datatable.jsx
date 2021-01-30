import React, { Component } from "react";
import {
    Table,
    Button,
    Space,
    Modal,
    Form,
    Input,
    Select,
    message,
    Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import requestMethod from "../../../utils/request";

class Datatable extends Component {
    constructor() {
        super();
        this.state = {
            pcData: [],
            editModalVisible: false,
            editLoading: false,
            pcGroup: "",
            pcName: "",
            pcIP: "",
        };
    }

    handleSelectChange = (value) => {
        console.log(value);
        this.setState({ pcGroup: value });
    };

    handleInputChange = (e) => {
        this.setState({ pcName: e.target.value });
    };

    handleEditCancel = () => {
        this.setState({
            editModalVisible: false,
        });
    };

    openEditModal = (record) => {
        this.setState({
            editModalVisible: true,
            pcGroup: record.pcGroup,
            pcName: record.pcName,
            pcIP: record.pcIP,
        });
    };

    // 提交修改后的数据
    handleEdit = () => {
        this.setState({
            editLoading: true,
        });
        let editData = {
            pcName: this.state.pcName,
            pcGroup: this.state.pcGroup,
            pcIP: this.state.pcIP,
        };
        requestMethod({
            url: "/updateHost",
            method: "post",
            data: editData,
        }).then((res) => {
            if (res.data === 0) {
                message.success("修改成功");
                setTimeout(() => {
                    this.componentDidMount(); //更新表格数据
                }, 2000);
            }
        });

        this.setState({
            editModalVisible: false,
            editLoading: false,
        });
    };

    // 删除设备
    handleDelete = (record) => {
        let deleteData = {
            pcIP: record.pcIP,
        };
        requestMethod({
            url: "/deleteHost",
            method: "post",
            data: deleteData,
        }).then((res) => {
            if (res.data === 0) {
                message.success("删除成功");
            }
        });

        setTimeout(() => {
            this.componentDidMount();
        }, 1000);
    };

    componentDidMount() {
        requestMethod({
            url: "/getHosts",
            method: "get",
        }).then((res) => {
            const data = res.data.data;
            let handleData = [];
            // 数据表格要求每个数据项都要有一个key
            for (let i = 0; i < data.length; i++) {
                handleData.push({ key: i, ...data[i] });
            }
            this.setState({
                pcData: handleData,
            });
        });
    }

    render() {
        const { Option } = Select;
        const {
            pcData,
            pcGroup,
            pcName,
            editModalVisible,
            editLoading,
        } = this.state;
        const layout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 20 },
        };

        const columns = [
            {
                title: "组",
                dataIndex: "pcGroup",
                key: "pcGroup",
            },
            {
                title: "设备名称",
                dataIndex: "pcName",
                key: "pcName",
            },
            {
                title: "设备ip",
                dataIndex: "pcIP",
                key: "pcIP",
            },
            {
                title: "端口",
                key: "pcPort",
                dataIndex: "pcPort",
            },
            {
                title: "操作",
                key: "操作",
                render: (text, record) => (
                    <Space size="middle">
                        <Button
                            type="primary"
                            icon={<EditOutlined />}
                            onClick={() => this.openEditModal(record)}
                        >
                            编辑
                        </Button>
                        <Popconfirm
                            title="确定删除该设备吗？"
                            okText="确定"
                            cancelText="取消"
                            placement="rightTop"
                            onConfirm={() => this.handleDelete(record)}
                        >
                            <Button
                                type="primary"
                                danger
                                icon={<DeleteOutlined />}
                            >
                                删除
                            </Button>
                        </Popconfirm>
                    </Space>
                ),
            },
        ];

        return (
            <div>
                {/* 修改设备信息模态框 */}
                <Modal
                    visible={editModalVisible}
                    title="修改设备信息"
                    centered="true"
                    onCancel={this.handleEditCancel}
                    footer={[
                        <Button key="back" onClick={this.handleEditCancel}>
                            取消
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={editLoading}
                            onClick={this.handleEdit}
                        >
                            修改
                        </Button>,
                    ]}
                >
                    <Form {...layout} size="large">
                        <Form.Item label="设备组别">
                            <Select
                                allowClear
                                onChange={this.handleSelectChange}
                                placeholder="请选择组"
                                value={pcGroup}
                            >
                                <Option value="lpc">lpc</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item label="设备名称">
                            <Input
                                name="pcName"
                                autoComplete="off"
                                onChange={this.handleInputChange}
                                value={pcName}
                            />
                        </Form.Item>
                    </Form>
                </Modal>

                <Table columns={columns} dataSource={pcData} />
            </div>
        );
    }
}

export default Datatable;
