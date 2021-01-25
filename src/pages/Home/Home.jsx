import React, { Component } from "react";
import { Layout } from "antd";
import HomeHeader from "./components/Header";
import Aside from "./components/Aside";
import Routes from "../../router/Routes";

const { Header, Sider, Content } = Layout;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: window.sessionStorage.getItem("username"),
        };
    }

    render() {
        const content = {
            height: "550px",
            overflow: "auto",
            padding: "20px",
            backgroundColor: "#fff",
        };
        return (
            <Layout style={{ backgroundColor: "#EBEEF5" }}>
                <Header>
                    <HomeHeader user={this.state.user} />
                </Header>
                <Layout style={{ margin: "30px 30px" }}>
                    <Sider>
                        <Aside />
                    </Sider>
                    <Content style={content}>
                        <Routes />
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export default Home;
