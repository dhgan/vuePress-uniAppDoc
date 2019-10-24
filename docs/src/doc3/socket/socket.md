# socket.js

### 使用指南

### 简介说明

> 使用此**socket.js**插件，可以查看[github 上的 useSocket.js 实例](https://github.com/SilurianYang/uni-app-tools/blob/master/uni-app-chat/useSocket.js)。全局连接一个 websocket，可通过声明时一键管理数据，当然你也可以自己随处管理数据。使用简单，只需要新建一个 js 专门管理 socket 即可。包括自动重连，手动重连，随处监听 等等。

### 注意事项

> 传输数据方面使用 json 转成 string 后传递，因为 socket 监听到数据变化后统一合并到一个指定对象下，怎么区分呢？**建议在传递数据的时候，一个独立的页面统一使用一个对象包着。这样的话就可以在数据中区分出来了[查看使用 vuex 管理数据](#dataExplmas)**。使用方面直接使用计算属性获取当前 vuex 下对应想要的数据，渲染到页面中就 ok 了。**如果不喜欢通过 vuex 全局管理数据，想通过自定义事件监听完成[查看使用自定义事件监听](#dispatchEvent)**。还有的同学说使用**websocket**后，数据更新的时候页面会闪烁。建议不要在数据变化后反复调用 uni 的原生接口。

### <div id="dataExplmas">后台数据传输示例</div>

```javaScript
//server发送给chat页面数据
chartPage:{
	selfName: "老司机"
	text: "连接成功了"
	time: "下午2:45:34"
	type: "self"
}
//server发送给index页面数据
indexPage:{
	list:['xxx.png','xxxx2.png'],
	type:'images'
}
//vuex 数据将会变成这样
SocketState:{
	chartPage:[
		{
			selfName:"老司机"
			text:"连接成功了"
			time:"下午3:14:46"
			type:"self"
		}
	],
	indexPage:[
		{
			list:['xxx.png','xxxx2.png'],
			type:'images'
		}
	]
}

//在chat页面使用chartPage中的数据
import {mapState} from 'vuex';
	export default {
		data() {
			return {
				chartPage:[],
			}
		},
		computed: {
			...mapState(['SocketState'])
		},
		watch: {
			'SocketState.chartPage': function(val) {
				this.chartPage = val;
			}
		},
	}
```

### <div id="dispatchEvent">使用自定义事件监听数据示例</div>

```javaScript
import Vue from 'vue'
import store from "./store.js"; //引入vuex，路径换成自己的	重要
import socket from "./socket.js"; //引入socket.js，路径换成自己的 重要
const Socket =new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
})
Socket.eventPatch.onOpen((msg,sk)=>{		//监听是否连接成功
	console.log('连接成功')
});
Socket.eventPatch.onMsg((msg,sk)=>{	//监听是否接受消息
	console.log(msg)
});
Socket.eventPatch.onClose((err,sk)=>{	//监听是否关闭连接
	console.log('关闭了连接')
});
Socket.eventPatch.onError((err,sk)=>{	//监听是否发生了错误
	console.log('连接出错')
});
Socket.eventPatch.onReload((res,sk)=>{	//监听是否重连成功
	console.log('重载：' + res)
});
Socket.eventPatch.onRdFinsh((count,sk)=>{		//监听最大重连次数是否已完成
	console.log('最大重连次数已完成' + count)
});

//以下演示在全局监听
Vue.prototype.$Socket = Socket;

//xxx.vue
this.$Socket.eventPatch.onOpen((msg,sk)=>{		//监听是否连接成功
	console.log('连接成功')
});
this.$Socket.eventPatch.onMsg((msg,sk)=>{	//监听是否接受消息
	console.log(msg)
});
this.$Socket.eventPatch.onClose((err,sk)=>{	//监听是否关闭连接
	console.log('关闭了连接')
});
this.$Socket.eventPatch.onError((err,sk)=>{	//监听是否发生了错误
	console.log('连接出错')
});
this.$Socket.eventPatch.onReload((res,sk)=>{	//监听是否重连成功
	console.log('重载：' + res)
});
this.$Socket.eventPatch.onRdFinsh((count,sk)=>{		//监听最大重连次数是否已完成
	console.log('最大重连次数已完成' + count)
});
```

> **使用自定义事件监听需要注意注入顺序，因为自定义事件必须等待实例完成返回后才能注册事件。所以在使用自定义事件后无法监听监听第一次的 onOpen 事件，此时你需要在初始化时传入 onOpen 方法即可**

##### 全局使用

###### 新建 useSocket.js

```javaScript
import Vue from 'vue'
import store from "./store.js"; //引入vuex，路径换成自己的	重要
import socket from "./socket.js"; //引入socket.js，路径换成自己的 重要
const Socket =new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onOpen(res) {
		console.log('连接成功')
	},
	onClose(err) {
		console.log('关闭了连接')
	},
	onReload(res) {
		console.log('重载：' + res)
	},
	onMsg(msg) {
		console.log(msg)
	}
})
Vue.prototype.$Socket = Socket;    //连接成功挂在到原型上
```

###### <div id="storejs">store.js</div>

```javaScript
//store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
	state: {
		SocketState: {},
		SocketStateErr: {},
	},
	mutations: {
		setSocketState(that, info) {
			that.SocketState = info
		},
		setSocketStateErr(that, info) {
			that.SocketStateErr = info;
		}
	}
})
export default store;
```

###### main.js

```javaScript
//main.js
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false;

import'./common/chat/useSocket.js';     //路径换成自己的
import store from "./common/chat/store.js"; //路径换成自己的
Vue.prototype.$store = store;

App.mpType = 'app';
const app = new Vue({
	...App,
	store
})
app.$mount()
```

###### xxxxx.vue

```javaScript
//xxxxx.vue
this.$Socket.nsend('我是测试的哦')  //放射一个数据到服务器
this.$Socket.nclose(); //关闭webSocket连接
this.$Socket.nrconnect(); //关闭连接并重新连接
```

### 代码演示

##### 1.简单使用

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
})
Socket.nsend('发一个请求给服务端');
```

##### 2.监听是否连接成功

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onOpen(res) {
		console.log('哦！连接成功啦');
		this.nsend('发一个请求给服务端');
	},
})
```

##### 3.监听是否断开连接

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onClose(err) {
		console.log('啊，关闭了连接')
	},
})
Socket.nclose();
```

##### 3.监听数据传递

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onMsg(msg) {
		console.log(msg);
	}
})
Socket.nsend('发一个请求给服务端');
```

##### 4.监听重新连接事件

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket =  new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onReload(res) {
		console.log('重载：' + res)
	}
})
Socket.nrconnect();
```

##### 5.监听发生错误事件

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onError(err) {
		console.log('哎呀发生了错误'+err)
	}
})
Socket.nsend('发一个请求给服务端');
```

##### 6.监听最大重连次数是否完成

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onRdFinsh(count) {
		console.log(count+'次重连已完成')
	}
})
Socket.nsend('发一个请求给服务端');
```

##### 7.设置断线后自动重连次数

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	maxInterValCount:50,
})
Socket.nsend('发一个请求给服务端');
```

##### 8.自定义参数

```javaScript
import socket from "./socket.js"; //引入socket.js 重要
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	 header: {
        'content-type': 'application/json'
    },
    method: 'GET'
})
Socket.nsend('发一个请求给服务端');
```

## new socket 实例返回说明

> 通过实例化 **new socket([Object](#Object))** 会返回一个 **[SocketTask](#SocketTask)**,可以通过这个实例来完成**发送信息、关闭连接、重连、等一系列操作......此对象不需要等待，连接成功后才能发送消息。即 new 即生效** [官网详细](https://uniapp.dcloud.io/api/request/websocket?id=sendsocketmessage)

## <div id="Object">new socket 参数 Object</div>

| 属性名                    | 类型     | 必填   | 描述                                                                                               | 平台差异说明                                                            |
| ------------------------- | -------- | ------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| url                       | String   | **是** | 连接服务器接口地址                                                                                 | 小程序中必须是 **wss://** 协议                                          |
| maxInterValCount          | Number   | 否     | 最大尝试连接次数默认值是**10 次**                                                                  |                                                                         |
| interValTime              | Number   | 否     | 重连间隔时间默认值是**2s**                                                                         |                                                                         |
| [onOpen](#Description)    | Function | 否     | 监听当前连接是否成功。                                                                             |                                                                         |
| [onMsg](#Description)     | Function | 否     | 监听服务端发送过来的数据。                                                                         |                                                                         |
| [onClose](#Description)   | Function | 否     | 监听此次连接是否断开。                                                                             |                                                                         |
| [onError](#Description)   | Function | 否     | 监听当前连接发送错误。                                                                             |                                                                         |
| [onReload](#Description)  | Function | 否     | 监听使用 **Socket.nrconnect()** 方法重连是否成功。                                                 |                                                                         |
| [onRdFinsh](#Description) | Function | 否     | 监听最大重连次数是否完成。                                                                         |                                                                         |
| [...args]                 | Object   | 否     | 其他 uni-app 连接 WebSocket 时支持的任何参数[详细](https://uniapp.dcloud.io/api/request/websocket) | [详细请看 uni-app 官网](https://uniapp.dcloud.io/api/request/websocket) |

## <div id="SocketTask">SocketTask 返回值</div>

| 属性名                    | 返回值    | 描述                                                                        |
| ------------------------- | --------- | --------------------------------------------------------------------------- |
| url                       |           | 当前连接服务器接口地址                                                      |
| [eventPatch](#eventPatch) |           | 实例自定义事件                                                              |
| InterValCount             |           | 断开连接后重试的次数                                                        |
| extra                     |           | 通过**new socket** 传递的 **[..args]** 参数                                 |
| isconnect                 |           | 是否处于链接状态                                                            |
| maxInterValCount          |           | 最大尝试连接次数                                                            |
| uniColse                  |           | 是否通过 **nclose()** 方法正常关闭连接的                                    |
| onClose()                 | errObject | 监听此次连接是否断开                                                        |
| onError()                 | errObject | 监听此次连接是否出现异常                                                    |
| onMsg()                   | msgText   | 监听服务端发送过来的数据                                                    |
| onOpen()                  | object    | 监听此次连接是否打开，握手成功                                              |
| onReload()                | Boolean   | 监听使用 **nrconnect()** 重连是否成功,**连接成功返回 true，相反返回 false** |
| onRdFinsh()               | Number    | 监听最大重连次数是否完成。                                                  |
| nclose()                  |           | 主动断开连接                                                                |
| nsend()                   |           | 发送给服务端的数据                                                          |
| nrconnect()               |           | 断开当前连接重新重试新的连接                                                |

## <span id="eventPatch">eventPatch 自定义事件 </span> <span>[详细使用](#dispatchEvent)</span>

| 方法名                    | 描述                                               |
| ------------------------- | -------------------------------------------------- |
| [onOpen](#Description)    | 监听当前连接是否成功。                             |
| [onMsg](#Description)     | 监听服务端发送过来的数据。                         |
| [onClose](#Description)   | 监听此次连接是否断开。                             |
| [onError](#Description)   | 监听当前连接发送错误。                             |
| [onReload](#Description)  | 监听使用 **Socket.nrconnect()** 方法重连是否成功。 |
| [onRdFinsh](#Description) | 监听最大重连次数是否完成。                         |

## <div id="Description">回调方法及自定义事件参数返回说明</div>

> 推荐使用普通函数，如果使用箭头函数 **[this](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/this)** 将会丢失 如果想在不想使用返回参数来调用方法则建议使用普通函数，普通函数将会包含当前上下文。关于参数返回则是**统一返回两次参数，第一个为事件对应数据，第二个为[SocketTask](#SocketTask)实例**

## <div id="Example">普通函数和箭头函数的区别</div>

```javaScript
//普通函数
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onOpen (res) {
		let msg = {
			type: 'self',
			selfName: '老司机',
			text: '连接成功了',
			time: new Date().toLocaleTimeString()
		};
	this.nsend(JSON.stringify(msg));		//可以通过this访问到当前方法
	},
})

//箭头函数
const Socket = new socket({
	url: 'ws://192.168.0.29:9999/', //连接地址 必填
	onOpen:(res,sk) =>{
		let msg = {
			type: 'self',
			selfName: '老司机',
			text: '连接成功了',
			time: new Date().toLocaleTimeString()
		};
	sk.nsend(JSON.stringify(msg));		//只能通过传递过来的实例对象
	Socket.nsend(JSON.stringify(msg));		//或者这样
	},
})

```

> **以上两种方式是等价的 看自己的爱好或者情况选择即可**
