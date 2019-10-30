# selectFiles 选择本地相册文件并上传

### return: [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### 使用指南

##### 全局使用 (推荐)


```javaScript
//main.js
import rup  from '@/common/request/request-upFiles.js';    //文件路径请换成本地路径
Vue.prototype.$rup = rup;   //挂载到原型上
```
##### 局部使用
```javaScript
import rup  from '@/common/request/request-upFiles.js';
const res = await rup.selectFiles({     //选择一张图片并上传
        type:0,
        upload: {
            path: 'example/upload',
            files: ['image'],
        },
})
console.log(res);
```
### 注意事项
> [selectFiles](./selectFiles.md)方法是 [AppSelectFiles](./AppSelectFiles.md)和[otherSelectFiles](./otherSelectFiles.md)的封装，自动识别是小程序、H5、APP。这三个方法使用都大同小异。如果自己有需要则可以直接明确的选择方法调用。**在功能上APP可以直接从相册选择视频或图片**，其他端均与官方API相同。

### 代码演示

##### 1.简单使用

```javaScript
const res = await this.$rup.selectFiles({
    type:0,     //运行选择两张图片同上上传到example/upload接口
    maximum: 2,
    upload: {
        path: 'example/upload',
        files: ['image0','image1'],
    },
})
console.log(res);
```

##### 2.单纯仅选择文件
```javaScript
const res = await this.$rup.selectFiles({
    type:0,     
    maximum: 2,
    isUp:false
})
console.log(res);
```
##### 3.选择指定格式的文件
```javaScript
const res = await this.$rup.selectFiles({
    maximum: 2,
    isUp:false
    sizeType:['original'],
    sourceType:['album']
})
console.log(res);
```
##### 4.基本功能完整使用示例
```javaScript
const res = await this.$rup.selectFiles({
    type:1,
    maximum: 2,
    upload: {
        path: 'example/upload',
        files: ['image'],
        title: '正在上传',
        abort:(info,bt)=>{
            if(info.args.index==0){
                bt.abort();
            }
        },
        extra:{
            name:'我是你爸爸',
            ages:21
        },
        username:'hhyang'
    },
    
})
console.log(res)
```

## <div id="selectFiles">selectFiles参数</div>
属性名  |   类型    |   默认值  |  必填 |   描述 
--- |   ----    |   ----    |   ----|   ---
type    |   Number  |   2   |   **是**  |   用于选择文件的类型：**0：图片，1：视频，2：视频及图片**
isUp    |   Boolean |   true    |   否  |   用于判断在选择完成文件后是否调用上传接口
maximum |   Number  |   1   |   否      |   最大选择文件的个数，最大为9。**H5上只能出现多选，无法限定数量**
multiple    |   Boolean |   true    |   否  |   是否开启多选模式，如果改为false。**maximum**参数将会无效，此参数建议不要动，修改**maximum**来开始多选或者是关闭多选
sizeType    |   Array/String    |   ['original', 'compressed']  |    否  |   original 原图，compressed 压缩图。**此参数对APP、H5无效**
sourceType  |   Array/String    |   ['album','camera']  |   否  |   album 从相册选图，camera 使用相机
upload  |   Object  |       |   否  |   [详细](./startUpFiles.md#FunParams)
[...ages]|  Object  |       |   否  |   额外 [plus.gallery.pick](http://www.html5plus.org/doc/zh_cn/gallery.html#plus.gallery.GalleryOptions)、[uni.chooseImage](https://uniapp.dcloud.io/api/media/image?id=chooseimage) 两支持的参数