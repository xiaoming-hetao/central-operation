import "../../assets/css/header.css";
// import PropTypes from "prop-types";
import React, { Component } from "react";
import { Avatar, Badge, Menu, Dropdown } from "antd";
import { UserOutlined, BellOutlined, DownOutlined } from "@ant-design/icons";

class HomeHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.sessionStorage.getItem("username"),
        };
        // this.checkUser.bind(this);
    }

    // checkUser() {
    //     if (!this.state.user) {
    //         //如果用户名为空，则说明用户没有登录，强制把用户返回登录页面
    //         message.success("您还未登录，请先登录");
    //         // this.props.history.push("/login");
    //     }
    // }
    componentDidMount() {}

    render() {
        // 下拉菜单
        const menu = (
            <Menu>
                <Menu.Item>退出</Menu.Item>
            </Menu>
        );
        return (
            <div className="container">
                <div className="container-left">
                    <p>集中化运维监控中心</p>
                </div>
                <div className="container-right">
                    <Avatar size="large" icon={<UserOutlined />} />
                    <Badge count={10}>
                        <BellOutlined
                            style={{
                                fontSize: "25px",
                                color: "#fff",
                                marginLeft: "15px",
                            }}
                        />
                    </Badge>
                    <div
                        style={{ display: "inline-block", marginLeft: "15px" }}
                    >
                        <Dropdown overlay={menu} arrow>
                            <span>
                                {this.state.user} <DownOutlined />
                            </span>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }
}

// 属性检验
// HomeHeader.propTypes = {
//     user: PropTypes.string.isRequired,
// };

export default HomeHeader;
