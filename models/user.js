'use strict';

module.exports = function(sequelize, DataTypes) {
  const user = sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    hooks: {
      beforeCreate: function(user, next) {
        if (user.)
      }
    });
  }
  return user;
};