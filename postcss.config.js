/*
 * @Author: Yonyou
 * @Date: 2020-08-10 19:01:31
 * @LastEditTime: 2020-08-10 20:39:26
 * @LastEditors: hanfengmi
 * @Description: 
 */
// const AUTOPREFIXER_BROWSERS = [
//     'Android 2.3',
//     'Android >= 4',
//     'Chrome >= 35',
//     'Firefox >= 31',
//     'Explorer >= 8',
//     'iOS >= 7',
//     'Opera >= 12',
//     'Safari >= 7.1',
// ];
module.exports = {
    plugins: [require('autoprefixer')({overrideBrowserslist: ['> 0.15% in CN']})],
};