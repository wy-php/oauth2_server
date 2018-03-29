'use strict';

var userModel = require('../../models/users.js');

/**
 * 加入一个用户
 */
exports.insertUser = function (user) {
    return userModel.insertUser(user);
};

/**
 * 通过电话号获取用户
 */
exports.getUsersByPhone = function (phone_num) {
    return userModel.getUsersByPhone(phone_num);
};

