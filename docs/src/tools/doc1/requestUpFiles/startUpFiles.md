# startUpFiles  开始上传文件

### return: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 使用指南

##### 全局使用 (推荐)

```javaScript
//main.js
import rup  from '@/common/request/request-upFiles.js';    //文件路径请换成本地路径
rup.defaultUp.url='https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/'
rup.defaultUp.baseData = { //设置公共参数，默认为空，设置此参数后每次发送请求都会带上此参数
	token: '000-000-000-000-defaultUp'
}
Vue.prototype.$rup = rup;   //挂载到原型上
```

##### 局部使用
```javaScript
import rup  from '@/common/request/request-upFiles.js';
const res = await rup.startUpFiles({
    path: 'https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/example/upload',       //换成自己的路径，如果设置了公共路径可以简写
    files：['image'],   //服务端用于接收图片的名称
    title: '正在上传',  //显示上传的提示
},["blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0"])  //换成自己的文件路径

console.log(res);
```

### 代码演示

##### 1.简单使用

```javaScript
const res = await this.$rup.startUpFiles({
    path: 'example/upload',       //换成自己的路径
    files：['image'],   //服务端用于接收图片的名称
},["blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0"])  //换成自己的文件路径

console.log(res);
```
##### 2.带上传提示

```javaScript
const res = await this.$rup.startUpFiles({
    path: 'example/upload',       //换成自己的路径
    files：['image'],   //服务端用于接收图片的名称
    title: '正在上传',  //显示上传的提示
},["blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0"])  //换成自己的文件路径

console.log(res);
```
##### 3.多文件上传

```javaScript
const res = await this.$rup.startUpFiles({
    path: 'example/upload',       //换成自己的路径
    files：['image','image1'],   //服务端用于接收图片的名称
    title: '正在上传',  //显示上传的提示
},["blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0","blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7defsdad"])  //换成自己的文件路径

console.log(res);
```
##### 4.携带额外表单参数

```javaScript
const res = await this.$rup.startUpFiles({
    path: 'example/upload',       //换成自己的路径
    files：['image'],   //服务端用于接收图片的名称
    title: '正在上传',  //显示上传的提示
    extra:{     //额外参数
        name:'hhyang',
        ages:21
    }
},["blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0"])  //换成自己的文件路径

console.log(res);
```
##### 5.不上传仅返回上传文件集合

```javaScript
const res = await this.$rup.startUpFiles({
    path: 'example/upload',       //换成自己的路径
    files：['image'],   //服务端用于接收图片的名称
    title: '正在上传',  //显示上传的提示
    extra:{     //额外参数
        name:'hhyang',
        ages:21
    },
    isUp：false,    //不上传
},["blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0"])  //换成自己的文件路径

console.log(res);
```
##### 6.上传拦截示例
```javaScript
const res = await this.$rup.startUpFiles({
    path: 'example/upload',       //换成自己的路径
    files：['image'],   //服务端用于接收图片的名称
    title: '正在上传',  //显示上传的提示
    abort:(info,bt)=>{
        if(info.args.index==0){     //第一个请求直接拦截
            bt.abort();
        }
    },
},["blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0"])  //换成自己的文件路径

console.log(res);

```



## <div id="FunParams">startUpFiles([Object](#Object),[blobList](#blobList))</div>

#### <div id="Object">Object参数</div>
属性名  |   类型    |   默认值  |  必填 |   描述 
--- |   ----    |   ----    |   ----|   ---
path    |   String  |       |   **是**  |   用于上传到服务器的路径。可以是完整路径，也可以是去除基础路径后的路径
files   |   Array   |   |   **是**  |   服务器接收的名称，如果上传的[blobList](#blobList)集合有多个，而**files**数组中只有一个。则上传的名称全部为数组中的那个值，所以**files**必须和[blobList](#blobList)上传的文件对应
isUp    |   Boolean |  true  |  否  |   用于判断当前是否需要真正的上传文件到服务器,改成false它将直接返回传入的[blobList](#blobList)
title   |   Boolean/String    | false   |   否  | 传入字符串则显示 推荐 7 个字内
extra   |   Object  |       |   否  |   上传文件时需要额外附带的表单参数
abort   |   Function    |   |   否  |   请求触发正真上传时会触发此方法，回调第一个为当前上传的信息，第二个为requestTask对象
[...ages]|  Object  |       |   否  |   [ajaxFile](../request/ajaxFile.md#FunParams) 所有支持的参数及一些自定义的额外参数

#### <div id="blobList">blobList参数</div>
> 必须是一个数组，他是由[selectFiles](./selectFiles.md)获取到的文件路径集合。**它是必填的**，你也可以同过[AppSelectFiles](./AppSelectFiles.md)和[otherSelectFiles](./otherSelectFiles.md)选择自己相应的方法来完成**blobList**的组装。最终的数据将会是这样的形式: ['blob:http://192.168.0.29:10086/c939121a-0556-49c8-8370-fdf4e7ded7f0']