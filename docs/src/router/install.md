# 安装

## 通过插件市场下载

[https://ext.dcloud.net.cn/plugin?id=578](https://ext.dcloud.net.cn/plugin?id=578)

[uni-simple-router](https://github.com/SilurianYang/uni-simple-router)提供了基于 NPM 的链接。通过 NPM 安装能确保与最新版同步，同样你还可以指定版本或 Tag 。当然你还可以在 [uni-app的插件市场](https://ext.dcloud.net.cn/plugin?id=578) 进行下载，或者直接导入项目中。

## NPM

```bash
npm install uni-simple-router
```
如果在一个模块化工程中使用它，必须要通过 Vue.use() 明确地安装路由功能：

```js
import Vue from 'vue'
import Router, {RouterMount} from 'uni-simple-router';

Vue.use(Router)
```
如果使用插件市场导入，则无须如此 (手动安装)。

## 插件市场
点击[插件市场](https://ext.dcloud.net.cn/plugin?id=578) 点击 `下载插件ZIP` 完成后解压到本地。把 `src` 目录下所有文件拖放到自己项目中。

```js
import Vue from 'vue'
import Router, {RouterMount} from './common/uni-simple-router/index.js';

Vue.use(Router)
```

## 使用开发版
如果你想使用最新的开发版，就得从 GitHub 上直接 clone dev分支，然后自己 拖入到项目中引入index.js。

```bash
git clone https://github.com/SilurianYang/uni-simple-router.git
cd uni-simple-router/src
```