---
sidebarDepth: 2
---

# 起步

::: tip 注意
教程中的案例代码将使用 [ES2015](https://github.com/lukehoban/es6features) 来编写。<br/>

同时，如果发现有错别字或者相关错误。请移步这里进行修改。
:::

用 uni-app + uni-simple-router 创建单页应用，是非常简单的。使用 uni-app ，我们已经可以通过组合组件来组成应用程序，并能进行跳转、渲染页面。如果当你要把 uni-simple-router 添加进来，那就更加如虎添翼了。这时我们需要做的是，将组件 (component) 映射到路由 (routes)，然后告诉 uni-app-router 在哪里渲染它们，对于H5而言就这么简单。甚至你还可以不用配置这些，直接采用pages.json中的配置。一样妥妥的！下面是个基本例子：

## HTML

``` html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <router-link to="/tabbar2">Go to tabbar2</router-link>
    <router-link to="/">Go to tabbar1</router-link>
  </p>
</div>
```


## JavaScript

```js
// main.js
import Vue from 'vue'
import App from './App'
import Router, { RouterMount } from 'uni-simple-router';
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'   
Vue.component('router-link', routerLink) //微信小程序端必须再main.js中进行注册组件

Vue.use(Router);


// 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new Router({
  routes:[
    {
      path: "/pages/tabbar/tabbar-1/tabbar-1",    //path应该和pages.json中的路径匹配
      name: 'tabbar-1'    //设置一个路径名称，甚至可以使用 name 来进行跳转
    },
    {
      path: "/pages/tabbar/tabbar-2/tabbar-2",
      name: 'tabbar-2'
    }
  ]
});

// 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能

const app = new Vue({
    ...App,
})
RouterMount(app,'#app');  //v1.3.5起 你应该去除原有的app.$mount();使用路由自带的渲染方式

// 现在，应用已经启动了！
```

通过注入路由器，我们可以在任何组件内通过 this.$Router 访问路由器，也可以通过 this.$Route 访问当前路由：

```js
//tabbar1.vue
<template>
	<view>
		<h1>tabbar1</h1>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log(this.$Route);
		}
	}
</script>
```

该文档通篇都常使用 router 实例。留意一下 this.$Router 和 router 使用起来完全一样。我们使用 this.$Router 的原因是我们并不想在每个独立需要封装路由的组件中都导入路由。