import React, { Component } from "react";
import {
    Tag,
    Divider,
    List,
    Button,
    Space,
    Select,
    message,
    Modal,
    Table,
} from "antd";
import requestMethod from "../../../utils/request";

const { Option } = Select;

class MonitorHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            pcStateData: [],
            pcIPSelected: "",
            detailModalVisible: false,
            settingModalVisible: false,
            pcData: [],
        };
    }

    onChange = (value) => {
        this.setState({
            pcIPSelected: value,
        });
    };

    // 查看设备信息
    handleCheck = () => {
        const pcIP = this.state.pcIPSelected;
        if (!pcIP) {
            message.info("请先选择设备ip");
        } else {
            // 调用父组件的方法执行真正的查看逻辑
            this.props.onCheck(pcIP);
        }
    };

    componentDidMount() {
        requestMethod({
            url: "/getStateNum",
            method: "get",
        }).then((res) => {
            console.log(res.data);
            const response = res.data;
            let data = [
                { title: "磁盘将满", count: response.highDict },
                { title: "内存过高", count: response.highRam },
                { title: "CPU负载过高", count: response.highCpu },
            ];
            this.setState({
                total: response.total,
                pcStateData: data,
            });
        });

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
        const {
            total,
            pcStateData,
            detailModalVisible,
            settingModalVisible,
            pcData,
        } = this.state;
        const columns = [
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
                title: "主要问题",
                key: "mainProblem",
                dataIndex: "mainProblem",
            },
        ];
        return (
            <div>
                <Modal
                    visible={detailModalVisible}
                    title="设备详情"
                    centered="true"
                    onCancel={() => {
                        this.setState({ detailModalVisible: false });
                    }}
                    footer={null}
                >
                    <Table
                        columns={columns}
                        dataSource={pcData}
                        bordered="true"
                    />
                </Modal>

                <Modal
                    visible={settingModalVisible}
                    title="监控阈值设置"
                    centered="true"
                    onCancel={() => {
                        this.setState({ settingModalVisible: false });
                    }}
                    footer={null}
                >
                    <Table
                        columns={columns}
                        dataSource={pcData}
                        bordered="true"
                    />
                </Modal>

                <Tag color="processing">设备概况</Tag>
                <List
                    header={<div>本平台共管理 {total} 设备</div>}
                    footer={
                        <div>
                            <Space size="middle">
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            detailModalVisible: true,
                                        });
                                    }}
                                >
                                    查看详情
                                </Button>
                                <Button type="primary">监控设置</Button>
                            </Space>
                        </div>
                    }
                    bordered
                    dataSource={pcStateData}
                    renderItem={(item) => (
                        <List.Item>
                            {item.count} 台{item.title}
                        </List.Item>
                    )}
                />

                <Divider />

                <Tag color="processing">搜索</Tag>
                <div>
                    <Space size="middle">
                        <span>请选择设备ip(可输入搜索)</span>
                        <Select
                            showSearch
                            allowClear
                            onChange={this.onChange}
                            style={{ width: 200 }}
                            placeholder="请选择或者输入"
                        >
                            <Option value="106.54.251.66">106.54.251.66</Option>
                        </Select>
                        <Button type="primary" onClick={this.handleCheck}>
                            查看
                        </Button>
                    </Space>
                </div>
            </div>
        );
    }
}

export default MonitorHeader;
