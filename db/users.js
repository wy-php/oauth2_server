'use strict';

const apiutil = require('../helper/api.js');
const userCtrl = require('../controller/user.js');

/**
 * This is the configuration of the users that are allowed to connected to your authorization
 * server. These represent users of different client applications that can connect to the
 * authorization server. At a minimum you need the required properties of
 *
 * id       : A unique numeric id of your user
 * username : The user name of the user
 * password : The password of your user
 * name     : The name of your user
 */
const users = [{
  id : 801,
  phone: '18037538097'
}];


/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   username - The unique user name to find
 * @param   {Function} done     - The user if found, otherwise returns undefined
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.findByUsername = function(username){
  return new Promise(function(resolve, reject){
    userCtrl.findUserByPhone(username).then(function(user){
      resolve(user)
    });
  });
};
