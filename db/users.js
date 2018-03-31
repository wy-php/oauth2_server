'use strict';

const userModel = require("../models/users")

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
  id       : '547',
  username : '15712908185',
  password : '12345678',
  name     : 'Bob Smith',
}];

/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   id - The unique id of the user to find
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.find = function(id) {
  return userModel.getUserById(id);
  // Promise.resolve(users.find(user => user.id === id));
}

/**
 * Returns a user if it finds one, otherwise returns null if a user is not found.
 * @param   {String}   username - The unique user name to find
 * @param   {Function} done     - The user if found, otherwise returns undefined
 * @returns {Promise} resolved user if found, otherwise resolves undefined
 */
exports.findByUsername = function(username) {
  return userModel.findUserByName(username);
  // Promise.resolve(users.find(user => user.username === username));
}
