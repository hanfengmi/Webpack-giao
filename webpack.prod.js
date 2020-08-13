
const {merge} = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports=merge(common,{
    mode: 'production',
    devtool: 'source-map',
    plugins:[
        new UglifyJSPlugin({
            sourceMap: false,
        }),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
    ]
})