'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friend', {
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
    indexes: [{
        fields: ['userId', 'friendId']
      }
    ],
    hooks: {
      beforeCreate: function(model) {

        return new Promise((resolve, reject) => {
          if (model.userId === model.friendId) {
            // need to handle this case. Throw appropriate error.
            console.log("Error: user's userId and friendId is the same");
            reject(new Error('userId and friendId are equal'));
          }

          // Enforce that the userId is always less than the friendId,
          // so there are not repeat friend entries in the db.
          if (model.userId > model.friendId) {
            const newUserId = model.friendId;
            model.setDataValue('friendId', model.userId);
            model.setDataValue('userId', newUserId);
          }

          resolve(model);
        });
      }
    }
  });
};
