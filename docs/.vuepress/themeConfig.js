const themeConfig = {
    sidebarDepth:0,
    nav: [{
            text: '指南',
            link: '/src/router/start/quickstart.md'
        },
        {
            text: 'API 参考',
            link: '/src/router/api/routerLinkDiff.md'
        },
        {
            text: '相关教程',
            items:[
                { text: 'CSS', link: 'https://www.baidu.com/' },
				{ text: 'JS', link: 'https://www.baidu.com/' },
				{ text: 'linux', link: 'https://www.baidu.com/' },
				{ text: 'nginx', link: 'https://www.baidu.com/' },
				{ text: 'http协议', link: 'https://www.baidu.com/' },
				{ text: '浏览器相关', link: 'https://www.baidu.com/' },
            ]
        },
        {
            text: '更新记录',
            link:'https://github.com/SilurianYang/uni-simple-router/releases'
        },
        {
            text: 'GitHub',
            link:'https://github.com/SilurianYang/uni-simple-router'
        }
    ],
    sidebar:{
        '/src/router/start/':[
            ['/src/router/start/introduction','介绍'],
            ['/src/router/start/quickstart','快速上手'],
            {
                title: '跨平台模式',
                collapsable: false,
                children: [
                  ['/src/router/start/cross/match','路由配置'],
                  ['/src/router/start/cross/codeRoute','编程式导航'],
                  ['/src/router/start/cross/componentRoute','组件式导航'],
                  ['/src/router/start/cross/nameRoute','命名路由'],
                  ['/src/router/start/cross/params','路由传参'],
                  ['/src/router/start/cross/guard','路由守卫']
                ]
            },
            {
                title: 'H5模式',
                collapsable: false,
                children: [
                  ['/src/router/start/h5/explian','说明'],
                  ['/src/router/start/h5/match','路由匹配'],
                  ['/src/router/start/h5/nesting','嵌套路由'],
                  ['/src/router/start/h5/codeRoute','编程式及组件式导航'],
                  ['/src/router/start/h5/nameRoute','命名路由及视图'],
                  ['/src/router/start/h5/redirect','重定向和别名'],
                  ['/src/router/start/h5/pass','路由传参'],
                  ['/src/router/start/h5/guard','导航守卫'],
                  ['/src/router/start/h5/routeInfo','路由元信息'],
                  ['/src/router/start/h5/transitions','过渡动效'],
                  ['/src/router/start/h5/lazyLoading','路由懒加载']
                ]
            },
        ],
        '/src/router/api/':[
            {
                title: 'API 参考',
                collapsable: false,
                children: [
                  ['/src/router/api/routerLInkSimple','simple-router中的<router-link>'],
                  ['/src/router/api/routerLinkVue','vue-router中的<router-link>'],
                  ['/src/router/api/routerLinkDiff','前两者的区别'],
                ]   
            },
        ]
    }
}
module.exports = {
    themeConfig
}