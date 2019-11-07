# 嵌套路由 <sup>v1.3.5+</sup>

::: warning 注意
目前版本仅支持H5端的完全使用vue-router开发模式
:::

实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL 中各段动态路径也按某种结构对应嵌套的各层组件，例如：

```t
/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------>  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+
```

借助 `vue-router`，使用嵌套路由配置，就可以很简单地表达这种关系。

接着上节创建的 app：

```html
<div id="app">
  <router-view></router-view>
</div>
```
这里的 `<router-view>` 是最顶层的出口，渲染最高级路由匹配到的组件。`uni-app` 已经帮我们做啦。所以无需理会。 同样地，一个被渲染组件同样可以包含自己的嵌套 `<router-view>`。例如，在 children1 组件的模板添加一个 `<router-view>`：

```html
<template>
  <div>
      <h1>vueRouterDev:true</h1>
      <!-- 通过vue-router全局组件router-view来挂载视图 -->
      <router-view></router-view>
  </div>
</template>
```

要在嵌套的出口中渲染组件，需要在 `uni-simple-router` 的参数中使用 children 配置：

```js
const router = new Router({
  h5:{
    vueRouterDev:true,  //完全使用vue-router开发 默认 false  
  },
  routes:[
    {
        path:'/',
        name:'router1',
        component:()=>import('@/common/router/router1.vue'),
        children:[
            {
                // 当 /route1/children1 匹配成功，
                // children1 会被渲染在 router1 的 <router-view> 中
                path:'route1/children1',
                name:'children1',
                component:()=>import('@/common/router/router1/children1.vue'),
            },
            {
                // 当 /route1/:id 匹配成功，
                // children1 会被渲染在 router1 的 <router-view> 中
                path:'route1/:id',
                name:'children2',
                component:()=>import('@/common/router/router1/children2.vue'),
            }
        ]
    },
  ]
});
```
**要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径。**
你会发现，`children` 配置就是像 `routes` 配置一样的路由配置数组，所以呢，你可以嵌套多层路由。
此时，基于上面的配置，当你访问 `/route1/children2` `children` 的出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个 空的 子路由：

```js
const router = new Router({
  h5:{
    vueRouterDev:true,  //完全使用vue-router开发 默认 false  
  },
  routes:[
    {
        path:'/',
        name:'router1',
        component:()=>import('@/common/router/router1.vue'),
        children:[
          { path: '', component: ()=>import('@/common/router/empty.vue') },
          //...其他子路由
        ]
    },
  ]
});
```