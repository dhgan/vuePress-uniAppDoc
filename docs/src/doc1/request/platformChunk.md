# platformChunk 运行环境判断     
### return:[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

### 使用指南

##### 全局使用 (推荐)

```javaScript
import {req} from './common/request/request.js'; //文件路径请换成本地路径
Vue.prototype.$req = req;   //挂载到原型上
```

##### 局部使用

```javaScript
import {req} from './common/request/request.js';
let type=req.platformChunk();
console.log(type);
```

### 代码演示
##### 1.简单使用

```javaScript
let type=this.$req.platformChunk();
console.log(type);
```

## platformChunk参数返回
  类型    |     描述    | 
----    |   ---
Number  |   APP环境下返回 **0**，其他环境均返回 **1**，**次接口仅提供给内部调用，谨慎调用**