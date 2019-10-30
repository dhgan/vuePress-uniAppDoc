# uni-app-customImg

### 版本： 1.1.0

### 方法列表：

| 方法名                                                   | 返回值  | 平台兼容   | 描述                                                                                  |
| -------------------------------------------------------- | ------- | ---------- | ------------------------------------------------------------------------------------- |
| [platformChunk](custom-picture/platformChunk.md)         | Number  |            | 运行环境判断仅判断 app 端还是其他端                                                   |
| [dataURLtoBlob](custom-picture/dataURLtoBlob.md)         | Promise |            | 用于返回一个图片的**base64 值**或一个**自定义后的文件路径**,并支持**压缩 base64**     |
| [h5_URLtoBlob](custom-picture/h5_URLtoBlob.md)           | Promise | H5 端      | 把一个**base64 格式**的图片，转成自定义名称的**file**对象                             |
| [h5_appendFile](custom-picture/h5_appendFile.md)         | Promise | H5 端      | 把一个已知路径的图片转成自定义后缀的**base64 数据**，支持**压缩**，自定义**格式**     |
| [app_URLtoBitmap](custom-picture/app_URLtoBitmap.md)     | Promise | APP 端     | 把一个**base64 格式**的图片，转成自定义名称、格式的本地图片，**并返回图片信息对象**   |
| [app_appendFile](custom-picture/app_appendFile.md)       | Promise | APP 端     | 把一个已知路径的图片转成自定义后缀的**base64 数据**，支持**压缩**，自定义**格式**     |
| [applet_URLtoPath](custom-picture/applet_URLtoPath.md)   | Promise | 微信小程序 | 把一个**base64 格式**的图片，转成自定义名称、格式的本地图片，**并返回图片的绝对路径** |
| [applet_appendFile](custom-picture/applet_appendFile.md) | Promise | 微信小程序 | 把一个已知路径的图片转成自定义后缀的**base64 数据**                                   |

更新说明：

| 更新时间                    | 更新文件          | 更新内容                     | 版本  |
| --------------------------- | ----------------- | ---------------------------- | ----- |
| 2019 年 5 月 13 日 22:00:04 | custom-picture.js | 自定义图片名称、格式、base64 | 1.0.0 |
| 2019 年 5 月 17 日 13:45:29 | custom-picture.js | app、h5 新增 base64 压缩功能 | 1.1.0 |
