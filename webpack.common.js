const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
                use:[MiniCssExtractPlugin.loader,{
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
                use:[MiniCssExtractPlugin.loader,{
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
                use:[MiniCssExtractPlugin.loader,{
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
        new MiniCssExtractPlugin({
            filename: '[name]_[hash:5].css',
            chunkFilename: '[id]_[hash:5].css',
            disable: false, //是否禁用此插件
            allChunks: true,
        })
    ],
    resolve:{
        extensions: ['.js', '.jsx', '.scss', '.less', '.css', '.json'],
        alias: {
            '@': path.resolve('./src'),
            '@assets': path.resolve('./public/assets'),
            '@component': path.resolve('./component')
        }
    }
}