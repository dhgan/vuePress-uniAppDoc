# dataURLtoBlob 图片自定义

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
let res=await ctpic.dataURLtoBlob({
        path: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299253315,3157332866&fm=26&gp=0.jpg',
        isNet: true,    //是否为网络路径
        filename: '陈玉琪我女神', //自定义文件名，非后缀
});
console.log(res);
```

### 代码演示

##### 1.简单使用

```javaScript
//默认转为.png文件，名称为 HHYANG
let res = await this.$Ctpic.dataURLtoBlob({
    path: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299253315,3157332866&fm=26&gp=0.jpg',
    isNet: true,
});
```

##### 2.网络图片转自定义的 base64 值

```javaScript
let res = await this.$Ctpic.dataURLtoBlob({
    path: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299253315,3157332866&fm=26&gp=0.jpg',
    isNet: true,
    GetBase64:true
});
```

##### 3.转自定义名称

```javaScript
let res = await this.$Ctpic.dataURLtoBlob({
    path: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299253315,3157332866&fm=26&gp=0.jpg',
    isNet: true,
    filename:'陈玉琪我女神'
});
```

##### 4.转自定义名称和格式

```javaScript
let res = await this.$Ctpic.dataURLtoBlob({
    path: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299253315,3157332866&fm=26&gp=0.jpg',
    isNet: true,
    filename:'陈玉琪我女神',
    format:'png'
});
```

##### 5.网络图片转自定义的 base64 值、并压缩指定百分比

```javaScript
let res = await this.$Ctpic.dataURLtoBlob({
    path: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299253315,3157332866&fm=26&gp=0.jpg',
    isNet: true,
    filename:'陈玉琪我女神',
    format:'png',
    GetBase64:true,
    compress:0.5,   //压缩百分之50
});
```

##### 6.自定义文件名和格式后上传示例

```javaScript
try {
    let res = await this.$Ctpic.dataURLtoBlob({
        path: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=299253315,3157332866&fm=26&gp=0.jpg',
        isNet: true,
        filename: '陈玉琪我女神',
    });
    let filePath = '';

    // #ifdef APP-PLUS
    filePath = filePath.target
    // #endif

    // #ifndef APP-PLUS
    filePath = res;
    // #endif

    uni.uploadFile({
        url: 'http://192.168.0.29:1111/upload_images', //本地接口，换成自己的
        filePath,
        name: 'upload',
        success: (uploadFileRes) => {
            console.log(uploadFileRes.data);
        }
    });

} catch (e) {
    console.log(e)
}

```

## <div id="FunParams">dataURLtoBlob 参数</div>

| 属性名    | 类型    | 默认值 | 描述                                                                    | 兼容              |
| --------- | ------- | ------ | ----------------------------------------------------------------------- | ----------------- |
| path      | String  |        | 用于加载的图片地址，可以是网络路径也可以是本地路径                      | app/h5/微信小程序 |
| GetBase64 | Boolean | false  | 是否仅取当前图片的自定义格式的 base64 值                                | app/h5/微信小程序 |
| filename  | String  | HHYANG | 自定义的图片名称                                                        | app/h5/微信小程序 |
| format    | String  | png    | 自定义的图片的格式                                                      | app/h5/微信小程序 |
| isNet     | Boolean | false  | 当前转换的图片是否为**网络图片**,设置为 true 自动加载网络图片并转换完成 | app/h5/微信小程序 |
| compress  | Number  | 1      | 压缩图片百分比，默认不压缩 0-1 之间，值越大越清晰,默认为**不压缩**      | app/h5            |

## <div id="dataURLtoBlobCallback">dataURLtoBlob 返回参数</div>

| 终端       | 返回值类型 | 描述                                                                                                                             |
| ---------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------- |
| app        | Object     | 返回一个文件对象，包含文件的绝对路径，图片的高度、宽度、大小 **可以通过返回的绝对路径直接上传，也可以支持赋值 img 标签进行预览** |
| h5         | String     | 返回一个自定义完成的 file 对象 blob 路径，**可以通过返回的 blob 路径直接上传，也可以支持赋值 img 标签进行预览**                  |
| 微信小程序 | String     | 返回一个用户可以操作的绝对路径，**可以通过返回的路径直接上传，不支持赋值预览，如需预览可以通过转 base64 预览**                   |

> 以上均为转自定义文件，而非返回 base64 数据。
