const themeConfig = {
    sidebarDepth: 0,
    nav: [{
            text: '指南',
            link: '/src/router/start/quickstart.md'
        },
        {
            text: 'API 参考',
            link: '/src/router/api/routerInsatll.md'
        },
        {
            text: '相关教程',
            items: [{
                text: 'H5拦截uni-app自带tabbar',
                link: '/src/router/tutorial/ljTabbar'
            },{
                text: 'onLaunch异步于onLoad之前',
                link: '/src/router/tutorial/LifeCycle'
            } ]
        },
        {
            text: '相关文档',
            items: [{
                    text: 'uni-app 文档',
                    link: 'https://uniapp.dcloud.io/'
                },
                {
                    text: 'vue-router 文档',
                    link: 'https://router.vuejs.org/zh/'
                },
                {
                    text: 'uni-app-tools 文档',
                    link: 'http://tool.hhyang.cn/'
                }
            ]
        },
        {
            text: '更新记录',
            link: 'https://github.com/SilurianYang/uni-simple-router/releases'
        },
        {
            text: 'GitHub',
            link: 'https://github.com/SilurianYang/uni-simple-router'
        }
    ],
    sidebar: {
        '/src/router/start/': [
            ['/src/router/start/introduction', '介绍'],
            ['/src/router/start/quickstart', '快速上手'],
            {
                title: '跨平台模式',
                collapsable: false,
                children: [
                    ['/src/router/start/cross/match', '路由配置'],
                    ['/src/router/start/cross/codeRoute', '编程式导航'],
                    ['/src/router/start/cross/componentRoute', '组件式导航'],
                    ['/src/router/start/cross/nameRoute', '命名路由'],
                    ['/src/router/start/cross/params', '路由传参'],
                    ['/src/router/start/cross/guard', '路由守卫']
                ]
            },
            {
                title: 'H5模式',
                collapsable: false,
                children: [
                    ['/src/router/start/h5/explian', '说明'],
                    ['/src/router/start/h5/match', '路由匹配'],
                    ['/src/router/start/h5/nesting', '嵌套路由'],
                    ['/src/router/start/h5/codeRoute', '编程式及组件式导航'],
                    ['/src/router/start/h5/nameRoute', '命名路由及视图'],
                    ['/src/router/start/h5/redirect', '重定向和别名'],
                    ['/src/router/start/h5/pass', '路由传参'],
                    ['/src/router/start/h5/guard', '导航守卫'],
                    ['/src/router/start/h5/routeInfo', '路由元信息'],
                    ['/src/router/start/h5/transitions', '过渡动效'],
                    ['/src/router/start/h5/lazyLoading', '路由懒加载']
                ]
            },
            {
                title: '进阶',
                collapsable: false,
                children:[
                    ['/src/router/start/advance/app/explian','APP 端进阶'],
                    ['/src/router/start/advance/H5/explian','H5 端进阶'],
                ]
            }
        ],
        '/src/router/api/': [{
            title: 'API 参考',
            collapsable: false,
            children: [
                ['/src/router/api/routerLInkSimple', 'simple-router 中的 <router-link>'],
                ['/src/router/api/routerLinkVue', 'vue-router 中的 <router-link>'],
                ['/src/router/api/routerInsatll', 'simple-router 路由配置'],
                ['/src/router/api/otherAPI', 'simple-router 其他API'],
            ]
        }, ],
        '/src/router/tutorial': [{
            title: 'H5拦截uni-app自带tabbar',
            path: '/src/router/tutorial/ljTabbar'
        },{
            title: 'onLaunch异步于onLoad之前',
            path: '/src/router/tutorial/LifeCycle'
        }]
    }
}
module.exports = {
    themeConfig
}