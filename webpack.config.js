const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports={
    entry:'./src/index.js',
    output:{
        path:path.join(__dirname,'dingst'),
        filename:'[name].[hash].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader','css-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
            {
                test: /\.js/,
                loader: 'babel-loader'
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html",
            minify: {
              collapseWhitespace: true // 压缩
            }
        }),
        new CleanWebpackPlugin(),
    ],
    devServer:{
        port:'9011',
        host:'localhost',
        overlay:true,
        compress:true// 服务器返回启动gzip压缩
    }
}