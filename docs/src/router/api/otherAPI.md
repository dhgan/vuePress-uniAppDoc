---
sidebarDepth: 2
---

::: tip 提示

从 `v1.1.0` 起 `uni-simple-router` 将提供一些辅助API

:::

## RouterMount <sup>v1.3.5+</sup>

* 平台：`H5`

    用于替换 `main.js` 中 `app.$mount();` 功能，保证在 `H5端` 路由守卫能正常运行

```js{10-16}
import Vue from 'vue'
import App from './App'

import { RouterMount } from 'uni-simple-router';

const app = new Vue({
    ...App,
})

// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount();
// #endif
```

**为了兼容其他端你必须按 `糟色` 区域写。**

## NAVTYPE <sup>v1.1.0+</sup>
### push
跳转到普通页面，新开保留历史记录

### replace
动态的导航到一个新 URL 关闭当前页面，跳转到的某个页面。

### replaceAll
动态的导航到一个新 URL 关闭所有页面，打开到应用内的某个页面

### pushTab
动态的导航到一个新 url 关闭所有页面，打开到应用内的某个tab