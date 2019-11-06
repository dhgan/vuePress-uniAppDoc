## 基本路由配置

```js
const router = new Router({
  routes:[
    {
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
	    path: '/pages/home/index',
        name: 'index',//在路由跳转时可直接使用name来跳转，后面会讲到
        //可以自定义路由元信息
        myDiy:{
            isTab:true
        },
        meta: {
	        title: '首页',
	    },
    },
    {
	    path: '/pages/home/list',
        name: 'list',
        meta: {
	        title: '列表',
	    },
	},
  ]
});
```
你可以在路由守卫中读取。
```js
router.beforeEach((to, from, next) => {
	if(to.myDiy.isTab){
        //..执行相关逻辑
    }
	next()
})

```

你也可以在对应的组件内查看相关路由元信息

```html
<!-- pages/home/index.vue -->
<template>
	<view>
		<h1>home</h1>
	</view>
</template>

<script>
	export default {
		onLoad() {
			console.log(this.$Route.myDiy); //{ isTab:true }
		}
	}
</script>
```