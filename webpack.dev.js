const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports=merge(common,{
    mode: 'development',
    devtool: 'inline-source-map',
    devServer:{
        port:'9011',
        host:'localhost',
        overlay:true,
        compress:true,// 服务器返回启动gzip压缩
        hot: true,
    },
})