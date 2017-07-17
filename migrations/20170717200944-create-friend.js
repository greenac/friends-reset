'use strict';

module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('friends', {
      userId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      friendId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('friends');
  }
};