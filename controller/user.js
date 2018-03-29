'use strict';

var userService = require('../services/user/index.js');
var helper = require('../helper/api.js');

/**
 * 添加一个用户
 * @param {*} req 
 * @param {*} res 
 */
exports.insertusers = function(req, res){
  var user = {"name": 'wangyun', "age": 21, "phone": "123456"};
  userService.insertUser(user)
      .then(function(result) {
          console.log(result)
      })
      .catch(function(err) {
          console.log(err);
      });
};

/**
 * 通过电话号获取用户
 * @param {*} req 
 * @param {*} res 
 */
exports.users = function(req, res){
    userService.getUsersByPhone("123456")
        .then(function(result) {
            console.log(result)
        })
        .catch(function(err) {
            console.log(err);
        });
};

exports.findUserByPhone = function(phone){
    return new Promise(function(resolve, reject){
        userService.getUsersByPhone(phone)
            .then(function(user){
                resolve(user)
            })
    });
}

/**
 * API Test
 * @param {*} req 
 * @param {*} res 
 */
exports.userLogin = function(req, res){
    helper.userLogin('15712908185', '12345678');
}

exports.userFamilisQuery = function(req, res){
    helper.familyUserQueryFamilies(547, '5cd94df4fb00faaca7fd6a6ab3fcfe18238136aa');
}
