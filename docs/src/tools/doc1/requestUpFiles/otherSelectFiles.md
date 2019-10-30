# otherSelectFiles 小程序、H5 从相册选择图片

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
const res = await rup.otherSelectFiles({
        maximum:1,
})
console.log(res);
```

### 代码演示

##### 1.简单使用

```javaScript
const res = await this.$rup.otherSelectFiles({
   maximum: 3,
})
console.log(res);
```

##### 2.选择指定格式文件

```javaScript
const res = await this.$rup.otherSelectFiles({
   maximum: 3,
   sizeType: ['original', 'compressed']
})
console.log(res);
```

##### 3.从什么位置选择

```javaScript
const res = await this.$rup.otherSelectFiles({
   maximum: 3,
   sourceType: ['album']
})
console.log(res);
```

### 注意事项
> 不推荐使用此方法。没有默认参数，**每个参数必须传递**。使用起来比较麻烦。原本此方法就是为[selectFiles](./selectFiles.md)提供的辅助方法，**强烈建议使用[selectFiles](./selectFiles.md)方法！ 以上参数同[selectFiles](./selectFiles.md#selectFiles)参数相同，所有参数必填**