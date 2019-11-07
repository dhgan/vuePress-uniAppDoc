---
sidebarDepth: 2
---

# 路由传参

:::warning 注意
内置了两种传递方式：1.不编码传输、2.编码传输
:::

在组件中使用 `$Route` 来获取当前路由表中的配置及参数。因为路由传值方面官方目前仅提供了 `query` 的方式进行传参，所以到目前为止 `uni-simple-router` 也仅支持 `query` 的获取方式。为了兼容H5手动刷新后参数丢失的问题。其次在 `$Route` 对象中依然保留了 `params` 选项后续会补上。

数据传参时尽量不要传递深度对象，虽然中间有做一层操作。始终不能百分百还原。在深度对象传递的过程中，深度对象将会抹平成一个大对象。而且在参数传递的过程中传递的数据将会变成字符串

## 不编码传输
```js {3}
//实例化
const router = new Router({
  encodeURI:false,  
  routes:[
    //...一些路由信息
  ]
});

// 假如你是通过name 来进行跳转。
this.$Router.push({ name: 'router1', params: { userId: '123' }})
// 同样 等同于
this.$Router.push({ path: '/pages/router/router1/router1', query: { userId: '123' }})

// 获取方式
this.$Route.query.userId;

//URL 表现
http://xxxx/router1?userId=123
```
通过设置 `encodeURI:false`  来取消编码传输数据。一些特殊符号则被限制，同样深度对象传递时就无法进行传递，他会扁平成一个大对象。相同  `key` 的情况下后者覆盖前置。此时的 `url` 就变成了一个常规的参数连接

## 编码传输
```js {3}
//实例化
const router = new Router({
  encodeURI:true,  //默认为true
  routes:[
    //...一些路由信息
  ]
});

// 假如你是通过name 来进行跳转。
this.$Router.push({ name: 'router1', params: { userId: '123' }})
// 同样 等同于
this.$Router.push({ path: '/pages/router/router1/router1', query: { userId: '123' }})

// 获取方式
this.$Route.query.userId;

//URL 表现
http://xxxx/router1?query=%257B%2522userId%2522%253A%2522123%2522%257D
```
编码传输则不同，他是在传递之前做了 `encodeURIComponent` 编码，并在编码好的参数加上  `query=`  连接，成为一个完整的url。获取时解释对象成为一个 `JSON`、 他虽然不美观 但是能还原深度对象。

## vue-router那套 <sup>v1.3.5+</sup>

对于 `完全使用vue-router开发` 的同学，可以参考 [vue-router指南](https://router.vuejs.org/zh/guide/essentials/passing-props.html#%E5%B8%83%E5%B0%94%E6%A8%A1%E5%BC%8F)