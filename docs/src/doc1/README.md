# uni-app-request

### 版本： 1.1.3

### 方法列表：
方法名  |   返回值    | 平台兼容    |  描述     
----    |   ----    |    -----   | -----   
[ajax](request/ajax.md)    | Promise    |   |  一个跨端、轻量、可拦截、自定义、提示请求接口 
[ajaxFile](request/ajaxFile.md)    | Promise    |   |  一个跨端、 轻量、可拦截、自定义、提示上传**文件**接口 
[downFiles](request/downFiles.md)    | Promise    |   | 一个跨端、 轻量、可拦截、自定义、提示下载**文件**接口
[proxy](request/proxy.md)    |     |   |  一个跨端、对象代理，支持捕捉setter事件并回调  
[platformChunk](request/platformChunk.md)    |  Number   |   | 运行环境判断仅判断app端还是其他端 
[startUpFiles](requestUpFiles/startUpFiles.md)    |  Promise   |   |  上传文件接口，支持**批量**、单个  
[upnNetRes](requestUpFiles/upnNetRes.md)    |  Promise   |   | 上传**网络资源**到服务器 
[selectFiles](requestUpFiles/selectFiles.md)    |  Promise   |   | 从本地选择**文件** 
[AppSelectFiles](requestUpFiles/AppSelectFiles.md)    |  Promise   | 5+App  |  App端选择本地**文件**  
[otherSelectFiles](requestUpFiles/otherSelectFiles.md)    |  Promise   | 非5+App  | 仅支持**图片**  
[startDownFiles](requestdownFiles/startDownFiles.md)    |  Promise   |   | 可**批量**、单个下载文件


### 更新说明：
更新时间    |   更新文件    |   更新内容        |   版本
----    |   -----   |   ----    |   -----
2019年4月13日20:17:29   |   request-upFiles.js  |   **startUpFiles**上传文件新增额外参数携带    |   1.0.0
2019年5月21日16:22:25   |   request.js/request-downFiles.js  |   abort生命周期函数新增第二个回调参数    |   1.0.1
2019年5月29日17:49:04   |   request.js  |   新增**beforeSend、beforeFinsh**生命周期 |   1.1.1
2019年7月5日11:02:25    |   request.js/request-upFiles.js/request-downFiles.js   |   基类修复上传方法无法带上基本参数的问题、新增上传完成后批量返回服务端参数、修复字符串分割错误的问题    |   1.1.2
2019年8月21日21:17:36 | request.js  |   修复ajax函数 **finishFun** 参数丢失的问题|  1.1.3