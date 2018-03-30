'use strict';

var tokenModel = require('../../models/tokens.js');

/**
 * 添加一个新accesstoken
 */
exports.saveToken = function (token) {
    return tokenModel.saveToken(token);
};