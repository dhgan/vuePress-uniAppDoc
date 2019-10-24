# AppSelectFiles APP端选择相册文件

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
const res = await rup.AppSelectFiles({     
        type:0,
        maximum:1,
        multiple:true
})
console.log(res);
```

### 代码演示

##### 1.简单使用

```javaScript
const res = await this.$rup.AppSelectFiles({
    type:0,     
    maximum: 1,
    multiple: true
})
console.log(res);
```

##### 2.从相册选择指定数量图片

```javaScript
const res = await this.$rup.AppSelectFiles({
    type:0,     
    maximum: 5,
    multiple: true
})
console.log(res);
```
##### 3.从相册选择指定数量视频

```javaScript
const res = await this.$rup.AppSelectFiles({
    type:1,     
    maximum: 5,
    multiple: true
})
console.log(res);
```

##### 4.从相册选择指定图片和视频
```javaScript
const res = await this.$rup.AppSelectFiles({
    type:2,     
    maximum: 9,
    multiple: true
})
console.log(res);
```

### 注意事项
> 不推荐使用此方法。没有默认参数，**每个参数必须传递**。使用起来比较麻烦。原本此方法就是为[selectFiles](./selectFiles.md)提供的辅助方法，**强烈建议使用[selectFiles](./selectFiles.md)方法！ 以上参数同[selectFiles](./selectFiles.md#selectFiles)参数相同，所有参数必填**