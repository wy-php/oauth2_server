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
exports.saveUserInfo = function (username, password) {
    // 1.API接口获取用户密码
    apiUtil.generateUserLogin(username, password)
        .then(function(body) {
            // 2.获取家庭列表
            return apiUtil.generateQueryFamilies(body);
        })
        .then(function(body) {
            // 3.判断数据库中是否存在
            return getUsersByPhone({'id': body.id});
        }
        .then(function(user){
            if (user == null){
                console.log('数据库中用户不存在');
                // 保存用户信息
                userModel.insertUser(user);
            }
            return user;
        })
        .then(user => done(null, user))
        .catch(() => done(null, false)));
}

