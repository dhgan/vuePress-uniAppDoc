# h5_URLtoBlob 浏览器端 base64 转自定义名称 File 对象

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
let FilePath=await ctpic.h5_URLtoBlob({
    base64:base64,  //base64数据，需要自己填写，此次base64为演示。
    filename:'我是hhyang'
});
console.log(FilePath);
```

### 代码演示

##### 1.简单使用

```javaScript
let FilePath=await this.$Ctpic.h5_URLtoBlob({
    base64:base64,  //base64数据，需要自己填写，此次base64为演示。
    filename:'我是hhyang'
});
console.log(FilePath);

```
##### 2.转file对象，而非blob路径

```javaScript
let File=await this.$Ctpic.h5_URLtoBlob({
    base64:base64,  //base64数据，需要自己填写，此次base64为演示。
    filename:'我是hhyang',
    resolvePath:false
});
console.log(File);

```

## <div id="FunParams">h5_URLtoBlob参数</div>

属性名  |   类型    |   默认值  |   描述    |   兼容
--- |   ----    |   -----   |  ----    |   ----
base64  |   [MIME字节码](https://baike.baidu.com/item/base64/8545775?fr=aladdin)    |   |   一个完整的base64格式数据，必须有携带头部标识    |   h5
filename    |   String  |   |   转file对象后显示的名称字段,文件后缀自动取值base64数据头部格式  |   h5
resolvePath |   Boolean |  true  |   是否把转换完成后的file对象解析为路径输出 |   h5

> 完整的base64数据，携带头部是这样的 **data:image/jpeg;base64,xxxxxxxxxxxxx.....**

## <div id="h5_URLtoBlobCallback">h5_URLtoBlob返回参数</div>
返回值  |   resolvePath  |描述    
----    |   ----    |   ----
[File](https://developer.mozilla.org/zh-CN/docs/Web/API/File)   |   false   |   返回一个自定义名称的file对象
path    |   true    |   通过转自定义file对象解析为url输出，**可以通过返回的blob路径直接上传，也可以支持赋值img标签进行预览**