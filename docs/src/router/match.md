---
sidebarDepth: 2
---


# 路由匹配

uni-app 中原有 pages.json 配置，这是为 uni-app 编译为不同端而制定的配置文件。同样路由也包涵其中，有时候我们需要更多的自定义参数作为页面中的引用。`routes` 选项就是为这个而准备的。看个简单的例子：

## 基本路由配置

```js
const router = new Router({
  routes:[
    {
      //这时的path的必须和pages.json中的配置相同
      path: '/pages/tabbar/tabbar-1/tabbar-1',    
      extra:{
        pageStyle:{
          color:'#f00'
          //...... 更多自定义参数
        }
      }
    },
    {
      //这时的path的必须和pages.json中的配置相同
      path: '/pages/tabbar/tabbar-2/tabbar-2',  
      extra:{
        pageStyle:{
          color:'#fff'
          //......
        }
      }
    }
  ]
});
```
你可以在对应的组件内查看相关路由元信息

```js
//tabbar-1.vue
<template>
	<view>
		<h1>tabbar-1</h1>
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log(this.$Route); //这时你可以看到你在routes中所匹配的路由项
		}
	}
</script>
```

这是一个简单而又实用的列子。对于 `v1.3.5` 起的 `H5还有更多的配置`，甚至你可以通过配置 `uni-simple-router` 实例化参数来控制 `H5运行模式`。<br/>

## H5端完全使用vue-router开发 <sup>v1.3.5</sup>

下面是一个完全使用 [vue-router](https://router.vuejs.org/zh/guide/) 开发的模式的例子：

```js {3,6-21}
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
                path:'route1/children1',
                name:'children1',
                component:()=>import('@/common/router/router1/children1.vue'),
            },
            {
                path:'route1/:id',
                name:'children2',
                component:()=>import('@/common/router/router1/children2.vue'),
            }
        ]
    },
  ]
});
```
当设置 `vueRouterDev:true` 后，你可以在任何地方进行挂载或者嵌套。它能使用 `vue-router` 的所有功能，api等等。同时它也将会失去 `uni-app` 的生命周期。更多请查看 [vue-router](https://router.vuejs.org/zh/guide/) 官方文档。此时你的组件页面也应该是使用  `vue-router` 的api及组件，**废弃掉 uni-simple-router 的api。**

```js {5,15}
//router1.vue
<template>
  <div>
      //通过vue-router全局组件router-view来挂载视图
      <router-view></router-view>   
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  created(){
    console.log(this.$route)    //此时我们使用vue-router的api进行获取
  },
}
</script>
```
你还可以点击这里进行学习更多配置。有时候你在H5端做简单的路由url美化，你还可以这样做：

## H5端自定义url <sup>v1.3.5</sup>

除了可以 `完全使用vue-router开发` 以外，你还可以在 `uni-app` 原有配置的基础上进行修改 url。

```js {3,10}
const router = new Router({
  h5:{
    useUniConfig:true,  //采用在pages.json下的所有页面配置信息,默认为true  
  },
  routes:[
    {
        name:'router1',
        //为了兼容其他端，此时的path不能少，必须和 pages.json中的页面路径匹配
        path: "/pages/tabbar/tabbar-1/tabbar-1",    
        aliasPath: '/tabbar-1', 
    },
  ]
});
```
上面的配置很简单，你只需要配置一个简单的 `aliasPath` 即可。 通过设置 `aliasPath` 别名来重置 uni-app 的默认路径，如果你不提供 `aliasPath` 时 `uni-simple-router` 则默认采用 `path` 作为路径进行匹配。所有这时的 `path` 是不能缺少的。**作为基础，及为了兼容其他端，此时的path不能少，必须和 pages.json中的页面路径匹配**。 因为 `uni-app` 在h5端时，第一个页面都设置为 '/' ，你可以不用配置。

## H5端动态加载页面 <sup>v1.3.5</sup>

其实和上面的几种配置大同小异。动态加载组件，其实就是不采用 `uni-app中pages.json` 里面的配置页面。通过设置路由的 `component` 选项进行动态加载。

```js {3,10}
const router = new Router({
  h5:{
    useUniConfig:false,   
  },
  routes:[
    {
        name:'router1',
        //为了兼容其他端，此时的path不能少，必须和 pages.json中的页面路径匹配
        path: "/pages/tabbar/tabbar-1/tabbar-1",    
        component: () => import('@/pages/component/tabbar-1.vue'),
        aliasPath: '/tabbar-1', 
    },
  ]
});
```
一个简单的 `component` 选项进行动态加载。设置 `useUniConfig:false` 同 `完全使用vue-router开发` 基本一致。他们简单的区别就在于 **`useUniConfig:false` 不能设置子路由，只能是一层路由、不能 [高级匹配模式](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E6%8D%95%E8%8E%B7%E6%89%80%E6%9C%89%E8%B7%AF%E7%94%B1%E6%88%96-404-not-found-%E8%B7%AF%E7%94%B1)**。

## H5端捕获所有路由或404路由 <sup>v1.3.5</sup>

常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配 **任意路径** ，我们可以使用通配符 (`*`)：

```js
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```

当使用通配符路由时，请确保路由的顺序是正确的，也就是说含有通配符的路由应该放在最后。路由 **{ path: '*' }** 通常用于客户端 404 错误。如果你使用了History 模式，请确保[正确配置你的服务器](https://router.vuejs.org/zh/guide/essentials/history-mode.html)。


## 匹配优先级 <sup>v1.3.5</sup>

有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高。**(目前更多的是变现在H5端)**