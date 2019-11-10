---
sidebarDepth: 2
---

::: tip 高版本API

从 `v1.3.5` 起 `uni-simple-router` 讲提供一些辅助API

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