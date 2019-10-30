# <div id="customEvent">custom-event.js</div>

### 使用指南

### 简介说明

> **压缩后仅 2kb 的自定义事件插件，为你解决页面之间的通讯！** 还在瞅着从一个页面返回到上一级页面是否需要触发事件？怎么互相传值而感到烦恼么？此插件就是专门为你打造的**全局自定义事件！** 新增、触发、删除、单个绑定。一键轻松搞定。**唯一遗憾的就是主动刷新页面后事件会丢失，需要重新绑定。具体体现在 H5 端。**

### 注意事项

> **H5 端因为用户可以主动刷新页面，这样会导致一个问题。就是在之前注册完成的事件会丢失，需要再次绑定。** APP 端及小程序因为没有可手动触发刷新的按钮则不会。总而言之，**如果在刷新页面之后需要重新绑定事件，就像 VUEX 一样。所以[custom-event.js](#customEvent)更多的是适用于 APP 及小程序**

##### 全局使用

###### main.js

```javaScript
import event from './common/uni-app-customEvent/custom-event.js'
const Event=new event();
Vue.prototype.$event=Event;
```

###### index.vue

```javaScript
this.$event.on('test',(title)=>{        //注册一个'test'事件，等待触发事件时传递一个title信息
    uni.showToast({     //并显示出来
        title,
    })
})
```

###### other.vue

```javaScript
this.$event.notify('test','我传递给首页')       //触发'test'事件，并传递一个参数过去
```

### 代码演示

##### 1.注册监听事件(可多次)

```javaScript
this.$event.on('test',(title)=>{        //注册一个'test'事件
   console.log(title)
})
```

##### 2.注册监听事件(单次)

```javaScript
this.$event.one('test',(title)=>{        //注册一个'test'事件，仅一次监听
   console.log(title)
})
```

##### 3.移除已经监听的事件(单个)

```javaScript
this.$event.off('test',(res)=>{     //移除监听事件
    console.log(res)
})
```

##### 4.移除已经监听的事件(全部)

```javaScript
this.$event.off()
```

##### 5.触发指定事件

```javaScript
this.$event.notify('test')
```

## <div id="Object">方法列表</div>

| 方法名称 | 参数                                                                         | 描述                                                                                                       |
| -------- | ---------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| on()     | 支持两个参数,第一个为**自定义事件名称**，第二个为**回调函数**                | 绑定自定义事件，可以重复绑定                                                                               |
| one()    | 支持两个参数,第一个为**自定义事件名称**，第二个为**回调函数**                | 绑定自定义事件,仅会绑定一次事件，如果发现有重名的事件则全部移除                                            |
| off()    | 支持两个参数，第一个为**自定义事件名称**，第二个为**回调函数**               | 解除已经绑定事件，**如果有指定事件类型则只移除指定类型，不传则清楚全部。不传递事件类型时不会触发回调方法** |
| notify() | 支持两个参数，第一个为**需要触发的事件**，第二个为**触发此事件时传递的参数** | 触发自定事件，并传递自定义参数                                                                             |

## 实例化说明

> 实例化时可以传递相应的容器来存储所有的事件，比如这样 ↓↓↓

```javaScript
import event from './common/uni-app-customEvent/custom-event.js'
const myEvents={};      //必须是一个对象，并且是一个空对象。
const Event=new event({
    dep:myEvents
});
Vue.prototype.$event=Event;  //接着你可以自己管理所有的事件了
```
