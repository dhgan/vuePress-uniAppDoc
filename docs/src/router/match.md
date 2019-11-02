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
		data() {
			return {
				
			}
		},
		onLoad() {
			console.log(this.$Route); //这时你可以看到你在routes中所匹配的路由项
		}
	}
</script>
```

这是一个简单而又实用的列子。对于 `v1.3.5` 起的 `H5还有更多的配置`，甚至你可以通过配置 `uni-simple-router` 实例化参数来控制 `H5运行模式`。<br/>

## 完全使用vue-router开发

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
当设置 `vueRouterDev:true` 后，你可以在任何地方进行挂载或者嵌套。它能使用 `vue-router` 的所有功能。同时它也将会失去 `uni-app` 的生命周期。更多请查看 [vue-router](https://router.vuejs.org/zh/guide/) 官方文档。此时你的组件页面也应该是使用  `vue-router` 的api及组件，**废弃掉 uni-simple-router 的api。**

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
