## 编程式导航

我们可以借助 `router` 的实例方法，通过编写代码来实现，这个过程叫做编程式导航。

### `router.push() 等同于` [uni.navigateTo()](https://uniapp.dcloud.io/api/router?id=navigateto)
**注意：在 Vue 实例内部，你可以通过 $Router 访问路由实例。因此你可以调用 this.$Router.push。**

想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如:

```js
// 字符串
this.$Router.push('/pages/router/router1')

// 对象
this.$Router.push({path:'/pages/router/router1'})

// 命名的路由
this.$Router.push({ name: 'router1', params: { userId: '123' }})

// 带查询参数，变成 /router1?plan=private
this.$Router.push({ path: 'router1', query: { plan: 'private' }})
```

**注意：如果提供了 path，params 会被忽略，上述例子中的 query 并不属于这种情况。所以字符串时必须是绝对的路径，name 时传递的参数必须为 params，相反 path 必须对应 query。**

```js
const userId = '123'
this.$Router.push({ name: 'user', params: { userId }}) // -> /user/123
// 这里的 params 不生效
this.$Router.push({ path: '/user', params: { userId }}) // -> /user
```

### `router.replace() 等同于` [uni.redirectTo()](https://uniapp.dcloud.io/api/router?id=redirectto)

跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录。

```js
this.$Router.replace(...)
```

### `router.replaceAll() 等同于` [uni.reLaunch()](https://uniapp.dcloud.io/api/router?id=redirectto)

跟 `router.replace` 很像，唯一的不同就是，它不会向 history 添加新记录，而是将所有的页面都关掉，打开一个新的页面。

```js
this.$Router.replaceAll(...)
```

### `router.pushTab() 等同于`  [uni.switchTab()](https://uniapp.dcloud.io/api/router?id=switchtab)

跟 `router.push` 很像，打开 `uni-app` 自带的tab 菜单

**注意：`router.pushTab` 在传递参数的时候 H5 暂时不支持，需要开发者自行处理下，这是官方的一个 bug,后续会修复。不过可以使用此一个变通的方法获取到,临时解决！**

```js
this.$Router.pushTab(...)

//变通方法获取参数 H5端
const router = new Router({
    routes:[
        {
          path: "/pages/tabbar/tabbar-4/tabbar-4",
          name: 'tabbar-4',
          H5Params:{
              H5Name:''       //使用一个临时变量来存储
          },
          beforeEnter:(to,from,next)=>{   
              to.H5Params.H5Name=to.query.name
              next();
          }
        },
    ]
})
//获取方式
this.$Route.H5Params.H5Name
```
**注意:使用变通方法时可以在临时变量上复制，虽然 `this.$Route.query` 无法获取到，但是禁用路由守卫时是携带完整参数的，所有可以再此做一些手脚。页面刷新后参数将会丢失。**

### `router.back(n) 等同于` [uni.navigateBack()](https://uniapp.dcloud.io/api/router?id=navigateback)

这个方法的参数是一个整数，意思是在 history 记录中后退多少步，类似 `window.history.go(n)`。

例子

```js
// 后退 2 步记录
this.$Router.back(2)

// 如果 history 记录不够用，那就默默地失败呗
this.$Router.back(100)
```