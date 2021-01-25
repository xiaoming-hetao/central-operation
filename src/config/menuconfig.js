const menuList = [
    {
        title: '设备管理',
        key: '/management'
    },
    {
        title: '设备监控',
        key: '/monitor'
    },
    {
        title: '集中运维',
        key: 'submemu',
        children: [
            {
                title: '重启',
                key: '/reboot'
            },
            {
                title: '下发文件',
                key: '/sendfile'
            },
            {
                title: '拉取文件',
                key: '/pullfile'
            },
            {
                title: '我的文件',
                key: '/myfiles'
            },
            {
                title: '剧本执行',
                key: '/executescript'
            },
            {
                title: '自定义剧本',
                key: '/definescript'
            },
            {
                title: '数据报表',
                key: '/datareport'
            }
        ]
    },
    {
        title: '日志管理',
        key: '/log'
    }
]

export default menuList;