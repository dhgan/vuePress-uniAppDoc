# applet_URLtoPath 微信小程序base64转为图片对象

### return: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 使用指南

##### 全局使用 (推荐)

```javaScript
//main.js
import Ctpic from '@/common/uni-app-customImg/custom-picture.js';    //文件路径请换成本地路径
Vue.prototype.$Ctpic = new Ctpic();   //挂载到原型上
```

##### 局部使用

```javaScript

import Ctpic from '@/common/uni-app-customImg/custom-picture.js'; //文件路径请换成本地路径
const ctpic = new Ctpic();
let res=await ctpic.applet_URLtoPath({
    base64:base64, //base64数据，需要自己填写，此次base64为演示。
})
console.log(res);

```

### 代码演示

##### 1.简单使用

```javaScript
let path=await this.$Ctpic.applet_URLtoPath({
    base64:base64,  //base64数据，需要自己填写，此次base64为演示。
});
console.log(path);

```

##### 2.自定义图片名称

```javaScript
let path=await this.$Ctpic.applet_URLtoPath({
    base64:base64,  //base64数据，需要自己填写，此次base64为演示。
    filename:'我是hhyang'
});
console.log(path);

```

##### 3.自定义图片名称及后缀

```javaScript
let path=await this.$Ctpic.applet_URLtoPath({
    base64:base64,  //base64数据，需要自己填写，此次base64为演示。
    filename:'我是hhyang',
    format:'png',
});
console.log(path);

```

## <div id="FunParams">applet_URLtoPath参数</div>
属性名  |   类型    |   默认值  |   描述    |   兼容
--- |   ----    |   -----   |  ----    |   ----
base64  |   [MIME字节码](https://baike.baidu.com/item/base64/8545775?fr=aladdin)    |   |   一个完整的base64格式数据，必须有携带头部标识    |   微信小程序
filename    |   String  |   HHYANG    |   通过base64转成图片后显示的图片名称  |  微信小程序
format  |   String  |   png   |   通过base64转成指定的图片格式 **支持"jpg"、"png"**    |   微信小程序

## <div id="applet_URLtoPathCallback">applet_URLtoPath返回参数</div>
返回值  |   返回值类型  |描述    
----    |   ----    |   ----
FilePath    |   String  |   返回一个用户可以操作的绝对路径，**可以通过返回的路径直接上传，不支持赋值预览，如需预览可以通过转base64预览**

> 如果微信小程序版本不支持**getFileSystemManager** 将会抛出一个错误