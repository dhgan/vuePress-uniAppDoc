const {
  description
} = require('./description.js')
const {
  themeConfig
} = require('./themeConfig.js')
const path = require('path');
module.exports = {
  title: 'uni-simple-router',
  head: [
    ['script', {}, `
          var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?dd407a6f6294639a47d73a050887a82b";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
      })();
    `]
  ],
  description,
  themeConfig,
  markdown: {
    lineNumbers: true
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@img': path.resolve(__dirname, '../static/images')
      }
    }
  }
}