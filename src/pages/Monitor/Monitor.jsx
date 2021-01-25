import React, { Component } from "react";
import { Divider } from "antd";
import PropTypes from "prop-types"; //属性校验
import requestMethod from "../../utils/request";
import MonitorHeader from "./components/Header";
import MonitorBaseinfo from "./components/Baseinfo";
import MonitorRealtime from "./components/Realtime";

class Monitor extends Component {
    constructor() {
        super();
        this.state = {
            baseInfo: {},
            disk: 0,
            mem: 0,
            ip: "",
            show: false,
        };
    }

    // 创建context对象，包含onGetDiskAndMem
    getChildContext = () => {
        return { onGetDiskAndMem: this.handleGetDiskAndMem };
    };
    handleGetDiskAndMem = (pcDisk, pcMemory) => {
        this.setState({
            disk: pcDisk,
            mem: pcMemory,
        });
    };

    handleCheck = (pcIPSelected) => {
        this.setState({
            ip: pcIPSelected,
        });
    };

    // 监听组件内部状态的变化
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.ip !== this.state.ip) {
            let ip = {
                pcIP: this.state.ip,
            };
            requestMethod({
                url: "/getState",
                method: "post",
                data: ip,
            }).then((res) => {
                const data = res.data;
                console.log(data.data[0]);
                this.setState({
                    baseInfo: data.data[0],
                });
            });

            this.setState({
                show: true,
            });
        }
    };

    render() {
        const { baseInfo, show, disk, mem } = this.state;
        return (
            <div>
                <MonitorHeader onCheck={this.handleCheck} />
                <Divider />
                {show ? (
                    <div>
                        <MonitorBaseinfo baseInfo={baseInfo} />
                        <MonitorRealtime disk={disk} mem={mem} />
                    </div>
                ) : null}
            </div>
        );
    }
}

// 声明context的属性的类型信息
Monitor.childContextTypes = {
    onGetDiskAndMem: PropTypes.func,
};

export default Monitor;
