---
sidebarDepth: 2
---

# 导航守卫

::: tip 译者注
“导航”表示路由正在发生改变。
:::

正如其名，`uni-simple-router` 也提供了同 `vue-router` 一样一样的导航守卫主要用来通过跳转或取消的方式守卫导航。有多种机会植入路由导航过程中：全局的, 单个路由独享的。

目前 `H5` 端 完全使用 `vue-router` 开发模式下 **记住参数或查询的改变并不会触发进入/离开的导航守卫**。你可以通过观察 `$route` 对象来应对这些变化。

## 全局前置守卫

你可以使用 `router.beforeEach` 注册一个全局前置守卫：

```js
const router = new Router({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```
当一个导航触发时，全局前置守卫按照创建顺序调用。守卫是异步解析执行，此时导航在所有守卫 resolve 完之前一直处于 **等待中**。

每个守卫方法接收三个参数：

* `to: Route`: 即将要进入的目标 `路由对象`

* `from: Route`: 当前导航正要离开的路由

* `next: Function`: 一定要调用该方法来 **resolve** 这个钩子。执行效果依赖 `next` 方法的调用参数。

    * `next`: 管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 **confirmed** (确认的)。

    * `next(false)`：中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 `from` 路由对应的地址。

    * `next('/')` **或者**  `next({ path: '/' })`：跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。你可以向 `next` 传递任意位置对象。


**确保要调用 `next` 方法，否则钩子就不会被 resolved。同时在使用 `next()` 时，如果想导航到新的地址，这时就需要在 `next()` 传递一个 `NAVTYPE` 指定类型跳转。**

::: warning 注意
**如果你在 `H5` 端 完全使用 `vue-router` 开发的模式下，那么你还可以参考更多** [vue-router API](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%85%A8%E5%B1%80%E5%89%8D%E7%BD%AE%E5%AE%88%E5%8D%AB)
:::

示例

```js {8}
router.beforeEach((to, from, next) => {
    if (to.name == 'tabbar-5') {
        next({
            name: 'router4',
            params: {
                msg: '我拦截了tab5并重定向到了路由4页面上',
            },
            NAVTYPE: 'push'
        });
    } else{
    next();
  }
})
```
很显然这是一个全局的生命钩子函数，当发现跳转的路由名称为 `tabbar-5` 时，中间进行拦截并重定向到名为 `router4` 的路由下,而显然易见的是 `tabbar-5` 是通过 `pushTab` API进行跳转的，而 `router4` 则是一个普通的页面，应该使用 `push` API来进行跳转。所有这时的我们就需要提供一个 [NAVTYPE](../../api/otherAPI#navtype) **来指定此次跳转需要使用什么方法。如果地址为同一类型时无需传递此参数。**

## 全局后置钩子

你也可以注册全局后置钩子，然而和守卫不同的是，这些钩子不会接受 `next` 函数也不会改变导航本身：

```js
router.afterEach((to, from) => {
  // ...
})
```

## 路由独享的守卫

你可以在路由配置上直接定义 `beforeEnter` 守卫：

```js {5,11}
const router = new Router({
    routes: [
         {
            path: "/pages/router/router2/router2",
            beforeEnter:(to,from,next)=>{
                next({name:'router3',params:{msg:'我是从router2路由拦截过来的'}});
            }
        }, 
        {
            path: "/pages/router/router3/router3",
            beforeEnter:(to,from,next)=>{
                next();
            }
        }
    ]
});
```
这些守卫与全局前置守卫的方法参数是一样的。


## 完整的导航解析流程

1. 导航被触发。

1. `H5端：` 调用全局的 `beforeEach` 守卫、`其他端：` 非 `$Router` 进行跳转的先加载页面再触发 `beforeEach`，使用 `$Router` API 进行跳转的则和 `H5端` 同理。

1. 在路由配置里调用 `beforeEnter。`

1. 导航被确认。

1. 用全局的 `afterEach` 钩子。

1. 触发 `DOM` 更新

## 更多路由守卫

对于 **H5端** `完全使用 vue-router 开发模式` 的用户，还可以配置更多的路由守卫、及解析步骤。详细请 [移步到这里查看](https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E7%BB%84%E4%BB%B6%E5%86%85%E7%9A%84%E5%AE%88%E5%8D%AB)