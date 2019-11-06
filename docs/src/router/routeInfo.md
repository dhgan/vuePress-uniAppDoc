---
sidebarDepth: 2
---

# 路由元信息

## 非完全使用VueRouter开发

在定义路由的时候可以配置更多自定义的东西。每次与之匹配时，获取到的对象信息我们称 **路由元信息**。 [vue-router](https://router.vuejs.org/zh/guide/advanced/meta.html) 给我们提供的是 `meta` 字段。在 `uni-simple-router` 中可以无须是 `meta` 字段，不过在 `H5端` `vueNext:true` 或者是 `vueRouterDev:true` 的情况下路由匹配会变成 `vue-router` 匹配规则。这时的路由元其他信息就只认 `meta` 字段啦。非上诉情况下 **路由元信息** 统一为当前路由所匹配的 `routes` 中的对应对象。请熟知！ 为了兼容不同模式 我们推荐按照 `vue官方的写法` 把所有格外字段都定义在 `meta` 下。


下面例子展示在全局导航守卫中检查元字段：

```js {2,6}
router.beforeEach((to, from, next) => {
  if (to.meta&&to.disable) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.meta.title }
      })
    } else {
      next()
    }
  } else {
    next() // 确保一定要调用 next()
  }
})
```


## 完全使用VueRouter开发

完全使用 `VueRouter` 开发的情况下，完全遵循 `vue-router` 的配置信息。定义 `路由元信息` 的时候应该配置到 `meta` 字段中 详细请 [移步到这里查看](https://router.vuejs.org/zh/guide/advanced/meta.html)