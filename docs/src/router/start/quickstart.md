
# 快速上手


## 一、安装

插件市场地址：[https://ext.dcloud.net.cn/plugin?id=578](https://ext.dcloud.net.cn/plugin?id=578)

[uni-simple-router](https://github.com/SilurianYang/uni-simple-router)提供了基于 NPM 的链接。通过 NPM 安装能确保与最新版同步，同样你还可以指定版本或 Tag 。当然你还可以在 [uni-app的插件市场](https://ext.dcloud.net.cn/plugin?id=578) 进行下载，或者直接导入项目中。

### 方式一：NPM安装（推荐）

1、项目根目录命令行执行
```bash
npm install uni-simple-router
```

2、项目中引入
```js
import Vue from 'vue'
import Router, {RouterMount} from 'uni-simple-router';
Vue.use(Router)
//...后续代码
```
### 方式二：插件市场（使用HBuilderX导入插件）

1、前往[插件市场](https://ext.dcloud.net.cn/plugin?id=578) 点击 `使用HBuilderX导入插件` 完成后会自动在根目录生成`js_sdk`目录，我们会看到里面有一个`hhyang-uni-simple-router`文件夹。

2、项目中引入
```js
import Vue from 'vue'
import Router, {RouterMount} from './js_sdk/hhyang-uni-simple-router/index.js';

Vue.use(Router)
//...后续代码
```
### 方式三：插件市场（下载插件ZIP）

1、前往[插件市场](https://ext.dcloud.net.cn/plugin?id=578) 点击 `下载插件ZIP` 完成后解压到本地。把 解压的`src` 目录下所有文件拖放到自己创建的项目文件夹中(比如`/common/uni-simple-router`)。

2、项目中引入
```js
import Vue from 'vue'
import Router, {RouterMount} from './common/uni-simple-router/index.js';

Vue.use(Router)
//...后续代码
```

### 体验开发版（正式项目慎用）
如果你想体验最新的开发版，就得从 GitHub 上直接 clone dev分支，然后自己 拖入到项目中引入index.js。

```bash
git clone https://github.com/SilurianYang/uni-simple-router.git
cd uni-simple-router/src
```
## 二、初始化

::: warning 注意
以下教程为项目页面较多时的推荐router初始化方案，目的是模块化，让代码解耦，使条理加更清晰。如果页面较少，可适当精简流程。
:::
### 第1步、项目根目录创建router文件夹
文件夹内创建如下结构用于放置路由相关文件：
```t

router
    |--modules
    |   |--index.js
    |--index.js

```
我们可以看到router有个moduls文件夹，这是专门放置路由表模块的。
moduls内的index.js如下编写
```js
// router/modules/index.js
const files = require.context('.', false, /\.js$/)
const modules = []

files.keys().forEach(key => {
  if (key === './index.js') return
  const item = files(key).default
  modules.push(...item)
})

export default modules

```
我们不难发现，这个index.js将引入同目录下其他js文件并读取，使所有路由整合为一个数组并export导出。
接下来你可以根据不同的页面分类，创建不同的js模块，我们试着在modules下创建一个home.js用于存放首页及其相关的路由

```js
// router/modules/home.js
const home = [
	{
        //注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
	    path: '/pages/home/index',
        name: 'index',
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
export default home

```
这时该模块将被自动加载到modules中，你可以根据不同的路由分类，添加更多模块。index.js会自动载入,就是这么方便!
### 第2步、引入uni-simple-router模块
我们打开router下的index.js,配置如下
```js
// router/index.js

import modules from './modules'
import Vue from 'vue'
//这里仅示范npm安装方式的引入，其它方式引入请看最上面【安装】部分
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
    routes: [...modules]//路由表
});

//全局路由前置守卫
router.beforeEach((to, from, next) => {
  next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;
```
我们看到刚才的modules已经加入到了路由表routes中。
::: warning 注意
在跨平台模式下，routes中的路由必须与pages.json中的页面一一对应，也就是说pages.json中有几个页面，routes就得有对应的路由，否则跳转的时候可能会报错
:::
### 第3步、配置main.js
根目录下找到main.js，引入router
```js
// main.js
import Vue from 'vue'
import App from './App'
import router from './router'
import { RouterMount } from 'uni-simple-router'

App.mpType = 'app'

const app = new Vue({
	...App
})
RouterMount(app, '#app')////v1.3.5起 你应该去除原有的app.$mount();使用路由自带的渲染方式

```
### 在其它js文件中使用router,
至此，你可以在所有页面中使用this.$Router跳转，或者用this.$Route接收参数了。但是在一些模块的js中（比如封装的网络请求拦截）使用时，可能会出现this指代不明的情况。这时，刚才我们创建的router文件模块的好处就显现出来了。
比如在根目录下的requset.js中使用router
```js
// request.js
import Vue from 'vue'
import Router from '@/router'

//...其它逻辑代码
Router.push({ name:'login' })

```
快速上手到此完成，如果需要更深入理解其中的功能模块，请根据自身项目的性质，阅读[跨平台模式](./cross/match.md) 或者[H5模式](./h5/explian.md) 的详细介绍。