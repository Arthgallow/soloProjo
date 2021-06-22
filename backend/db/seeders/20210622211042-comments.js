'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Comments', [
    {
      userId: 1,
      goalId: 1,
      mediaId: 1,
      comment: "I look like tutle"
    },
    {
      userId: 2,
      goalId: 1,
      mediaId: 1,
      comment: "Nah dude"
    },
    {
      userId: 1,
      goalId: 1,
      mediaId: 1,
      comment: "totes"
    },
    {
      userId: 3,
      goalId: 2,
      mediaId: 2,
      comment: "GET RECKT"
    },
    {
      userId: 1,
      goalId: 2,
      mediaId: 2,
      comment: "super mature"
    },
    {
      userId: 2,
      goalId: 1,
      mediaId: 1,
      comment: "Long time listener, first time caller"
    },

    ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Comments', null, {});

  }
};
