---
sidebarDepth: 0
---

# H5端使用自定义路径并拦截uni-app自带tabbar

通过默认的 `aliasPath` 来给 `H5端` 设置别名路径时。你会发现在uni-app自带的tabbar会无法进行拦截或者是路径还显示之前uni-app默认的。

这时我们就需要通过拦截来给定一个指定路径，完成重定向。

简单的路由注册：
```js
const router = new Router({
    routes:[
        {
            aliasPath:'/',
            path: "/pages/tabbar/tabbar-1/tabbar-1",
            name:'tabbar-1'
        },
        {
            aliasPath:'/tabbar2',
            path: "/pages/tabbar/tabbar-2/tabbar-2",
            name:'tabbar-2'
        },
        {
            aliasPath:'/tabbar3',
            path: "/pages/tabbar/tabbar-3/tabbar-3",
            name:'tabbar-3'
        },
        {
            aliasPath:'/tabbar4',
            path: "/pages/tabbar/tabbar-4/tabbar-4",
            name:'tabbar-4'
        },
    ]
});
```
一串简单的配置，完成 `Router` 实例化。看的出是通过使用 `uni-app` 默认配置来完成页面渲染的。这是一个 `uni-app` 自带底部tabbar的示例，使用 `aliasPath` 重写 `uni-app` 路径时，底部菜单确实能加载出来。当点击底部tabbar时就会出现空白页面，那么这时我们在代码中加入这样的配置即可完成。

```js {1-6,29-44}
const whitelist = {     //声明了一个白名单
	'/pages/tabbar/tabbar-1/tabbar-1': 'tabbar-1',
	'/pages/tabbar/tabbar-2/tabbar-2': 'tabbar-2',
	'/pages/tabbar/tabbar-3/tabbar-3': 'tabbar-3',
	'/pages/tabbar/tabbar-4/tabbar-4': 'tabbar-4',
}
const router = new Router({
    routes:[
        {
            aliasPath:'/',
            path: "/pages/tabbar/tabbar-1/tabbar-1",
            name:'tabbar-1'
        },
        {
            aliasPath:'/tabbar2',
            path: "/pages/tabbar/tabbar-2/tabbar-2",
            name:'tabbar-2'
        },
        {
            aliasPath:'/tabbar3',
            path: "/pages/tabbar/tabbar-3/tabbar-3",
            name:'tabbar-3'
        },
        {
            aliasPath:'/tabbar4',
            path: "/pages/tabbar/tabbar-4/tabbar-4",
            name:'tabbar-4'
        },
        {
            aliasPath:'/404',
            path: '/pages/test/404',
            name:'404'
        },
        {
            path: '*',
            name: 'moddle',
            redirect:to=>{
                const name = whitelist[to.path];
                if(name){
                    return {name}
                };
                return {name:'404'}
            }
        }
    ]
});
```
我通过预设 `404` 页面和 匹配所有项来拦截白名单选项。当通过白名单时有预设选项及返回预设选项栏目，否者就返回 `404` 页面。注意这里的 `404` 页面是 `pages.json` 已经配置好了的选项。

其实就这么简单，既可完成拦截和重定向。`H5` 端可以 配合 `redirect` 及 `通配符` 完成你想要的骚操作。赶紧去试试吧