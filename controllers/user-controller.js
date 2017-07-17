'use strict';

const Query = require('./../db/query');
const db = require('./../db/db');
const queries = require('./../db/queries');


class UserController {
  constructor(users) {
    this._users = users;
    this._iterator = null;
    this._successfulSaves = 0;
    this._query = new Query(queries.createUser);
    this._callback = null;
  };

  async _saveUser(user) {
    this._query.setValues([user.firstName, user.lastName, user.dateCreated]);
    try {
      await this._query.execute();
    } catch (error) {
      console.log('Failed to save user to pg with error:', error);
    }

    const result = this._iterator.next();
    if (result.done) {
      console.log('Finished saving:', this._successfulSaves, 'users successfully');
      if (!!this._callback) {
        this._callback();
      }

      db.disconnect().then(() => {
        console.log('disconnected from the database successfully');
      }, (error) => {
        console.log('Error: failed to disconnect from postgres:', error);
      });
    }
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
}

module.exports = UserController;
