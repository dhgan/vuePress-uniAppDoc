# downFiles 下载文件方法    
### return: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 使用指南

##### 全局使用 (推荐)

```javaScript
import {req} from './common/request/request.js'; //文件路径请换成本地路径
Vue.prototype.$req = req;   //挂载到原型上
```

##### 局部使用

```javaScript
import {req} from './common/request/request.js';
const res = await req.downFiles({
    path: "http://pic.topmeizi.com/wp-content/uploads/2017a/04/08/01.jpg",
})
```

### 注意事项
> 此方法只能一次下载一个，如果需要批量下载则调用[startDownFiles](../requestdownFiles/startDownFiles.md)方法。

### 代码演示

##### 1.简单使用

```javaScript
const res=await	this.$req.downFiles({
	path:'http://localhost:10086/static/hhyang.txt',
})
console.log(res)
```
##### 2.带下载提示

```javaScript
const res = await this.$req.downFiles({
    path: 'http://localhost:10086/static/hhyang.txt',
    title: "正在下载"
})
console.log(res)
```
##### <div id="lanjie">3.带拦截下载</div>

```javaScript
const res = await this.$req.downFiles({
    path: 'http://localhost:10086/static/hhyang.txt',
    title: "正在下载",
    abort:(bt,params)=>{
        bt.abort();     //拦截此次下载
    }
})
console.log(res)
```
##### 4.带额外参数下载
```javaScript
const res = await this.$req.downFiles({
    path: 'http://localhost:10086/static/hhyang.txt',
    title: "正在下载",
    name:'hhyang',
    ages:'21'
})
console.log(res)
```
##### <div id="jd">5.带进度条下载</div>

```javaScript
const res = await this.$req.downFiles({
    path: 'http://localhost:10086/static/hhyang.txt',
    abort: (bt,params) => {
        bt.onProgressUpdate(ps => {
            console.log('下载进度' + ps.progress);
            console.log('已经下载的数据长度' + ps.totalBytesWritten);
            console.log('预期需要下载的数据总长度' + ps.totalBytesExpectedToWrite);
        })
    }
})
console.log(res)

```
##### 6.自定义header

```javaScript
const res = await this.$req.downFiles({
    path: 'http://localhost:10086/static/hhyang.txt',
    title: "正在下载",
    header:{
        "Content-Type":"text/plain; charset=UTF-8"
    }
})
console.log(res)
```
## <div id="FunParams">downFiles参数</div>
属性名  |   类型    |   默认值  |  必填 |   描述 
--- |   ----    |   ----    |   ----|   ---
path    |   String  |   |  **是** |  下载文件的路径
title   |      Boolean  |   false   |  否 |  是否显示下载提示，下载完成自动消失
abort   |   Function    |   |   否  |   返回两个参数。第一个为下载实例，可用于监听下载[进度](#jd) 或者[拦截此次下载](#lanjie)。第二个为调用当前方法传递的所有参数
header  |   Object  |   |   否  |   HTTP 请求 Header, header 中不能设置 Referer
[...ages]    |      Object/String/Array/Number  |   |    否  |   其他额外参数，不做任何处理，下载完成后返回个你,可以通过此标记一个请求  
