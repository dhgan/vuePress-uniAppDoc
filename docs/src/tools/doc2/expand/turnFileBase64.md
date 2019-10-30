## turnFileBase64 文件转换base64方法

### 使用指南

##### 局部引用
```javaScript
import Expand from '@/common/expand.js';
```

### 注意事项
> 此方法支持任何文件转base64,**可以是临时路径也可以是永久路径**

### 代码演示

##### 1.简单使用
```javaScript
uni.chooseImage({       //图片转base64
    count: 1,
    success: async res => {
        const base64 = await exjs.turnFileBase64({
            filePath: res.tempFilePaths[0]
            })
         console.log(base64)
    }
});
```
##### 2.带转码提示
```javaScript
uni.chooseImage({       //图片转base64
    count: 1,
    success: async res => {
        const base64 = await exjs.turnFileBase64({
            filePath: res.tempFilePaths[0],
            title: '正在转换'
            })
         console.log(base64)
    }
});
```
##### 2.带转码提示
```javaScript
uni.chooseImage({       //图片转base64
    count: 1,
    success: async res => {
        const base64 = await exjs.turnFileBase64({
            filePath: res.tempFilePaths[0],
            title: '正在转换'
            })
         console.log(base64)
    }
});
```

