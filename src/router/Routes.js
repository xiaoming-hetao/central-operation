import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../utils/asyncComponent';

// 通过asyncComponent导入组件，实现动态加载路由
const AsyncLogin = asyncComponent(() => import('../pages/Login/Login'));
// const AsyncHome = asyncComponent(() => import('../pages/Home/Home'));
const AsyncManagement = asyncComponent(() => import('../pages/Management/Management'));
const AsyncMonitor = asyncComponent(() => import('../pages/Monitor/Monitor'));
const AsyncReboot = asyncComponent(() => import('../pages/Concentrate/Reboot'));
const AsyncSendfile = asyncComponent(() => import('../pages/Concentrate/Sendfile'));
const AsyncPullfile = asyncComponent(() => import('../pages/Concentrate/Pullfile'));
const AsyncMyfiles = asyncComponent(() => import('../pages/Concentrate/Myfiles'));
const AsyncExecutescript = asyncComponent(() => import('../pages/Concentrate/Executescript'));
const AsyncDefinescript = asyncComponent(() => import('../pages/Concentrate/Definescript'));
const AsyncDatareport = asyncComponent(() => import('../pages/Concentrate/Datareport'));

// 处理动态路由
function Routes() {
  return (
        <Switch>
            <Redirect from='/' exact to="/login" />
            <Redirect from='/home' exact to="/management" />
            <Route path="/login" exact component={AsyncLogin} />
            {/* <Route path="/home" exact component={AsyncHome} /> */}
            <Route path="/management" exact component={AsyncManagement} />
            <Route path="/monitor" exact component={AsyncMonitor} />
            <Route path="/reboot" exact component={AsyncReboot} />
            <Route path="/sendfile" exact component={AsyncSendfile} />
            <Route path="/pullfile" exact component={AsyncPullfile} />
            <Route path="/myfiles" exact component={AsyncMyfiles} />
            <Route path="/executescript" exact component={AsyncExecutescript} />
            <Route path="/definescript" exact component={AsyncDefinescript} />
            <Route path="/datareport" exact component={AsyncDatareport} />
        </Switch>
    
);
}


export default Routes;
