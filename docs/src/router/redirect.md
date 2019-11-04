---
sidebarDepth: 2
---

# 重定向和别名 <sup>v1.3.5+</sup>

::: warning 注意
重定向和别名目前仅支持H5端设置，其他端均不支持。
:::

## H5端重定向

重定向也是通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`：

```js
const router = new Router({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```
重定向的目标也可以是一个命名的路由：

```js
const router = new Router({
  routes: [
    { path: '/a', redirect: { name: 'foo' } }
  ]
})
```

甚至是一个方法，动态返回重定向目标：

```js
const router = new Router({
  routes: [
    { path: '/a', redirect:to=>{
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```
**注意：你可以使用 `redirect` 进行拦截跳转。比如对 `uni-app` 的 `tabbar` 进行白名单拦截，重定向配合404更香哦！**

## `aliasPath` 别名

`v1.3.5` 起新增了一个 `aliasPath` 的别名选项，可以进行重置 `uni-app` 在H5端上的URl表现。如果 `uni-simple-router` 检测到 `aliasPath` 没有传递，则继续采用 `path` 进行设置路径。 再次声明 **path不能为空且必须和 pages.json 中的页面路径匹配**。

## H5端路径别名

“重定向”的意思是，当用户访问 `/a` 时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`，那么“别名”又是什么呢？

**`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样。**

上面对应的路由配置为：

```js
const router = new Router({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```
“别名”的功能让你可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构。