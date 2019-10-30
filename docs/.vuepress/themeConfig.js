const themeConfig = {
    sidebarDepth:2,
    nav: [{
            text: '指南',
            link: '/src/router/index.md'
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
    ]
}
module.exports = {
    themeConfig
}