'use strict';

const db = require('./../db/db');
const queries = require('./../db/queries');
const Query = require('./../db/query');

const NUMBER_OF_FRIENDS = 100;

class FriendController {
  /**
   *
   * @param friends
   */
  constructor(friends) {
    this._friends = friends;
    this._query = new Query();
    this._callback = null;
  };

  matchFriends(callback=null) {
    if (!!callback) {
      this._callback = callback;
    }


  };

  * matchFriends() {
      for (let i=0; i < NUMBER_OF_FRIENDS; i++) {

      }
  };

  async _checkIfAlreadyFriends(user1, user2) {

    this._query.setParams()
  };

  async _saveFriend(user1, user2) {
    const friend = {

    };
  };
}

module.exports = FriendController;
