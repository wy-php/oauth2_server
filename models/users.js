'use strict';

var mongodb = require('./base.js');
var db = require('./base.js');

/*
 * 获取用户数据
 */
exports.getUserById = function (id) {
    return new Promise(function(resolve, reject) {
        db.findOne({_id: id}, function(err, collection){
            if (err) {
                return reject(err)
            }
            resolve(collection)
        });
    });
};

/*
 * 插入数据到 user collection 中
 */
exports.insertUser = function(user) {
    return new Promise(function(resolve, reject){
      db.getDB().collection('users', function(err, collection) {
        if (err) {
            return reject(err);
        }
        collection.insert(user, {safe: true}, function(err, result){
            resolve(result);
        });
      });
    })
};

/*
 * 通过电话号获取用户
 */
exports.getUsersByPhone = function(num){
    return new Promise(function(resolve, reject) {
        db.getDB().collection('users', function(err, collection) {
            if (err) {
                return reject(err);
            }
            collection.findOne({'phone': num}, function(err, result){
                console.log("查询结果: " + result)
                resolve(result);
            });
        });
    });
};

/*
 * 通过电话号获取用户
 */
exports.generateGetUsersByPhone = function(num){
    return new Promise(function(resolve, reject) {
        db.getDB().collection('users', function(err, collection) {
            if (err) {
                return reject(err);
            }
            collection.findOne({'phone': num}, function(err, result){
                resolve(result);
            });
        });
    });
};