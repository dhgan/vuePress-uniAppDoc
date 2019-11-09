---
sidebarDepth: 2
---

# simple-router中的 `<router-link>`

如果你还不够不了解 `<router-link>` 点击 [组件式导航查看学习](../start/cross/componentRoute)
 
## NPM注册(推荐)
```js
// main.js
import routerLink from './node_modules/uni-simple-router/component/router-link.vue'
Vue.component('router-link',routerLink)
```

## 插件市场注册
```js
// main.js
import routerLink from './js_sdk/hhyang-uni-simple-router/component/router-link.vue';
Vue.component('router-link',routerLink)
```
## `<router-link>`Props

### to
* 类型: `string | Location`

* required

表示目标路由的链接。当被点击后，内部会立刻把 `to` 的值传到 `router.push()`，所以这个值可以是字符串对象，也可以是一个绝对路径，也可以是一个相对路径

```html
<router-link to="{name: tabbar-4,params: {name: '我只想去tab5的router-link'}}" navType="pushTab">
  <button type="primary">使用name对象跳转</button>
</router-link>

<router-link to="{path: '/pages/tabbar/tabbar-4/tabbar-4',query: {name: '我只想去tab5的router-link'}}" navType="pushTab">
  <button type="primary">使用path对象跳转</button>
</router-link>

<router-link to="{path: '/tabbar-4/tabbar-4,query': {name: '我只想去tab5的router-link'}}" navType="pushTab" :level="2" :append="true">
  <button type="primary">使用path对象继承父路径跳转</button>
</router-link>

<router-link to="/pages/tabbar/tabbar-4/tabbar-4" navType="pushTab">
  <button type="warn">通过路由path直接跳转</button>
</router-link>

<router-link to="/tabbar-4/tabbar-4" navType="pushTab" :level="2" :append="true">
  <button type="warn">通过路由path继承父路径跳转</button>
</router-link>

<router-link to="/tabbar-4/tabbar-4" navType="pushTab" :level="2" :append="true" :stopNavto="true">
  <button type="default">阻止组件事件,不会跳转</button>
</router-link>
```

### stopNavto
* 类型: `Boolean`

* 默认值: `false`

默认绑定事件为点击事件，不阻止。
```html
<router-link to="/tabbar-4/tabbar-4"  :stopNavto="true">
  <button type="default">阻止组件事件,不会跳转</button>
</router-link>
```

### navType
* 类型: `String`

* 默认值: `push`

需要跳转的 `NAVTYPE` 类型
```html
<router-link to="/tabbar-4/tabbar-4"  navType="pushTab">
  <button type="default">指定跳转到uni-app自带tab</button>
</router-link>
```

### level
* 类型: `Number`

* 默认值: `1`

相对于当前页面路径，以 `/` 从后往前裁切的层级。**append 为true时生效**
```html
<router-link to="{path: '/tabbar-4/tabbar-4,query'}" :level="2" :append="true">
  <button type="primary">使用path对象继承父路径跳转</button>
</router-link>
```

### append
* 类型: `Boolean`

* 默认值: `false`

是否相对于当前页面路径跳转。根据 `level` 层级截取的路径 拼接 `to` 。 **只针对使用path跳转的情况**
```html
<router-link to="{path: '/tabbar-4/tabbar-4,query'}" :level="2" :append="true">
  <button type="primary">使用path对象继承父路径跳转</button>
</router-link>
```
