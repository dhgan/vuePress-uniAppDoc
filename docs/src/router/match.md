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

 这是一个简单而又实用的列子。对于 `v1.3.5` 起的 `H5还有更多的配置` 