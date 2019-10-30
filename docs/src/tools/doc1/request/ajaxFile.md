# ajaxFile 上传文件方法     
### return: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 使用指南

##### 全局使用 (推荐)
```javaScript
//main.js
import {req} from './common/request/request.js'; //文件路径请换成本地路径

req.baseuUrl = 'https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/'       //设置公共请求前面部分，全局生效
//或者这样
req.defaultUp.url='https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/' //只针对于上传接口

req.defaultUp.baseData={    //设置公共参数，默认为空，设置此参数后每次发送请求都会带上此参数
    token:'000-000-000-000-defaultUp'
}

Vue.prototype.$req = req;   //挂载到原型上
```
##### 局部使用
```javaScript
import {req} from './common/request/request.js';
const res = await req.ajaxFile({
    path: "https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/example/upload",
    title:'正在上传'，
    filePath:'' //文件临时路径，或者永久路径
    fileName:'' //需要上传的文件名
})

```
### 注意事项
> 此方法只能一次上传一个，如果需要批量上传则调用[startUpFiles](../requestUpFiles/startUpFiles.md)方法。

### 代码演示

##### 1.简单使用

```javaScript
const res = await req.ajaxFile({
    path: "example/upload",
    filePath:'' //文件临时路径，或者永久路径
    fileName:'' //需要上传的文件名
})
```
##### 2.带上传提示

```javaScript
const res = await req.ajaxFile({
    path: "example/upload",
    title:'正在上传',
    filePath:'' //文件临时路径，或者永久路径
    fileName:'' //需要上传的文件名
})
```
##### 3.带额外参数上传

```javaScript
const res = await req.ajaxFile({
    path: "example/upload",
    title:'正在上传',
    filePath:'' //文件临时路径，或者永久路径
    fileName:'' //需要上传的文件名
    extra:{
        name:'hhyang'
    }
})
```
##### 4.单个上传文件带拦截
```javaScript
const res = await req.ajaxFile({
    path: "example/upload",
    title:'正在上传',
    filePath:'' //文件临时路径，或者永久路径
    fileName:'' //需要上传的文件名
    abort:bt=>{
        bt.abort(); //拦截此次上传
    },
    extra:{
        name:'hhyang'
    }
})
```
##### <div id="errReq">5.捕捉请求错误</div>
```javaScript
try{
const res = await req.ajaxFile({
    path: "example/upload",
    title:'正在上传',
    filePath:'' //文件临时路径，或者永久路径
    fileName:'' //需要上传的文件名
    abort:bt=>{
        bt.abort(); //拦截此次上传
    },
    extra:{
        name:'hhyang'
    }
})
}catch(e){
    console.log(e); //请求发生了错误
}
```
##### 6.自定义header
```javaScript
const res = await req.ajaxFile({
    path: "example/upload",
    title:'正在上传',
    header:{
        'content-type': 'multipart/form-data;'
    },
    filePath:'' //文件临时路径，或者永久路径
    fileName:'' //需要上传的文件名
    extra:{
        name:'hhyang'
    }
})

```
## 全局Options
属性名  |   类型    |   默认值  |   描述    | 
--- |   ----    |   ----    |   ----    | 
baseuUrl    |   String  |   |   请求路径，开发者可以把公共的部分定义在这里 
isUpOpenDown    |   Boolean    |   false   |是否在上传js中引入下载的js，支持动态修改 
> baseuUrl修改时会生效：上传，下载接口的公共部分。

## 全局defaultUp
属性名  |   类型    |   默认值  |   描述    
--- |   ----    |   ----    |   ----   
url |   String  |   |   用于修改上传接口地址，赋值此值会覆盖通过**baseuUrl赋值的值**    
baseData    |   Object  |   |   设置基础参数,也就是说上传接口每次请求都会带上这个参数  
header  |   Object  |   {'content-type': 'multipart/form-data;'}   |   用于设置上传文件的类型
> 全局defaultUp 设置完成后针对全局有效，ajaxFile方法默认在你没传值的情况下优先采用的全局参数。可以通过向ajaxFile方法传递参数覆盖全局参数[详细](#FunParams)

## <div id="FunParams">ajaxFile参数</div>
属性名  |   类型    |   描述    
--- |   ----    |    ----    
path|   String  |   上传路径，可以是整个路径(设置了全局url则无效)，也可以是相同路径后拆分出来的后半部分
title|  Boolean/String  |   是否显示上传文件提示 默认为false不显示, 传入字符串则显示 推荐7个字内
header| Object   |   自定义整个header。默认取全局配置中的header
filePath    |   String  |   文件临时路径，或者永久路径
fileName    |   String  |   需要上传的文件名
extra   |   Object  |   需要除上传文件意外额外的参数
abort  |   Function    |   返回一个 requestTask 对象，通过 requestTask，可中断请求任务。或者是监听上传进度


