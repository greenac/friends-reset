'use strict';

const db = require('./../db/db');
const queries = require('./../db/queries');
const Friend = require('./../models').friend;


const NUMBER_OF_FRIENDS = 1000;

class FriendController {
  /**
   *
   * @param users
   */
  constructor(users) {
    this._users = users;
    this._callback = null;
    this._friends = [];
    this._statuses = ['pending', 'sent', 'accepted', 'denied'];
    this._iterator = null;
    this._friendsSaved = 0;
  };

  saveFriends(callback=null) {
    if (!!callback) {
      this._callback = callback;
    }

    this._fillFriends();
    this._friendsSaved = 0;
    this._iterator = this._saveFriendsGenerator();
    this._iterator.next();
  };

  _fillFriends() {
    if (this._users.length < 2) {
      throw new Error("Must be more than two users for a meaningful friendship. It's sad otherwise");
    }

    this._friends = [];
    for (let i=0; i < NUMBER_OF_FRIENDS; i++) {
      const user1 = this._getRandomUser();
      const user2 = this._getRandomUser();
      const status = this._getRandomStatus();
      this._friends.push({
        userId: user1.id,
        friendId: user2.id,
        status: status
      });
    }
  };

  _getRandomUser() {
    return this._users[Math.floor(this._users.length * Math.random())];
  };

  _getRandomStatus() {
    return this._statuses[Math.floor(this._statuses.length * Math.random())];
  };

  async _saveFriend(friend) {
    try {
      const savedFriend = await this.createFriend(friend);
      console.log('saved friend:', savedFriend.dataValues);
      this._friendsSaved += 1;
    } catch (error) {
      console.log('Error: failed to create friend:', friend, 'with error:', error);
    }

    const result = this._iterator.next();
    if (result.done) {
      console.log('Finished saving:', this._friendsSaved, 'successfully');
      if (!!this._callback) {
        let friends;
        try {
          friends = await this.getAllFriends();
        } catch (error) {
          console.log('Error: failed to retrieve friends after finishing friends save.');
        }

        this._callback(friends);
      }
    }
  };

  async createFriend(friend) {
    return new Promise((resolve, reject) => {
      Friend.create(friend).then((createdFriend) => {
        resolve(createdFriend);
      }).catch((error) => {
        reject(error);
      });
    });
  };

  * _saveFriendsGenerator() {
    for (let i=0; i < this._friends.length; i++) {
      yield this._saveFriend(this._friends[i]);
    }
  };

  async getAllFriends() {
    const getFriends = () => {
      return new Promise((resolve, reject) => {
        Friend.all().then((friends) => {
          resolve(friends);
        }).catch((error) => {
          reject(error);
        });
      });
    };

    try {
      return await getFriends();
    } catch (error) {
      console.log('Failed to get all friends with error:', error);
      throw error;
    }
  }
}

module.exports = FriendController;
