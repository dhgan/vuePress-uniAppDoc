# proxy 数据代理方法

### 使用指南

##### 全局使用 (推荐)

```javaScript
import {req} from './common/request/request.js'; //文件路径请换成本地路径
Vue.prototype.$req = req;   //挂载到原型上
```

##### 局部使用

```javaScript
import {req} from './common/request/request.js';
let proxyData = {
    name: 'hhyang',
    age: 21
}
req.proxy(proxyData);
```

### 代码演示

##### 1.简单使用
```javaScript
let proxyData = {
    name: 'hhyang',
    age: 21
}
this.$req.proxy(proxyData, (key, val, oldval) => {
    console.log(`${key}:从${oldval}变成了${val}`);
})
setTimeout(() => {
    proxyData.age = 22;
}, 2000)
```
## <div id="FunParams">proxy参数</div>
属性名  |   类型    |   默认值  |  必填 |   描述 
----    |   ----    |   ----    |   ----    |   ----
obj |   Object  |       |   **是**  |   需要代理的数据对象，**必须是一个对象数据**
changeCallBack  |   Funtion |   |   否  |   当数据发生改变时触发此返回，key，val，oldval

> 禁止重复代理一个对象，后续添加的属性不会起代码效果。