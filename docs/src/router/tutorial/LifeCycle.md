---
sidebarDepth: 0
---

# onLaunch异步于onLoad之前，保证两者的顺序

很多情况下有这样需求？怎么办？？？其实很简单啦 废话咋们就不多说了 直接上干货！

### 使用vuex广播数据 

其实这种方式并不是能准确的按顺序触发事件，不过可以能完成这样的需求 先看看代码咯？

#### store.js
```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		userInfo:{}
	},
    mutations: {
		changeUserInfo(that,info){
			that.userInfo=info;
		}
	}
})

export default store
```
#### App.vue
``` html
<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		methods:{
			...mapMutations(['changeUserInfo'])
		},
		onLaunch: function() {
			setTimeout(()=>{
				this.changeUserInfo({name:'hhyang'});
			},2000)
			console.log('App Launch')
		},
	}
</script>
```

#### index.vue

```html
<template>
	<div>
		<p>{{ userInfo.name }}</p>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	data() {
		return {}
	},
	watch: {
		userInfo: function(val) {
			console.log(val);
		}
	},
	onLoad() {},
	computed: {
		...mapState(['userInfo'])
	}
};
</script>
```
一眼看去很清晰！在 `onLaunch` 生命周期中 两秒之后提交了一个 `mutation` 它修改了 userInfo 。在实际的 app 启动过程中 并不是等待 `onLaunch` 完成后才执行下面的生命钩子，所以如果想在 app.vue 中判断登陆或者其他异步操作时，首页的生命周期是不同于理想状态下执行的。那么怎么办？ vuex 可以广播数据，所以在首页 你可以尝试吧 `index.vue` 中 onload 事件中的代码提到 watch 中，等待数据变化再执行后续的操作。但是这样会有很多问题，比如说 userInfo 发生变化的时候。当然！你控制的好我没话说？对于其他同学怎么办？那就的换其他的方式进行操作。我们还是想还原我们理想的生命钩子执行顺序，看下一步！ **vuex 广播数据废弃。**

### 使用vuex广播数据 