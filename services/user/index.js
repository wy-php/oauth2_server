'use strict';

const userModel = require('../../models/users.js');
const apiUtil   = require('../../helper/api');


/**
 * 加入一个用户
 */
exports.insertUser = function (user) {
    return userModel.insertUser(user);
};

/**
 * 通过电话号获取用户
 */
exports.getUsersByPhone = function (phone) {
    return userModel.getUsersByPhone(phone);
};

/**
 * 保存用户信息聚合数据
 */
// exports.saveUserInfo = function (username, password, done) {
//     var userinfo = {}
//     // 1.API接口获取用户密码
//     apiUtil.generateUserLogin(username, password)
//         .then(function (body) {
//             return apiUtil.generateQueryFamilies(body);
//         })
//         .then(function (body) {
//             userinfo = body
//             // 2.判断数据库中是否存在
//             return userModel.getUsersByPhone(userinfo);
//         })
//         .then(function(result){
//             if (!result.find){
//                 console.log('save data');
//                 userModel.generateSaveUser(result.result);
//             }
//             return result.result;
//         })
//         .then(function(result){
//             done(null, result)
//         })
//         .catch(() => done('Error', {}))
// }

/**
 * 判断用户存在 把用户存入数据库
 * {'id': id, ''}
 */
exports.saveUserInfo = function (username, password, done) {
    // 1.API接口获取用户密码
    apiUtil.generateUserLogin(username, password)
        .then(function (body) {
            return apiUtil.generateQueryFamilies(body);
        })
        .then(function (body) {
            // 2.判断数据库中是否存在
            return userModel.getUsersByUserName(body);
        })
        .then(function(result){
            if (!result.find){
                console.log('save data');
                userModel.generateSaveUser(result.result);
            }
            return result.result;
        })
        .then(function(result){
            done(null, result)
        })
        .catch(() => done('Error', {}))
}