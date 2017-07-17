'use strict';


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('friend', {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    friendId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    status: DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: true
  });
};
