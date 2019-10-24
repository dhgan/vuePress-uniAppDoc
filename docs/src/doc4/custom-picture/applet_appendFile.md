# applet_appendFile 图片路径转自定义 base64 格式数据

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
let res=await ctpic.applet_appendFile({
    path:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2919384842,1326281698&fm=11&gp=0.jpg',
    isNet:true
})
console.log(res);
```

### 代码演示

##### 1.简单使用

```javaScript
let res=await this.$Ctpic.applet_appendFile({
    path:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2919384842,1326281698&fm=11&gp=0.jpg',
    isNet:true
})
console.log(res);

```

##### 2.自定义 base64 图片格式

```javaScript
let res=await this.$Ctpic.applet_appendFile({
    path:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2919384842,1326281698&fm=11&gp=0.jpg',
    isNet:true,
    format:'png'
})
console.log(res);
```

## <div id="FunParams">applet_appendFile 参数</div>

| 属性名 | 类型    | 默认值 | 描述                                                  | 兼容 |
| ------ | ------- | ------ | ----------------------------------------------------- | ---- |
| path   | String  |        | 用于加载图片的路径，可以是网络路径，也可以是本地路径  | 微信小程序  |
| format | String  | png    | 自定义 base64 数据格式                                | 微信小程序  |
| isNet  | Boolean | false  | 当前路径是否为网络路径，如果为网络路径需要设置为 true | 微信小程序  |

| 返回值 | 返回值类型                                                            | 描述                                         |
| ------ | --------------------------------------------------------------------- | -------------------------------------------- |
| base64 | [MIME 字节码](https://baike.baidu.com/item/base64/8545775?fr=aladdin) | 一个由图片自定义后的 base64 数据，带完整头部 |
