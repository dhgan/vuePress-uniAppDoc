# uni-app-chat

### 版本： 1.5.0

### 快捷使用
```JavaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = await new socket({
    url: 'ws://192.168.0.29:9999/', //连接地址 必填
    onOpen (res) {
        console.log('连接成功')
        this.nsend('发一个请求给服务端');
    },
})
```
### 更新说明：
更新时间    |   更新文件    |   更新内容      
----    |   -----   |   ----
2019年4月17日16:48:49   |   webSocket.js  |    新增示例代码文件
2019年5月7日16:49:21    |   socket.js   |   新增自定义事件，新增interValTime间隔重连时间，修复vuex无法全局管理数据问题。
2019年6月19日16:38:39   |   socket.js/useSocket.js  |   重新所有异步返回改为同步，超期操作同步跟上