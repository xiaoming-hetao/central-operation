import React, { Component } from "react";
import { Table, Button, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import requestMethod from "../../../utils/request";

class Datatable extends Component {
    constructor() {
        super();
        this.state = { pcData: [] };
    }

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
                        <Button type="primary" icon={<EditOutlined />}>
                            编辑
                        </Button>
                        <Button type="primary" danger icon={<DeleteOutlined />}>
                            删除
                        </Button>
                    </Space>
                ),
            },
        ];

        const { pcData } = this.state;

        return (
            <div>
                <Table columns={columns} dataSource={pcData} />
            </div>
        );
    }
}

export default Datatable;
