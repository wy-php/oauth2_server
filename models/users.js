'use strict';

var mongodb = require('./base.js');
var db = require('./base.js');

/*
 * 获取用户数据
 */
exports.getUserById = function (id) {
    return new Promise(function(resolve, reject) {
        db.getDB().collection('users', function(err, collection) {
            if (err) {
                reject(err);
            }
            collection.findOne({'id': id}, function(err, result){
                if (err) {
                    reject(err);
                }
                if (result == null) {
                    resolve(result);
                }
                resolve(result);
            });
        });
    });
};

/*
 * 根据用户名获取用户
 */
exports.findUserByName= function (username) {
    return new Promise(function(resolve, reject) {
        db.getDB().collection('users', function(err, collection) {
            if (err) {
                reject(err);
            }
            collection.findOne({'mobile': username}, function(err, result){
                if (err) {
                    reject(err);
                }
                if (result == null) {
                    resolve(result);
                }
                resolve(result);
            });
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
        collection.update({'id': user.id}, {$set: user}, {upsert: true}, function(err, result){
            if (err) {
                reject(err);
            }
            resolve(user);
        });
      });
    })
};

/*
 * 根据user_id更新家庭
 */
exports.generateUpdateFamilyByUser = function(user_id, device_id) {
    return new Promise(function(resolve, reject) {
      db.getDB().collection('users', function(err, collection) {
        if (err) {
            return reject(err);
        }
        let params_all = device_id.split("|,|");
        collection.update({'id': parseInt(user_id)}, {$set: {'family': [{'family_id': params_all[0],'device_id': params_all[1], 'family_name': params_all[2]}]}}, function(err, result){
            if (err) {
                reject(err)
            }
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
exports.getUsersByUserName = function(body){
    return new Promise(function(resolve, reject) {
        db.getDB().collection('users', function(err, collection) {
            if (err) {
                reject(err);
            }
            collection.findOne({'mobile': body.mobile}, function(err, result){
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
