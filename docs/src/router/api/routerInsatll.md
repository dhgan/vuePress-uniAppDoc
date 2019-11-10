---
sidebarDepth: 2
---

## Router 构建选项

### routes
* 类型: `Array<RouteConfig>`

* 必填: `是`

* 平台：`全端`

`RouteConfig` 的类型定义：

```js
interface RouteConfig = {
  path: string, //pages.json中的path 必须加上 '/' 开头
  component?: Component,    //H5端可用
  name?: string, // 命名路由    
  components?: { [name: string]: Component }, // 命名视图组件，H5端可用   
  redirect?: string | Location | Function,  //H5端可用
  props?: boolean | Object | Function,  //H5端可用
  aliasPath?:string,    //h5端 设置一个别名路径来替换 uni-app的默认路径
  alias?: string | Array<string>,   //H5端可用
  children?: Array<RouteConfig>, // 嵌套路由，H5端可用
  beforeEnter?: (to: Route, from: Route, next: Function) => void,   //路由元守卫
  meta?: any,   //其他格外参数
}
```

### h5

* 类型: `Object`

* 必填: `否`

* 平台：`H5`

```js
    loading:true,		//是否显示加载动画
    vueRouterDev:false,	//完全使用采用vue-router的开发模式
    useUniConfig:true,	//是否采用在pages.json下的所有页面配置信息
    keepUniIntercept:false,   //保留uni-app使用vue-router的拦截器
    vueNext:false,  //在next管道函数中是否获取vueRouter next的原本参数
    replaceStyle:false, //是否对resetStyle函数中返回的style节点进行全部替换，否则为追加
    resetStyle:()=>JSON.parse('{}'),  //自定义加载样式函数 
``` 
目前你可以在这里设置一些常规的操作，后续应该能设置全部的 `vue-router` 配置

### debugger
* 类型: `boolean`

* 必填: `否`

* 默认值:`false`

* 平台：`全端`

    在开发阶段可以设置为 `true` 进行日常的日志捕捉，用于调试开发。开启后将会在控制台统一输出路由的所有日志。


### encodeURI
* 类型: `boolean`

* 必填: `否`

* 默认值:`true`

* 平台：`全端`

    对 `url` 传递的参数进行编码，更多学习可以 [点击这里](../start/cross/params)

### routerBeforeEach
* 类型: `Function`

* 必填: `否`

* 默认值:`()  => void`

* 平台：`全端`

    `uni-simple-router` **前置路由函数** 每次触发跳转前先会触发此函数，你可以在这里面做写什么。可能有、动画、记录等等操作。


### routerAfterEach
* 类型: `Function`

* 必填: `否`

* 默认值:`()  => void`

* 平台：`全端`

    `uni-simple-router` **后置路由函数** 每次触发跳转后会触发此函数，你可以在这里面做写什么。可能有、动画、记录等等操作。

## Router 实例方法

### router.beforeEach
### router.afterEach
函数签名：
```js
router.beforeEach((to, from, next) => {
  /* 必须调用 `next` */
})

router.afterEach((to, from) => {})
```
[全局守卫](../start/cross/guard.html)，你可以在里面做一些你想要 `干` 的事情。我可管不着！

### router.push
### router.replace
### router.replaceAll
### router.pushTab
### router.back

函数签名：
```js
router.push({name:'tab1'})
router.replace({name:'tab1'})
router.replaceAll({name:'tab1'})
router.pushTab({name:'tab1'})
router.back(2)
```
动态的导航到一个新 `URL`。参考 [编程式导航](../start/cross/codeRoute)

### router._pushTo `<return Promise>`
### router._H5PushTo
函数签名：
```js{4,16}
router._pushTo({
    toRule:{
        url:'/pages/tabbar/tabbar-1/tabbar-1',
        query:'name=hhyang&ages=22' 
    },
    ags:{
        rule:{
            NAVTYPE:'push'
        }
    }
})
//你甚至还可以这样
router._pushTo({
    toRule:{
        url:'/pages/tabbar/tabbar-1/tabbar-1',
        query:'query=%257B%2522userId%2522%253A%2522123%2522%257D' 
    },
    ags:{
        rule:{
            NAVTYPE:'push'
        }
    }
})

router._H5PushTo('push',{
    query:{
        name:'hhyang'
    }
})
```
::: warning 慎用
其实你不应该使用这两个方法进行跳转。目前这两个方法是暴露给 `router` 自己调用的api。可能后面会把他们去除掉！慎用！！
:::

### router.getQuery
函数签名：
```js
router.getQuery(VueComponent);  //你应该传递一个当前 vue组件对象
```
::: warning 慎用
其实你不应该使用这个方法进行获取路由元信息。目前这个方法也是暴露给 `router` 自己调用的api。你应该使用 `this.$Route` 取代它。
:::

## 路由元信息
一个 **路由对象 (route object)** 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的 **路由记录 (route records)。**

路由对象是不可变 (immutable) 的，每次成功的导航后都会产生一个新的对象。

路由对象出现在多个地方:

* 在组件内，即 `this.$Route`

* 导航守卫的参数：
```js
router.beforeEach((to, from, next) => {
  // `to` 和 `from` 都是路由对象
})

router.afterEach((to, from) => {
  // `to` 和 `from` 都是路由对象
})
```
* 甚至在 `H5` 的 `scrollBehavior` 方法的参数:

```js
const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    // `to` 和 `from` 都是路由对象
  }
})
```

* `H5` 的 `$route` 观察者回调内

* `H5` 的 `router.match(location)` 的返回值

### 路由对象属性
* **$Route.path**
    * 类型: `string`
        字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/pages/tabbar/tabbar-1/tabbar-1"`。

* **$Route.params**
    * 类型: `Object`
        一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。目前非 `完全使用vue-router开发` 的模式下，此参数为保留参数。

* **$Route.query**
    * 类型: `Object`
       一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$Route.query.user == 1`，如果没有查询参数，则是个空对象。

更多路由对象属性，你可以在实例化路由对象时 `routes` 中传递更多的自定义信息。在非 `完全使用vue-router开发`、`vueNext:true` 的情况下都会带上匹配的所有参数。

**当你使用 `完全使用vue-router开发` 的模式时，你可以访问** [vue-router文档查看更多信息](https://router.vuejs.org/zh/api/#%E8%B7%AF%E7%94%B1%E5%AF%B9%E8%B1%A1%E5%B1%9E%E6%80%A7)

## 组件注入
### 注入的属性
通过在 Vue 根实例的 `router` 配置传入 router 实例，下面这些属性成员会被注入到每个子组件。

* **this.$Router**

    router 实例。

* **this.$Route**

    当前激活的路由信息对象。

## 完全使用vue-router开发时的API
当前你在路由配置中设置 `vueRouterDev:true` 时。这时的路由将会完全变成 `vue-router` 的模式，任何 `vue-router` 相关的API都可以使用。[移步到这里查看API](https://router.vuejs.org/zh/api/#router-link)