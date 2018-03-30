'use strict';

var db = require('./base.js');

/*
 * 存储accesstoken信息
 */
exports.generateSaveToken = function (tokeninfo) {
    return new Promise(function (resolve, reject) {
        db.getDB().collection('tokens', function (err, collection) {
            if (err) {
                reject(err);
            }
            collection.insert(tokeninfo, {safe: true}, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    });
};

/*
 * 获取accesstoken
 */
exports.generateGetToken = function (token) {
    return new Promise(function (resolve, reject) {
        db.getDB().collection('tokens', function (err, collection) {
            if (err) {
                reject(err);
            }
            collection.findOne(token, {safe: true}, function (err, result) {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    });
};

/*
 * 存储已通过的token信息
 */
exports.saveToken = function (tokeninfo) {
    db.getDB().collection('tokens', function(err, collection) {
        if (err) {
            return err;
        }
        collection.insert(tokeninfo, {safe: true}, function(err, result){
            return result;
        });
    });
};