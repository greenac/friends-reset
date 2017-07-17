'use strict';
module.exports = function(sequelize, DataTypes) {
  const friend = sequelize.define('friend', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    friendId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    status: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    indexes: [{
        fields: ['userId', 'friendId']
      }
    ],
    hooks: {
      beforeCreate: (friend, next) => {
        console.log('in `beforeCreate` friend hook');
        if (friend.userId === friend.friendId) {
          // need to handle this case. Throw appropriate error.
          console.log("Error: user's userId and friendId is the same");
          throw new Error('userId and friendId are equal');
        }

        // Enforce that the userId is always less than the friendId,
        // so there are not repeat friend entries in the db.
        if (friend.userId > friend.friendId) {
          console.log('swapping friend userId and friendId');
          const friendId = friend.friendId;
          friend.friendId = friend.userId;
          friend.userId = friendId;
        }

        next(null, friend);
      }
    }
  });

  return friend;
};