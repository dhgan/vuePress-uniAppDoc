const themeConfig = {
    sidebarDepth:0,
    nav: [{
            text: '指南',
            link: '/src/router/install.md'
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
        ['/src/router/install','安装'],
        ['/src/router/introduction','介绍'],
        {
            title: '基础',
            collapsable: false,
            children: [
              ['/src/router/start','起步'],
              ['/src/router/match','路由匹配'],
              ['/src/router/nesting','嵌套路由'],
              ['/src/router/codeRoute','编程式及组件式导航'],
              ['/src/router/nameRoute','命名路由及视图'],
              ['/src/router/redirect','重定向和别名'],
              ['/src/router/pass','路由传参']
            ]
          },
    ]
}
module.exports = {
    themeConfig
}