## ajax 请求方法

### return: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 使用指南

##### 全局使用 (推荐)

```javaScript
//main.js
import {req} from './common/request/request.js';    //文件路径请换成本地路径
req.baseuUrl = 'https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/'       //设置公共请求前面部分,全局生效
//或者这样
req.defaultReq.url='https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/'   //只针对于请求接口

req.defaultReq.baseData={      //设置公共参数，默认为空，设置此参数后每次发送请求都会带上此参数
    token:'000-000-000-000-player125'
}
req.defaultReq.beforeFinish=(res)=>{
    if(res.data.userOut){      //演示代码,需要退出，不做返回标记此次ajax作废
        uni.reLaunch({
            url: 'login?userOut=true'
        });
    }else{
        return res    //返回最终response数据
    }
}

req.defaultReq.type = "POST";   //这是默认请求为post

Vue.prototype.$req = req;   //挂载到原型上

```

##### 局部使用

```javaScript
import {req} from './common/request/request.js';
const res = await req.ajax({
    path: "https://www.easy-mock.com/mock/5ca6ec41215a7b66ff10343d/example/query",
})
```

### 代码演示

##### 1.简单使用

```javaScript
const res = await this.$req.ajax({
    path: "example/query",  //可以是完整路径也可以后半部分
})
console.log(res);
```

##### 2.带请求提示

```javaScript
const res = await this.$req.ajax({
    path: "example/query",
    title: "正在加载",  //false 则不显示
})
console.log(res);
```

##### 3.带参数请求

```javaScript
const res = await this.$req.ajax({
    path: "example/query",
    title: "正在加载",
    data:{
        name:'hhyang'
    }
})
console.log(res);
```

##### 4.单个请求带拦截

```javaScript
const res = await this.$req.ajax({
    path: "example/query",
    title: "正在加载",
    data:{
        name:'hhyang'
    },
    abortFun: (info,bt) => {
        bt.abort();
    },
})
console.log(res);
```

##### 5.监听请求完成，无论失败还是成功。当然可以使用 then、catch、finally [详细](#errReq)

```javaScript
const res = await this.$req.ajax({
    path: "example/query",
    title: "正在加载",
    data:{
        name:'hhyang'
    }，
    finishFun:finsh => { //使用await 用此方法即可监听到
        console.log(finsh)
    }
})
console.log(res);   //成功之后的返回，如要捕捉失败请使用try、catch
```

##### 6.携带额外参数，不会上传。可提供给开发者分辨某个请求 [详细](#ages)

```javaScript
const res = await this.$req.ajax({
    path: "example/query",
    title: "正在加载",
    data:{
        name:'hhyang'
    }，
},'我是额外参数1'，'我是额外参数2')
console.log(res);   //成功之后的返回，如要捕捉失败请使用try、catch

//或者这样
const res = await this.$req.ajax({
    path: "example/query",
    title: "正在加载",
    data:{
        name:'hhyang'
    }，
},{
    parmas1:'我是额外参数1',
    parmas2:'我是额外参数2',
})
console.log(res);   //成功之后的返回，如要捕捉失败请使用try、catch
```

##### <div id="errReq">7.捕捉请求错误</div>

```javaScript
try{
    const res = await this.$req.ajax({
        path: "example/query",
        title: "正在加载",
        data:{
            name:'hhyang'
        },
        abortFun: (info,bt) => {
            bt.abort();
        },
    })
    console.log(res);
}catch(e){
    console.log(e)      //请求发生了错误
}
```

##### <div id="">8.自定义 header、dataType、responseType、type</div>

```javaScript
const res = await this.$req.ajax({
    path:"example/query",
    type:"POST",
    header:{
        'content-type': 'application/x-www-form-urlencoded'
    },
    dataType: 'json',
    responseType: 'text',
})
    console.log(res);
```

##### <div id="">9.设置全局请求前拦截</div>

```javaScript
//延迟函数
let timeout=function(time=3000){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
}
//同步写法
req.defaultReq.beforeSend=res=>{
    if(res.data.token!=''){ //验证token存在的情况下才放行
        return res
    }
}

//同步写法
req.defaultReq.beforeSend=res=>{
	delete res.data;        //删除传递的参数选项
	return res;             //返回新的请求参数
}

//异步写法
req.defaultReq.beforeSend=async res=>{
    await timeout();         //3秒后执行删除，再返回
    delete res.data;         //删除传递的参数选项
    return res;              //返回新的请求参数
}

```

##### <div id="">10.设置全局响应后拦截</div>

```javaScript
//延迟函数
let timeout=function(time=3000){
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve();
        },time)
    })
}
//同步写法
req.defaultReq.beforeFinish=res=>{
    if(res.data.userOut){   //退出登录不返回数据，标记此次请求无效
        uni.reLaunch({
            url: 'login?userOut=true'
        });
    }else{
        return res;
    }
}
//同步写法
req.defaultReq.beforeFinish=res=>{
	return {msg:'这是我自定义的数据'};             //返回新的响应数据
}
//异步写法
req.defaultReq.beforeFinish=async res=>{
    await timeout();         //3秒后执行
    return {msg:'这是我自定义的数据'};             //返回新的响应数据
}
```

## 全局 Options

| 属性名       | 类型    | 默认值 | 描述                                        |
| ------------ | ------- | ------ | ------------------------------------------- |
| baseuUrl     | String  |        | 请求路径，开发者可以把公共的部分定义在这里  |
| isUpOpenDown | Boolean | false  | 是否在上传 js 中引入下载的 js，支持动态修改 |

> baseuUrl 修改时会生效：上传，下载接口的公共部分。

## 全局 defaultReq

| 属性名       | 类型     | 默认值                                                | 描述                                                                                                                                                                                                                                       | 兼容               |
| ------------ | -------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------ |
| isreq        | Boolean  | true                                                  | 是否开启 ajax 请求方法,默认是开启,**如果该为 false,请求则不会调用并返回一个 reject**                                                                                                                                                       |                    |
| url          | String   |                                                       | 用于修改请求接口地址，赋值此值会覆盖通过**baseuUrl 赋值的值**                                                                                                                                                                              |                    |
| header       | Object   | {'content-type': 'application/x-www-form-urlencoded'} | 用于设置请求类型                                                                                                                                                                                                                           |                    |
| baseData     | Object   |                                                       | 设置基础参数,也就是说请求每次请求都会带上这个参数                                                                                                                                                                                          |                    |
| type         | String   | GET                                                   | 请求方式，默认 GET。设置次参数时全部使用大写                                                                                                                                                                                               |                    |
| dataType     | String   | json                                                  | 返回数据类型，默认为 json。会对返回数据做一个 JSON.parse                                                                                                                                                                                   |                    |
| responseType | String   | text                                                  | 设置响应的数据类型。合法值：text、arraybuffer                                                                                                                                                                                              | 支付宝小程序不支持 |
| beforeSend   | Function |                                                       | ajax 在发送前执行，等待改方法执行完成并传入请求的一系列参数，支持同步异步写法。**必须返回传入的请求参数，供 if 判断语句块执行，false 情况下抛出 ajax 错误，终止此次请求。相反之**                                                          |                    |
| beforeFinish | Function |                                                       | 开发者自定义代码块容器，此方法回调一个 response 对象，即 ajax 返回数据。开发者可以在此方法内做一系列逻辑判断。比如退出，等其他操作，支持同步异步写法。**该方法必须返回一个数据，供 if 判断语句块执行，false 情况下抛出 ajax 错误，相反之** |                    |  |

> 全局 defaultReq 设置完成后针对全局有效，ajax 方法默认在你没传值的情况下优先采用的全局参数。可以通过向 ajax 方法传递参数覆盖全局的[详细](#FunParams)

## <div id="FunParams">ajax 参数</div>

| 属性名                         | 类型                       | 描述                                                                                        | 兼容               |
| ------------------------------ | -------------------------- | ------------------------------------------------------------------------------------------- | ------------------ |
| path                           | String                     | 请求路径，可以是整个路径(设置了全局 url 则无效)，也可以是相同路径后拆分出来的后半部分       |                    |
| title                          | Boolean/String             | 是否显示请求提示 默认为 false 不显示, 传入字符串则显示 推荐 7 个字内                        |                    |
| header                         | Object/String              | 传入 Object 则为自定义整个 header。String 则只修改'content-type'，默认取全局配置中的 header |                    |
| data                           | Object/String/ArrayBuffer  | 请求上传的参数,默认会加上全局配置中的 baseData                                              |                    |
| type                           | String                     | 请求方式。设置次参数时全部使用大写，默认使用全局配置中的                                    |                    |
| dataType                       | String                     | 返回数据类型，默认为 json。会对返回数据做一个 JSON.parse，默认使用全局配置中的              |                    |
| responseType                   | String                     | 设置响应的数据类型。合法值：text、arraybuffer                                               | 支付宝小程序不支持 |
| abortFun                       | Function                   | 第一个参数返回请求信息,第二个返回 requestTask 对象，通过 requestTask，可中断请求任务。      |                    |
| finishFun                      | Function                   | 第一个参数返回请求信息，无论请求失败还是成功都会走此方法                                    |                    |  |
| <div id="ages">[...ages]</div> | Object/String/Array/Number | 不做任何处理，ajax 完成后返回个你,可以通过此标记一个请求                                    |                    |  |
