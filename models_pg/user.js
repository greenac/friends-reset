'use strict';


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    dateCreated: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('NOW()')
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
  }, {
    freezeTableName: true,
    timestamps: true
  });
};
