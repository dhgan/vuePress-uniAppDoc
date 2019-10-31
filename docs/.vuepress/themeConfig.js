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
              ['/src/router/start','起步']
            ]
          },
    ]
}
module.exports = {
    themeConfig
}