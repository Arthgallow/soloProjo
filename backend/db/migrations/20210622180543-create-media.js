'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Media', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      mediaName: {
        allowNull: false,
        type: Sequelize.STRING(100)
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      goalId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      mediaUrl: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
         defaultValue: Sequelize.fn('now'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
         defaultValue: Sequelize.fn('now'),
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Media');
  }
};
