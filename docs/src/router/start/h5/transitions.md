---
sidebarDepth: 2
---

# 过渡动效 <sup>v1.2.2+</sup>

:::warning 注意
过渡动效 目前仅对 H5 启效果
:::

原本的 `uni-app` 在 `H5端` 未加载完成或是数据未渲染时，无法进行真正的拦截、等待时间过长。为了消除这些细节困扰，`uni-simple-router` 对路由进行了强化。并可以使用加载动画完美的过度到真实数据后：

```js {3}
const router = new Router({
    h5:{
        loading: true,
    },
    routes:[
        //...一些乱七八糟的声明
    ]
});
```

一个简单的配置即可完成，甚至你还可以更深入的自定义记载样式。

## 自定义加载样式 <sup>v1.3.5+</sup>

`uni-simple-router` 提供了一个函数给用户自定义样式，在不写样式覆盖的情况下进行重置。

```js
const router = new Router({
    h5:{
        loading: true,
        resetStyle: () => {     //对样式进行追加
			return {
				style: `
				#router-loadding .loadding {
					background-color: #f00 !important;
					box-shadow: 0 0 15px #f00 !important;
				}
				`
			}
		}
    },
    routes:[
        //...一些乱七八糟的声明
    ]
});
```
`resetStyle` 是对 `H5端` 进行整体或局部样式、DOM重置的一个方法。它可以在 `replaceStyle:false` 的情况下进行样式追加简单的样式。真正的他应该返回这样的数据，来达到你的目的：

```js {4,7-9}
const router = new Router({
    h5:{
        loading: true,
        replaceStyle:true,      //重置样式及DOM加脚本
        resetStyle: () => {     
			return {    //请开始你的表演
                style: ``,
                html:``,
                script:``
			}
		}
    },
    routes:[
        //...一些乱七八糟的声明
    ]
});
```

:::warning 注意
这时对整体进行重置，那么 `script` 选项中必须注册 一个 `startLodding`、`stopLodding` 函数到 `window` 对象下给 `uni-simple-router`调用。
:::

## 使用 transition 过渡 <sup>v1.3.5+</sup>

在 `完全使用 vue-router` 开发的模式下，你可以随行所欲的使用 `transition` 来包含 `router-view` 进行路由过度

包括 `单个路由的过渡` `基于路由的动态过渡` `vue-router` 官方都有提供详细的示例及文档，更多请 [移步到这里查看](https://router.vuejs.org/zh/guide/advanced/transitions.html#%E5%8D%95%E4%B8%AA%E8%B7%AF%E7%94%B1%E7%9A%84%E8%BF%87%E6%B8%A1)