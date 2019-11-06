const themeConfig = {
    sidebarDepth:0,
    nav: [{
            text: '指南',
            link: '/src/router/quickstart.md'
        },
        {
            text: 'API 参考',
            link: '/guide/'
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
    sidebar:[
        ['/src/router/introduction','介绍'],
        ['/src/router/quickstart','快速上手'],
        {
            title: '跨平台模式',
            collapsable: false,
            children: [
              ['/src/router/cross/match','路由配置'],
              ['/src/router/cross/codeRoute','编程式导航'],
              ['/src/router/cross/componentRoute','组件式导航'],
              ['/src/router/cross/nameRoute','命名路由'],
              ['/src/router/cross/params','路由传参'],
              ['/src/router/cross/guard','路由守卫']
            ]
        },
        {
            title: 'H5模式',
            collapsable: false,
            children: [
              ['/src/router/h5/explian','说明'],
              ['/src/router/h5/match','路由匹配'],
              ['/src/router/h5/nesting','嵌套路由'],
              ['/src/router/h5/codeRoute','编程式及组件式导航'],
              ['/src/router/h5/nameRoute','命名路由及视图'],
              ['/src/router/h5/redirect','重定向和别名'],
              ['/src/router/h5/pass','路由传参'],
              ['/src/router/h5/guard','导航守卫'],
              ['/src/router/h5/routeInfo','路由元信息'],
              ['/src/router/h5/getData','数据获取'],
              ['/src/router/h5/transitions','过渡动效'],
              ['/src/router/h5/lazyLoading','路由懒加载']
            ]
        },
        // {
        //     title: '基础',
        //     collapsable: false,
        //     children: [
        //       ['/src/router/start','起步'],
        //       ['/src/router/match','路由匹配'],
        //       ['/src/router/nesting','嵌套路由'],
        //       ['/src/router/codeRoute','编程式及组件式导航'],
        //       ['/src/router/nameRoute','命名路由及视图'],
        //       ['/src/router/redirect','重定向和别名'],
        //       ['/src/router/pass','路由传参']
        //     ]
        // },
        // {
        //     title: '进阶',
        //     collapsable: false, 
        //     children:[
        //         ['/src/router/guard','导航守卫'],
        //         ['/src/router/routeInfo','路由元信息'],
        //         ['/src/router/getData','数据获取'],
        //         ['/src/router/transitions','过渡动效'],
        //         ['/src/router/lazyLoading','路由懒加载']
        //     ]
        // }
    ]
}
module.exports = {
    themeConfig
}