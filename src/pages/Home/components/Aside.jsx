import React, { Component } from "react";
import { Menu } from "antd";
import { Link, withRouter } from "react-router-dom";
import menuList from "../../../config/menuconfig.js";

// withRouter是高阶函数，用于把非路由组件包装成路由组件，这样当刷新页面时，侧边栏也能保持选中状态
// 返回一个新的组件，新的组件向非路由组件传递三个属性history，location，match
const { SubMenu } = Menu;

// https://www.bilibili.com/read/cv8949996 导航栏设计
class Aside extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKey: "",
            menuNodes: this.getMenuItem(menuList),
        };
        this.getMenuItem.bind(this);
    }

    // 根据菜单配置文件生成菜单
    getMenuItem = (menuList) => {
        // 当前请求的路由的路径名
        const path = this.props.location.pathname;
        return menuList.map((item) => {
            if (!item.children) {
                //不存在children
                return (
                    <Menu.Item key={item.key}>
                        <Link to={item.key}></Link>
                        <span>{item.title}</span>
                    </Menu.Item>
                );
            } else {
                // 查找一个与当前请求路径匹配的子item
                const subItem = item.children.find(
                    (subItem) => path.indexOf(subItem.key) === 0
                );
                // 如果存在，说明当前item的子列表需要展开
                if (subItem) {
                    this.openKey = item.key;
                }
                return (
                    <SubMenu key={item.key} title={<span>{item.title}</span>}>
                        {/* 递归调用该函数 */}
                        {this.getMenuItem(item.children)}
                    </SubMenu>
                );
            }
        });
    };
    // 在第一次render()执行之前执行一次getMenuItem函数，防止放在render中多次渲染造成浪费
    // componentWillMount() {
    //     this.menuNodes = this.getMenuItem(menuList);
    // }

    render() {
        // 当前请求的路由的路径名
        const path = this.props.location.pathname;
        // 得到需要打开的菜单项的key
        const openKey = this.openKey;
        return (
            <Menu
                style={{ width: 200, height: 550 }}
                selectedKeys={[path]}
                defaultOpenKeys={[openKey]}
                mode="inline"
            >
                {/* 防止多次渲染都直接调用getMenuItem ，浪费资源*/}
                {this.state.menuNodes}
            </Menu>
        );
    }
}

export default withRouter(Aside);
