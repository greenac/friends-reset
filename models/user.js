'use strict';

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    getterMethods: {
      fullName: function() {
        return this.firstName + ' ' + this.lastName;
      }
    }
  });
};
