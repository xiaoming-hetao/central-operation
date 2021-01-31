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
import EditableTable from "../../../components/Modal/ThresholdSetting";
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
            editLoading: false,
            pcData: [],
            yuzhiData: [],
        };
    }

    // 从子组件EditableTable接收修改后的阈值数据
    handleEdit = (data) => {
        this.setState({
            yuzhiData: data,
        });
    };
    // 执行真正的修改逻辑
    handleUpdate = () => {
        this.setState({ editLoading: true });
        if (this.state.yuzhiData.length) {
            //如果修改值不为空
            let postData = this.state.yuzhiData;
            requestMethod({
                url: "/updateThreshold",
                method: "post",
                data: postData,
            }).then((res) => {
                if (res.data === 0) {
                    message.success("修改成功");
                } else {
                    message.success("修改失败");
                }
            });
            this.setState({ settingModalVisible: false });
        } else {
            //如果用户没有修改值，则给出提示
            message.info("请先编辑值或先保存值再点击修改");
        }
        this.setState({ editLoading: false });
    };

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
            editLoading,
            pcData,
        } = this.state;

        const detailModalColumns = [
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
                        columns={detailModalColumns}
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
                    width={720}
                    footer={[
                        <Button
                            key="back"
                            onClick={() => {
                                this.setState({ settingModalVisible: false });
                            }}
                        >
                            取消
                        </Button>,
                        <Button
                            key="submit"
                            type="primary"
                            loading={editLoading}
                            onClick={this.handleUpdate}
                        >
                            修改
                        </Button>,
                    ]}
                >
                    <EditableTable onEdit={this.handleEdit} />
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
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        this.setState({
                                            settingModalVisible: true,
                                        });
                                    }}
                                >
                                    监控设置
                                </Button>
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
