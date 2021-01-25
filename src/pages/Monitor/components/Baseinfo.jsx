import React, { Component } from "react";
import PropTypes from "prop-types";
import { Row, Col, Tag, Spin } from "antd";

class MonitorBaseinfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            pcName: "",
            pcIP: "",
            pcCpu: "",
            pcDisk: "",
            pcMemory: "",
        };
    }

    // 监听baseInfo的值是否为空，不为空则更新数据
    componentDidUpdate = (prevProps, prevState) => {
        if (
            JSON.stringify(prevProps.baseInfo) !==
            JSON.stringify(this.props.baseInfo)
        ) {
            const baseInfoData = this.props.baseInfo;
            this.setState({
                loading: false,
                pcName: baseInfoData.owner,
                pcIP: baseInfoData.ip,
                pcCpu: baseInfoData.cpu,
                pcDisk: baseInfoData.disk,
                pcMemory: baseInfoData.mem,
            });

            // 传递数据给兄弟组件realtime
            this.context.onGetDiskAndMem(baseInfoData.disk, baseInfoData.mem);
        }
    };

    render() {
        const { loading, pcName, pcIP, pcCpu, pcDisk, pcMemory } = this.state;
        return (
            <div>
                <Spin spinning={loading}>
                    {loading ? null : (
                        <div>
                            <Tag color="processing">基本信息</Tag>
                            <Row>
                                <Col span={6}>
                                    <p>设备名称</p>
                                </Col>
                                <Col span={6}>{pcName}</Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <p>设备ip</p>
                                </Col>
                                <Col span={6}>{pcIP}</Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <p>cpu信息</p>
                                </Col>
                                <Col span={6}>{pcCpu}</Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <p>硬盘信息</p>
                                </Col>
                                <Col span={6}>{pcDisk}</Col>
                            </Row>
                            <Row>
                                <Col span={6}>
                                    <p>内存信息</p>
                                </Col>
                                <Col span={6}>{pcMemory}</Col>
                            </Row>
                        </div>
                    )}
                </Spin>
            </div>
        );
    }
}

// 声明要使用的context对象的属性
// (增加contextTypes后，MonitorBaseinfo内部就可以通过this.context.onGetDiskAndMem的方式访问方法onGetDiskAndMem)
MonitorBaseinfo.contextTypes = {
    onGetDiskAndMem: PropTypes.func,
};
export default MonitorBaseinfo;
