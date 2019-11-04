---
sidebarDepth: 2
---

# 命名路由及视图

## 命名路由

有时候，通过一个名称来标识一个路由显得更方便一些，特别是在链接一个路由，或者是执行一些跳转的时候。你可以在创建 `router` 实例的时候，在 `routes` 配置中给某个路由设置名称。

```js {6,10,14}

const router = new Router({
  routes:[
    {
      path: '/pages/router/router1/router1',
      name: 'router1'
    },
    {
      path: '/pages/router/router2/router2',
      name: 'router2'
    },
    {
      path: '/pages/router/router2/router2',
      name: 'router2'
    }
  ]
})
```
要链接到一个命名路由，可以给 `router.push()` 属性传一个对象或使用 `组件式导航`：

组件式导航

```html
<router-link :to="{ name: 'router1', params: { userId: 123 }}">router1</router-link>
```

这跟代码调用 `router.push()` 是一回事：

```js
this.$Router.push({ name: 'router1', params: { userId: '123' }})
```

这两种方式都会把路由导航到 `/pages/router/router1/router1` 路径。

## 命名视图 <sup>v1.3.5+</sup>

**注意：命名视图目前仅支持 `完全使用vue-router开发` 模式，项目文档可移步到[这里查看](https://router.vuejs.org/zh/guide/essentials/named-views.html#%E5%B5%8C%E5%A5%97%E5%91%BD%E5%90%8D%E8%A7%86%E5%9B%BE)**


