# upnNetRes 上传网络文件

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
rup.defaultFile.upOpenDown=true;    //打开下载开关
Vue.prototype.$rup = rup;   //挂载到原型上
```

##### 局部使用
```javaScript
import rup  from '@/common/request/request-upFiles.js';
rup.defaultUp.url='https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/'
rup.defaultFile.upOpenDown=true;    //打开下载开关
const res = await rup.upnNetRes({
    netPath:['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=421118981,56990953&fm=27&gp=0.jpg'],
    upPath:'example/upload',
    files:['image'],   //服务端用于接收图片的名称
    title: '正在上传',  //显示上传的提示
}) 

console.log(res);
```

### 代码演示

##### 1.简单使用

```javaScript
const res = await this.$rup.upnNetRes({
     netPath:['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=421118981,56990953&fm=27&gp=0.jpg'],
    upPath: 'example/upload',       //换成自己的路径
    files：['image'],   //服务端用于接收图片的名称
});

console.log(res);
```

##### 2.带上传提示

```javaScript
const res = await this.$rup.upnNetRes({
     netPath:['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=421118981,56990953&fm=27&gp=0.jpg'],
    upPath: 'example/upload',       //换成自己的路径
    files:['image'],   //服务端用于接收图片的名称
    title: '正在上传',  
});

console.log(res);
```

##### 3.批量上传网络文件

```javaScript
const res = await this.$rup.upnNetRes({
     netPath:['https://img.alicdn.com/imgextra/i3/117331861/TB24K.sayMnBKNjSZFCXXX0KFXa_!!0-saturn_solar.jpg_180x180.jpg','https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=421118981,56990953&fm=27&gp=0.jpg'],
    upPath: 'example/upload',       //换成自己的路径
    files:['image0','image1'],   //服务端用于接收图片的名称
    title: '正在上传',  
});

console.log(res);
```
##### 4.携带额外表单参数
```javaScript
const res = await this.$rup.upnNetRes({
     netPath:['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=421118981,56990953&fm=27&gp=0.jpg'],
    upPath: 'example/upload',       //换成自己的路径
    files:['image'],   //服务端用于接收图片的名称
    title: '正在上传', 
    extra:{
        name:'hhyang',
        ages:21
    },
});

console.log(res);

```
##### 5.上传拦截示例
```javaScript
const res = await this.$rup.upnNetRes({
     netPath:['https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=421118981,56990953&fm=27&gp=0.jpg'],
    upPath: 'example/upload',       //换成自己的路径
    files:['image'],   //服务端用于接收图片的名称
    title: '正在上传', 
    abort:(info,bt)=>{
        if(info.args.index==0){
            bt.abort();
        }
    },
});

console.log(res);

```

## upnNetRes参数
属性名  |   类型    |   默认值  |  必填 |   描述 
--- |   ----    |   ----    |   ----|   ---
upPath    |   String/Array  |       |   **是**  |   用于上传到服务器的路径。如果是字符串则会根据 **‘,’** 默认分割成数组,如果此参数分割为数组和**netPath**参数长度不匹配，则不匹配部分统一使用**upPath**最后一位。
netPath   |  String/Array   |       |    **是** |   需要下载的目标对象，如果为**String**则通过 **‘,’** 默认分割成数组。
files   |   Array   |   |   **是**  |   服务器接收的名称，如果上传的**netPath**集合有多个，而**files**数组中只有一个。则上传的名称全部为数组中的那个值，所以**files**必须和**netPath**上传的文件对应
title   |   Boolean/String    | false   |   否  | 传入字符串则显示 推荐 7 个字内
extra   |   Object  |       |   否  |   上传文件时需要额外附带的表单参数
abort   |   Function    |   |   否  |   请求触发正真上传时会触发此方法，回调第一个为当前上传的信息，第二个为requestTask对象
[...ages]|  Object  |       |   否  |   [ajaxFile](../request/ajaxFile.md#FunParams) 所有支持的参数及一些自定义的额外参数