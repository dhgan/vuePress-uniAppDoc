## 组件式导航 <sup>v1.2.2+</sup>

如果你不习惯 `编程式导航` ，你也可以通过 `组件式导航` 进行编写。一个通用的组件 必须在main.js中进行注册。

::: warning 注意
为了兼容小程序端，所有的组件应该在 mian.js 进行注册才可以。
:::

1、注册组件：
``` js
// main.js
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'
Vue.component('router-link',routerLink)
```
2、使用组件：

```html
<!-- 一个简单的name跳转 -->
<router-link to="{name: tabbar-4,params: {name: 'router-link'}}">
  <button type="primary">使用name对象跳转</button>
</router-link>

<!-- 通过path直接跳转 并指定跳转类型 -->
<router-link to="/tabbar-4" navType="pushTab">
  <button type="primary">使用path对象跳转</button>
</router-link>
```