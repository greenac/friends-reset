'use strict';

const Query = require('./../db/query');
const db = require('./../db/db');
const queries = require('./../db/queries');
const User = require('./../models').user;


class UserController {
  constructor(users) {
    this._users = users;
    this._iterator = null;
    this._successfulSaves = 0;
    this._callback = null;
  };

  async _saveUser(user) {
    try {
      await this._createUser(user);
    } catch (error) {
      console.log('Failed to save user:', user, 'error:', error);
    }

    const result = this._iterator.next();
    if (result.done) {
      console.log('Finished saving:', this._successfulSaves, 'users successfully');
      if (!!this._callback) {
        this._callback();
      }
    }
  };

  _createUser(user) {
    return new Promise((resolve, reject) => {
      User.create(user).then((sqlUser) => {
        resolve(sqlUser);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  saveUsers(callback) {
    if (!!callback) {
      this._callback = callback;
    }

    this._successfulSaves = 0;
    this._iterator = this._usersGenerator();
    this._iterator.next();
  };

  * _usersGenerator() {
    console.log('starting generator');
    for (let i=0; i < this._users.length; i++) {
      const user = this._users[i];
      try {
        yield this._saveUser(user);
        this._successfulSaves += 1;
      } catch (error) {
        console.log('Error: user generator failed to save user:', user, 'error:', error);
      }
    }
  };

  allUsers() {
    return new Promise((resolve, reject) => {
      User.all().then((users) => {
        resolve(users);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  getUser(userId) {
    return new Promise((resolve, reject) => {
      User.findOne({where: {id: userId}}).then((user) => {
        resolve(user);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  getUsers(...userIds) {
    const args = userIds.map((userId) => {
      return {id: userId};
    });

    return new Promise((resolve, reject) => {
      User.findAll({where: {$or: args}}).then((users) => {
        resolve(users);
      }).catch((error) => {
        reject(error);
      });
    });
  };
}

module.exports = UserController;
