# startDownFiles 开始下载文件到本地

### return: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)


### 使用指南

##### 全局使用 (推荐)

```javaScript
//main.js
import {df} from './common/request/request-downFiles.js';    //文件路径请换成本地路径
Vue.prototype.$df = df;   //挂载到原型上
```

##### 局部使用

```javaScript
import {df} from './common/request/request-downFiles.js';
const res = await df.downFiles({
    path: 'http://localhost:10086/static/hhyang.txt',       //换成自己需要的下载地址
})
console.log(res);
```
### 注意事项

> 因为**DonwFiles**类继承于**Request**类,你可以在实例化后的**DonwFiles**类中使用**Request**中的方法，而非说在重复导入**Request.js。startDownFiles是downFiles的升级版** 支持多文件下载。**downFiles**中的所有参数在**startDownFiles**一样可以使用，仅是**path发生了变化而已** [查看所有方法](../README.md)

### 代码演示

##### 1.简单使用

```javaScript
const res = await this.$df.startDownFiles({
    path: 'http://localhost:10086/static/hhyang.txt',   //换成自己需要的下载地址
})
console.log(res);
```

##### 2.带下载提示

```javaScript
const res = await this.$df.startDownFiles({
    path: 'http://localhost:10086/static/hhyang.txt',   //换成自己需要的下载地址
    title:'正在下载',
})
console.log(res);
```

##### <div id="jd">3.带进度条下载</div>

```javaScript
const res = await this.$df.startDownFiles({
    path: 'http://localhost:10086/static/hhyang.txt',
    abort: (params,bt) => {
        bt.onProgressUpdate(ps => {
            console.log('下载进度' + ps.progress);
            console.log('已经下载的数据长度' + ps.totalBytesWritten);
            console.log('预期需要下载的数据总长度' + ps.totalBytesExpectedToWrite);
        })
    }
})
console.log(res)

```
##### 4.批量下载
```javaScript
const res = await this.$df.startDownFiles({
    path: ['http://192.168.0.29:10086/static/hhyang.txt', 'http://192.168.0.29:10086/static/cxq.jpg'],
    title:'正在下载',
})
console.log(res)

//or

const res = await this.$df.startDownFiles({
    path: 'http://192.168.0.29:10086/static/hhyang.txt,http://192.168.0.29:10086/static/cxq.jpg',
    title:'正在下载',
})
console.log(res)

```

##### <div id="lanjie">5.带拦截下载</div>

```javaScript
const res = await this.$df.startDownFiles({
    path: 'http://localhost:10086/static/hhyang.txt',   //换成自己需要的下载地址
    title:'正在下载',
    abort:(params,bt)=>{
        if(params.index==0){
            bt.abort();
        }
    }
})
console.log(res);
```

##### 6.自定义header

```javaScript
const res = await this.$df.startDownFiles({
    path: 'http://localhost:10086/static/hhyang.txt',
    title: "正在下载",
    header:{
        "Content-Type":"text/plain; charset=UTF-8"
    }
})
console.log(res)
```

## <div id="FunParams">startDownFiles参数</div>
属性名  |   类型    |   默认值  |  必填 |   描述 
--- |   ----    |   ----    |   ----|   ---
path    |   String/Array  |   |  **是** |  下载文件的路径，多个用数组或者字符串逗号分隔
title   |      Boolean  |   false   |  否 |  是否显示下载提示，下载完成自动消失
abort   |   Function    |   |   否  |   返回两个参数。第一个为调用当前方法传递的所有参数，每次准备发起下载请求前都会触发这个方法，可以通过**index**索引区分或者中断批量下载中的指定请求。第二个为下载实例，可用于监听下载[进度](#jd) 或者[拦截此次下载](#lanjie)。
header  |   Object  |   |   否  |   HTTP 请求 Header, header 中不能设置 Referer
[...ages]    |      Object/String/Array/Number  |   |    否  |   其他额外参数，不做任何处理，下载完成后返回个你,可以通过此标记一个请求  
