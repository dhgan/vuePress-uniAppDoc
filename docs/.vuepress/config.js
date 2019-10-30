const {
  description
} = require('./description.js')
const {
  themeConfig
} = require('./themeConfig.js')
const path = require('path');
module.exports = {
  title: 'uni-simple-router',
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