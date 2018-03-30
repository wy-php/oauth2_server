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
 * 插入数据到user集合中
 */
exports.generateSaveUser = function(user) {
    return new Promise(function(resolve, reject) {
      db.getDB().collection('users', function(err, collection) {
        if (err) {
            return reject(err);
        }
        collection.insert(user, {safe: true}, function(err, result){
            if (err) {
                reject(err)
            }
            console.log(result)
            resolve(result);
        });
      });
    })
};

/*
 * 插入数据到user集合中
 */
exports.saveUser = function(user) {
    db.getDB().collection('users', function(err, collection) {
        if (err) {
            return err;
        }
        collection.insert(user, {safe: true}, function(err, result){
            if (err) {
                return err
            }
            console.log(result)
            return result;
        });
    });
};

/*
 * 通过电话号获取用户
 */
exports.getUsersByPhone = function(body){
    return new Promise(function(resolve, reject) {
        db.getDB().collection('users', function(err, collection) {
            if (err) {
                reject(err);
            }
            collection.findOne({'id': body.id}, function(err, result){
                if (err) {
                    reject(err)
                }
                if (result == null) {
                    resolve({'find':false, 'result': body});
                }
                resolve({'find':true, 'result': body});
            });
        });
    });
};
