# uni-app-customEvent

### 版本： 1.0.0

### 快捷使用

```JavaScript
//main.js
import event from './common/uni-app-customEvent/custom-event.js'
const Event=new event();
Vue.prototype.$event=Event;

//index.vue
this.$event.on('test',(title)=>{
    uni.showToast({
        title,
    })
})

//other.vue
this.$event.notify('test','我传递给首页')
```

### 更新说明：

| 更新时间                    | 更新文件        | 更新内容               | 版本  |
| --------------------------- | --------------- | ---------------------- | ----- |
| 2019 年 6 月 20 日 17:33:54 | custom-event.js | 首次新增自定义事件文件 | 1.0.0 |
