const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports={
    entry:'./src/app.js',
    output:{
        path:path.join(__dirname,'dingst'),
        filename:'[name].[hash].js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader',{
                    loader:'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[name]-[hash:base64:5]'
                        },
                      }
                },'postcss-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.less$/,
                use:['style-loader',{
                    loader:'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[name]-[hash:base64:5]'
                        },
                      }
                },'postcss-loader','less-loader'],
                exclude: /node_modules/
            },
            {
                test:/\.scss$/,
                use:['style-loader',{
                    loader:'css-loader',
                    options: {
                        modules: {
                            localIdentName: '[local]-[name]-[hash:base64:5]'
                        // localIdentName: '[path][name]__[local]--[hash:base64:5]'
                        },
                      }
                },'postcss-loader','sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options:{
                            name:'[path][name].[ext]',
                            esModule: false,  //避免 <img src=[Module Object] />
                            limit: 1024 * 10,
                        }
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